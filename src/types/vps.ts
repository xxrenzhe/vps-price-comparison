export type PlanType =
  | 'Shared Hosting'
  | 'VPS Hosting'
  | 'Cloud VPS'
  | 'Dedicated Server'
  | 'WordPress Hosting'
  | 'Reseller Hosting'
  | 'Managed VPS'
  | 'Unmanaged VPS'
  | 'Managed Cloud VPS'
  | 'Cloud SSD VPS'
  | 'Managed Cloud'
  | 'High-Performance VPS'
  | 'Managed Cloud Hosting'
  | 'CN2 GIA VPS'
  | 'Dubai VPS'
  | 'KVM VPS'
  | 'Linux VPS'
  | 'Storage VPS';

export interface Location {
  country: string;
  city: string;
  countryCode: string;
  region?: string;
}

export interface VPSPlan {
  id: string;
  provider: string;
  planName: string;
  type: PlanType;
  price: number;
  currency: 'USD' | 'EUR' | 'GBP';
  frequency: 'Monthly' | 'Quarterly' | 'Annually';
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  networkSpeed: string;
  location: Location;
  virtualization: string;
  includedFeatures: string[];
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
