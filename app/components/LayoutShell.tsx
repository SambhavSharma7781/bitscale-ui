"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { FindPeopleModal } from "./FindPeopleModal";
import { FindCompaniesModal } from "./FindCompaniesModal";
import { NewGridModal } from "./NewGridModal";
import { ModalProvider } from "@/app/context/ModalContext";
import { GridProvider } from "@/app/context/GridContext";
import { ToastProvider } from "@/app/context/ToastContext";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <GridProvider>
        <ModalProvider>
            <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-gray-950">
              {/* Persistent sidebar */}
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

              {/* Main content area */}
              <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
                <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950">
                  {children}
                </main>
              </div>
            </div>

            {/* Global modals */}
            <FindPeopleModal />
            <FindCompaniesModal />
            <NewGridModal />
          </ModalProvider>
      </GridProvider>
    </ToastProvider>
  );
}
