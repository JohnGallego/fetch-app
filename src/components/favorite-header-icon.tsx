"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFavoriteDogsStore } from "@/lib/store";
import { Heart } from "lucide-react";
import { useState } from "react";
import FavoriteDogsDialogContent from "./favorite-dogs-dialog-content";

const FavoriteHeaderIcon = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const favoriteDogIds = useFavoriteDogsStore((state) => state.favoriteDogIds);
  const favoriteCount = favoriteDogIds.length;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="p-1 rounded-full focus:outline-none transition-colors"
          aria-label="View favorites"
        >
          <Heart
            fill={favoriteCount > 0 ? "red" : "none"}
            stroke={favoriteCount > 0 ? "red" : "currentColor"}
            strokeWidth={1.5}
            className="w-6 h-6"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Favorite Friends</DialogTitle>
          <DialogDescription>
            Here are all of your paw-some pals!
          </DialogDescription>
        </DialogHeader>
        <FavoriteDogsDialogContent
          onCloseDialog={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FavoriteHeaderIcon;
