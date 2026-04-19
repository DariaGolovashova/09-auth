"use client";
import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

const headers = {
  Authorization: `Bearer ${token}`,
};

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
  const { data } = await instance.get<Note>(`/${id}`);
  return data;
};

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>("", {
    params,
  });
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const { data } = await instance.post<Note>("", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/${id}`);
  return data;
};
