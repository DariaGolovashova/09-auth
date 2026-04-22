"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await checkSession();

        // if (data?.user) {
        //   setUser(data.user);
        // } else {
        //   clearIsAuthenticated();
        // }
        if (data) {
          setUser(data);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
