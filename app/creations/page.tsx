"use client";
import Link from "next/link";
import AppBar from "@/components/layout/AppBar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequireAuthPlaceholder from "@/components/account/RequireAuthPlaceHolder";
import { LoaderCircle } from "lucide-react";

import CreationCard from "@/components/nft/CreationCard";

export default function Games() {
  const [creations, setCreations] = useState([]);
  const [myCreations, setMyCreations] = useState([]);
  const [listedCreations, setListedCreations] = useState([]);
  const [account, setAccount] = useState(null);
  const [loadinigCreations, setLoadingCreations] = useState(false);
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (user) {
      const myCreations = data.filter(
        (creation: any) => creation.owner?._id === user._id
      );
      setMyCreations(myCreations);
      console.log("myCreations", myCreations);
    }

    const listedCreations = data.filter(
      (creation: any) => creation.listed === true
    );
    setListedCreations(listedCreations);

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
    <div>
      <AppBar />
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <Tabs defaultValue="all-creations">
          <div className="flex flex-col items-center justify-center ">
            <TabsList className="grid  grid-cols-3  mb-2">
              <TabsTrigger value="all-creations" className="font-semibold">
                All creations
              </TabsTrigger>
              <TabsTrigger value="for-sale" className="font-semibold">
                Creations for Sale
              </TabsTrigger>
              <TabsTrigger value="my-creations" className="font-semibold">
                My creations
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all-creations">
            <div className="grid grid-cols-12 gap-2 p-4">
              {loadinigCreations && (
                <div className="col-span-12 flex flex-col items-center justify-center mt-6">
                  <LoaderCircle size={32} className="animate-spin" />
                </div>
              )}
              {creations &&
                creations.map((creation: any) => (
                  <div className="col-span-6 lg:col-span-3" key={creation._id}>
                    <CreationCard creation={creation} account={account} />
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="for-sale">
            <div className="grid grid-cols-12 gap-2 p-4">
              {loadinigCreations && (
                <div className="col-span-12 flex flex-col items-center justify-center mt-6">
                  <LoaderCircle size={32} className="animate-spin" />
                </div>
              )}
              {listedCreations &&
                listedCreations.map((creation: any) => (
                  <div className="col-span-6 lg:col-span-3" key={creation._id}>
                    <CreationCard creation={creation} account={account} />
                  </div>
                ))}

              {listedCreations.length === 0 && (
                <div className="col-span-12 text-center mt-6">
                  <div className="text-2xl font-semibold text-gray-500">
                    No creations for sale...
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="my-creations">
            <div className="grid grid-cols-12 gap-2">
              {myCreations.length > 0 && (
                <div className="col-span-12 text-center mt-6">
                  <Link href="/create">
                    <Button className="ml-2 mb-2 px-8">New Creation</Button>
                  </Link>
                </div>
              )}

              {loadinigCreations && (
                <div className="col-span-12 flex flex-col items-center justify-center mt-6">
                  <LoaderCircle size={32} className="animate-spin" />
                </div>
              )}

              {myCreations &&
                myCreations.map((creation: any) => (
                  <div className="col-span-6 lg:col-span-3" key={creation._id}>
                    <CreationCard creation={creation} account={account} />
                  </div>
                ))}

              {myCreations.length === 0 && account && (
                <div className="col-span-12 text-center mt-6">
                  <div className="text-2xl font-semibold text-gray-500">
                    No creations ...
                  </div>
                  <div className="text-medium font-normal mt-2 text-gray-500">
                    Play game and create your own
                  </div>
                  <div className="mt-6">
                    <Link href="/create">
                      <Button className="ml-2 px-8">Play and create</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {!account && loadedAccount && <RequireAuthPlaceholder />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
