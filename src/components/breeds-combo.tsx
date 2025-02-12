"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

export type BreedsComboProps = {
  availableBreeds: string[];
  selectedBreeds: string[];
  onBreedsChange: (breeds: string[]) => void;
};

export default function BreedsCombo({
  availableBreeds,
  selectedBreeds: initialSelectedBreeds,
  onBreedsChange,
}: BreedsComboProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [currentSelectedBreeds, setCurrentSelectedBreeds] = React.useState<
    string[]
  >(initialSelectedBreeds);

  const filteredBreeds = availableBreeds.filter((breed) =>
    breed.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = (event.target as HTMLInputElement).value;
    setSearchValue(searchValue);
  };

  const handleSelectAll = () => {
    setCurrentSelectedBreeds(availableBreeds);
    onBreedsChange(availableBreeds);
  };

  const handleRemoveAll = () => {
    setCurrentSelectedBreeds([]);
    onBreedsChange([]);
  };

  const handleToggle = (breed: string) => {
    const updatedBreeds = currentSelectedBreeds.includes(breed)
      ? currentSelectedBreeds.filter((b) => b !== breed)
      : [...currentSelectedBreeds, breed];

    setCurrentSelectedBreeds(updatedBreeds);

    onBreedsChange(updatedBreeds);
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="col-span-4 flex justify-between">
            Select breeds...
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-4 flex flex-col gap-2">
          <Input
            type="text"
            id="breed-search"
            placeholder="Search..."
            onChange={handleSearchChange}
          />

          <div className="flex justify-around">
            <Button variant="link" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="link" onClick={handleRemoveAll}>
              Remove All
            </Button>
          </div>

          <ScrollArea
            type="hover"
            className="h-[200px] w-full rounded-md border p-2"
          >
            <div className="flex flex-col gap-2">
              {filteredBreeds.map((breed, index) => (
                <div key={index} className="flex items-center space-x-2 ">
                  <Checkbox
                    id={`breed-${index}`}
                    onClick={() => handleToggle(breed)}
                    checked={currentSelectedBreeds.includes(breed)}
                  />
                  <label htmlFor={`breed-${index}`} className="cursor-pointer">
                    {breed}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
