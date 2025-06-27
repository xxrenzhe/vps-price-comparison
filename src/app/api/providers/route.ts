import { NextResponse } from 'next/server';
import { mockVPSData } from '@/services/vpsData';

export async function GET() {
  try {
    const providers = [...new Set(mockVPSData.map(plan => plan.provider))].sort();
    const types = [...new Set(mockVPSData.map(plan => plan.type))].sort();

    return NextResponse.json({
      success: true,
      data: {
        providers,
        types,
      },
    });
  } catch (error) {
    console.error('API Error fetching providers:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
