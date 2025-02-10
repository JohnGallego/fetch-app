import { auth } from "@/app/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchWrapper = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const session = await auth();
  const cookieStore = await cookies();
  console.log("Session in fetchWrapper:", session, cookieStore.getAll());

  // Extract cookies from the cookieStore and format them into a string
  const cookiesString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Cookie: cookiesString,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: headers,
    credentials: "include",
  });

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("Unauthorized - Redirecting to signout");
      redirect("/signout");
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type");

  if (contentType?.includes("application/json")) {
    return response.json();
  } else {
    return response.text() as T;
  }
};
