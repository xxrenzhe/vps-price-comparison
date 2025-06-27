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
import { ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Clock, ArrowUpDown, ExternalLink, List, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useVPSData } from "@/hooks/useVPSData";
import type { VPSPlan } from "@/types/vps";
import FilterDropdown from "@/components/FilterDropdown";
import DataSourceToggle from "@/components/DataSourceToggle";
import { TABLE_DEFAULTS, API, FLAG_CDN_URL } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <span className="text-gray-600 dark:text-gray-400">Loading VPS data...</span>
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
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
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

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(TABLE_DEFAULTS.CURRENT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
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
        className="font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
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
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Data Source:</span>
            <DataSourceToggle dataSource={dataSource} onToggle={handleDataSourceChange} />
          </div>
        )}
        <div className="flex-grow" />
        <div className="md:hidden">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}>
            {viewMode === 'table' ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </Button>
        </div>
        {showProviderFilter && (
          <FilterDropdown
            label="Provider"
            options={allProviders}
            selectedValue={selectedProvider}
            onValueChange={handleProviderChange}
          />
        )}
        {showTypeFilter && (
           <FilterDropdown
            label="Type"
            options={allTypes}
            selectedValue={selectedType}
            onValueChange={handleTypeChange}
          />
        )}
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-black p-3 rounded-lg shadow text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-300">
            {dataSource === 'real' ? 'Live' : 'Manual'} VPS pricing from {selectedProvider ? 1 : allProviders.length} providers
            {total > 0 && ` | Showing ${startIndex + 1}-${endIndex} of ${total}`}
            {selectedProvider && ` for ${selectedProvider}`}
            {selectedType && ` (filtered by ${selectedType})`}
          </span>
          {lastUpdated && (
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3" />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
           <span className="text-gray-600 dark:text-gray-400">Rows:</span>
           <select
             value={rowsPerPage}
             onChange={(e) => handlePageSizeChange(Number(e.target.value))}
             className="p-1 border rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
           >
             {[10, 25, 50, 100].map(size => (
               <option key={size} value={size}>{size}</option>
             ))}
           </select>
          <Button onClick={() => refetch()} variant="ghost" size="icon" title="Refresh data">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid View for Mobile */}
      <div className={`grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4 ${viewMode === 'grid' ? '' : 'hidden'}`}>
        {loading && Array.from({ length: rowsPerPage }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </CardContent>
          </Card>
        ))}
        {!loading && !error && data.map((plan) => (
          <Card key={plan.id} className="bg-white dark:bg-black rounded-lg shadow">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-white truncate">
                <Link href={`/vps/${plan.id}`} className="hover:underline">
                  {formatPlanName(plan)}
                </Link>
                <a href={plan.url} target="_blank" rel="noopener noreferrer" className="ml-2">
                  <ExternalLink size={16} className="inline text-gray-500" />
                </a>
              </CardTitle>
              {showProviderColumn && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{plan.provider}</p>
              )}
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
              <div><strong className="text-gray-600 dark:text-gray-300">Price:</strong> {formatPrice(plan.price, plan.currency)}/mo</div>
              <div><strong className="text-gray-600 dark:text-gray-300">CPU:</strong> {plan.cpu}</div>
              <div><strong className="text-gray-600 dark:text-gray-300">RAM:</strong> {plan.ram}</div>
              <div><strong className="text-gray-600 dark:text-gray-300">Disk:</strong> {plan.storage}</div>
              <div><strong className="text-gray-600 dark:text-gray-300">Location:</strong> <FlagIcon countryCode={plan.location.countryCode} /> {plan.location.city}</div>
              <div className="col-span-2"><strong className="text-gray-600 dark:text-gray-300">Bandwidth:</strong> {formatBandwidth(plan.bandwidth)}</div>
            </CardContent>
          </Card>
        ))}
        {error && <p className="text-red-500 col-span-full text-center">{error}</p>}
      </div>

      {/* Table View for Desktop */}
      <div className={`bg-white dark:bg-black rounded-lg shadow overflow-x-auto ${viewMode === 'table' ? '' : 'hidden md:block'}`}>
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
            <TableRow>
              <SortableHeader sortKey="planName">Plan</SortableHeader>
              {showProviderColumn && <SortableHeader sortKey="provider">Provider</SortableHeader>}
              <SortableHeader sortKey="cpu">CPU</SortableHeader>
              <SortableHeader sortKey="ram">RAM</SortableHeader>
              <SortableHeader sortKey="storage">Disk</SortableHeader>
              <SortableHeader sortKey="location">Location</SortableHeader>
              <SortableHeader sortKey="bandwidth">Bandwidth</SortableHeader>
              <SortableHeader sortKey="price">Price/mo</SortableHeader>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
            {loading ? (
              <LoadingRow />
            ) : error ? (
              <ErrorRow error={error} onRetry={() => refetch()} />
            ) : data.length === 0 ? (
               <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-gray-600 dark:text-gray-400">
                  No VPS plans found for the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              data.map((plan) => (
                <TableRow key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <TableCell className="font-medium text-gray-800 dark:text-white">
                    <Link href={`/vps/${plan.id}`} className="hover:underline">
                      {formatPlanName(plan)}
                    </Link>
                  </TableCell>
                  {showProviderColumn && (
                    <TableCell className="text-gray-600 dark:text-gray-400">{plan.provider}</TableCell>
                  )}
                  <TableCell className="text-gray-600 dark:text-gray-400">{plan.cpu}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{plan.ram}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{plan.storage}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    <FlagIcon countryCode={plan.location.countryCode} />
                    {plan.location.city}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{formatBandwidth(plan.bandwidth)}</TableCell>
                  <TableCell className="font-semibold text-gray-800 dark:text-white">{formatPrice(plan.price, plan.currency)}</TableCell>
                  <TableCell>
                    <a
                      href={plan.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1} to {endIndex} of {total} results
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
