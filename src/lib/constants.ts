export const TABLE_DEFAULTS = {
  CURRENT_PAGE: 1,
  ROWS_PER_PAGE: 25,
  DATA_SOURCE: 'mock' as 'mock' | 'real',
  REFRESH_INTERVAL: 30000,
  AUTO_REFRESH: true,
  ROWS_PER_PAGE_OPTIONS: [10, 25, 50, 100],
};

export const API = {
  PROVIDERS: '/api/providers',
  VPS: '/api/vps',
};

export const FLAG_CDN_URL = 'https://flagcdn.com/w20'; 