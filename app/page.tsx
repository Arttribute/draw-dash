"use client";
import Image from "next/image";

import AccountMenu from "@/components/account/AccountMenu";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const res = await fetch("/api/compare", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
}

export default function Home() {
  return (
    <div>
      Hello world
      <AccountMenu />
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" name="query_image" />
        <input type="file" accept="image/*" name="ans_image" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
