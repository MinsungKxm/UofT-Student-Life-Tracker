// src/api.js
const BASE_URL = "";

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

  return res.status === 204 ? null : res.json();
}

export const api = {
  register: (email, password) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  login: (email, password) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request("/logout", {
      method: "POST",
    }),

  getSession: () => request("/session"),

  getEvents: () => request("/events"),

  getTasks: () =>
    request("/tasks"),

  completeTask: (id) =>
    request(`/tasks/${id}/complete`, {
        method: "PATCH"
    }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, {
        method: "DELETE"
    }),

  addEvent: (event) =>
    request("/events", {
      method: "POST",
      body: JSON.stringify(event),
    }),
  deleteEvent: (id) =>
    request(`/events/${id}`, {
      method: "DELETE",
    }),

  getDeadlines: () => request("/deadlines"),

  getTodaySchedule: () => request("/schedule/today"),
};