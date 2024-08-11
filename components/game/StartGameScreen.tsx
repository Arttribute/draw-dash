"use client";
import React from "react";
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
import { createWalletClient, custom, getContract } from "viem";
import { mainnet, holesky } from "viem/chains";
import { ethers } from "ethers";
import { DrawDashPlayToEarnAbi } from "@/lib/abi/DrawDashPlayToEarn";
import { useMinipay } from "../providers/MinipayProvider";
import { useMagicContext } from "../providers/MagicProvider";

import { Input } from "@/components/ui/input";

interface StartGameScreenProps {
  onComplete: () => void;
  setIsPlayToEarn: any;
  setDepositAmount: any;
  depositAmount: number;
}

const StartGameScreen: React.FC<StartGameScreenProps> = ({
  onComplete,
  setIsPlayToEarn,
  setDepositAmount,
  depositAmount,
}) => {
  const onStartGame = () => {
    onComplete();
  };

  async function depositAndPlay() {
    setIsPlayToEarn(true);
    await playGame(depositAmount, false);
    onComplete();
  }

  const { minipay } = useMinipay();
  const { web3 } = useMagicContext();

  async function playGame(stake: any, win: any) {
    const contractAddress = "0xd14735436518c564795877Ec521B35B772566eAe"; // Replace with your contract's address

    if (minipay) {
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom((window as any).ethereum!),
      });

      const contract = getContract({
        address: contractAddress,
        abi: DrawDashPlayToEarnAbi,
        client: {
          wallet: walletClient,
        },
      });

      const [address] = await walletClient.getAddresses();

      try {
        const hash = await contract.write.playGame([stake, win], {
          from: address,
        });
        console.log("Transaction hash", hash);
      } catch (error) {
        console.error("Error playing game:", error);
      }
    } else if (web3) {
      const fromAddress = (await web3.eth.getAccounts())[0];

      const contract = new web3.eth.Contract(
        DrawDashPlayToEarnAbi,
        contractAddress
      );

      try {
        const receipt = await contract.methods.playGame(stake, win).send({
          from: fromAddress,
        });
        console.log("Transaction receipt", receipt);
      } catch (error) {
        console.error("Error playing game:", error);
      }
    } else {
      throw new Error("No wallet provider found");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center p-4 mt-12 lg:w-[700px]">
        <div className="flex">
          <div className="text-lg font-bold  bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mr-0.5">
            Play Draw Dash
          </div>
          <SquarePen className="w-4 h-4 text-purple-500  font-bold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <Card className="col-span-1 m-2 shadow-lg text-center">
            <CardHeader>
              <h2 className="text-2xl font-semibold ">😄 Play for fun </h2>
            </CardHeader>
            <CardContent>
              <div className="m-2">
                <h4 className="text-lg font-semibold mb-4">
                  Sketch Your Way to Victory
                </h4>
                <div className=" p-2">
                  <p className="text-sm mb-4 ml-2 ">
                    Draw to solve AI art puzzles just for fun. Compete on the
                    global leaderboard and earn NFTs.
                  </p>
                </div>
              </div>

              <Button
                className="rounded-lg mt-1 px-6 w-full"
                onClick={async () => {
                  onStartGame();
                }}
              >
                Start playing
                <PlayIcon size={20} className="ml-0.5 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-1 m-2 shadow-lg text-center">
            <CardHeader>
              <h2 className="text-2xl font-semibold ">🤑 Play to earn</h2>
            </CardHeader>
            <CardContent>
              <div className="m-2">
                <h4 className="text-lg font-semibold mb-4">
                  Deposit, Sketch and Earn
                </h4>
                <div className="p-2">
                  <p className="text-sm mb-4 ml-2">
                    Deposit an amount and play the AI art puzzle game to earn
                    rewards based on your performance.
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-lg mt-1 px-6 w-full"
                  >
                    <p className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      Deposit and play
                    </p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Deposit and play</DialogTitle>
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
                      Start playing
                      <PlayIcon size={20} className="ml-0.5 w-4 h-4" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <div
            style={{
              boxShadow:
                "0 0 120px 20px #f8bbd0, 0 0 260px 140px #ede7f6, 0 0 200px 160px #ede7f6, 0 0 200px 120px #ede7f6",
              zIndex: -1,
              bottom: "0",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default StartGameScreen;
