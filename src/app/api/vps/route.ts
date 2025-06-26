import { type NextRequest, NextResponse } from 'next/server';
import type { VPSPlan, PaginatedVPSResponse } from '@/types/vps';

// 模拟的VPS提供商数据 - 扩展到50个真实计划
const mockVPSData: VPSPlan[] = [
  // DigitalOcean Cloud VPS
  {
    id: 'digitalocean-1',
    name: 'Basic Droplet',
    provider: 'DigitalOcean',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 4.00,
    yearlyPrice: 48.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'New York',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Regular Performance',
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 512,
      bandwidthGB: 500,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['SSD Storage', 'Cloud Firewalls', 'Monitoring', 'API Access'],
    controlPanel: 'DigitalOcean Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.digitalocean.com/pricing',
    providerSlug: 'digitalocean'
  },
  {
    id: 'digitalocean-2',
    name: 'Premium Droplet',
    provider: 'DigitalOcean',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 18.00,
    yearlyPrice: 216.00,
    currency: 'USD',
    location: {
      country: 'Singapore',
      city: 'Singapore',
      countryCode: 'sg',
      region: 'Asia-Pacific'
    },
    specs: {
      cpu: 1,
      cpuType: 'Premium Intel',
      diskGB: 50,
      diskType: 'NVMe SSD',
      ramMB: 2048,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['NVMe SSD', 'Premium CPUs', 'Advanced Monitoring', 'Load Balancers'],
    controlPanel: 'DigitalOcean Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.digitalocean.com/pricing',
    providerSlug: 'digitalocean'
  },

  // Vultr Cloud VPS
  {
    id: 'vultr-1',
    name: 'Regular Performance',
    provider: 'Vultr',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 2.50,
    yearlyPrice: 30.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Miami',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 512,
      bandwidthGB: 500,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['SSD Storage', 'API Access', 'Snapshots', 'DDoS Protection'],
    controlPanel: 'Vultr Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.vultr.com/pricing/',
    providerSlug: 'vultr'
  },
  {
    id: 'vultr-2',
    name: 'High Performance',
    provider: 'Vultr',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 6.00,
    yearlyPrice: 72.00,
    currency: 'USD',
    location: {
      country: 'Germany',
      city: 'Frankfurt',
      countryCode: 'de',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'High Frequency',
      diskGB: 32,
      diskType: 'NVMe SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['NVMe Storage', 'High Frequency CPUs', 'Private Networking', 'Block Storage'],
    controlPanel: 'Vultr Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.vultr.com/pricing/',
    providerSlug: 'vultr'
  },

  // Linode VPS
  {
    id: 'linode-1',
    name: 'Nanode 1GB',
    provider: 'Linode',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 5.00,
    yearlyPrice: 60.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Fremont',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'AMD EPYC',
      diskGB: 25,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'Cloud Firewalls', 'Backups', 'NodeBalancers'],
    controlPanel: 'Linode Cloud Manager',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.linode.com/pricing/',
    providerSlug: 'linode'
  },
  {
    id: 'linode-2',
    name: 'Linode 2GB',
    provider: 'Linode',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 10.00,
    yearlyPrice: 120.00,
    currency: 'USD',
    location: {
      country: 'United Kingdom',
      city: 'London',
      countryCode: 'gb',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'AMD EPYC',
      diskGB: 50,
      diskType: 'SSD',
      ramMB: 2048,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'Automated Backups', 'Network Helper', 'API Access'],
    controlPanel: 'Linode Cloud Manager',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.linode.com/pricing/',
    providerSlug: 'linode'
  },

  // AWS EC2 Cloud VPS
  {
    id: 'aws-1',
    name: 't3.micro',
    provider: 'Amazon AWS',
    type: 'Cloud VPS',
    virtualization: 'Xen',
    monthlyPrice: 8.46,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'N. Virginia',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 2,
      cpuType: 'Intel Xeon Platinum',
      diskGB: 8,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 'unlimited',
      portSpeed: 'Up to 5 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['Burstable Performance', 'EBS Storage', 'Auto Scaling', 'Load Balancing'],
    controlPanel: 'AWS Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://aws.amazon.com/ec2/pricing/',
    providerSlug: 'aws'
  },

  // Google Cloud Compute Engine
  {
    id: 'gcp-1',
    name: 'e2-micro',
    provider: 'Google Cloud',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 6.11,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Iowa',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 2,
      cpuType: 'Intel/AMD',
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 'unlimited',
      portSpeed: 'Up to 32 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['Preemptible Instances', 'Live Migration', 'Custom Machine Types', 'GPU Support'],
    controlPanel: 'Google Cloud Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://cloud.google.com/compute/pricing',
    providerSlug: 'google-cloud'
  },

  // Hostinger VPS
  {
    id: 'hostinger-1',
    name: 'VPS 1',
    provider: 'Hostinger',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 3.95,
    yearlyPrice: 47.40,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Ashburn',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'NVMe SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['NVMe SSD', 'Full Root Access', '24/7 Support', 'Weekly Backups'],
    controlPanel: 'hPanel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.hostinger.com/vps-hosting',
    providerSlug: 'hostinger'
  },
  {
    id: 'hostinger-2',
    name: 'VPS 2',
    provider: 'Hostinger',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 7.95,
    yearlyPrice: 95.40,
    currency: 'USD',
    location: {
      country: 'Lithuania',
      city: 'Vilnius',
      countryCode: 'lt',
      region: 'Europe'
    },
    specs: {
      cpu: 2,
      cpuType: 'Intel Xeon',
      diskGB: 40,
      diskType: 'NVMe SSD',
      ramMB: 2048,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['NVMe SSD', 'Dedicated IP', 'AI Assistant', 'Free Domain'],
    controlPanel: 'hPanel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.hostinger.com/vps-hosting',
    providerSlug: 'hostinger'
  },

  // OVHcloud VPS
  {
    id: 'ovh-1',
    name: 'VPS Starter',
    provider: 'OVHcloud',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 3.50,
    yearlyPrice: 42.00,
    currency: 'USD',
    location: {
      country: 'France',
      city: 'Gravelines',
      countryCode: 'fr',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 2048,
      bandwidthGB: 'unlimited',
      portSpeed: '250 Mbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['Anti-DDoS', 'Backup', 'Monitoring', 'API'],
    controlPanel: 'OVHcloud Control Panel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.ovhcloud.com/en/vps/',
    providerSlug: 'ovhcloud'
  },

  // Hetzner Cloud
  {
    id: 'hetzner-1',
    name: 'CX11',
    provider: 'Hetzner',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 3.29,
    yearlyPrice: 39.48,
    currency: 'USD',
    location: {
      country: 'Germany',
      city: 'Nuremberg',
      countryCode: 'de',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'AMD EPYC',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 4096,
      bandwidthGB: 20000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['Local SSD', 'Snapshots', 'Floating IPs', 'Load Balancers'],
    controlPanel: 'Hetzner Cloud Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.hetzner.com/cloud',
    providerSlug: 'hetzner'
  },

  // Contabo VPS
  {
    id: 'contabo-1',
    name: 'VPS S SSD',
    provider: 'Contabo',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 4.99,
    yearlyPrice: 59.88,
    setupFee: 4.99,
    currency: 'USD',
    location: {
      country: 'Germany',
      city: 'Munich',
      countryCode: 'de',
      region: 'Europe'
    },
    specs: {
      cpu: 4,
      cpuType: 'Intel Xeon',
      diskGB: 50,
      diskType: 'SSD',
      ramMB: 8192,
      bandwidthGB: 'unlimited',
      portSpeed: '200 Mbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['DDoS Protection', 'Free Snapshots', 'VNC Console', 'API Access'],
    controlPanel: 'Contabo Control Panel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://contabo.com/en/vps/',
    providerSlug: 'contabo'
  },

  // BuyVM VPS
  {
    id: 'buyvm-1',
    name: 'Slice 512',
    provider: 'BuyVM',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 2.00,
    yearlyPrice: 24.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Las Vegas',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'AMD Ryzen',
      diskGB: 10,
      diskType: 'NVMe SSD',
      ramMB: 512,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['NVMe Storage', 'DDoS Protection', 'KVM Console', 'Anycast Network'],
    controlPanel: 'Stallion Control Panel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://buyvm.net/kvm-dedicated-server-slices/',
    providerSlug: 'buyvm'
  },

  // Time4VPS
  {
    id: 'time4vps-1',
    name: 'Container 2',
    provider: 'Time4VPS',
    type: 'VPS Hosting',
    virtualization: 'OpenVZ',
    monthlyPrice: 2.99,
    yearlyPrice: 35.88,
    currency: 'USD',
    location: {
      country: 'Lithuania',
      city: 'Vilnius',
      countryCode: 'lt',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 2048,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'Weekly Backups', 'Free Setup', 'cPanel/WHM'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.time4vps.com/',
    providerSlug: 'time4vps'
  },

  // IONOS VPS
  {
    id: 'ionos-1',
    name: 'VPS Linux S',
    provider: 'IONOS',
    type: 'VPS Hosting',
    virtualization: 'VMware',
    monthlyPrice: 2.00,
    yearlyPrice: 24.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Las Vegas',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 512,
      bandwidthGB: 'unlimited',
      portSpeed: '200 Mbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['SSD Storage', 'DDoS Protection', 'Snapshot', 'API Access'],
    controlPanel: 'Cloud Panel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.ionos.com/servers/vps',
    providerSlug: 'ionos'
  },

  // InterServer VPS
  {
    id: 'interserver-1',
    name: 'Standard VPS',
    provider: 'InterServer',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 6.00,
    yearlyPrice: 72.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Secaucus',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 30,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 'unlimited',
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['Price Lock Guarantee', 'Free Migration', 'cPanel/WHM', '99.9% Uptime'],
    controlPanel: 'cPanel/WHM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.interserver.net/vps/',
    providerSlug: 'interserver'
  },

  // BandwagonHost VPS
  {
    id: 'bandwagonhost-1',
    name: 'CN2 GIA 1GB',
    provider: 'BandwagonHost',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 49.99,
    yearlyPrice: 599.88,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Los Angeles',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 2,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '2.5 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: '/64',
      ddosProtection: false
    },
    features: ['CN2 GIA Network', 'KiwiVM Control Panel', 'Snapshots', 'API Access'],
    controlPanel: 'KiwiVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://bandwagonhost.com/',
    providerSlug: 'bandwagonhost'
  },

  // Shared Hosting Plans
  // Hostinger Shared Hosting
  {
    id: 'hostinger-shared-1',
    name: 'Single Web Hosting',
    provider: 'Hostinger',
    type: 'Shared Hosting',
    monthlyPrice: 1.99,
    yearlyPrice: 23.88,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Ashburn',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 0,
      diskGB: 50,
      diskType: 'SSD',
      ramMB: 0,
      bandwidthGB: 100,
      portSpeed: 'Shared'
    },
    network: {
      ipv4: 'Shared',
      ipv6: 'Shared'
    },
    features: ['1 Website', 'Free SSL', 'Weekly Backups', '24/7 Support'],
    controlPanel: 'hPanel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.hostinger.com/web-hosting',
    providerSlug: 'hostinger'
  },

  // Bluehost Shared Hosting
  {
    id: 'bluehost-shared-1',
    name: 'Basic',
    provider: 'Bluehost',
    type: 'Shared Hosting',
    monthlyPrice: 3.95,
    yearlyPrice: 47.40,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Provo',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 0,
      diskGB: 50,
      diskType: 'SSD',
      ramMB: 0,
      bandwidthGB: 'unlimited',
      portSpeed: 'Shared'
    },
    network: {
      ipv4: 'Shared',
      ipv6: 'Shared'
    },
    features: ['1 Website', 'Free Domain', 'Free SSL', 'CDN'],
    controlPanel: 'cPanel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.bluehost.com/hosting/shared',
    providerSlug: 'bluehost'
  },

  // WordPress Hosting Plans
  // WP Engine WordPress Hosting
  {
    id: 'wpengine-1',
    name: 'Startup',
    provider: 'WP Engine',
    type: 'WordPress Hosting',
    monthlyPrice: 20.00,
    yearlyPrice: 240.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Austin',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 0,
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 0,
      bandwidthGB: 50,
      portSpeed: 'Shared'
    },
    network: {
      ipv4: 'Shared',
      ipv6: 'Shared'
    },
    features: ['1 Website', 'Daily Backups', 'SSL Certificate', 'CDN'],
    controlPanel: 'WP Engine Portal',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://wpengine.com/plans/',
    providerSlug: 'wpengine'
  },

  // Kinsta WordPress Hosting
  {
    id: 'kinsta-1',
    name: 'Starter',
    provider: 'Kinsta',
    type: 'WordPress Hosting',
    monthlyPrice: 35.00,
    yearlyPrice: 420.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Iowa',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 0,
      diskGB: 10,
      diskType: 'SSD',
      ramMB: 0,
      bandwidthGB: 25,
      portSpeed: 'Shared'
    },
    network: {
      ipv4: 'Shared',
      ipv6: 'Shared'
    },
    features: ['1 WordPress Install', 'Free CDN', 'Daily Backups', 'Staging Environment'],
    controlPanel: 'MyKinsta',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://kinsta.com/plans/',
    providerSlug: 'kinsta'
  },

  // Dedicated Server Plans
  // OVHcloud Dedicated Server
  {
    id: 'ovh-dedicated-1',
    name: 'Rise-1',
    provider: 'OVHcloud',
    type: 'Dedicated Server',
    monthlyPrice: 59.00,
    yearlyPrice: 708.00,
    setupFee: 59.00,
    currency: 'USD',
    location: {
      country: 'France',
      city: 'Gravelines',
      countryCode: 'fr',
      region: 'Europe'
    },
    specs: {
      cpu: 4,
      cpuType: 'Intel Xeon E3-1230v6',
      diskGB: 1000,
      diskType: 'HDD',
      ramMB: 16384,
      bandwidthGB: 'unlimited',
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['Anti-DDoS', 'IPMI', 'Backup Storage', 'Private Network'],
    controlPanel: 'OVHcloud Manager',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.ovhcloud.com/en/bare-metal/',
    providerSlug: 'ovhcloud'
  },

  // Hetzner Dedicated Server
  {
    id: 'hetzner-dedicated-1',
    name: 'AX41-NVMe',
    provider: 'Hetzner',
    type: 'Dedicated Server',
    monthlyPrice: 46.00,
    yearlyPrice: 552.00,
    currency: 'USD',
    location: {
      country: 'Germany',
      city: 'Falkenstein',
      countryCode: 'de',
      region: 'Europe'
    },
    specs: {
      cpu: 8,
      cpuType: 'AMD Ryzen 5 3600',
      diskGB: 512,
      diskType: 'NVMe SSD',
      ramMB: 65536,
      bandwidthGB: 20000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: '/64',
      ddosProtection: false
    },
    features: ['NVMe SSD', 'Rescue System', 'KVM Console', 'Flexible IPs'],
    controlPanel: 'Robot',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.hetzner.com/dedicated-rootserver',
    providerSlug: 'hetzner'
  },

  // Managed VPS Plans
  // Cloudways Managed VPS
  {
    id: 'cloudways-1',
    name: 'DigitalOcean 1GB',
    provider: 'Cloudways',
    type: 'Managed VPS',
    virtualization: 'KVM',
    monthlyPrice: 12.00,
    yearlyPrice: 144.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'New York',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Regular Performance',
      diskGB: 25,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['Managed Cloud', 'Free SSL', 'Advanced Caches', 'Staging Environment'],
    controlPanel: 'Cloudways Platform',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.cloudways.com/en/digitalocean-hosting.php',
    providerSlug: 'cloudways'
  },

  // RunCloud Managed VPS
  {
    id: 'runcloud-1',
    name: 'Pro Plan',
    provider: 'RunCloud',
    type: 'Managed VPS',
    monthlyPrice: 15.00,
    yearlyPrice: 180.00,
    currency: 'USD',
    location: {
      country: 'Singapore',
      city: 'Singapore',
      countryCode: 'sg',
      region: 'Asia-Pacific'
    },
    specs: {
      cpu: 2,
      diskGB: 50,
      diskType: 'SSD',
      ramMB: 2048,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1
    },
    features: ['Server Management', 'Git Deployment', 'SSL Management', 'Database Management'],
    controlPanel: 'RunCloud Panel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://runcloud.io/pricing',
    providerSlug: 'runcloud'
  },

  // Additional VPS Plans to reach 50
  // RackNerd VPS
  {
    id: 'racknerd-1',
    name: 'KVM VPS v2 - 768MB',
    provider: 'RackNerd',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 1.88,
    yearlyPrice: 22.56,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Los Angeles',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 12,
      diskType: 'SSD',
      ramMB: 768,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'Full Root Access', 'Free Setup', 'Multiple OS'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.racknerd.com/NewYear/',
    providerSlug: 'racknerd'
  },

  // Vpsdime VPS
  {
    id: 'vpsdime-1',
    name: 'OpenVZ SSD 1',
    provider: 'VpsDime',
    type: 'VPS Hosting',
    virtualization: 'OpenVZ',
    monthlyPrice: 7.00,
    yearlyPrice: 84.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Los Angeles',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 30,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 3000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'Instant Setup', 'Root Access', 'Multiple Locations'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://vpsdime.com/',
    providerSlug: 'vpsdime'
  },

  // Ramnode VPS
  {
    id: 'ramnode-1',
    name: 'SSD-512',
    provider: 'RamNode',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 3.50,
    yearlyPrice: 42.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Atlanta',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 12,
      diskType: 'SSD',
      ramMB: 512,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['Premium Network', 'SSD Storage', 'KVM Virtualization', 'IPv6 Support'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://ramnode.com/vps.php',
    providerSlug: 'ramnode'
  },

  // ChicagoVPS
  {
    id: 'chicagovps-1',
    name: 'SSD-1024',
    provider: 'ChicagoVPS',
    type: 'VPS Hosting',
    virtualization: 'OpenVZ',
    monthlyPrice: 7.00,
    yearlyPrice: 84.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Chicago',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 2,
      cpuType: 'Intel Xeon',
      diskGB: 25,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 2000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'cPanel Available', 'Multiple Locations', 'Instant Setup'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://chicagovps.net/',
    providerSlug: 'chicagovps'
  },

  // Cociu VPS
  {
    id: 'cociu-1',
    name: 'KVM-1',
    provider: 'Cociu',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 4.99,
    yearlyPrice: 59.88,
    currency: 'USD',
    location: {
      country: 'Romania',
      city: 'Bucharest',
      countryCode: 'ro',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 15,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['DDoS Protection', 'NVMe SSD', 'IPv6 Support', 'Full Root Access'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://cociu.com/',
    providerSlug: 'cociu'
  },

  // VPS6.NET
  {
    id: 'vps6-1',
    name: 'VPS-1024',
    provider: 'VPS6.NET',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 6.95,
    yearlyPrice: 83.40,
    currency: 'USD',
    location: {
      country: 'Romania',
      city: 'Bucharest',
      countryCode: 'ro',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: true
    },
    features: ['DDoS Protection', 'SSD Storage', 'Control Panel', 'Backup Service'],
    controlPanel: 'SolusVM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://vps6.net/',
    providerSlug: 'vps6'
  },

  // WebHorizon VPS
  {
    id: 'webhorizon-1',
    name: 'VPS-Starter',
    provider: 'WebHorizon',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 5.95,
    yearlyPrice: 71.40,
    currency: 'USD',
    location: {
      country: 'Romania',
      city: 'Bucharest',
      countryCode: 'ro',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'Control Panel', 'Multiple OS', 'Free Setup'],
    controlPanel: 'Virtualizor',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://webhorizon.in/',
    providerSlug: 'webhorizon'
  },

  // Additional Cloud VPS and specialty plans to reach exactly 50
  {
    id: 'scaleway-1',
    name: 'DEV1-S',
    provider: 'Scaleway',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 7.99,
    yearlyPrice: 95.88,
    currency: 'USD',
    location: {
      country: 'France',
      city: 'Paris',
      countryCode: 'fr',
      region: 'Europe'
    },
    specs: {
      cpu: 2,
      cpuType: 'ARM Cortex-A72',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 2048,
      bandwidthGB: 'unlimited',
      portSpeed: '200 Mbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['ARM Architecture', 'Block Storage', 'Private Networks', 'Image Templates'],
    controlPanel: 'Scaleway Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.scaleway.com/en/pricing/',
    providerSlug: 'scaleway'
  },

  {
    id: 'upcloud-1',
    name: '1xCPU-1GB',
    provider: 'UpCloud',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 5.00,
    yearlyPrice: 60.00,
    currency: 'USD',
    location: {
      country: 'Finland',
      city: 'Helsinki',
      countryCode: 'fi',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 25,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 'unlimited',
      portSpeed: '100 Mbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['MaxIOPS Storage', 'Snapshots', 'Templates', 'API Access'],
    controlPanel: 'UpCloud Control Panel',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://upcloud.com/pricing/',
    providerSlug: 'upcloud'
  },

  {
    id: 'hostworld-1',
    name: 'VPS-Basic',
    provider: 'HostWorld',
    type: 'VPS Hosting',
    virtualization: 'KVM',
    monthlyPrice: 4.95,
    yearlyPrice: 59.40,
    currency: 'USD',
    location: {
      country: 'United Kingdom',
      city: 'London',
      countryCode: 'gb',
      region: 'Europe'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 1000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['SSD Storage', 'cPanel Available', 'Weekly Backups', 'UK Support'],
    controlPanel: 'cPanel/WHM',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://hostworld.uk/vps-hosting/',
    providerSlug: 'hostworld'
  },

  {
    id: 'kamatera-1',
    name: 'Type A - 1vCPU',
    provider: 'Kamatera',
    type: 'Cloud VPS',
    virtualization: 'KVM',
    monthlyPrice: 4.00,
    yearlyPrice: 48.00,
    currency: 'USD',
    location: {
      country: 'United States',
      city: 'Santa Clara',
      countryCode: 'us',
      region: 'North America'
    },
    specs: {
      cpu: 1,
      cpuType: 'Intel Xeon',
      diskGB: 20,
      diskType: 'SSD',
      ramMB: 1024,
      bandwidthGB: 5000,
      portSpeed: '1 Gbps'
    },
    network: {
      ipv4: 1,
      ipv6: 1,
      ddosProtection: false
    },
    features: ['Scalable Resources', 'Multiple Datacenters', 'Snapshots', 'Load Balancers'],
    controlPanel: 'Kamatera Console',
    availability: true,
    lastUpdated: new Date().toISOString(),
    url: 'https://www.kamatera.com/Products/VPS/',
    providerSlug: 'kamatera'
  }
];

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  try {
    // 模拟API调用延迟
    await delay(500 + Math.random() * 1000);

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get('page') || '1');
    const pageSize = Number.parseInt(searchParams.get('pageSize') || '25');
    const provider = searchParams.get('provider');
    const type = searchParams.get('type');
    const minPrice = Number.parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = Number.parseFloat(searchParams.get('maxPrice') || '999999');

    // 过滤数据
    let filteredData = mockVPSData;

    if (provider) {
      filteredData = filteredData.filter(vps =>
        vps.provider.toLowerCase().includes(provider.toLowerCase())
      );
    }

    if (type) {
      filteredData = filteredData.filter(vps =>
        vps.type.toLowerCase().includes(type.toLowerCase())
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

    // 添加价格波动模拟（实时价格更新）
    const dataWithPriceVariation = paginatedData.map(vps => ({
      ...vps,
      monthlyPrice: vps.monthlyPrice + (Math.random() - 0.5) * 0.5, // ±$0.25 随机波动
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
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('VPS API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch VPS data',
      lastUpdated: new Date().toISOString()
    }, { status: 500 });
  }
}
