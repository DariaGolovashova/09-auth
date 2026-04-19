import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist",

  openGraph: {
    title: "Page not found",
    description: "This page does not exist",
    url: "https://08-zustand-ewrqwy0yg-darias-projects-971d340e.vercel.app/404",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
