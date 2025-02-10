"use server";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { LoginFormData } from "@/schemas/login.schema";
import { fetchAPI } from "@/utils/api";
import * as cookie from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(credentials: LoginFormData) {
  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get the error message from the server
      throw new Error(`Login failed: ${response.status} - ${errorText}`); // Include more details in the error
    }

    const setCookieHeader = response.headers.get("set-cookie");

    if (!setCookieHeader) {
      throw new Error("No Set-Cookie header received");
    }

    const responseCookies = cookie.parse(setCookieHeader);
    const fetchAccessToken = responseCookies["Secure, fetch-access-token"];

    if (!fetchAccessToken) {
      throw new Error("No Set-Cookie header received");
    }

    const cookieStore = await cookies();

    cookieStore.set("fetch-access-token", fetchAccessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await fetchAPI(API_ENDPOINTS.LOGOUT, {
      method: "POST",
    });

    // Remove the cookie
    (await cookies()).delete("fetch-access-token");

    // Redirect to the home page
    redirect("/");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
