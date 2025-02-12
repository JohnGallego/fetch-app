"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Dog } from "@/types/dog";
import Image from "next/image";
import React from "react";

interface DogDetailsProps {
  dog: Dog;
}

const DogDetails: React.FC<DogDetailsProps> = ({ dog }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row gap-8">
        <div
          onClick={() => setOpen(true)}
          className="background-gray-100 w-32 -ml-6 -my-6 overflow-hidden relative rounded-l-xl cursor-pointer"
        >
          <Image
            src={dog.img}
            alt={`Image of ${dog.name}`}
            fill={true}
            className="object-cover"
          />
        </div>

        <div>
          <CardTitle>{dog.name}</CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <span>{dog.breed}</span>
            <Separator />
            <span className="text-xs text-muted-foreground">
              Age: {dog.age} | Zip: {dog.zip_code}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dog.name}</DialogTitle>
            <DialogDescription>{dog.breed}</DialogDescription>
          </DialogHeader>

          <div className="overflow-hidden relative w-full h-[400px] rounded-xl">
            <Image
              src={dog.img}
              alt={`Image of ${dog.name}`}
              fill={true}
              className="object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DogDetails;
