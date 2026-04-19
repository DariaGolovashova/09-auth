"use client";
// import Link from "next/link";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse, FetchNotesParams } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
// import Modal from "@/components/Modal/Modal";
// import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
// import type { NoteFormValues } from "@/components/NoteForm/NoteForm";
import Link from "next/link";

type PropsNotesClient = {
  tag?: string;
};

function NotesClient({ tag }: PropsNotesClient) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, error } = useQuery({
    // queryKey: ["notes", debouncedSearch, page],
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        tag: tag && tag !== "all" ? tag : undefined,
        page,
        perPage: 10,
      } as FetchNotesParams),
    // placeholderData: { notes: [], totalPages: 1 },
    placeholderData: (prev) => prev ?? { notes: [], totalPages: 1 },
  });

  // const handleCreateNote = (values: NoteFormValues) => {
  //   console.log(values);
  //   setIsModalOpen(false);
  // };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch notes: {error.message}</p>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p> No notes found. </p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          pageCount={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {/* {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleCreateNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )} */}
      <Link href="/notes/action/create">Create note +</Link>
      {/* <button onClick={() => setIsModalOpen(true)}>Create Note</button> */}
    </div>
  );
}

export default NotesClient;
