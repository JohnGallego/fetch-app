"use server";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { cookies } from "next/headers";

export const login = async (name: string, email: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();

    if (responseText === "OK" && response.headers.has("set-cookie")) {
      const cookie = response.headers.get("set-cookie");
      const cookieStore = await cookies();

      cookieStore.set("fetch-access-token", cookie!, {
        httpOnly: true,
        secure: true,
        path: "/",
      });

      return { success: true };
    } else {
      return { success: false, error: responseText || "Authentication failed" };
    }
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};
