"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/3d-model";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
