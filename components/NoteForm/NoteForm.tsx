"use client";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag as NoteTag,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
      />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit">Create</button>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}

export default NoteForm;
