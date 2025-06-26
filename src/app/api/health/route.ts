import { NextResponse } from 'next/server';
import { checkAPIHealth } from '@/services/vpsProviders';

export async function GET() {
  try {
    const healthResults = await checkAPIHealth();

    const overallStatus = Object.values(healthResults).every(result => result.status === 'healthy')
      ? 'healthy'
      : 'degraded';

    return NextResponse.json({
      success: true,
      status: overallStatus,
      providers: healthResults,
      lastChecked: new Date().toISOString()
    });

  } catch (error) {
    console.error('Health Check Error:', error);
    return NextResponse.json({
      success: false,
      status: 'error',
      error: 'Health check failed',
      lastChecked: new Date().toISOString()
    }, { status: 500 });
  }
}
