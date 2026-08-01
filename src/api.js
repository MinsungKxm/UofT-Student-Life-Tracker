// src/api.js
const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }

  // 204/no-content safe guard
  return res.status === 204 ? null : res.json();
}

export const api = {
  // auth
  register: (email, password) =>
    request("/register", { method: "POST", body: JSON.stringify({ email, password }) }),
  login: (email, password) =>
    request("/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request("/logout", { method: "POST" }),
  getSession: () => request("/session"),

  // data
  getEvents: () => request("/events"),
  addEvent: (event) => request("/events", { method: "POST", body: JSON.stringify(event) }),
  getDeadlines: () => request("/deadlines"),
  getTodaySchedule: () => request("/schedule/today"),
};