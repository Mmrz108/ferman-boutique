import { brand, footer } from "@/data/content";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-ink pt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold text-warmwhite">
              {brand.name}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-taupe">
              {footer.about}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-sm font-medium text-cream">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-taupe transition-colors hover:text-champagne"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-taupe sm:flex-row">
          <p>{footer.rights}</p>
          <p className="fa-nums">© ۱۴۰۵ {brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
