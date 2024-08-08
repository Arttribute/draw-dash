"use client";

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';

type CustomCardProps = {
  title: string;
  description: string;
  buttonLabel: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, buttonLabel}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button >{buttonLabel}</Button>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
