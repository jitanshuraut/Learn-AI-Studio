"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {CreditContextProps} from "@/types"

const CreditContext = createContext<CreditContextProps | undefined>(undefined);

interface CreditProps {
  children: ReactNode;
}

export function CreditProvider({ children }: CreditProps) {
  const [Credit, setCredit] = useState<number>(0);
  const session: any = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getCredit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.id,
          }),
        });

        const data = await response.json();
        // console.log(data);
        setCredit(data.Credit);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <CreditContext.Provider value={{ Credit, setCredit }}>
      {children}
    </CreditContext.Provider>
  );
}

export function useCredit() {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
}
