import { Search } from "lucide-react";
import { Input } from "../ui/input";
interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}
const SearchInput = ({ onSearch }: SearchInputProps) => {
  return (
    <div className=" flex gap-x-1 items-center">
      <Search className="h-4 w-4 text-[var(--textpur)]" />
      <Input
        onChange={() => {
          onSearch;
        }}
        className="w-full md:w-[300px] rounded-full"
        placeholder="search for courses..."
      />
    </div>
  );
};

export default SearchInput;
