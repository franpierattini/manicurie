"use client";
import { SendHorizonal } from "lucide-react";
import { Input } from "../input";
import { useState } from "react";
import { useManicuristaFilters } from "@/hooks/applyFilters";

export const SearchBar = ({ name }: { name?: string }) => {
  const [search, setSearch] = useState("");
  const { applyFilters } = useManicuristaFilters();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (search.trim()) {
      applyFilters({ name: search.trim() });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative  flex w-fit items-center justify-items-center text-sm"
    >
      <label className="w-full">
        <span className="sr-only">search</span>
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder="Search..."
          autoComplete="on"
          required
          defaultValue={name}
          className="text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
        />
      </label>
      <div className="absolute inset-y-0 right-0">
        <button
          type="submit"
          className="inline-flex aspect-square w-10 items-center justify-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80"
        >
          <span className="sr-only">search</span>
          <SendHorizonal aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
