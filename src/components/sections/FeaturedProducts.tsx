"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/content";
import { Reveal } from "./Reveal";

export function FeaturedProducts() {
  return (
    <section className="bg-ink px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-eyebrow text-champagne">منتخب فروشگاه</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-warmwhite sm:text-4xl">
              قطعات شاخص این فصل
            </h2>
          </div>
          <a
            href="#new"
            className="text-sm text-cream/80 underline decoration-champagne/40 underline-offset-4 transition-colors hover:text-champagne"
          >
            مشاهده همه محصولات
          </a>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.08}>
              <article className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-panel">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[11px] text-cream backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-cream">{p.name}</h3>
                </div>
                <p className="mt-1 fa-nums text-sm text-taupe">{p.price} تومان</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
