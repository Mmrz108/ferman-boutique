import { NextResponse } from "next/server";
import { addNewsletterSubscriber } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "ایمیل وارد شده معتبر نیست." },
        { status: 400 }
      );
    }

    await addNewsletterSubscriber(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است." },
        { status: 409 }
      );
    }

    console.error("Newsletter subscribe error:", error);

    return NextResponse.json(
      { error: "خطا در ثبت ایمیل. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
