"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchFilterData } from "@/schemas/search-filter.schema";
import { DogSearchParams } from "@/types/dog";
import React from "react";
import FilterForm from "./filter-form";

interface FilterDialogProps {
  filters: DogSearchParams;
  onSubmit: (values: SearchFilterData) => void;
}

export default function FilterDialog({
  filters,
  onSubmit: handleDialogSubmit,
}: FilterDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (values: SearchFilterData) => {
    handleDialogSubmit(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Filters</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Apply filters to narrow your search for your new furry companion!
          </DialogDescription>
        </DialogHeader>

        <FilterForm
          id="filter-form"
          filters={filters}
          onSubmit={handleSubmit}
        />

        <div className="flex gap-5 self-end mt-4">
          <DialogClose asChild>
            <Button type="submit" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button type="submit" variant="outline" form="filter-form">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
