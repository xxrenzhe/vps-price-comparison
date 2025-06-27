import { type NextRequest, NextResponse } from 'next/server';
import type { VPSPlan, PaginatedVPSResponse } from '@/types/vps';
import { mockVPSData } from '@/services/vpsData';

const API_DEFAULTS = {
  PAGE: '1',
  PAGE_SIZE: '25',
  SORT_ORDER: 'asc',
  DELAY_MS: 500,
};

// 模拟的VPS提供商数据 - 扩展到50个真实计划
// const mockVPSData: VPSPlan[] = [ ... ]; // Data is now imported from vpsData.ts

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || API_DEFAULTS.PAGE, 10);
    const pageSize = parseInt(searchParams.get('pageSize') || API_DEFAULTS.PAGE_SIZE, 10);
    const provider = searchParams.get('provider');
    const minPrice = searchParams.has('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.has('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const type = searchParams.get('type');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder') || API_DEFAULTS.SORT_ORDER;

    let filteredData = mockVPSData;

    if (provider) {
      filteredData = filteredData.filter(vps => vps.provider.toLowerCase() === provider.toLowerCase());
    }
    if (minPrice !== undefined) {
      filteredData = filteredData.filter(vps => vps.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      filteredData = filteredData.filter(vps => vps.price <= maxPrice);
    }
    if (type) {
      filteredData = filteredData.filter(vps => vps.type === type);
    }

    if (sortBy) {
      filteredData.sort((a, b) => {
        let valA, valB;
        const parseNumeric = (value: string) => parseFloat(value.replace(/[^\d.]/g, '')) || 0;

        switch (sortBy) {
          case 'cpu':
            valA = parseNumeric(a.cpu);
            valB = parseNumeric(b.cpu);
            break;
          case 'ram':
            valA = parseNumeric(a.ram);
            valB = parseNumeric(b.ram);
            break;
          case 'disk':
            valA = parseNumeric(a.storage);
            valB = parseNumeric(b.storage);
            break;
          case 'bandwidth':
             valA = a.bandwidth.toLowerCase() === 'unmetered' ? Infinity : parseNumeric(a.bandwidth);
             valB = b.bandwidth.toLowerCase() === 'unmetered' ? Infinity : parseNumeric(b.bandwidth);
             break;
          case 'location':
            valA = a.location.city;
            valB = b.location.city;
            break;
          case 'price':
            valA = a.price;
            valB = b.price;
            break;
          default:
            valA = a[sortBy as keyof VPSPlan];
            valB = b[sortBy as keyof VPSPlan];
        }
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
      });
    }

    const total = filteredData.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

    // Simulate network delay
    await delay(API_DEFAULTS.DELAY_MS);

    const response: PaginatedVPSResponse = {
      plans: paginatedData,
      total: total,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };

    return NextResponse.json({
      success: true,
      lastUpdated: new Date().toISOString(),
      data: response,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }, { status: 500 });
  }
}
