import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
// import type { Note } from "@/types/note";
import type { Metadata } from "next";

interface PropsNotePage {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0];

  return {
    title: `Notes: ${tag}`,
    description: `Viewing notes filtered by ${tag}`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Viewing notes filtered by ${tag}`,
      url: `https://08-zustand-ewrqwy0yg-darias-projects-971d340e.vercel.app/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}
export async function NotePage({ params }: PropsNotePage) {
  const { slug } = await params;
  const tag = slug?.[0];
  const queryClient = new QueryClient();
  // const filters = tag && tag !== "all" ? { search: tag } : {};

  // const { notes } = await fetchNotes(filters);
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(tag && tag !== "all" ? { search: tag } : {}),
  });
  // const notes: Note[] = notesResponse.notes;
  return (
    // <div>
    //   {notes.map((note) => (
    //     <div key={note.id}>{note.title}</div>
    //   ))}
    // </div>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
export default NotePage;
