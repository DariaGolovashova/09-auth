"use client";
import css from "./SignInPage.module.css";
import { useState } from "react";
import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

function SignInPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      const data = await login({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      setUser(data.user);

      router.push("/notes");
    } catch {
      setError("Invalid credentials");
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
export default SignInPage;
