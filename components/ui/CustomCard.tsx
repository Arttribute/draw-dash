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
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  buttonLabel,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="hidden sm:block ">{description}</p>
      </CardContent>
      <CardFooter>
        <Button>{buttonLabel}</Button>
      </CardFooter>
    </Card>
  );
};
export default CustomCard;
