"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface BlurContextType {
  isBlurred: boolean;
  setIsBlurred: (blurred: boolean) => void;
}
const BlurContext = createContext<BlurContextType | undefined>(undefined);

interface BlurProviderProps {
  children: ReactNode;
}

export function BlurProvider({ children }: BlurProviderProps) {
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  return (
    <BlurContext.Provider value={{ isBlurred, setIsBlurred }}>
      {children}
    </BlurContext.Provider>
  );
}

export function useBlur() {
  const context = useContext(BlurContext);
  if (!context) {
    throw new Error("useBlur must be used within a BlurProvider");
  }
  return context;
}
