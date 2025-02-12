"use client";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getFavoriteDogIds,
  removeFavoriteDogId,
} from "@/lib/local-storage-favorites";
import { queryFavoriteDogs, queryMatchDog } from "@/lib/queries";
import { Dog } from "@/types/dog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image"; // Import Image for matched dog card
import React, { useCallback, useState } from "react";
import DogDetails from "./dog-details";

interface FavoriteDogsDialogContentProps {
  onCloseDialog: () => void;
}

// Enum to manage display state
enum DisplayState {
  FAVORITES_LIST,
  MATCH_RESULT,
}

const FavoriteDogsDialogContent: React.FC<FavoriteDogsDialogContentProps> = ({
  onCloseDialog,
}) => {
  const favoriteDogIds = getFavoriteDogIds();
  const queryKey = queryFavoriteDogs(favoriteDogIds);
  const { isPending, isError, error, data, refetch } = useQuery(queryKey);
  const queryClient = useQueryClient(); // Get queryClient

  const [displayState, setDisplayState] = useState<DisplayState>(
    DisplayState.FAVORITES_LIST
  ); // State for display
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const hasFavorites = favoriteDogIds.length > 0;

  const handleFavoriteChangeInDialog = useCallback(
    (dogId: string, liked: boolean) => {
      if (!liked) {
        removeFavoriteDogId(dogId);
        refetch();
      }
    },
    [refetch]
  );

  const handleFindMatch = async () => {
    if (!hasFavorites) return;

    try {
      const matchQueryKey = queryMatchDog(favoriteDogIds);

      if (matchQueryKey) {
        const matchData = await queryClient.fetchQuery(matchQueryKey);

        if (matchData?.data?.length > 0) {
          setMatchedDog(matchData.data[0]);
          setDisplayState(DisplayState.MATCH_RESULT); // Set state to show match
        } else {
          alert("No match found, please try again later.");
        }
      } else {
        console.error(
          "queryMatchDog might have failed to return a valid queryKey."
        );
        alert("Error finding match. Please try again.");
        return;
      }
    } catch (matchError) {
      console.error("Error fetching dog match:", matchError);
      alert("Failed to find a match. Please try again.");
    }
  };

  const handleBackToFavorites = () => {
    setDisplayState(DisplayState.FAVORITES_LIST); // Go back to favorites list
    setMatchedDog(null); // Clear matched dog data
  };

  if (
    isPending &&
    favoriteDogIds.length > 0 &&
    displayState === DisplayState.FAVORITES_LIST
  ) {
    return <div>Loading favorites...</div>;
  }

  if (
    isError &&
    favoriteDogIds.length > 0 &&
    displayState === DisplayState.FAVORITES_LIST
  ) {
    return <div>Error fetching favorite dogs: {error?.message}</div>;
  }

  const favoriteDogs: Dog[] = data?.data || [];

  if (
    favoriteDogs.length === 0 &&
    favoriteDogIds.length === 0 &&
    displayState === DisplayState.FAVORITES_LIST
  ) {
    return <div>No favorite friends yet!</div>;
  }

  return (
    <>
      <DialogHeader className="justify-between">
        <DialogTitle>
          {displayState === DisplayState.FAVORITES_LIST
            ? "Favorite Friends"
            : "Paw-fect Match Found!"}{" "}
          {/* Conditional Dialog Title */}
        </DialogTitle>
        <DialogDescription>
          {displayState === DisplayState.FAVORITES_LIST
            ? "Here are all of your paw-some pals!"
            : "We think you'll love this furry friend."}{" "}
          {/* Conditional Dialog Description */}
        </DialogDescription>
        {displayState === DisplayState.FAVORITES_LIST && ( // Conditionally render Find a Match button only in favorites list view
          <Button
            variant="outline"
            size="sm"
            onClick={handleFindMatch}
            disabled={!hasFavorites}
          >
            Find a Match
          </Button>
        )}
        {displayState === DisplayState.MATCH_RESULT && ( // Conditionally render Back button in match result view
          <Button variant="outline" size="sm" onClick={handleBackToFavorites}>
            Back to Favorites
          </Button>
        )}
      </DialogHeader>

      {displayState === DisplayState.FAVORITES_LIST && ( // Conditionally render favorites list
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
      )}

      {displayState === DisplayState.MATCH_RESULT &&
        matchedDog && ( // Conditionally render match result card
          <div className="relative w-full aspect-square rounded-md overflow-hidden mt-4">
            <Image
              src={matchedDog.img}
              alt={`Match - ${matchedDog.name}`}
              fill
              className="object-cover animate-heart-float-static animate-heart-float-duration-2s"
            />
            <div className="absolute bottom-0 right-0 p-4 bg-gradient-to-tr from-black/80 to-black/50 text-right text-white">
              <h3 className="text-xl font-bold">{matchedDog.name}</h3>
              <p className="text-sm">{matchedDog.breed}</p>
              <p className="text-sm">
                Age: {matchedDog.age} | Zip: {matchedDog.zip_code}
              </p>
            </div>
            {/* Heart Animation Layers */}
            <i className="absolute bottom-0 left-4 animate-heart-float animate-heart-float-delay-0_5s animate-heart-float-duration-2_5s"></i>
            <i className="absolute bottom-0 right-12 animate-heart-float animate-heart-float-delay-1s animate-heart-float-duration-2s"></i>
            <i className="absolute bottom-0 left-20 animate-heart-float animate-heart-float-delay-1_5s animate-heart-float-duration-3s"></i>
            <i className="absolute bottom-0 right-2 animate-heart-float animate-heart-float-duration-2_8s"></i>
          </div>
        )}

      <DialogFooter>
        <Button variant="outline" onClick={onCloseDialog}>
          Close
        </Button>
      </DialogFooter>
    </>
  );
};

export default FavoriteDogsDialogContent;
