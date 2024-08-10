import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("token is", token);

  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith("/cart")) {
    if (!token) {
      // Redirect to login page
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // if (req.nextUrl.pathname.startsWith("/login")) {
  //   if (token) {
  //     // Redirect to homepage or cart
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/favourite"], // Apply middleware to cart and login routes
};
