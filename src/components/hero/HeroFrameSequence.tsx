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

/**
 * HeroFrameSequence
 * -----------------
 * پخش توالی فریم‌های تصویری بر اساس پیشرفت اسکرول.
 * مقدار progressRef در هر فریم خوانده می‌شود تا بدون رندر مجدد ری‌اکت،
 * فریم متناظر روی canvas رسم شود.
 */
export function HeroFrameSequence({ progressRef }: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const [loaded, setLoaded] = useState(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(HERO_FRAME_COUNT);
    let loadedCount = 0;

    const onFrameReady = () => {
      loadedCount += 1;
      if (!cancelled && loadedCount === HERO_FRAME_COUNT) {
        imagesRef.current = images;
        setLoaded(true);
      }
    };

    for (let i = 0; i < HERO_FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = getHeroFramePath(i);
      img.onload = onFrameReady;
      img.onerror = onFrameReady;
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      sizeRef.current = { width, height, dpr };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      currentFrameRef.current = -1;
    };

    const renderFrame = (frameIndex: number) => {
      const ctx = canvas.getContext("2d");
      const img = imagesRef.current[frameIndex];
      const { width, height } = sizeRef.current;

      if (!ctx || !img?.complete || !img.naturalWidth || !width || !height) {
        return;
      }

      drawCover(ctx, img, width, height);
      currentFrameRef.current = frameIndex;
    };

    const tick = () => {
      const frameIndex = progressToFrameIndex(progressRef.current ?? 0);

      if (frameIndex !== currentFrameRef.current) {
        renderFrame(frameIndex);
      }

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
  }, [loaded, progressRef]);

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border border-line border-t-champagne" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ opacity: loaded ? 1 : 0 }}
        aria-hidden
      />
    </div>
  );
}
