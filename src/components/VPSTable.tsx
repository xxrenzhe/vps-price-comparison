"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Clock, ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useVPSData } from "@/hooks/useVPSData";
import type { VPSPlan } from "@/types/vps";
import FilterDropdown from "@/components/FilterDropdown";
import DataSourceToggle from "@/components/DataSourceToggle";
import { TABLE_DEFAULTS, API, FLAG_CDN_URL } from "@/lib/constants";

function FlagIcon({ countryCode }: { countryCode: string }) {
  const flagUrl = `${FLAG_CDN_URL}/${countryCode.toLowerCase()}.png`;

  return (
    <img
      src={flagUrl}
      alt={countryCode}
      className="w-4 h-3 inline-block mr-2"
    />
  );
}

function LoadingRow() {
  return (
    <TableRow>
      <TableCell colSpan={11} className="text-center py-8">
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-gray-600">Loading VPS data...</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

function ErrorRow({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <TableRow>
      <TableCell colSpan={11} className="text-center py-8">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>Error: {error}</span>
          </div>
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}

function formatPlanName(plan: VPSPlan) {
  const providerName = plan.provider;
  let planName = plan.planName;

  // Remove provider name from plan name if it's already there to avoid duplication
  if (planName.toLowerCase().includes(providerName.toLowerCase())) {
    planName = planName.replace(new RegExp(providerName, 'i'), '').trim();
  }
  
  return `${providerName} - ${planName}`;
}

function formatBandwidth(bandwidth: string) {
  if (typeof bandwidth !== 'string') {
    return 'N/A';
  }
  if (bandwidth.toLowerCase() === 'unmetered') return 'Unlimited';
  return bandwidth;
}

function formatLastUpdated(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  return date.toLocaleTimeString();
}

type SortConfig = {
  key: keyof VPSPlan | 'cpu' | 'ram' | 'disk' | 'monthlyPrice' | 'location' | 'bandwidth';
  direction: 'ascending' | 'descending';
} | null;

type VPSTableProps = {
  providerFilter?: string;
  showProviderColumn?: boolean;
  defaultPageSize?: number;
  showDataSourceToggle?: boolean;
  showProviderFilter?: boolean;
  showTypeFilter?: boolean;
};

export default function VPSTable({
  providerFilter,
  showProviderColumn = true,
  defaultPageSize = 25,
  showDataSourceToggle = true,
  showProviderFilter = true,
  showTypeFilter = true,
}: VPSTableProps) {
  const searchParams = useSearchParams();
  const providerFromUrl = searchParams.get('provider');

  const [currentPage, setCurrentPage] = useState(TABLE_DEFAULTS.CURRENT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_DEFAULTS.ROWS_PER_PAGE);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(providerFromUrl);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [allProviders, setAllProviders] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<'mock' | 'real'>(TABLE_DEFAULTS.DATA_SOURCE);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const {
    data,
    total,
    totalPages,
    loading,
    error,
    lastUpdated,
    refetch,
    setSort,
    setPage,
    setPageSize,
  } = useVPSData({
    pageSize: defaultPageSize,
    provider: providerFilter || selectedProvider || undefined,
    page: currentPage,
    type: selectedType || undefined,
    sortBy: sortConfig?.key,
    sortOrder: sortConfig?.direction === 'ascending' ? 'asc' : 'desc',
    autoRefresh: true,
    refreshInterval: TABLE_DEFAULTS.REFRESH_INTERVAL,
    dataSource
  });

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await fetch(API.PROVIDERS);
        const result = await response.json();
        if (result.success) {
          setAllProviders(result.data.providers);
          setAllTypes(result.data.types);
        }
      } catch (e) {
        console.error("Failed to fetch filters", e);
      }
    }
    fetchFilters();
  }, [dataSource]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);

  const handlePageSizeChange = (size: number) => {
    setRowsPerPage(size);
    setCurrentPage(TABLE_DEFAULTS.CURRENT_PAGE);
  };

  const handleProviderChange = (provider: string | null) => {
    setSelectedProvider(provider);
    setCurrentPage(TABLE_DEFAULTS.CURRENT_PAGE);
  };

  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setCurrentPage(TABLE_DEFAULTS.CURRENT_PAGE);
  };
  
  const handleDataSourceChange = (source: 'mock' | 'real') => {
    setDataSource(source);
    setSelectedProvider(null);
    setSelectedType(null);
    setCurrentPage(TABLE_DEFAULTS.CURRENT_PAGE);
    setSortConfig(null);
  };

  const requestSort = (key: NonNullable<SortConfig>['key']) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const SortableHeader = ({
    sortKey,
    children,
  }: {
    sortKey: NonNullable<SortConfig>['key'];
    children: React.ReactNode;
  }) => {
    const isSorted = sortConfig?.key === sortKey;
    const direction = sortConfig?.direction;
  
    return (
      <TableHead
        className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
        onClick={() => requestSort(sortKey)}
      >
        <div className="flex items-center">
          {children}
          {isSorted ? (
            direction === 'ascending' ? (
              <ArrowUpDown size={14} className="ml-2" />
            ) : (
              <ArrowUpDown size={14} className="ml-2" />
            )
          ) : (
            <ArrowUpDown size={14} className="ml-2 opacity-30" />
          )}
        </div>
      </TableHead>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {showDataSourceToggle && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Data Source:</span>
            <DataSourceToggle
              dataSource={dataSource}
              onToggle={handleDataSourceChange}
            />
          </div>
        )}
        {showProviderFilter && allProviders.length > 0 && (
           <FilterDropdown
            label="Providers"
            options={allProviders}
            selectedValue={selectedProvider}
            onValueChange={handleProviderChange}
          />
        )}
        {showTypeFilter && allTypes.length > 0 && (
          <FilterDropdown
            label="Types"
            options={allTypes}
            selectedValue={selectedType}
            onValueChange={handleTypeChange}
          />
        )}
      </div>

      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {dataSource === 'real' ? 'Live' : 'Manual'} VPS pricing from {selectedProvider ? 1 : allProviders.length} providers
            {selectedProvider && ` (filtered by ${selectedProvider})`}
            {selectedType && ` (filtered by ${selectedType})`}
          </span>
          {lastUpdated && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={refetch}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <SortableHeader sortKey="planName">Name</SortableHeader>
              {showProviderColumn && (
                <SortableHeader sortKey="provider">Provider</SortableHeader>
              )}
              <SortableHeader sortKey="location">Location</SortableHeader>
              <SortableHeader sortKey="cpu">CPU</SortableHeader>
              <SortableHeader sortKey="ram">RAM</SortableHeader>
              <SortableHeader sortKey="disk">Storage</SortableHeader>
              <SortableHeader sortKey="type">Type</SortableHeader>
              <SortableHeader sortKey="price">Monthly Price</SortableHeader>
              <SortableHeader sortKey="bandwidth">Bandwidth</SortableHeader>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && <LoadingRow />}
            {!loading && error && <ErrorRow error={error} onRetry={refetch} />}
            {!loading && !error && (
              <>
                {data.map((plan: VPSPlan) => (
                  <TableRow key={plan.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <Link href={`/vps/${plan.id}`} className="text-blue-600 hover:underline">
                        {plan.planName}
                      </Link>
                    </TableCell>
                    {showProviderColumn && (
                      <TableCell>
                        <Link href={`/providers/${plan.providerSlug}`} className="text-blue-600 hover:underline">
                          {plan.provider}
                        </Link>
                      </TableCell>
                    )}
                    <TableCell>
                      <FlagIcon countryCode={plan.location.countryCode} />
                      {plan.location.city}
                    </TableCell>
                    <TableCell>{plan.cpu}</TableCell>
                    <TableCell>{plan.ram}</TableCell>
                    <TableCell>{plan.storage}</TableCell>
                    <TableCell>{plan.type}</TableCell>
                    <TableCell className="font-semibold text-orange-600">
                      {formatPrice(plan.price, plan.currency)}
                    </TableCell>
                    <TableCell>{formatBandwidth(plan.bandwidth)}</TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="outline">
                        <a href={plan.url} target="_blank" rel="noopener noreferrer nofollow">
                          Order
                          <ExternalLink className="h-3 w-3 ml-1.5" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow text-sm">
        <div className="text-gray-600">
          Showing {startIndex + 1} - {endIndex} of {total} results
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="p-1 rounded-md border-gray-300"
          >
            {TABLE_DEFAULTS.ROWS_PER_PAGE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
