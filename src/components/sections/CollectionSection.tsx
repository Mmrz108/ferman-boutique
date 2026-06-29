"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { collections } from "@/data/content";
import { Reveal } from "./Reveal";

export function CollectionSection() {
  return (
    <section className="bg-ink px-6 py-28 sm:px-10 lg:py-36" id="collections">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-eyebrow text-champagne">کالکشن‌ها</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-extrabold leading-tight text-warmwhite sm:text-4xl">
            منتخب فصل، برای زن و مرد
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.12}>
              <div
                id={c.id}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-panel"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-xl font-bold text-warmwhite">
                    {c.title}
                  </h3>
                  <p className="mt-2 max-w-[85%] text-sm leading-6 text-cream/80">
                    {c.description}
                  </p>
                  <a
                    href="#"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-champagne"
                  >
                    {c.cta}
                    <span className="block h-px w-5 bg-champagne transition-all duration-300 group-hover:w-9" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
