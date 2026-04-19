"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};
// function NotePreviewClient({ id }: { id: string });
function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note</p>;
  if (!data) return null;
  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <div>
        <h2>{data.title}</h2>
        <p>{data.tag}</p>
        <p>{data.content}</p>
        <p>{data.createdAt}</p>

        <button onClick={() => router.back()}>Close</button>
      </div>
      {/* // <NotePreview /> */}
    </Modal>
  );
}
export default NotePreviewClient;
