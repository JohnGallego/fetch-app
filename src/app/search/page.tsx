import FilterDialog from "@/components/filter-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { fetchAPI } from "@/utils/api";

export default async function SearchPage() {
  const breeds = await fetchAPI<string[]>(API_ENDPOINTS.BREEDS);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Mobile filter button */}
        <div className="md:hidden">
          <FilterDialog breeds={breeds} />
        </div>

        {/* Tablet/Desktop filters */}
        <div className="hidden md:flex gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" type="text" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" className="col-span-3" />
          </div>
          {/* More filters can be added here */}
        </div>
      </div>

      {/* Search results and pagination will go below */}
    </div>
  );
}
