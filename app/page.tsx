"use client";
import React, { useState, useEffect } from "react";
import AppBar from "../components/layout/AppBar";
import CustomCard from "../components/ui/CustomCard";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import ImageDisplay from "../components/ui/ImageDisplay";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import CreationCard from "@/components/nft/CreationCard";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Home = () => {
  const [creations, setCreations] = useState([]);
  const [loadinigCreations, setLoadingCreations] = useState(false);
  const [account, setAccount] = useState(null);
  const [loadedAccount, setLoadedAccount] = useState(false);

  const getCreations = async () => {
    setLoadingCreations(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/creations`,
      {
        next: { revalidate: 5 },
      }
    );
    const data = await res.json();
    setCreations(data);
    setLoadingCreations(false);
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
    getCreations();
  }, []);

  return (
    <>
      <AppBar />
      <div className="container mx-auto px-2 lg:px-12 lg:max-w-7xl mt-20 lg:mt-24 ">
        <div className="lg:my-12 lg:mx-6 border py-10 lg:p-12 rounded-2xl bg-gradient-to-tl from-amber-200 via-pink-500 to-indigo-600 text-white ">
          <div className="flex flex-col md:flex-row">
            <div className="w-full mx-8 md:w-1/2 md:mx-20 text-left">
              <h1 className="text-3xl  lg:text-6xl font-black mb-4 ">
                DrawDash
              </h1>

              <p className="text-xs lg:text-lg mb-4 lg:mb-8 font-medium tracking-tight">
                Sketch Your Way to Victory. Given a prompt, your task is to
                sketch an image as close as possible to the hidden generated
                image within a given time. Play, mint NFTs and earn rewards.
              </p>

              <div className="flex space-x-4">
                <Link href="/play">
                  <Button className="px-16">Start Playing </Button>
                </Link>
                <div className="hidden lg:flex">
                  <Link href="/play">
                    <Button variant="outline" className="px-16 text-black">
                      Start Earning{" "}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 lg:my-10 lg:mx-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-4 ">
            <Card className="bg-gradient-to-br from-purple-600 to-blue-400 text-white p-4 rounded-2xl">
              <CardHeader>
                <CardTitle>Play and Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="hidden sm:block ">
                  Show off your drawing skills by competing against others. Earn
                  points and rewards based on how close your sketch is to the
                  generated image
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/vault">
                  <Button variant={"outline"} className="text-black">
                    Start Earning
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-200 to-amber-400  p-4 rounded-2xl">
              <CardHeader>
                <CardTitle>NFT Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="hidden sm:block ">
                  Turn your best sketches into NFTs and sell them on our
                  marketplace. Discover and collect unique artworks from other
                  players.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/creations">
                  <Button className="">Enter Marketplace</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="lg:mx-8">
          <h2 className="text-2xl font-bold mb-4">
            Creations from the Community
          </h2>
          <div className="grid grid-cols-10 gap-2 p-4">
            {creations &&
              creations.map((creation: any) => (
                <div className="col-span-5 lg:col-span-2" key={creation._id}>
                  <CreationCard creation={creation} account={account} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>

  );
};

export default Home;
