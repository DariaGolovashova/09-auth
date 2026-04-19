"use client";
import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
// import { useDebouncedCallback } from "use-debounce";

// import { fetchNotes, createNote } from "../../lib/api";
import { fetchNotes } from "../../lib/api";
import type { FetchNotesResponse } from "../../lib/api";
// import type { FetchNotesParams } from "../../services/noteService";
// import type { Note } from "../../types/note";
// import type { NoteFormValues } from "../NoteForm/NoteForm";

import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";
// import NoteForm from "../NoteForm/NoteForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  // const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const debouncedSearch = useDebouncedCallback((value: string) => {
  //   setPage(1);
  //   setSearch(value);
  // }, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });
  //   placeholderData: () => {
  //     return (
  //       queryClient.getQueryData<FetchNotesResponse>([
  //         "notes",
  //         page - 1,
  //         search,
  //       ]) || {
  //         notes: [],
  //         totalPages: 1,
  //       }
  //     );
  //   },
  //   staleTime: 500,
  // });

  // const createMutation = useMutation<
  //   Note,
  //   Error,
  //   Omit<Note, "id" | "createdAt" | "updatedAt">
  // >({
  //   mutationFn: (values) => createNote(values),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["notes"] });
  //     setIsModalOpen(false);
  //   },
  // });

  // const handleCreate = (values: NoteFormValues) => {
  //   createMutation.mutate(
  //     values as Omit<Note, "id" | "createdAt" | "updatedAt">,
  //   );
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={setSearch} />
          {/* <button className={css.button} onClick={() => setIsModalOpen(true)}>
            {" "}
            Create note +
          </button> */}
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </header>

        {data?.notes?.length ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found</p>
        )}
        {/* {data && data.notes.length > 0 && <NoteList notes={data.notes} />} */}
        {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleCreate}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal> */}
      </div>
    </>
  );
}

export default App;
