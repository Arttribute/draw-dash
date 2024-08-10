"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Play as PlayIcon, SquarePen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

interface WithdrawDialogProps {}

const WithdrawDialog: React.FC<WithdrawDialogProps> = ({}) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const withdraw = () => {};

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-lg mt-1 px-6 ">
            Withdraw amount
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw from vault</DialogTitle>
            <DialogDescription>Enter withdrawal amount</DialogDescription>
          </DialogHeader>
          <Input
            id="deposit"
            placeholder="Deposit amount usdc"
            onChange={(event) => {
              setWithdrawAmount(event.target.value);
            }}
            value={withdrawAmount}
          />
          <DialogFooter>
            <Button
              className="rounded-lg mt-1 px-6 w-full"
              onClick={async () => {
                withdraw();
              }}
            >
              Withdraw amount from Vault
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WithdrawDialog;
