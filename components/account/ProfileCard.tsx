"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import axios from "axios";

export default function ProfileCard({ account }: { account: any }) {
  const [userName, setUsername] = useState(account.name);
  const [userPicture, setUserPicture] = useState(account.picture);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoadingImage(true);
    if (event.target.files) {
      const data = new FormData();
      data.append("file", event.target.files[0]);
      data.append("upload_preset", "studio-upload");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/arttribute/upload",
        data
      );
      setUserPicture(res.data.secure_url);
      setLoadingImage(false);
    }
  }

  async function saveDetails() {
    setLoading(true);
    const detailsToUpdate = {
      name: userName,
      picture: userPicture,
    };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/user`,
      {
        detailsToUpdate,
      },
      { params: { id: account._id } }
    );
    const userDetails = res.data;
    localStorage.setItem("user", JSON.stringify(userDetails));
    setLoading(false);
    router.push("/profile");
  }
  return (
    <>
      <label htmlFor="user-image">
        {loadingImage ? (
          <div className="w-[200px] h-[200px] bg-gray-50 rounded-full flex flex-col items-center justify-center m-1 mt-4">
            <LoaderCircle className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Image
            src={userPicture}
            width={200}
            height={200}
            alt={"game"}
            className="aspect-[1] rounded-full  m-1 mt-4"
          />
        )}
      </label>
      <input
        id="user-image"
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center mt-4">
        <Input
          placeholder="User name"
          className="w-72"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        {loading ? (
          <Button disabled className="mt-2 w-72">
            <LoaderCircle className="animate-spin text-gray-500" />
          </Button>
        ) : (
          <Button onClick={saveDetails} className="mt-2 w-72">
            Save details
          </Button>
        )}

        <Link href="/play">
          <Button variant="ghost" className="mt-2 w-72">
            Play game
            <SquareArrowOutUpRight className="w-4 h-4 ml-0.5" />
          </Button>
        </Link>
      </div>
    </>
  );
}
