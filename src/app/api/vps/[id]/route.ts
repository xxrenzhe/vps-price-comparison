import { NextResponse, NextRequest } from 'next/server';
import { mockVPSData } from '@/services/vpsData';
import { VPSPlan } from '@/types/vps';

export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
) {
  const { id } = context.params as { id: string };
  const allPlans = mockVPSData as VPSPlan[];
  const plan = allPlans.find(p => p.id === id);

  if (!plan) {
    return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
  }

  const otherPlans = allPlans
    .filter(p => p.provider === plan.provider && p.id !== plan.id)
    .sort((a, b) => a.price - b.price);

  return NextResponse.json({ plan, otherPlans });
} 