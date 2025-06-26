import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VPS Providers - Cheap VPS List',
  description: 'Browse all VPS hosting providers and their service offerings. Compare features, pricing, and locations.',
};

const providers = [
  {
    id: 'siteground',
    name: 'Siteground',
    description: 'Premium web hosting with excellent performance and support',
    website: 'https://www.siteground.com',
    logo: '/providers/siteground.png',
    founded: '2004',
    locations: ['United States', 'Netherlands', 'United Kingdom', 'Singapore'],
    features: ['SSD Storage', 'Daily Backups', '24/7 Support', 'CloudFlare CDN'],
    priceRange: '$100 - $200',
    platforms: ['KVM'],
    specialties: ['WordPress Hosting', 'E-commerce', 'Enterprise Solutions']
  },
  {
    id: 'greengeeks',
    name: 'GreenGeeks',
    description: 'Eco-friendly web hosting with renewable energy commitment',
    website: 'https://www.greengeeks.com',
    logo: '/providers/greengeeks.png',
    founded: '2008',
    locations: ['United States', 'Canada', 'Netherlands'],
    features: ['Eco-Friendly', 'Free SSL', 'Free Migration', 'cPanel/WHM'],
    priceRange: '$39.95 - $59.95',
    platforms: ['KVM'],
    specialties: ['Green Hosting', 'Shared Hosting', 'VPS Hosting']
  },
  {
    id: 'hostarmada',
    name: 'HostArmada',
    description: 'Fast and reliable hosting with cutting-edge technology',
    website: 'https://hostarmada.com',
    logo: '/providers/hostarmada.png',
    founded: '2019',
    locations: ['United States', 'United Kingdom', 'India', 'Australia'],
    features: ['CloudLinux', 'Free Setup', 'LiteSpeed', 'Free SSL'],
    priceRange: '$41.21+',
    platforms: ['OpenVZ', 'KVM'],
    specialties: ['Cloud Hosting', 'WordPress Hosting', 'VPS Hosting']
  },
  {
    id: 'bluehost',
    name: 'Bluehost',
    description: 'One of the largest web hosting companies, WordPress recommended',
    website: 'https://www.bluehost.com',
    logo: '/providers/bluehost.png',
    founded: '2003',
    locations: ['United States'],
    features: ['WordPress Recommended', 'Enhanced cPanel', 'Free Domain', '24/7 Support'],
    priceRange: '$18.99 - $29.99',
    platforms: ['KVM'],
    specialties: ['WordPress Hosting', 'Shared Hosting', 'Dedicated Servers']
  },
  {
    id: 'scalahosting',
    name: 'ScalaHosting',
    description: 'Innovative hosting solutions with custom SPanel control panel',
    website: 'https://www.scalahosting.com',
    logo: '/providers/scalahosting.png',
    founded: '2007',
    locations: ['United States', 'Europe'],
    features: ['SPanel Control Panel', 'Free SSL', 'SShield Security', 'Free Migration'],
    priceRange: '$9.95+',
    platforms: ['KVM'],
    specialties: ['VPS Hosting', 'Cloud Hosting', 'Managed WordPress']
  },
  {
    id: 'fastcomet',
    name: 'FastComet',
    description: 'Global hosting provider with emphasis on speed and security',
    website: 'https://www.fastcomet.com',
    logo: '/providers/fastcomet.png',
    founded: '2013',
    locations: ['United States', 'United Kingdom', 'Netherlands', 'Singapore', 'Japan'],
    features: ['Free Migration', 'Cloudflare CDN', 'Daily Backups', 'SSD Storage'],
    priceRange: '$46.95+',
    platforms: ['KVM'],
    specialties: ['Cloud Hosting', 'WordPress Hosting', 'VPS Hosting']
  },
  {
    id: 'bandwagonhost',
    name: 'BandwagonHost',
    description: 'Affordable VPS hosting with premium network connectivity',
    website: 'https://bandwagonhost.com',
    logo: '/providers/bandwagonhost.png',
    founded: '2012',
    locations: ['United States', 'Canada', 'Netherlands', 'Hong Kong'],
    features: ['CN2 GIA Network', 'KiwiVM Control Panel', 'Snapshots', 'Migration Tools'],
    priceRange: '$16.88 - $169.99',
    platforms: ['KVM'],
    specialties: ['VPS Hosting', 'China-Optimized Routes', 'Premium Networks']
  },
  {
    id: 'hostinger',
    name: 'Hostinger',
    description: 'Affordable hosting solutions with modern technology stack',
    website: 'https://www.hostinger.com',
    logo: '/providers/hostinger.png',
    founded: '2004',
    locations: ['United States', 'United Kingdom', 'Lithuania', 'Singapore', 'Brazil'],
    features: ['NVMe SSD', 'AI Assistant', 'Weekly Backups', 'Global CDN'],
    priceRange: '$3.95 - $15.95',
    platforms: ['KVM'],
    specialties: ['Shared Hosting', 'VPS Hosting', 'Cloud Hosting']
  },
  {
    id: 'interserver',
    name: 'Interserver',
    description: 'Reliable hosting with price lock guarantee and unlimited features',
    website: 'https://www.interserver.net',
    logo: '/providers/interserver.png',
    founded: '1999',
    locations: ['United States'],
    features: ['Price Lock Guarantee', 'Free Migration', 'Unlimited Storage', '99.9% Uptime'],
    priceRange: '$6.00 - $18.00',
    platforms: ['KVM'],
    specialties: ['VPS Hosting', 'Dedicated Servers', 'Web Hosting']
  }
];

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            VPS Hosting Providers
          </h1>
          <p className="text-gray-600 mb-2">
            Discover and compare VPS hosting providers from around the world.
            Find the perfect hosting solution for your needs.
          </p>
          <div className="text-sm text-gray-500">
            Showing {providers.length} providers across {new Set(providers.flatMap(p => p.locations)).size} countries
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            About VPS Hosting Providers
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              Virtual Private Server (VPS) hosting offers a perfect balance between shared hosting
              and dedicated servers. Each provider listed here offers unique features, pricing models,
              and geographical coverage to meet different needs.
            </p>
            <p className="mb-4">
              When choosing a VPS provider, consider factors such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Server locations and network quality</li>
              <li>Hardware specifications and performance</li>
              <li>Pricing and contract flexibility</li>
              <li>Control panel and management tools</li>
              <li>Customer support and uptime guarantees</li>
              <li>Scalability and upgrade options</li>
            </ul>
            <p>
              Our comparison tool helps you evaluate these factors across multiple providers
              to find the best VPS hosting solution for your specific requirements.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
