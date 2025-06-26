export interface VPSPlan {
  id: string;
  name: string;
  provider: string;
  type: 'Shared Hosting' | 'VPS Hosting' | 'Cloud VPS' | 'Dedicated Server' | 'WordPress Hosting' | 'Reseller Hosting' | 'Managed VPS' | 'Unmanaged VPS';
  virtualization?: 'KVM' | 'OpenVZ' | 'VMware' | 'Hyper-V' | 'Xen' | 'LXC';
  monthlyPrice: number;
  yearlyPrice?: number;
  setupFee?: number;
  currency: string;
  location: {
    country: string;
    city: string;
    countryCode: string;
    region?: string;
  };
  specs: {
    cpu: number;
    cpuType?: string;
    diskGB: number;
    diskType?: 'SSD' | 'NVMe SSD' | 'HDD' | 'Hybrid';
    ramMB: number;
    bandwidthGB: number | 'unlimited';
    portSpeed: string;
  };
  network: {
    ipv4: number | 'NAT' | 'Shared';
    ipv6: string | number | 'Shared';
    ddosProtection?: boolean;
  };
  features: string[];
  controlPanel?: string;
  availability: boolean;
  lastUpdated: string;
  url: string;
  providerSlug: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  lastUpdated?: string;
}

export interface VPSProvider {
  id: string;
  name: string;
  website: string;
  apiEndpoint?: string;
  apiKey?: string;
  isActive: boolean;
}

export interface PaginatedVPSResponse {
  plans: VPSPlan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
