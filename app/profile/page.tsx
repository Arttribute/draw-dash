"use client";
import AppBar from "@/components/layout/AppBar";
import { useState, useEffect } from "react";

import ProfileCard from "@/components/account/ProfileCard";

export default function Games() {
  const [account, setAccount] = useState(null);
  const [loadedAccount, setLoadedAccount] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
  }, []);

  return (
    <div>
      <AppBar />
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <div className="text-xl font-semibold mt-2 mb-6 text">My profile</div>

        {account && <ProfileCard account={account} />}
      </div>
    </div>
  );
}
