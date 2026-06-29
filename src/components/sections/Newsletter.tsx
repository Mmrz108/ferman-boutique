"use client";

import { useState } from "react";
import { newsletter } from "@/data/content";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error || "خطا در ثبت ایمیل.");
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError("اتصال برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-y border-line bg-panel px-6 py-24 sm:px-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-extrabold text-warmwhite sm:text-3xl">
          {newsletter.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-taupe sm:text-base">
          {newsletter.subtext}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted || loading}
            placeholder={newsletter.placeholder}
            className="flex-1 rounded-full border border-line bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-taupe/70 outline-none transition-colors focus:border-champagne disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitted || loading}
            className="rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 ease-cinematic hover:scale-[1.03] hover:bg-warmwhite disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitted ? "عضو شدید ✓" : loading ? "..." : newsletter.cta}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </Reveal>
    </section>
  );
}
