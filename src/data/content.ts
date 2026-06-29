// تمام محتوای متنی و داده‌های نمایشی سایت در این فایل قرار دارد
// برای تغییر متن‌ها، محصولات یا کالکشن‌ها فقط همین فایل را ویرایش کنید

export const brand = {
  name: "FERMAN",
  nameFa: "فرمان",
  tagline: "بوتیک پوشاک زنانه و مردانه",
};

export const nav = {
  links: [
    { label: "خانه", href: "#home" },
    { label: "زنانه", href: "#women" },
    { label: "مردانه", href: "#men" },
    { label: "کالکشن جدید", href: "#new" },
    { label: "درباره ما", href: "#story" },
    { label: "تماس با ما", href: "#contact" },
  ],
};

export const hero = {
  eyebrow: "فرمان — فصل تازه",
  headline: "ظرافت مدرن برای زنان و مردان",
  subtext:
    "مجموعه‌ای منتخب از پوشاک بوتیکی با خطوطی دقیق و پارچه‌هایی نجیب؛ جایی که خیاطی کلاسیک با نگاهی معاصر همراه می‌شود.",
  ctas: {
    primary: "مشاهده کالکشن زنانه",
    secondary: "مشاهده کالکشن مردانه",
    tertiary: "کالکشن جدید",
  },
  scrollHint: "برای ادامه پیمایش کنید",
};

export const collections = [
  {
    id: "women",
    title: "کالکشن زنانه",
    description: "خطوطی روان، برش‌هایی دقیق و حسی از ظرافت بی‌زمان.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
    cta: "مشاهده کالکشن",
  },
  {
    id: "men",
    title: "کالکشن مردانه",
    description: "خیاطی کلاسیک با روحیه‌ای مدرن و حداقل‌گرا.",
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1600&auto=format&fit=crop",
    cta: "مشاهده کالکشن",
  },
  {
    id: "new",
    title: "تازه‌واردها",
    description: "آخرین قطعات فصل، پیش از همه برای شما.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    cta: "مشاهده مجموعه",
  },
];

export const products = [
  {
    id: "p1",
    name: "کت بلند ذغالی",
    category: "کت",
    price: "۱۲٬۸۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "پیراهن ابریشمی کرم",
    category: "پیراهن",
    price: "۶٬۴۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "شلوار راسته زغالی",
    category: "شلوار",
    price: "۴٬۲۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "مانتو بلند بژ",
    category: "مانتو",
    price: "۹٬۹۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "پالتو پشمی شامپاینی",
    category: "پالتو",
    price: "۱۸٬۵۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "لباس مجلسی ساتن",
    category: "لباس مجلسی",
    price: "۱۴٬۲۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p7",
    name: "کمربند چرم دست‌دوز",
    category: "اکسسوری",
    price: "۲٬۸۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1611923134239-b9be5816e23c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p8",
    name: "پیراهن مردانه سفید",
    category: "پیراهن",
    price: "۵٬۱۰۰٬۰۰۰",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
  },
];

export const story = {
  eyebrow: "درباره فرمان",
  title: "فرمان، روایتی از خیاطی نجیب",
  paragraphs: [
    "فرمان از دل عشق به خیاطی کلاسیک و نگاهی معاصر به فرم متولد شد؛ بوتیکی که برای زن و مرد امروزی، پوشاکی می‌سازد که از زمان عبور می‌کند.",
    "هر قطعه با دقت در انتخاب پارچه، برش و دوخت طراحی می‌شود تا حسی از اعتماد به نفس آرام و ظرافتی بی‌ادعا را به همراه داشته باشد.",
  ],
  stat1: { value: "۱۲", label: "سال تجربه بوتیکی" },
  stat2: { value: "۴۰+", label: "قطعه منتخب در هر فصل" },
};

export const lookbook = {
  eyebrow: "لوک‌بوک",
  title: "روایت فصل",
  images: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1400&auto=format&fit=crop",
  ],
};

export const newsletter = {
  title: "از فصل تازه فرمان باخبر شوید",
  subtext: "زودتر از همه، کالکشن‌های جدید و دعوت‌نامه‌های ویژه را دریافت کنید.",
  placeholder: "ایمیل خود را وارد کنید",
  cta: "عضویت",
};

export const footer = {
  about:
    "فرمان؛ بوتیک پوشاک زنانه و مردانه با نگاهی لوکس، مینیمال و خیاطی‌محور.",
  columns: [
    {
      title: "کالکشن‌ها",
      links: ["کالکشن زنانه", "کالکشن مردانه", "تازه‌واردها", "اکسسوری"],
    },
    {
      title: "بوتیک",
      links: ["درباره ما", "داستان برند", "همکاری با ما", "فرصت‌های شغلی"],
    },
    {
      title: "خدمات مشتریان",
      links: ["تماس با ما", "راهنمای سایز", "مرجوعی و تعویض", "سوالات متداول"],
    },
  ],
  rights: "تمامی حقوق برای بوتیک فرمان محفوظ است.",
};
