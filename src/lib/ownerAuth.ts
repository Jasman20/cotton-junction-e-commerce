"use client";

const OWNER_AUTH_KEY = "cj_owner_session_v1";

export function isOwnerAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(OWNER_AUTH_KEY) === "authenticated_cj_owner";
}

export function setOwnerAuthenticated(status: boolean) {
  if (typeof window === "undefined") return;
  if (status) {
    localStorage.setItem(OWNER_AUTH_KEY, "authenticated_cj_owner");
  } else {
    localStorage.removeItem(OWNER_AUTH_KEY);
  }
}
