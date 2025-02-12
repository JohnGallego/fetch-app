import { auth, signOut } from "@/app/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  //   if (req.url.includes("/signout")) {
  //     await signOut({ redirect: false });
  //     const response = NextResponse.redirect(new URL("/", req.url));
  //     console.log("siging out");
  //     return response;
  //   }
  //   if (!req.auth && req.nextUrl.pathname !== "/") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
});

export const config = {
  matcher: ["/search", "/signout"],
};
