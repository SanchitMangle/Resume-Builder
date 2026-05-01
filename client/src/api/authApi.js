import { apiRequest } from "./http";

export const loginUser = (body) =>
  apiRequest("/users/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const registerUser = (body) =>
  apiRequest("/users/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getCurrentUser = () => apiRequest("/users/data");
