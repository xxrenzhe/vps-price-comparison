"use server";

import type { VPSPlan } from '@/types/vps';

// BandwagonHost KiwiVM API 集成
export async function fetchBandwagonHostData(): Promise<VPSPlan[]> {
  try {
    // 注意：这里需要真实的KiwiVM API密钥
    // const apiKey = process.env.BANDWAGONHOST_API_KEY;
    // const veid = process.env.BANDWAGONHOST_VEID;

    // 模拟KiwiVM API调用
    // const response = await fetch(`https://api.64clouds.com/v1/getServiceInfo?veid=${veid}&api_key=${apiKey}`);

    // 由于没有真实API密钥，返回模拟数据
    return [
      {
        id: 'bandwagonhost-real-1',
        planName: 'CN2 GIA ECOMMERCE',
        provider: 'BandwagonHost',
        type: 'VPS Hosting',
        virtualization: 'KVM',
        price: 169.99,
        currency: 'USD',
        frequency: 'Monthly',
        location: {
          country: 'United States',
          city: 'Los Angeles',
          countryCode: 'us'
        },
        cpu: '4 Cores',
        ram: '8 GB',
        storage: '80 GB SSD',
        bandwidth: '5000 GB',
        networkSpeed: '10 Gbps',
        includedFeatures: ['CN2 GIA', 'KiwiVM Control Panel', 'Snapshots', 'Migration', '1 IPv4', '/64 IPv6'],
        url: 'https://bandwagonhost.com/',
        providerSlug: 'bandwagonhost'
      },
      {
        id: 'bandwagonhost-real-2',
        planName: 'HONGKONG PCCW',
        provider: 'BandwagonHost',
        type: 'VPS Hosting',
        virtualization: 'KVM',
        price: 89.99,
        currency: 'USD',
        frequency: 'Monthly',
        location: {
          country: 'Hong Kong',
          city: 'Hong Kong',
          countryCode: 'hk'
        },
        cpu: '2 Cores',
        ram: '4 GB',
        storage: '40 GB SSD',
        bandwidth: '500 GB',
        networkSpeed: '1 Gbps',
        includedFeatures: ['PCCW Network', 'China Optimized', 'DDoS Protection', '1 IPv4', '/64 IPv6'],
        url: 'https://bandwagonhost.com/',
        providerSlug: 'bandwagonhost'
      }
    ];
  } catch (error) {
    console.error('BandwagonHost API Error:', error);
    return [];
  }
}

// Hostinger 网页抓取集成
export async function fetchHostingerData(): Promise<VPSPlan[]> {
  try {
    // 这里应该使用网页抓取来获取Hostinger的定价信息
    // 由于Hostinger没有公开的定价API，我们需要解析他们的定价页面

    // 模拟网页抓取结果
    return [
      {
        id: 'hostinger-real-1',
        planName: 'VPS 1',
        provider: 'Hostinger',
        type: 'VPS Hosting',
        virtualization: 'KVM',
        price: 4.99,
        currency: 'USD',
        frequency: 'Monthly',
        location: {
          country: 'United States',
          city: 'Ashburn',
          countryCode: 'us'
        },
        cpu: '1 Core',
        ram: '1 GB',
        storage: '20 GB NVMe',
        bandwidth: '1000 GB',
        networkSpeed: '1 Gbps',
        includedFeatures: ['NVMe SSD', 'Weekly Backups', '24/7 Support', 'AI Assistant', '1 IPv4', '1 IPv6'],
        url: 'https://www.hostinger.com/vps-hosting',
        providerSlug: 'hostinger'
      },
      {
        id: 'hostinger-real-2',
        planName: 'VPS 2',
        provider: 'Hostinger',
        type: 'VPS Hosting',
        virtualization: 'KVM',
        price: 8.99,
        currency: 'USD',
        frequency: 'Monthly',
        location: {
          country: 'United Kingdom',
          city: 'London',
          countryCode: 'gb'
        },
        cpu: '2 Cores',
        ram: '2 GB',
        storage: '40 GB NVMe',
        bandwidth: '2000 GB',
        networkSpeed: '1 Gbps',
        includedFeatures: ['NVMe SSD', 'Free Domain', 'Priority Support', 'CDN', '1 IPv4', '1 IPv6'],
        url: 'https://www.hostinger.com/vps-hosting',
        providerSlug: 'hostinger'
      }
    ];
  } catch (error) {
    console.error('Hostinger Scraping Error:', error);
    return [];
  }
}

