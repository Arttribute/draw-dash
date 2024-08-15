"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMagicContext } from "@/components/providers/MagicProvider";
import { useMinipay } from "@/components/providers/MinipayProvider";
import { User } from "@/models/User";
import axios from "axios";

interface Props {
  action: "Connect account" | "Disconnect";
  buttonVariant?: "ghost" | "outline" | "default";
  setAccount: React.Dispatch<React.SetStateAction<User | null>>;
}

const ConnectButton = ({ action, setAccount, buttonVariant }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const { magic } = useMagicContext();
  const { minipay } = useMinipay();

  const postConnect = async (account: string, email?: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          web3Address: account,
          email,
        }
      );

      if (res.status === 200 || res.status === 201) {
        console.log("Connected to server");
        return res.data;
      } else {
        throw new Error(`${res.statusText}: ${res.data}`);
      }
    } catch (error: any) {
      console.error(error);
      if (typeof error === "string") return error;
      return error.toString();
    }
  };

  const connect = useCallback(async () => {
    try {
      setDisabled(true);

      if (minipay) {
        console.log("Minipay", minipay);
        const data = await postConnect(minipay.address);
        const userdata = {
          ...data,
          thirdpartyWallet: false,
        };

        localStorage.setItem("user", JSON.stringify(userdata));
        setAccount(data);
      } else {
        if (!magic) throw new Error("Magic not connected");
        console.log("Magic", magic);
        const accounts = await magic.wallet.connectWithUI();

        const userInfo = await magic.user.getInfo();
        console.log("User Info", userInfo);
        const email = userInfo.email || accounts[0]; //If the user does not have an email, we will use the account as the email
        console.log("Email", email);
        console.log("Accounts", accounts[0]);

        const data = await postConnect(accounts[0], email);
        const userdata = {
          ...data,
          thirdpartyWallet: email === accounts[0], //Since we are using magic to get the email, we can assume that the user is using a third party wallet if the email is the same as the account
        };

        console.log("User Data", userdata);

        localStorage.setItem("user", JSON.stringify(userdata));
        setAccount(data);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  }, [magic, minipay, setAccount]);

  const disconnect = useCallback(async () => {
    if (!magic) return;
    try {
      setDisabled(true);
      await magic.user.logout();
      localStorage.removeItem("user");
      setDisabled(false);
      setAccount(null);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  }, [magic, setAccount]);

  return (
    <Button
      variant={buttonVariant || "ghost"}
      size="sm"
      disabled={disabled}
      onClick={action == "Connect account" ? connect : disconnect}
      className="rounded-lg px-8 font-semibold"
    >
      <p
        className={
          action == "Connect account"
            ? "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
            : "font-medium"
        }
      >
        {disabled ? (
          <Loader2 className="mx-auto h-4 w-4 animate-spin text-indigo-700" />
        ) : (
          action
        )}
      </p>
    </Button>
  );
};

export default ConnectButton;
