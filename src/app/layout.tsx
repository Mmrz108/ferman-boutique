import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فرمان | بوتیک پوشاک زنانه و مردانه",
  description:
    "فرمان؛ بوتیک لوکس پوشاک زنانه و مردانه. ظرافت مدرن، خیاطی نجیب و کالکشن‌های منتخب فصل.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
