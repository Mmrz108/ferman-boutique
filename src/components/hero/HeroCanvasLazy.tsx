"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type HeroCanvasLazyProps = {
  progressRef: React.RefObject<number>;
};

/**
 * بار اولیه انیمیشن فریم‌ها را lazy انجام می‌دهیم تا باندل اولیه صفحه سبک بماند.
 */
const HeroCanvasInner = dynamic(
  () => import("./HeroFrameSequence").then((mod) => mod.HeroFrameSequence),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border border-line border-t-champagne" />
      </div>
    ),
  }
) as ComponentType<HeroCanvasLazyProps>;

export function HeroCanvasLazy(props: HeroCanvasLazyProps) {
  return <HeroCanvasInner {...props} />;
}
