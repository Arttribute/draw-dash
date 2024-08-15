import React from "react";
import AppBar from "@/components/layout/AppBar";

import Link from "next/link";
import Image from "next/image";
import DepositDialog from "@/components/vault/DepositDialog";
import WithdrawDialog from "@/components/vault/WithdrawDialog";
import { Vault } from "lucide-react";

const vaultd = () => {
  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <div className="grid grid-cols-2">
          <div className="border rounded-xl shadow-md p-4  m-2 text-white bg-indigo-500">
            <div className="mb-2 m-2">
              <div className="flex">
                <h1 className="text-8xl font-semibold">0</h1>
                <p className="text-sm font-semibold mt-5 ml-1">USD</p>
              </div>
              <p className="text-lg font-semibold">Total Value in Vault</p>
            </div>
          </div>
          <div className="border rounded-xl shadow-md p-4 m-2 ">
            <div className="mb-2 m-2">
              <div className="flex">
                <h1 className="text-5xl font-semibold">0</h1>
                <p className="text-sm font-semibold mt-5 ml-1">USDc</p>
              </div>
              <p className="text-sm font-semibold">Amount Deposited in vault</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <DepositDialog />
              </div>
              <div className="m-1">
                <WithdrawDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default vaultd;
