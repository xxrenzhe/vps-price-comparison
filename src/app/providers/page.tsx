import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProviderCard from "@/components/ProviderCard";
import { Metadata } from 'next';
import { mockVPSData } from '@/services/vpsData';
import { providerDetails } from '@/services/providerData';

export const metadata: Metadata = {
  title: 'VPS Providers - Best VPS List',
  description: 'Compare all VPS hosting providers. Find ratings, reviews, and detailed information for each provider.',
};

// Get a unique list of provider names from the actual VPS data
const activeProviderNames = [...new Set(mockVPSData.map(plan => plan.provider))];

// Filter the detailed provider information to only include active providers
const activeProviders = providerDetails.filter(provider => 
  activeProviderNames.some(activeName => 
    provider.name.toLowerCase() === activeName.toLowerCase()
  )
);

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navigation />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            VPS Hosting Providers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Discover and compare VPS hosting providers from around the world.
            Find the perfect hosting solution for your needs.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {activeProviders.length} providers across {new Set(activeProviders.flatMap(p => p.locations)).size} countries
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            About VPS Hosting Providers
          </h2>
          <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400">
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
