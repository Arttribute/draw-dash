"use client";

import { checkBalance, createMinipayClient, Token } from "@/lib/minipay";
import { createContext, useContext, useEffect, useState } from "react";

type MinipayProps = {
  address: string;
  balance: string;
};

type MinipayContextType = {
  minipay: MinipayProps | null;
  currency: Token;
  setMinipay: (minipay: React.SetStateAction<MinipayProps | null>) => void;
  setCurrency: (currency: React.SetStateAction<Token>) => void;
};

const MinipayContext = createContext<MinipayContextType | null>(null);

const MinipayProvider = ({ children }: { children: React.ReactNode }) => {
  const [minipay, setMinipay] = useState<MinipayProps | null>(null);
  const [currency, setCurrency] = useState<Token>("cUSD");

  useEffect(() => {
    const checkMinipay = async () => {
      const walletClient = createMinipayClient();
      const [address] = await walletClient.getAddresses();

      const ethereum = (window as any)?.ethereum;

      if (ethereum) {
        // User has a injected wallet
        if (ethereum.isMiniPay) {
          // User is using Minipay
          const balance = await checkBalance(address, currency); // This only returns the balance in cUSD

          setMinipay((prev) => ({
            ...prev,
            address,
            balance,
          }));
        } else {
          // User is not using MiniPay
          setMinipay(null);
        }
      }
    };
    checkMinipay();
  }, [minipay, currency]);

  return (
    <MinipayContext.Provider
      value={{ minipay, currency, setMinipay, setCurrency }}
    >
      {children}
    </MinipayContext.Provider>
  );
};

export const useMinipay = (): MinipayContextType => {
  const context = useContext(MinipayContext);
  if (context === null) {
    throw new Error("useMinipay must be used within a MinipayProvider");
  }
  return context;
};

export default MinipayProvider;
