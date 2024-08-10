import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Label } from "@/components/ui/label";

export default function CreationCard({ creation }: { creation: any }) {
  return (
    <>
      <Card>
        <Image
          src={creation.enhanced_image || creation.drawing_url}
          width={180}
          height={180}
          alt={"game"}
          className="aspect-[1] rounded-md m-1 lg:m-2"
        />

        <div className="flex  m-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={creation.owner?.picture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-2 mt-1">
            <Label className="font-semibold">{creation.name}</Label>
            <Label className="text-xs text-gray-500">
              {" "}
              by {creation.owner?.name}
            </Label>
          </div>
        </div>
      </Card>
    </>
  );
}
