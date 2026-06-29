"use client";

import { useRef } from "react";
import { useHeroScrollProgress } from "@/lib/useHeroScrollProgress";
import { HeroCanvasLazy } from "./HeroCanvasLazy";
import { HeroOverlay } from "./HeroOverlay";

/**
 * ScrollDrivenHero
 * ------------------
 * این کامپوننت "موتور" بخش هیرو است. معماری آن:
 *
 *  <section ارتفاع ۳۰۰vh>          <-- فضای کافی برای اینکه اسکرول معنا پیدا کند
 *    <div sticky top-0 h-screen>   <-- صحنه روی صفحه ثابت می‌ماند تا کاربر در همین section است
 *      <HeroCanvasLazy />          <-- توالی فریم‌ها، با progressRef به‌روزرسانی می‌شود
 *      <HeroOverlay />             <-- متن و دکمه‌ها، با useTransform از scrollYProgress
 *    </div>
 *  </section>
 *
 * useHeroScrollProgress پیشرفت اسکرول را در یک ref ذخیره می‌کند تا انیمیشن فریم‌ها
 * بدون رندر مجدد ری‌اکت، هر فریم آن را بخواند.
 */
export function ScrollDrivenHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progressRef, scrollYProgress } = useHeroScrollProgress(sectionRef);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[300vh] bg-ink"
      aria-label="بخش معرفی فرمان"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 bg-ink" />

        <div className="hero-canvas-layer absolute inset-0 z-[1]">
          <HeroCanvasLazy progressRef={progressRef} />
        </div>

        <HeroOverlay scrollYProgress={scrollYProgress} />

        {/* وینیت لطیف پایین برای گذار نرم به بخش بعدی */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
    </section>
  );
}
