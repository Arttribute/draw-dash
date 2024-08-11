"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import { User } from "@/models/User";
import { Coins } from "lucide-react";
import { useMinipay } from "../providers/MinipayProvider";
import MinipayButton from "./MinipayButton";

export default function AccountMenu() {
  const [account, setAccount] = useState<User | null>(null);
  const { minipay } = useMinipay();

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
  }, []);

  return (
    <>
      <Menubar className="rounded-none border-none px-2 lg:px-4">
        {account ? (
          <>
            <MenubarMenu>
              <MenubarTrigger className="flex p-1 border border-purple-600 rounded-full ">
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={account?.picture}
                    alt={account?.name}
                    width={28}
                    height={28}
                    className="aspect-[1]"
                  />
                </div>
                <div className="block ml-2 mr-4 overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex">
                    <div className="flex text-sm font-semibold">
                      {account?.name}
                    </div>
                  </div>
                </div>
              </MenubarTrigger>
              <MenubarContent forceMount>
                <MenubarLabel inset>
                  <Link href="/profile" passHref>
                    {account.name}
                  </Link>
                </MenubarLabel>
                <MenubarSeparator />
                <MenubarItem inset>
                  <Link href="/profile" passHref>
                    <p>Profile</p>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  <Link href="/buy" passHref className="flex">
                    <div className="mt-0.5 mr-2">
                      {" "}
                      <Coins className="w-4 h-4" />
                    </div>
                    {account.credits}
                    <div className="ml-2">
                      {" "}
                      <Link href="/buy" passHref className="font-semibold">
                        Get more
                      </Link>
                    </div>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  {minipay ? (
                    <div className="w-full">
                      <MinipayButton balance={minipay.balance} />
                    </div>
                  ) : (
                    <div className="w-full">
                      <ConnectButton
                        action="Disconnect"
                        setAccount={setAccount}
                      />
                    </div>
                  )}
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </>
        ) : (
          <ConnectButton
            action="Connect account"
            setAccount={setAccount}
            buttonVariant="outline"
          />
        )}
      </Menubar>
    </>
  );
}
