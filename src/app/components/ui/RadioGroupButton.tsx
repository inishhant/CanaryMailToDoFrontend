import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function RadioGroupButton({
  defaultValue,
  groupItems,
  orientation = "horizontal",
  onChange,
}: {
  defaultValue: string;
  groupItems: { value: string; id: undefined | string; title: string }[];
  orientation?: "horizontal" | "vertical";
  onChange: (value: string) => void;
}) {
  return (
    <RadioGroup
      value={defaultValue}
      className={cn(
        "gap-2",
        orientation === "vertical" ? "flex flex-col" : "flex flex-row"
      )}
      onValueChange={(val) => onChange?.(val)}
    >
      {groupItems.map((item) => (
        <div key={item.id || item.value} className="flex items-center gap-2">
          <RadioGroupItem value={item.value} id={item.id} />
          <Label htmlFor={item.id}>{item.title}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
