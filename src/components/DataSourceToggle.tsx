"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Zap, Wifi } from "lucide-react";

interface DataSourceToggleProps {
  dataSource: 'mock' | 'real';
  onToggle: (source: 'mock' | 'real') => void;
}

export default function DataSourceToggle({ dataSource, onToggle }: DataSourceToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm border">
      <div className="flex items-center space-x-1 text-sm text-gray-600">
        <Database className="h-4 w-4" />
        <span>Data Source:</span>
      </div>

      <div className="flex space-x-1">
        <Button
          variant={dataSource === 'mock' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onToggle('mock')}
          className="text-xs"
        >
          <Zap className="h-3 w-3 mr-1" />
          Manual Data
          {dataSource === 'mock' && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Fast
            </Badge>
          )}
        </Button>

        <Button
          variant={dataSource === 'real' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onToggle('real')}
          className="text-xs"
        >
          <Wifi className="h-3 w-3 mr-1" />
          Live APIs
          {dataSource === 'real' && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Real-time
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}
