// app/api/login/route.ts
import { NextResponse } from "next/server";
import { signIn } from "@/APIS/apis"; // Your signIn function

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await signIn({ email, password });

    if (res.success === false) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }

    // Set a cookie or session here
    // Example: cookies().set("token", res.token, { httpOnly: true });

    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
