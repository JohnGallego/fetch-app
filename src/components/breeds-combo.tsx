"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

export type BreedsComboProps = {
  breeds: string[];
};

export default function BreedsCombo({ breeds }: BreedsComboProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>(breeds);

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = (event.target as HTMLInputElement).value;
    setSearchValue(searchValue);
  };

  const handleSelectAll = () => {
    setSelectedBreeds(breeds);
  };

  const handleRemoveAll = () => {
    setSelectedBreeds([]);
  };

  const handleToggle = (breed: string) => {
    console.log(breed);
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds((prev) => prev.filter((b) => b !== breed));
    } else {
      setSelectedBreeds((prev) => [...prev, breed]);
    }
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="breed">Breeds</Label>

      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="col-span-2 flex justify-between">
            Select breeds...{" "}
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
                    checked={selectedBreeds.includes(breed)}
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
