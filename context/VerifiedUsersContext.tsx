import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type VerifiedUsersContextType = {
  verifiedUsers: string[];
  addVerifiedUser: (name: string) => void;
  removeVerifiedUser: (name: string) => void;
  isVerified: (name: string) => boolean;
};

const VerifiedUsersContext = createContext<VerifiedUsersContextType | undefined>(
  undefined
);

const STORAGE_KEY = "letin_verified_users";
const DEFAULT_VERIFIED_USERS = ["Ms. Rivera", "Urban Arts Staff"];

export function VerifiedUsersProvider({ children }: { children: ReactNode }) {
  const [verifiedUsers, setVerifiedUsers] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_VERIFIED_USERS;
      }
    }
    return DEFAULT_VERIFIED_USERS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedUsers));
  }, [verifiedUsers]);

  const addVerifiedUser = (name: string) => {
    setVerifiedUsers((prev) => {
      if (prev.includes(name)) return prev;
      return [...prev, name];
    });
  };

  const removeVerifiedUser = (name: string) => {
    setVerifiedUsers((prev) => prev.filter((u) => u !== name));
  };

  const isVerified = (name: string) => verifiedUsers.includes(name);

  return (
    <VerifiedUsersContext.Provider
      value={{ verifiedUsers, addVerifiedUser, removeVerifiedUser, isVerified }}
    >
      {children}
    </VerifiedUsersContext.Provider>
  );
}

export function useVerifiedUsers() {
  const context = useContext(VerifiedUsersContext);
  if (context === undefined) {
    throw new Error("useVerifiedUsers must be used within a VerifiedUsersProvider");
  }
  return context;
}
