import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
};

export function SearchInput({ placeholder }: Props) {
  return (
    <div className=" rounded-lg flex justify-between items-center">
      <Input
        type="text"
        placeholder={placeholder || "search"}
        className="border-none w-full md:w-64 lg:w-80"
      />
      <Button variant="ghost" size="icon">
        <Search />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
