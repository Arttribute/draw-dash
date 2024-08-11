"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./card";
import { Button } from "./button";

type CustomCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
  className?: string;
  buttonVariant?: string;
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  buttonLabel,
  className,
  buttonVariant,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="hidden sm:block ">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant={buttonVariant}
          className={buttonVariant === "outline" ? "text-black" : "px-8"}
        >
          {buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default CustomCard;
