"use client";

import { useEffect, useRef, useState } from "react";
import {
  getHeroFramePath,
  HERO_FRAME_COUNT,
  progressToFrameIndex,
} from "@/lib/heroFrames";

type HeroFrameSequenceProps = {
  progressRef: React.RefObject<number>;
};

const LOAD_CONCURRENCY = 6;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > canvasRatio) {
    drawHeight = height;
    drawWidth = height * imgRatio;
    offsetX = (width - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = width;
    drawHeight = width / imgRatio;
    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/**
 * HeroFrameSequence
 * -----------------
 * پخش توالی فریم‌ها بر اساس اسکرول.
 * روی Vercel همه فریم‌ها را هم‌زمان نمی‌کشد؛ اول فریم ۰ را نشان می‌دهد
 * و بقیه را با محدودیت همزمانی بارگذاری می‌کند.
 */
export function HeroFrameSequence({ progressRef }: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(HERO_FRAME_COUNT).fill(null)
  );
  const readyRef = useRef<boolean[]>(new Array(HERO_FRAME_COUNT).fill(false));
  const drawnIndexRef = useRef(-1);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const [ready, setReady] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    let cancelled = false;

    const markReady = (index: number, img: HTMLImageElement) => {
      if (cancelled) return;
      imagesRef.current[index] = img;
      readyRef.current[index] = true;
      if (index === 0) setReady(true);
    };

    async function loadWithConcurrency(indices: number[]) {
      let cursor = 0;

      async function worker() {
        while (cursor < indices.length && !cancelled) {
          const index = indices[cursor++];
          if (readyRef.current[index]) continue;

          try {
            const img = await loadImage(getHeroFramePath(index));
            markReady(index, img);
          } catch {
            // فریم خراب را رد می‌کنیم؛ نزدیک‌ترین فریم سالم رسم می‌شود
          }
        }
      }

      const workers = Array.from(
        { length: Math.min(LOAD_CONCURRENCY, indices.length) },
        () => worker()
      );
      await Promise.all(workers);
    }

    // اول فریم ۰، بعد بقیه به ترتیب
    const order = [0, ...Array.from({ length: HERO_FRAME_COUNT - 1 }, (_, i) => i + 1)];

    void loadWithConcurrency(order);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const findNearestReady = (target: number): number => {
      if (readyRef.current[target] && imagesRef.current[target]) return target;

      for (let distance = 1; distance < HERO_FRAME_COUNT; distance++) {
        const before = target - distance;
        const after = target + distance;
        if (before >= 0 && readyRef.current[before] && imagesRef.current[before]) {
          return before;
        }
        if (
          after < HERO_FRAME_COUNT &&
          readyRef.current[after] &&
          imagesRef.current[after]
        ) {
          return after;
        }
      }

      return -1;
    };

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      sizeRef.current = { width, height, dpr };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawnIndexRef.current = -1;
    };

    const renderFrame = (frameIndex: number) => {
      const ctx = canvas.getContext("2d");
      const drawIndex = findNearestReady(frameIndex);
      const img = drawIndex >= 0 ? imagesRef.current[drawIndex] : null;
      const { width, height } = sizeRef.current;

      if (
        !ctx ||
        drawIndex < 0 ||
        !img?.complete ||
        !img.naturalWidth ||
        !width ||
        !height
      ) {
        return;
      }

      if (drawIndex === drawnIndexRef.current) return;

      drawCover(ctx, img, width, height);
      drawnIndexRef.current = drawIndex;
    };

    const tick = () => {
      const frameIndex = progressToFrameIndex(progressRef.current ?? 0);
      renderFrame(frameIndex);
      rafRef.current = requestAnimationFrame(tick);
    };

    syncCanvasSize();
    renderFrame(progressToFrameIndex(progressRef.current ?? 0));

    const observer = new ResizeObserver(syncCanvasSize);
    observer.observe(canvas);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, progressRef]);

  return (
    <div className="relative h-full w-full bg-ink">
      {!ready && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getHeroFramePath(0)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: ready ? 1 : 0 }}
        aria-hidden
      />
    </div>
  );
}
