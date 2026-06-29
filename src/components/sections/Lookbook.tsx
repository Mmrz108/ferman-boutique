"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { lookbook } from "@/data/content";
import { Reveal } from "./Reveal";

export function Lookbook() {
  return (
    <section className="bg-ink px-6 py-28 sm:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-eyebrow text-champagne">{lookbook.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-warmwhite sm:text-4xl">
            {lookbook.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {lookbook.images.map((src, i) => (
            <Reveal
              key={src}
              delay={i * 0.1}
              className={i % 3 === 0 ? "col-span-2 row-span-2" : ""}
            >
              <motion.div
                className={`relative overflow-hidden rounded-sm bg-panel ${
                  i % 3 === 0 ? "aspect-square" : "aspect-[3/4]"
                }`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={src}
                  alt={`لوک‌بوک فرمان ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
