"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-[260px] min-h-screen">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
