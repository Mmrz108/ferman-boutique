"use client";

import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { hero } from "@/data/content";

type HeroOverlayProps = {
  scrollYProgress: MotionValue<number>;
};

/**
 * HeroOverlay
 * ------------
 * متن و دکمه‌های هیرو. این لایه روی Canvas سه‌بعدی قرار می‌گیرد.
 * هنگام اسکرول (مرحله ۲ به بعد)، متن به آرامی محو می‌شود و کمی به بالا
 * حرکت می‌کند تا صحنه سه‌بعدی فضای بیشتری برای روایت بصری پیدا کند.
 *
 * نکته دسترس‌پذیری: وقتی opacity به صفر می‌رسد، خودِ کلاس‌های Tailwind
 * چیزی را از DOM حذف نمی‌کنند — یعنی دکمه‌های نامرئی همچنان با Tab قابل
 * فوکوس می‌مانند. به همین خاطر pointer-events و aria-hidden را هم
 * صریحاً بر اساس پیشرفت اسکرول کنترل می‌کنیم.
 */
export function HeroOverlay({ scrollYProgress }: HeroOverlayProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.4], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const blur = useTransform(scrollYProgress, [0, 0.4], [0, 6]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  const [interactive, setInteractive] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setInteractive(latest < 0.35);
  });

  return (
    <motion.div
      style={{ opacity, y, filter, pointerEvents: interactive ? "auto" : "none" }}
      aria-hidden={!interactive}
      className="relative z-10 flex h-full flex-col items-end justify-center px-6 text-right sm:px-12 lg:px-20"
    >
      <div className="max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 text-xs tracking-eyebrow text-champagne sm:text-sm"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-4xl font-extrabold leading-[1.25] text-warmwhite sm:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md text-balance text-base leading-8 text-taupe sm:text-lg"
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-end gap-4"
        >
          <a
            href="#women"
            className="rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 ease-cinematic hover:scale-[1.03] hover:bg-warmwhite"
          >
            {hero.ctas.primary}
          </a>
          <a
            href="#men"
            className="rounded-full border border-taupe/40 px-7 py-3.5 text-sm font-medium text-warmwhite transition-colors duration-300 ease-cinematic hover:border-champagne hover:text-champagne"
          >
            {hero.ctas.secondary}
          </a>
          <a
            href="#new"
            className="group flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-champagne"
          >
            {hero.ctas.tertiary}
            <span className="block h-px w-5 bg-champagne transition-all duration-300 ease-cinematic group-hover:w-8" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-14"
      >
        <span className="text-[11px] tracking-wideish text-taupe">
          {hero.scrollHint}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-px bg-gradient-to-b from-champagne to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
