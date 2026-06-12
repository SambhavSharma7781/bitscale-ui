"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { FindPeopleModal } from "./FindPeopleModal";
import { NewGridModal } from "./NewGridModal";
import { ModalProvider } from "@/app/context/ModalContext";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ModalProvider>
        <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-950">
          {/* Persistent sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main content area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
              {children}
            </main>
          </div>
        </div>

        {/* Global modals */}
        <FindPeopleModal />
        <NewGridModal />
      </ModalProvider>
    </ThemeProvider>
  );
}
