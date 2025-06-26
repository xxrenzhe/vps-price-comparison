"use client";

import { useState, useEffect, useCallback } from 'react';
import type { VPSPlan, APIResponse, PaginatedVPSResponse } from '@/types/vps';

interface UseVPSDataOptions {
  page?: number;
  pageSize?: number;
  provider?: string;
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
}

export function useVPSData(options: UseVPSDataOptions = {}): UseVPSDataReturn {
  const {
    page = 1,
    pageSize = 25,
    provider,
    minPrice,
    maxPrice,
    autoRefresh = true,
    refreshInterval = 30000, // 30 seconds
    dataSource = 'mock' // 默认使用模拟数据
  } = options;

  const [data, setData] = useState<VPSPlan[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchVPSData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (provider) {
        params.append('provider', provider);
      }
      if (minPrice !== undefined) {
        params.append('minPrice', minPrice.toString());
      }
      if (maxPrice !== undefined) {
        params.append('maxPrice', maxPrice.toString());
      }

      // 根据数据源选择API端点
      const apiEndpoint = dataSource === 'real' ? '/api/vps/real' : '/api/vps';
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
  }, [page, pageSize, provider, minPrice, maxPrice, dataSource]);

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
    refetch: fetchVPSData
  };
}
