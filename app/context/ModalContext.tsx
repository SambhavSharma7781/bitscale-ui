"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextValue {
  findPeopleOpen: boolean;
  openFindPeople: () => void;
  closeFindPeople: () => void;
  findCompaniesOpen: boolean;
  openFindCompanies: () => void;
  closeFindCompanies: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [findPeopleOpen, setFindPeopleOpen] = useState(false);
  const [findCompaniesOpen, setFindCompaniesOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        findPeopleOpen,
        openFindPeople: () => setFindPeopleOpen(true),
        closeFindPeople: () => setFindPeopleOpen(false),
        findCompaniesOpen,
        openFindCompanies: () => setFindCompaniesOpen(true),
        closeFindCompanies: () => setFindCompaniesOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside <ModalProvider>");
  return ctx;
}
