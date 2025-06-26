"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ProviderFilterProps {
  providers: string[];
  selectedProvider: string | null;
  onProviderChange: (provider: string | null) => void;
}

export default function ProviderFilter({
  providers,
  selectedProvider,
  onProviderChange
}: ProviderFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Filter className="h-4 w-4" />
        <span>
          {selectedProvider || "All Providers"}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          <div className="p-2">
            <button
              onClick={() => {
                onProviderChange(null);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                !selectedProvider ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              All Providers
            </button>
            {providers.map((provider) => (
              <button
                key={provider}
                onClick={() => {
                  onProviderChange(provider);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  selectedProvider === provider ? 'bg-blue-50 text-blue-700' : ''
                }`}
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
