import { useEffect, useState } from "react";
import { Label } from "../label";
import { Input } from "../input";

import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { place, SelectedPlaceItem } from "@/types/places";

export function UbicacionInput() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<place[]>([]);
  const [selected, setSelected] = useState<SelectedPlaceItem>();
  const [open, setOpen] = useState(false);

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
      <Label htmlFor="ubicacion">Ubicación</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            id="ubicacion"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ubicacion"
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
                      setSelected(place);
                      setSearch(place.display_name);
                      setOpen(false);
                      setResults([]);
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

      {selected && (
        <>
          <input type="hidden" name="latitud" value={selected.lat} />
          <input type="hidden" name="longitud" value={selected.lon} />
          <input type="hidden" name="ubicacion" value={selected.display_name} />
        </>
      )}
    </div>
  );
}
