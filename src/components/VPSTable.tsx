"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useVPSData } from "@/hooks/useVPSData";
import type { VPSPlan } from "@/types/vps";
import ProviderFilter from "@/components/ProviderFilter";
import DataSourceToggle from "@/components/DataSourceToggle";

function FlagIcon({ countryCode }: { countryCode: string }) {
  const flagUrl = `https://ext.same-assets.com/721190585/${
    countryCode === 'de' ? '1030278012' :
    countryCode === 'gb' ? '684761045' :
    countryCode === 'us' ? '1712654018' :
    countryCode === 'ca' ? '1571532171' :
    countryCode === 'fi' ? '2049145698' :
    countryCode === 'bg' ? '742734369' :
    countryCode === 'nl' ? '594896309' :
    countryCode === 'sg' ? '523359360' :
    countryCode === 'hk' ? '1712654018' :
    countryCode === 'lt' ? '1712654018' : '1712654018'
  }.png`;

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

function formatBandwidth(bandwidth: number | 'unlimited') {
  if (bandwidth === 'unlimited') return 'Unlimited';
  if (bandwidth >= 1000) return `${bandwidth / 1000} TB`;
  return `${bandwidth} GB`;
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

export default function VPSTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [allProviders, setAllProviders] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<'mock' | 'real'>('mock');

  const { data, total, totalPages, loading, error, lastUpdated, refetch } = useVPSData({
    page: currentPage,
    pageSize: rowsPerPage,
    provider: selectedProvider || undefined,
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds
    dataSource
  });

  // Get all providers for filter (always from the current data source)
  const { data: allData } = useVPSData({
    pageSize: 1000,
    autoRefresh: false,
    dataSource
  });

  useEffect(() => {
    if (allData.length > 0) {
      const providers = Array.from(new Set(allData.map(vps => vps.provider))).sort();
      setAllProviders(providers);
    }
  }, [allData]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);

  const handlePageSizeChange = (size: number) => {
    setRowsPerPage(size);
    setCurrentPage(1);
  };

  const handleProviderChange = (provider: string | null) => {
    setSelectedProvider(provider);
    setCurrentPage(1);
  };

  const handleDataSourceChange = (source: 'mock' | 'real') => {
    setDataSource(source);
    setSelectedProvider(null); // Reset provider filter when changing data source
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Data Source Toggle */}
      <div className="flex justify-center">
        <DataSourceToggle
          dataSource={dataSource}
          onToggle={handleDataSourceChange}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow text-sm">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {dataSource === 'real' ? 'Live' : 'Manual'} VPS pricing from {new Set(data.map(vps => vps.provider)).size} providers
            {selectedProvider && ` (filtered by ${selectedProvider})`}
          </span>
          {lastUpdated && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <ProviderFilter
            providers={allProviders}
            selectedProvider={selectedProvider}
            onProviderChange={handleProviderChange}
          />
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Provider</TableHead>
              <TableHead className="font-semibold text-gray-700">Type</TableHead>
              <TableHead className="font-semibold text-gray-700">Monthly Price</TableHead>
              <TableHead className="font-semibold text-gray-700">Location</TableHead>
              <TableHead className="font-semibold text-gray-700">CPU</TableHead>
              <TableHead className="font-semibold text-gray-700">RAM</TableHead>
              <TableHead className="font-semibold text-gray-700">Disk</TableHead>
              <TableHead className="font-semibold text-gray-700">Bandwidth</TableHead>
              <TableHead className="font-semibold text-gray-700">IPv4</TableHead>
              <TableHead className="font-semibold text-gray-700">IPv6</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && data.length === 0 && <LoadingRow />}
            {error && <ErrorRow error={error} onRetry={refetch} />}
            {!loading && !error && data.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                  No VPS plans found matching your criteria.
                </TableCell>
              </TableRow>
            )}
            {data.map((vps: VPSPlan) => (
              <TableRow key={vps.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <Link
                    href={`/providers/${vps.providerSlug}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {vps.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {vps.provider}
                  </span>
                </TableCell>
                <TableCell>{vps.type}</TableCell>
                <TableCell className="font-semibold text-orange-600">
                  {formatPrice(vps.monthlyPrice, vps.currency)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FlagIcon countryCode={vps.location.countryCode} />
                    <div className="flex flex-col">
                      <span className="text-sm">{vps.location.city}</span>
                      <span className="text-xs text-gray-500">{vps.location.country}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{vps.specs.cpu} Core{vps.specs.cpu > 1 ? 's' : ''}</TableCell>
                <TableCell>{Math.round(vps.specs.ramMB / 1024 * 100) / 100} GB</TableCell>
                <TableCell>{vps.specs.diskGB} GB</TableCell>
                <TableCell>{formatBandwidth(vps.specs.bandwidthGB)}</TableCell>
                <TableCell>{vps.network.ipv4}</TableCell>
                <TableCell>{vps.network.ipv6}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Showing {startIndex + 1} to {endIndex} of {total} VPS plans</span>
          <div className="flex items-center space-x-1 ml-4">
            {[10, 25, 50, 100].map((size) => (
              <Button
                key={size}
                variant={rowsPerPage === size ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </Button>
            ))}
            <span className="text-gray-600 ml-2">per page</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </Button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-600">...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={loading}
              >
                {totalPages}
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
