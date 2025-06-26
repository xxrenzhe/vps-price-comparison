import { NextResponse } from 'next/server';
import type { VPSProvider } from '@/types/vps';

// VPS提供商配置
const vpsProviders: VPSProvider[] = [
  {
    id: 'siteground',
    name: 'Siteground',
    website: 'https://www.siteground.com',
    apiEndpoint: 'https://api.siteground.com/v1/vps',
    isActive: true
  },
  {
    id: 'greengeeks',
    name: 'GreenGeeks',
    website: 'https://www.greengeeks.com',
    apiEndpoint: 'https://api.greengeeks.com/v1/vps',
    isActive: true
  },
  {
    id: 'hostarmada',
    name: 'HostArmada',
    website: 'https://hostarmada.com',
    apiEndpoint: 'https://api.hostarmada.com/v1/vps',
    isActive: true
  },
  {
    id: 'bluehost',
    name: 'Bluehost',
    website: 'https://www.bluehost.com',
    apiEndpoint: 'https://api.bluehost.com/v1/vps',
    isActive: true
  },
  {
    id: 'scalahosting',
    name: 'ScalaHosting',
    website: 'https://www.scalahosting.com',
    apiEndpoint: 'https://api.scalahosting.com/v1/vps',
    isActive: true
  },
  {
    id: 'fastcomet',
    name: 'FastComet',
    website: 'https://www.fastcomet.com',
    apiEndpoint: 'https://api.fastcomet.com/v1/vps',
    isActive: true
  },
  {
    id: 'namehero',
    name: 'NameHero',
    website: 'https://www.namehero.com',
    apiEndpoint: 'https://api.namehero.com/v1/vps',
    isActive: true
  },
  {
    id: 'dreamhost',
    name: 'DreamHost',
    website: 'https://www.dreamhost.com',
    apiEndpoint: 'https://api.dreamhost.com/v1/vps',
    isActive: true
  },
  {
    id: 'hostpapa',
    name: 'HostPapa',
    website: 'https://www.hostpapa.com',
    apiEndpoint: 'https://api.hostpapa.com/v1/vps',
    isActive: true
  },
  {
    id: 'cloudways',
    name: 'Cloudways',
    website: 'https://www.cloudways.com',
    apiEndpoint: 'https://api.cloudways.com/v1/vps',
    isActive: true
  },
  {
    id: 'chemicloud',
    name: 'ChemiCloud',
    website: 'https://chemicloud.com',
    apiEndpoint: 'https://api.chemicloud.com/v1/vps',
    isActive: true
  },
  // NEW PROVIDERS
  {
    id: 'bandwagonhost',
    name: 'BandwagonHost',
    website: 'https://bandwagonhost.com',
    apiEndpoint: 'https://api.64clouds.com/v1/getServiceInfo',
    isActive: true
  },
  {
    id: 'hostinger',
    name: 'Hostinger',
    website: 'https://www.hostinger.com',
    apiEndpoint: 'https://www.hostinger.com/pricing',
    isActive: true
  },
  {
    id: 'interserver',
    name: 'Interserver',
    website: 'https://www.interserver.net',
    apiEndpoint: 'https://my.interserver.net/api/vps',
    isActive: true
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: vpsProviders,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Providers API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch providers',
      lastUpdated: new Date().toISOString()
    }, { status: 500 });
  }
}
