// import Modal from "@/components/Modal/Modal";
// import NotePreview from "@/components/NotePreview/NotePreview";
// import { useRouter } from "next/navigation";

// function Page() {
//   const router = useRouter();

//   return (
//     <Modal isOpen={true} onClose={() => router.back()}>
//       <NotePreview />
//     </Modal>
//   );
// }
// export default Page;
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}
