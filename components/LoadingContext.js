"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const complete = setTimeout(() => {
      setVisible(false);
      document.body.classList.add("loading-complete");
      setMounted(false);
    }, 2000);

    return () => {
      clearTimeout(complete);
      document.body.classList.remove("loading-complete");
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ visible, mounted }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const loading = useContext(LoadingContext);

  if (!loading) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return loading;
}
