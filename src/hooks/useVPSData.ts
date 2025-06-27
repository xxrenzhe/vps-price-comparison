"use client";

import { useState, useEffect, useCallback } from 'react';
import type { VPSPlan, APIResponse, PaginatedVPSResponse } from '@/types/vps';
import { TABLE_DEFAULTS, API } from '@/lib/constants';

interface UseVPSDataOptions {
  page?: number;
  pageSize?: number;
  provider?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  dataSource?: 'mock' | 'real'; // 新增数据源选项
}

interface UseVPSDataReturn {
  data: VPSPlan[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
  setSort: (config: { key: string; direction: 'asc' | 'desc' } | null) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export function useVPSData(options: UseVPSDataOptions = {}): UseVPSDataReturn {
  const {
    page = TABLE_DEFAULTS.CURRENT_PAGE,
    pageSize = TABLE_DEFAULTS.ROWS_PER_PAGE,
    provider,
    type,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    autoRefresh = TABLE_DEFAULTS.AUTO_REFRESH,
    refreshInterval = TABLE_DEFAULTS.REFRESH_INTERVAL, // 30 seconds
    dataSource = TABLE_DEFAULTS.DATA_SOURCE, // 默认使用模拟数据
  } = options;

  const [data, setData] = useState<VPSPlan[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentParams, setCurrentParams] = useState<UseVPSDataOptions>({
    page: page,
    pageSize: pageSize,
    ...options,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const setSort = (config: { key: string; direction: 'asc' | 'desc' } | null) => {
    setCurrentParams(prev => ({
      ...prev,
      sortBy: config?.key,
      sortOrder: config?.direction,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setCurrentParams(prev => ({ ...prev, page }));
  };

  const setPageSize = (size: number) => {
    setCurrentParams(prev => ({ ...prev, pageSize: size, page: 1 }));
  };

  const fetchVPSData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentParams.page?.toString() || '',
        pageSize: currentParams.pageSize?.toString() || '',
      });

      if (provider) {
        params.append('provider', provider);
      }
      if (type) {
        params.append('type', type);
      }
      if (currentParams.sortBy) {
        params.append('sortBy', currentParams.sortBy);
      }
      if (currentParams.sortOrder) {
        params.append('sortOrder', currentParams.sortOrder);
      }
      if (minPrice !== undefined) {
        params.append('minPrice', minPrice.toString());
      }
      if (maxPrice !== undefined) {
        params.append('maxPrice', maxPrice.toString());
      }

      // 根据数据源选择API端点
      const apiEndpoint = dataSource === 'real' ? `${API.VPS}/real` : API.VPS;
      const response = await fetch(`${apiEndpoint}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result: APIResponse<PaginatedVPSResponse> = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch VPS data');
      }

      if (result.data) {
        setData(result.data.plans);
        setTotal(result.data.total);
        setTotalPages(result.data.totalPages);
        setLastUpdated(result.lastUpdated || new Date().toISOString());
      }

    } catch (err) {
      console.error('VPS Data Fetch Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [currentParams, provider, type, minPrice, maxPrice, dataSource]);

  // Initial fetch
  useEffect(() => {
    fetchVPSData();
  }, [fetchVPSData]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchVPSData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchVPSData]);

  return {
    data,
    total,
    totalPages,
    loading,
    error,
    lastUpdated,
    refetch: fetchVPSData,
    setSort,
    setPage,
    setPageSize
  };
}
