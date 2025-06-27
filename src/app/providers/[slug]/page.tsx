import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import type { VPSPlan, APIResponse, PaginatedVPSResponse } from '@/types/vps';
import { providerDetails } from '@/services/providerData';
import { mockVPSData } from '@/services/vpsData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import type { Metadata } from "next";
import VPSTable from '@/components/VPSTable';

export async function generateStaticParams() {
  return providerDetails.map((p) => ({
    slug: p.id,
  }));
}

type ProviderDetailPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ProviderDetailPageProps): Promise<Metadata> {
  const { slug } = params;
  const provider = providerDetails.find(p => p.id === slug);

  if (!provider) {
    return { title: 'Provider Not Found' };
  }

  return {
    title: `${provider.name} Review & Pricing`,
    description: provider.description,
    openGraph: {
        title: `${provider.name} Review & Pricing`,
        description: provider.description,
        url: `https://vps-price-comparison.com/providers/${provider.id}`,
        images: [
            {
                url: `https://vps-price-comparison.com${provider.logo}`,
                width: 200,
                height: 200,
                alt: `${provider.name} Logo`,
            },
        ],
    },
    twitter: {
      card: 'summary',
      title: `${provider.name} Review & Pricing`,
      description: provider.description,
      images: [`https://vps-price-comparison.com${provider.logo}`],
    }
  };
}

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const { slug } = params;
  const provider = providerDetails.find(p => p.id === slug);

  if (!provider) {
    notFound();
  }

  // Directly filter plans instead of fetching from an API
  const plans = mockVPSData.filter(plan => plan.providerSlug === slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: provider.name,
    url: provider.website,
    logo: `https://vps-price-comparison.com${provider.logo}`,
    description: provider.description,
    foundingDate: provider.founded,
    address: {
      '@type': 'PostalAddress',
      addressLocality: provider.headquarters.split(', ')[0],
      addressCountry: provider.headquarters.split(', ')[1],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: provider.rating,
      reviewCount: provider.customers.replace(/[^0-9]/g, ''), 
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image src={provider.logo} alt={`${provider.name} logo`} width={48} height={48} className="object-contain" />
                    <div>
                      <h1 className="text-3xl font-bold">{provider.name}</h1>
                      <div className="prose max-w-none">
                        <p>{provider.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Founded</p>
                      <p className="text-lg font-semibold">{provider.founded}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-lg font-semibold">{provider.rating} / 5</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Customers</p>
                      <p className="text-lg font-semibold">{provider.customers}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Datacenters</p>
                      <p className="text-lg font-semibold">{provider.datacenters}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
                  VPS Plans from {provider.name}
                </h2>
                <VPSTable
                  providerFilter={slug}
                  showProviderColumn={false}
                  defaultPageSize={10}
                  showDataSourceToggle={false}
                  showProviderFilter={false}
                  showTypeFilter={false}
                />
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Quick Facts</h3>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong>Founded:</strong> {provider.founded}</li>
                    <li><strong>Headquarters:</strong> {provider.headquarters}</li>
                    <li><strong>Datacenters:</strong> {provider.datacenters}</li>
                    <li><strong>Customers:</strong> {provider.customers}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Features</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature) => (
                      <Badge key={feature} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Specialties</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">Other Providers</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {providerDetails
                      .filter(p => p.id !== slug)
                      .slice(0, 5)
                      .map(p => (
                        <Link key={p.id} href={`/providers/${p.id}`} className="flex items-center space-x-2 text-sm text-blue-600 hover:underline">
                           <Image src={p.logo} alt={`${p.name} logo`} width={20} height={20} className="object-contain" />
                           <span>{p.name}</span>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
