"use client";

export default function Error({ error }: { error: Error }) {
  return <p>Failed to load notes: {error.message}</p>;
}
