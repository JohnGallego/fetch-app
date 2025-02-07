"use server";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchWrapper } from "@/utils/fetch-wrapper";

export const login = async (name: string, email: string) => {
  try {
    const response = await fetchWrapper(API_ENDPOINTS.LOGIN, {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });

    if (response === "OK") {
      return { success: true };
    } else if (typeof response === "string") {
      return { success: false, error: response };
    } else {
      throw new Error("Unexpected response from the server");
    }
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
};
