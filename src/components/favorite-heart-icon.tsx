"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface FavoriteHeartIconProps {
  dogId: string;
  initialLiked?: boolean;
  onFavoriteChange?: (dogId: string, liked: boolean) => void;
}

const FavoriteHeartIcon: React.FC<FavoriteHeartIconProps> = ({
  dogId,
  initialLiked = false,
  onFavoriteChange,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setLiked(initialLiked); // Update liked state when initialLiked prop changes
  }, [initialLiked]);

  const handleClick = () => {
    setAnimating(true); // Start animation
    setLiked(!liked); // Toggle liked state

    // Optional callback to notify parent component of like change
    onFavoriteChange?.(dogId, !liked);
  };

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false); // Reset animation after a short delay
      }, 300); // Adjust delay to match animation duration
      return () => clearTimeout(timer);
    }
  }, [animating]);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={handleClick}
      className="relative p-1 rounded-full focus:outline-none transition-colors w-10 h-10"
      aria-label={liked ? "Unlike dog" : "Like dog"}
    >
      <Heart
        fill={liked ? "red" : "none"}
        stroke="black"
        strokeWidth={1.5}
        className={`w-9 h-9 transition-all duration-300 ${
          liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-black"
        } ${animating ? (liked ? "animate-like" : "animate-unlike") : ""}`}
      />
    </Button>
  );
};

export default FavoriteHeartIcon;
