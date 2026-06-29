"use client";

import { useRef, type RefObject } from "react";
import { useScroll, useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * useHeroScrollProgress
 * ----------------------
 * پیوند بین اسکرول صفحه و صحنه سه‌بعدی.
 *
 * چرا به این شکل؟
 * useScroll مقدار پیشرفت اسکرول (۰ تا ۱) را به صورت یک MotionValue می‌دهد.
 * اگر این مقدار را مستقیماً در state ری‌اکت بگذاریم، در هر فریم اسکرول
 * کل صفحه دوباره رندر می‌شود که برای صحنه سه‌بعدی فاجعه‌بار است.
 *
 * به جای آن، مقدار را در یک ref ذخیره می‌کنیم. کامپوننت سه‌بعدی در
 * useFrame خودش (هر فریم، مستقل از رندر ری‌اکت) این ref را می‌خواند.
 * نتیجه: انیمیشن کاملاً وابسته به موقعیت اسکرول است، نه زمان، و
 * هیچ رندر اضافه‌ای هم اتفاق نمی‌افتد.
 */
export function useHeroScrollProgress(target: RefObject<HTMLElement>) {
  const progressRef = useRef(0);
  const velocityRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    velocityRef.current = latest - progressRef.current;
    progressRef.current = latest;
  });

  return { progressRef, velocityRef, scrollYProgress };
}

/** کمک‌تابع: مقدار را بین دو بازه به نرمی نگاشت می‌کند (مثل interpolate فریمر موشن، اما برای استفاده داخل useFrame) */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

export type ScrollProgressMV = MotionValue<number>;
