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
import { useFavoriteDogsStore } from "@/lib/store";
import { Dog } from "@/types/dog";
import Image from "next/image";
import React from "react";
import FavoriteHeartIcon from "./favorite-heart-icon";

export interface DogDetailsProps {
  dog: Dog;
}

const DogDetails: React.FC<DogDetailsProps> = ({ dog }) => {
  const [open, setOpen] = React.useState(false);
  const isFavoriteDog = useFavoriteDogsStore((state) => state.isFavoriteDog);
  const addFavoriteDog = useFavoriteDogsStore((state) => state.addFavoriteDog);
  const removeFavoriteDog = useFavoriteDogsStore(
    (state) => state.removeFavoriteDog
  );

  const handleFavoriteClick = () => {
    if (isFavoriteDog(dog.id)) {
      removeFavoriteDog(dog.id);
    } else {
      addFavoriteDog(dog.id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row gap-8 relative">
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
        <div className="flex-grow">
          <CardTitle>{dog.name}</CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <span>{dog.breed}</span>
            <Separator />
            <span className="text-xs text-muted-foreground">
              Age: {dog.age} | {`${dog.location?.city}, ${dog.location?.state}`}{" "}
              | Zip: {dog.zip_code}
            </span>
          </CardDescription>
        </div>
        <div className="absolute top-2 right-2">
          <FavoriteHeartIcon
            dogId={dog.id}
            initialLiked={isFavoriteDog(dog.id)}
            onFavoriteChange={handleFavoriteClick}
          />
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
