"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";

function NoteDetailsClient() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.tag}</p>
      <p>{data.content}</p>
      <p>{data.createdAt}</p>
    </div>
  );
}

export default NoteDetailsClient;
