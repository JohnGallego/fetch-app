"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchSortData } from "@/schemas/search-sort.schema";
import { DogSearchParams } from "@/types/dog";
import React from "react";
import SortForm from "./sort-form";

interface SortDialogProps {
  filters: DogSearchParams;
  onSubmit: (values: SearchSortData) => void;
}

export default function SortDialog({
  filters,
  onSubmit: handleDialogSubmit,
}: SortDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (values: SearchSortData) => {
    handleDialogSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sort Results</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort Results</DialogTitle>
        </DialogHeader>

        <SortForm
          id="sort-form-mobile"
          filters={filters}
          onSubmit={handleSubmit}
        />

        <div className="flex gap-5 self-end mt-4">
          <DialogClose asChild>
            <Button type="submit" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button type="submit" variant="outline" form="sort-form-mobile">
            Update Sort
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
