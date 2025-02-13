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
import {
  dispatchFavoriteUpdatedEvent,
  subscribeToFavoriteUpdates,
} from "@/lib/favorite-event-bus";
import {
  addFavoriteDogId,
  isDogIdFavorite,
  removeFavoriteDogId,
} from "@/lib/local-storage-favorites";
import { Dog } from "@/types/dog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteHeartIcon from "./favorite-heart-icon";

export interface DogDetailsProps {
  dog: Dog;
  onFavoriteChange?: (dogId: string, liked: boolean) => void;
}

const DogDetails: React.FC<DogDetailsProps> = ({ dog, onFavoriteChange }) => {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isDogIdFavorite(dog.id)); // Initial check on mount

    const unsubscribe = subscribeToFavoriteUpdates(() => {
      // Subscribe to favorite updates
      setIsFavorite(isDogIdFavorite(dog.id)); // Re-check favorite status when event is dispatched
    });

    return () => {
      unsubscribe(); // Unsubscribe on unmount
    };
  }, [dog.id]);

  const handleFavoriteChangeInternal = (dogId: string, liked: boolean) => {
    if (liked) {
      addFavoriteDogId(dogId);
    } else {
      removeFavoriteDogId(dogId);
    }
    setIsFavorite(liked);
    dispatchFavoriteUpdatedEvent();
    onFavoriteChange?.(dogId, liked);
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
            initialLiked={isFavorite}
            onFavoriteChange={handleFavoriteChangeInternal}
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
