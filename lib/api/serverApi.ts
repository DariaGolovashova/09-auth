import { cookies } from "next/headers";
import axios from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

const createServerApi = () => {
  const cookieStore = cookies();

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieStore.toString(), // 🔥 головне
    },
  });
};

export const fetchNotes = async (params = {}) => {
  const api = createServerApi();
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = createServerApi();
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const getMe = async (): Promise<User> => {
  const api = createServerApi();
  const { data } = await api.get("/users/me");
  return data;
};

export const checkSession = async () => {
  const api = createServerApi();
  const { data } = await api.get("/auth/session");
  return data;
};
