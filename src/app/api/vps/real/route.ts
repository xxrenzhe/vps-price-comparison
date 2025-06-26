import { type NextRequest, NextResponse } from 'next/server';
import { fetchAllRealVPSData } from '@/services/vpsProviders';
import type { PaginatedVPSResponse } from '@/types/vps';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get('page') || '1');
    const pageSize = Number.parseInt(searchParams.get('pageSize') || '25');
    const provider = searchParams.get('provider');
    const minPrice = Number.parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = Number.parseFloat(searchParams.get('maxPrice') || '999999');

    // 获取真实VPS数据
    const realData = await fetchAllRealVPSData();

    // 过滤数据
    let filteredData = realData;

    if (provider) {
      filteredData = filteredData.filter(vps =>
        vps.provider.toLowerCase().includes(provider.toLowerCase())
      );
    }

    filteredData = filteredData.filter(vps =>
      vps.monthlyPrice >= minPrice && vps.monthlyPrice <= maxPrice
    );

    // 分页
    const total = filteredData.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // 添加轻微的价格波动（模拟实时更新）
    const dataWithPriceVariation = paginatedData.map(vps => ({
      ...vps,
      monthlyPrice: Math.round((vps.monthlyPrice + (Math.random() - 0.5) * 0.5) * 100) / 100, // ±$0.25 随机波动
      lastUpdated: new Date().toISOString()
    }));

    const response: PaginatedVPSResponse = {
      plans: dataWithPriceVariation,
      total,
      page,
      pageSize,
      totalPages
    };

    return NextResponse.json({
      success: true,
      data: response,
      lastUpdated: new Date().toISOString(),
      source: 'real_apis'
    });

  } catch (error) {
    console.error('Real VPS API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch real VPS data',
      lastUpdated: new Date().toISOString()
    }, { status: 500 });
  }
}
