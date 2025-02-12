"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const fetchAccessToken = cookieStore.get("fetch-access-token")?.value;

  const headers = {
    ...options.headers,
    ...(fetchAccessToken
      ? { Cookie: `fetch-access-token=${fetchAccessToken}` }
      : {}),
  };

  // console.log("Outgoing:", headers, endpoint);

  const response = await fetch(endpoint, {
    ...options,
    headers,
    credentials: "include", // Ensure cookies are sent with the request
  });

  // console.log("Response:", response.status, response.headers, response.body);

  if (response.status === 401) {
    // Log the user out and redirect to the home page
    cookieStore.delete("fetch-access-token");
    redirect("/");
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as T;
}
