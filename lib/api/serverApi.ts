import { cookies } from "next/headers";
import { api } from "./api";
import axios from "axios";
import { AxiosResponse } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

// const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

// const createServerApi = () => {
//   const cookieStore = cookies();

//   return axios.create({
//     baseURL,
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
// };
const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const fetchNotes = async (params = {}) => {
  const cookieHeader = await getCookieHeader();
  // const api = createServerApi();
  const { data } = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  // const api = createServerApi();
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  // const api = createServerApi();
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const checkSession = async () => {
  // const api = createServerApi();
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};
