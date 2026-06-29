import Image from "next/image";
import { story } from "@/data/content";
import { Reveal } from "./Reveal";

export function BrandStory() {
  return (
    <section id="story" className="bg-panel px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1400&auto=format&fit=crop"
            alt={story.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-xs tracking-eyebrow text-champagne">{story.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-warmwhite sm:text-4xl">
            {story.title}
          </h2>

          <div className="mt-7 space-y-5">
            {story.paragraphs.map((p) => (
              <p key={p} className="max-w-md text-base leading-8 text-taupe">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 flex gap-12">
            <div>
              <p className="fa-nums font-display text-3xl font-extrabold text-champagne">
                {story.stat1.value}
              </p>
              <p className="mt-1 text-sm text-taupe">{story.stat1.label}</p>
            </div>
            <div>
              <p className="fa-nums font-display text-3xl font-extrabold text-champagne">
                {story.stat2.value}
              </p>
              <p className="mt-1 text-sm text-taupe">{story.stat2.label}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
