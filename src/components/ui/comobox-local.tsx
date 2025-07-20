// src/components/ui/combobox-local.tsx
import { Check, ChevronsUpDown, CircleX, LoaderCircle } from "lucide-react";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { cn } from "@/lib/utils";

interface IComboboxLocal<T> {
  title?: string;
  name: string;
  items: T[];
  placeholder?: string;
  displayKey: keyof T | ((item: T) => string);
  valueKey?: keyof T;
  value: T | null;
  onChange: (val: T | null) => void;
  clearable?: boolean;
  filterFn?: (item: T, search: string) => boolean;
  isLoading?: boolean;
}

function ComboboxLocal<T>(props: IComboboxLocal<T>) {
  const {
    title,
    name,
    items,
    placeholder,
    displayKey,
    valueKey = "id" as keyof T,
    value,
    onChange,
    clearable = true,
    filterFn,
    isLoading = false,
  } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  const filteredItems = React.useMemo(() => {
    if (!search) return items;

    return items.filter((item) => {
      if (filterFn) return filterFn(item, search);

      let displayValue: string;

      if (typeof displayKey === "function") {
        displayValue = displayKey(item);
      } else {
        const raw = item[displayKey];
        displayValue = typeof raw === "string" ? raw : String(raw);
      }
      return String(displayValue || "")
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [items, search, displayKey, filterFn]);

  const handleSelect = React.useCallback(
    (item: T) => {
      onChange(item);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClearInput = React.useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className="space-y-1">
      {title && (
        <label htmlFor={name} className="text-sm font-medium">
          {title}
        </label>
      )}
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "justify-between w-full",
                !value && "text-muted-foreground"
              )}
            >
              <span>
                {typeof displayKey === "function"
                  ? displayKey(value!) // asumimos que value no es null
                  : value?.[displayKey] != null
                  ? String(value[displayKey])
                  : placeholder}
              </span>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="max-h-[50vh] w-full min-w-[10vw] max-w-[var(--radix-popper-anchor-width)] border-input p-0"
            align="start"
          >
            <Command>
              <CommandInput
                placeholder={"search"}
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <>
                    {filteredItems.length === 0 && (
                      <CommandEmpty>{"no.results.found"}</CommandEmpty>
                    )}
                    <CommandGroup>
                      {filteredItems.map((item) => {
                        const val = String(item[valueKey]);
                        let label: string;

                        if (typeof displayKey === "function") {
                          label = displayKey(item);
                        } else {
                          const value = item[displayKey];
                          label = value != null ? String(value) : "";
                        }

                        return (
                          <CommandItem
                            key={val}
                            value={label}
                            onSelect={() => handleSelect(item)}
                          >
                            {label}
                            {value?.[valueKey] === item[valueKey] && (
                              <Check className="ml-auto h-4 w-4" />
                            )}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {clearable && value && (
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CircleX className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export { ComboboxLocal };
