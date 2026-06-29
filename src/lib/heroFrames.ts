export const HERO_FRAME_COUNT = 201;

export function getHeroFramePath(index: number): string {
  const clamped = Math.min(HERO_FRAME_COUNT - 1, Math.max(0, index));
  const num = String(clamped + 1).padStart(3, "0");
  return `/frames3/ezgif-frame-${num}.jpg`;
}

export function progressToFrameIndex(progress: number): number {
  const t = Math.min(1, Math.max(0, progress));
  return Math.min(HERO_FRAME_COUNT - 1, Math.round(t * (HERO_FRAME_COUNT - 1)));
}
