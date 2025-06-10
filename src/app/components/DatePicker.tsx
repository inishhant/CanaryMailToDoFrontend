"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export function DatePicker({
  title,
  placeholder,
  value,
  onChange,
  disabled = false,
}: {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}) {
  const [selected, setSelected] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [open, setOpen] = React.useState(false);

  //   React.useEffect(() => {
  //     if (selected) {
  //       const formatted = format(selected, "yyyy-mm-dd");
  //       onChange(formatted);
  //     }
  //   }, [selected]);

  return (
    <div className="flex flex-col gap-3">
      {title && <Label className="px-1">{title}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="font-normal justify-between w-full text-left"
          >
            {selected ? format(selected, "PPP") : placeholder || "Select date"}
            <ChevronDownIcon className="justify-end ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            captionLayout="dropdown"
            onSelect={(date) => {
              const d = date ? new Date(date) : undefined;
              if (d) {
                const isoString = format(d, "yyyy-MM-dd"); // 👈 "2025-06-14"
                onChange(isoString); // call prop if needed
              }
              setSelected(d);
              setOpen(false);
            }}
            className="w-full"
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
