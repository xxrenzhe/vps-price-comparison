export const TABLE_DEFAULTS = {
  CURRENT_PAGE: 1,
  ROWS_PER_PAGE: 25,
  DATA_SOURCE: 'mock' as 'mock' | 'real',
  REFRESH_INTERVAL: 30000,
  AUTO_REFRESH: true,
  ROWS_PER_PAGE_OPTIONS: [10, 25, 50, 100],
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API = {
  PROVIDERS: `${API_BASE_URL}/api/providers`,
  VPS: `${API_BASE_URL}/api/vps`,
};

export const FLAG_CDN_URL = 'https://flagcdn.com/w20'; 