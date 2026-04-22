"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return <>{children}</>;
}
export default AuthLayout;
