"use client";
import css from "./EditProfilePage.module.css";
// import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import type { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

// export const metadata: Metadata = {
//   title: "Profile",
//   description: "User profile page",
//   openGraph: {
//     title: "Profile",
//     description: "User profile page",
//     url: "https://your-site.vercel.app/profile",
//     images: [
//       {
//         url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//       },
//     ],
//   },
// };

function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const data = await getMe();
      setLocalUser(data);
      setUsername(data.username);
    }
    fetchUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updated = await updateMe({ username });
    setUser(updated);
    router.push("/profile");
  };
  //   try {
  //     await updateMe({ username });
  //     router.push("/profile");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const handleCancel = () => {
    // router.back();
    router.push("/profile");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfilePage;
