"use client";

import css from "./NotePreview.module.css";
import NoteDetailsClient from "@/app/(private routes)/notes/[id]/NoteDetails.client";

function NotePreview() {
  return (
    <div className={css.container}>
      <NoteDetailsClient />
    </div>
  );
}

export default NotePreview;
