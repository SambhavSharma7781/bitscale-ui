"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { FindPeopleModal } from "./FindPeopleModal";
import { ModalProvider } from "@/app/context/ModalContext";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ModalProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        {/* Persistent sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>

      {/* Global modals — rendered outside scroll container so they overlay everything */}
      <FindPeopleModal />
    </ModalProvider>
  );
}
