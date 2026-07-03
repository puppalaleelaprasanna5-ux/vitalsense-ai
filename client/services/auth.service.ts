import api from "../lib/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function register(data: RegisterData) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data: LoginData) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function getCurrentUser() {
  const res = await api.get("/auth/me");
  return res.data;
}

const authService = { register, login, getCurrentUser };
export default authService;
