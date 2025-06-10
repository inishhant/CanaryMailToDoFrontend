import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Dropdown({
  className,
  placeholder,
  label,
  itemArray,
  onChange,
  defaultValue
}: {
  placeholder?: string;
  className?: string;
  label?: string;
  defaultValue?: string;
  itemArray: { title: string; value: string; key: string }[];
  onChange: (val: string) => void;
}) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className={className ?? "w-[180px]"}>
        <SelectValue placeholder={placeholder || "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {itemArray.map((item) => (
            <SelectItem key={item.key} value={item.value}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
