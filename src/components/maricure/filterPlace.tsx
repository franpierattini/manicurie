"use client";

import { useEffect, useState } from "react";
import { Input } from "../input";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { place } from "@/types/places";
import { useManicuristaFilters } from "../../hooks/applyFilters";

interface Props {
  displayName?: string;
}

export function FilterPlace({ displayName }: Props) {
  const [search, setSearch] = useState(displayName ?? "");
  const [results, setResults] = useState<place[]>([]);
  const [open, setOpen] = useState(false);
  const { applyFilters } = useManicuristaFilters();
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.length < 3) return;
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          search
        )}&format=json`
      )
        .then((res) => res.json())
        .then((data) => setResults(data))
        .then(() => setOpen(true));
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex flex-col gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            id="ubicacion"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ubicación"
            className="input"
            name="ubicacion"
          />
        </PopoverTrigger>

        {results.length > 0 && (
          <PopoverContent className="w-[350px] p-0">
            <Command>
              <CommandList>
                {results.length === 0 && (
                  <CommandEmpty>Ubicación no encontrada</CommandEmpty>
                )}
                {results.slice(0, 5).map((place) => (
                  <CommandItem
                    key={place.place_id}
                    value={place.display_name}
                    onSelect={() => {
                      applyFilters({ ubicacion: place.display_name });
                    }}
                  >
                    {place.display_name}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