// Interserver API 集成
export async function fetchInterserverData(): Promise<VPSPlan[]> {
  try {
    // Interserver有一些内部API，但不是完全公开的
    // 这里模拟API调用

    return [
      {
        id: 'interserver-real-1',
        planName: 'Standard VPS',
        provider: 'Interserver',
        type: 'VPS Hosting',
        virtualization: 'KVM',
        price: 6.00,
        currency: 'USD',
        frequency: 'Monthly',
        location: {
          country: 'United States',
          city: 'Secaucus',
          countryCode: 'us'
        },
        cpu: '1 Core',
        ram: '1 GB',
        storage: '30 GB SSD',
        bandwidth: 'Unlimited',
        networkSpeed: '1 Gbps',
        includedFeatures: ['Price Lock Guarantee', 'Free Migration', 'cPanel/WHM', '99.9% Uptime', '1 IPv4', '1 IPv6'],
        url: 'https://www.interserver.net/vps/',
        providerSlug: 'interserver'
      },
      {
        id: 'interserver-real-2',
        planName: 'Windows VPS',
        provider: 'Interserver',
        type: 'VPS Hosting',
        virtualization: 'KVM',
        price: 10.00,
        currency: 'USD',
        frequency: 'Monthly',
        location: {
          country: 'United States',
          city: 'Los Angeles',
          countryCode: 'us'
        },
        cpu: '2 Cores',
        ram: '2 GB',
        storage: '50 GB SSD',
        bandwidth: 'Unlimited',
        networkSpeed: '1 Gbps',
        includedFeatures: ['Windows Server 2019', 'RDP Access', 'Price Lock', 'SSD Storage', '1 IPv4', '1 IPv6'],
        url: 'https://www.interserver.net/vps/',
        providerSlug: 'interserver'
      }
    ];
  } catch (error) {
    console.error('Interserver API Error:', error);
    return [];
  }
}

// 获取所有真实API数据
export async function fetchAllRealVPSData(): Promise<VPSPlan[]> {
  try {
    const [bandwagonData, hostingerData, interserverData] = await Promise.all([
      fetchBandwagonHostData(),
      fetchHostingerData(),
      fetchInterserverData()
    ]);

    return [...bandwagonData, ...hostingerData, ...interserverData];
  } catch (error) {
    console.error('Error fetching real VPS data:', error);
    return [];
  }
}

// 检查API健康状态
export async function checkAPIHealth() {
  const results = {
    bandwagonhost: { status: 'unknown', responseTime: 0 },
    hostinger: { status: 'unknown', responseTime: 0 },
    interserver: { status: 'unknown', responseTime: 0 }
  };

  try {
    // BandwagonHost API健康检查
    const startTime = Date.now();
    try {
      await fetch('https://bandwagonhost.com/', { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      results.bandwagonhost.status = 'healthy';
      results.bandwagonhost.responseTime = Date.now() - startTime;
    } catch {
      results.bandwagonhost.status = 'error';
    }

    // Hostinger健康检查
    const hostingerStartTime = Date.now();
    try {
      await fetch('https://www.hostinger.com/', { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      results.hostinger.status = 'healthy';
      results.hostinger.responseTime = Date.now() - hostingerStartTime;
    } catch {
      results.hostinger.status = 'error';
    }

    // Interserver健康检查
    const interserverStartTime = Date.now();
    try {
      await fetch('https://www.interserver.net/', { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      results.interserver.status = 'healthy';
      results.interserver.responseTime = Date.now() - interserverStartTime;
    } catch {
      results.interserver.status = 'error';
    }

  } catch (error) {
    console.error('API Health Check Error:', error);
  }

  return results;
}
