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

interface DepositDialogProps {}

const DepositDialog: React.FC<DepositDialogProps> = ({}) => {
  const [depositAmount, setDepositAmount] = useState("");
  const depositAndPlay = () => {};

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-lg mt-1 px-6 ">Deposit to vault</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Deposit to vault</DialogTitle>
            <DialogDescription>Enter deposit amount</DialogDescription>
          </DialogHeader>
          <Input
            id="deposit"
            placeholder="Deposit amount usdc"
            onChange={(event) => {
              setDepositAmount(event.target.value);
            }}
            value={depositAmount}
          />
          <DialogFooter>
            <Button
              className="rounded-lg mt-1 px-6 w-full"
              onClick={async () => {
                depositAndPlay();
              }}
            >
              Deposit amount to Vault
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepositDialog;
