"use client";
import { api } from "./api";
import axios from "axios";
import type { Note } from "../../types/note";
import { User } from "@/types/user";

// const headers = {
//   Authorization: `Bearer ${token}`,
// };
export interface AuthResponse {
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  // const { data } = await instance.get<Note>(`/${id}`);
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  // const { data } = await instance.get<FetchNotesResponse>("", {params, });
  const { data } = await api.get("/notes", { params });
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  // const { data } = await instance.post<Note>("", note);
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  // const { data } = await instance.delete<Note>(`/${id}`);
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const checkSession = async () => {
  const res = await api.get("/auth/session");
  return res.data;
};
export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: Partial<User>): Promise<User> => {
  const res = await api.patch("/users/me", data);
  return res.data;
};
