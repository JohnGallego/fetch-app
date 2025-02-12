"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getFavoriteDogIds,
  removeFavoriteDogId,
} from "@/lib/local-storage-favorites";
import { queryFavoriteDogs } from "@/lib/queries";
import { Dog } from "@/types/dog";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import DogDetails from "./dog-details";

interface FavoriteDogsDialogContentProps {
  onCloseDialog: () => void;
}

const FavoriteDogsDialogContent: React.FC<FavoriteDogsDialogContentProps> = ({
  onCloseDialog,
}) => {
  const favoriteDogIds = getFavoriteDogIds();

  const { isPending, isError, error, data, refetch } = useQuery(
    queryFavoriteDogs(favoriteDogIds)
  );

  const handleFavoriteChangeInDialog = useCallback(
    (dogId: string, liked: boolean) => {
      if (!liked) {
        // If unliked from dialog, remove from dialog list
        removeFavoriteDogId(dogId);
        refetch(); // Refresh the query to update the list in the dialog
      }
    },
    [refetch]
  );

  if (isPending && favoriteDogIds.length > 0) {
    // Show loading only if there are favIds to fetch
    return <div>Loading favorites...</div>;
  }

  if (isError && favoriteDogIds.length > 0) {
    return <div>Error fetching favorite dogs: {error?.message}</div>;
  }

  const favoriteDogs: Dog[] = data?.data || [];

  if (favoriteDogs.length === 0 && favoriteDogIds.length > 0) {
    return <div>Loading favorites...</div>;
  }

  if (favoriteDogs.length === 0 && favoriteDogIds.length === 0) {
    return <div>No favorite friends yet!</div>;
  }

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="flex flex-col gap-4 p-4">
        {favoriteDogs.map((dog) => (
          <DogDetails
            key={dog.id}
            dog={dog}
            onFavoriteChange={handleFavoriteChangeInDialog}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default FavoriteDogsDialogContent;
