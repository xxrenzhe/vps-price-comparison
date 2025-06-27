"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValue: string | null;
  onValueChange: (value: string | null) => void;
}

export default function FilterDropdown({
  label,
  options,
  selectedValue,
  onValueChange,
}: FilterDropdownProps) {
  const handleSelect = (value: string) => {
    onValueChange(value === "all" ? null : value);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}:</span>
      <Select onValueChange={handleSelect} value={selectedValue ?? "all"}>
        <SelectTrigger className="w-[180px] text-sm">
          <SelectValue placeholder={`All ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 