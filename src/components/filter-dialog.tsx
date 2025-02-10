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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SearchFilterData,
  searchFilterSchema,
} from "@/schemas/search-filter.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BreedsCombo from "./breeds-combo";

export type FilterDialogProps = {
  breeds: string[];
};

export default function FilterDialog({ breeds }: FilterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Filter Your Search</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Apply filters to narrow your search for your new furry companion!
          </DialogDescription>
        </DialogHeader>

        <BreedsCombo breeds={breeds} />

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" className="col-span-3" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
