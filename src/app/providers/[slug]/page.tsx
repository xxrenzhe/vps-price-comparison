import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Server,
  Globe,
  Clock,
  Shield,
  TrendingUp,
  MapPin,
  Award,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// Provider information data
const providerInfo = {
  digitalocean: {
    name: 'DigitalOcean',
    description: 'Cloud infrastructure provider offering virtual private servers, managed databases, and more.',
    website: 'https://www.digitalocean.com',
    founded: '2011',
    headquarters: 'New York, USA',
    features: ['Developer-friendly', 'API-first', 'Global data centers', 'Managed services'],
    specialties: ['Cloud VPS', 'Kubernetes', 'App Platform', 'Managed Databases'],
    pros: ['Simple pricing', 'Great documentation', 'Strong API', 'Active community'],
    cons: ['Limited phone support', 'Basic monitoring', 'No Windows VPS'],
    rating: 4.5,
    customers: '600,000+',
    datacenters: 14
  },
  vultr: {
    name: 'Vultr',
    description: 'High-performance cloud compute platform with global locations and flexible pricing.',
    website: 'https://www.vultr.com',
    founded: '2014',
    headquarters: 'Florida, USA',
    features: ['High-frequency compute', 'Global locations', 'Block storage', 'Load balancers'],
    specialties: ['Cloud VPS', 'Bare Metal', 'Kubernetes', 'Object Storage'],
    pros: ['Competitive pricing', 'Many locations', 'Good performance', 'Quick deployment'],
    cons: ['Limited managed services', 'Basic support', 'No phone support'],
    rating: 4.3,
    customers: '450,000+',
    datacenters: 25
  },
  linode: {
    name: 'Linode',
    description: 'Independent cloud computing provider offering Linux virtual machines, storage, and networking.',
    website: 'https://www.linode.com',
    founded: '2003',
    headquarters: 'Philadelphia, USA',
    features: ['Linux-focused', 'Premium hardware', 'Expert support', 'Open source advocacy'],
    specialties: ['VPS Hosting', 'Kubernetes Engine', 'Object Storage', 'NodeBalancers'],
    pros: ['Excellent support', 'Transparent pricing', 'Strong performance', 'Linux expertise'],
    cons: ['No Windows support', 'Limited managed services', 'Fewer locations'],
    rating: 4.6,
    customers: '800,000+',
    datacenters: 11
  },
  aws: {
    name: 'Amazon AWS',
    description: 'Leading cloud platform offering comprehensive suite of cloud computing services.',
    website: 'https://aws.amazon.com',
    founded: '2006',
    headquarters: 'Seattle, USA',
    features: ['Comprehensive services', 'Global infrastructure', 'Enterprise-grade', 'Advanced features'],
    specialties: ['Cloud VPS', 'Serverless', 'Machine Learning', 'Enterprise Solutions'],
    pros: ['Most comprehensive', 'Enterprise features', 'Global reach', 'Innovation leader'],
    cons: ['Complex pricing', 'Steep learning curve', 'Can be expensive', 'Overwhelming options'],
    rating: 4.4,
    customers: '1M+',
    datacenters: 80
  },
  'google-cloud': {
    name: 'Google Cloud',
    description: 'Google\'s cloud computing platform offering infrastructure and platform services.',
    website: 'https://cloud.google.com',
    founded: '2008',
    headquarters: 'California, USA',
    features: ['Google technology', 'Machine learning', 'Kubernetes native', 'Global network'],
    specialties: ['Cloud VPS', 'AI/ML', 'Data Analytics', 'Kubernetes'],
    pros: ['Advanced AI/ML', 'Excellent network', 'Competitive pricing', 'Innovation'],
    cons: ['Smaller ecosystem', 'Less enterprise adoption', 'Complex billing'],
    rating: 4.3,
    customers: '6M+',
    datacenters: 35
  },
  hostinger: {
    name: 'Hostinger',
    description: 'Affordable web hosting provider offering shared hosting, VPS, and cloud hosting solutions.',
    website: 'https://www.hostinger.com',
    founded: '2004',
    headquarters: 'Kaunas, Lithuania',
    features: ['Affordable pricing', 'User-friendly', 'Multiple hosting types', 'Global presence'],
    specialties: ['Shared Hosting', 'VPS Hosting', 'WordPress Hosting', 'Website Builder'],
    pros: ['Very affordable', 'Good performance', 'Easy to use', 'Multiple locations'],
    cons: ['Limited advanced features', 'Basic support', 'Resource limitations'],
    rating: 4.2,
    customers: '29M+',
    datacenters: 7
  },
  ovhcloud: {
    name: 'OVHcloud',
    description: 'European cloud provider offering web hosting, VPS, dedicated servers, and cloud solutions.',
    website: 'https://www.ovhcloud.com',
    founded: '1999',
    headquarters: 'Roubaix, France',
    features: ['European focus', 'GDPR compliant', 'Own datacenters', 'Competitive pricing'],
    specialties: ['VPS Hosting', 'Dedicated Servers', 'Cloud Solutions', 'Web Hosting'],
    pros: ['GDPR compliant', 'Good pricing', 'European focus', 'Own infrastructure'],
    cons: ['Limited global presence', 'Interface complexity', 'Language barriers'],
    rating: 4.1,
    customers: '1.6M+',
    datacenters: 37
  },
  hetzner: {
    name: 'Hetzner',
    description: 'German hosting company offering dedicated servers, VPS, and cloud solutions with excellent value.',
    website: 'https://www.hetzner.com',
    founded: '1997',
    headquarters: 'Gunzenhausen, Germany',
    features: ['Excellent value', 'Own datacenters', 'Green energy', 'German engineering'],
    specialties: ['Cloud VPS', 'Dedicated Servers', 'Storage', 'Networking'],
    pros: ['Excellent price/performance', 'Reliable infrastructure', 'Good support', 'Environmental focus'],
    cons: ['Limited locations', 'European focus', 'Basic managed services'],
    rating: 4.7,
    customers: '3M+',
    datacenters: 5
  },
  contabo: {
    name: 'Contabo',
    description: 'German hosting provider offering high-performance VPS and dedicated servers at competitive prices.',
    website: 'https://contabo.com',
    founded: '2003',
    headquarters: 'Munich, Germany',
    features: ['High performance', 'Competitive pricing', 'No traffic limits', 'DDoS protection'],
    specialties: ['VPS Hosting', 'Dedicated Servers', 'Colocation', 'Storage'],
    pros: ['Excellent value', 'High specs', 'Unlimited traffic', 'Good performance'],
    cons: ['Setup fees', 'Limited locations', 'Basic support', 'No managed services'],
    rating: 4.0,
    customers: '250,000+',
    datacenters: 6
  }
};

interface ProviderPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProviderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = providerInfo[slug as keyof typeof providerInfo];

  if (!provider) {
    return {
      title: 'Provider Not Found - Cheap VPS List',
      description: 'The requested VPS provider could not be found.',
    };
  }

  return {
    title: `${provider.name} VPS Hosting Review & Plans - Cheap VPS List`,
    description: `${provider.description} Compare ${provider.name} VPS hosting plans, pricing, and features.`,
  };
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { slug } = await params;
  const provider = providerInfo[slug as keyof typeof providerInfo];

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Server className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Provider Not Found</h1>
            <p className="text-gray-600 mb-6">The VPS provider you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/providers">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Providers
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // In a real application, this would fetch VPS plans for this provider from an API
  const mockVPSPlans = [
    // This would be dynamically loaded based on the provider
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/providers">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Providers
            </Link>
          </Button>
        </div>

        {/* Provider Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Provider Info */}
            <div className="md:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Server className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{provider.name}</h1>
                  <p className="text-gray-600 mb-4">{provider.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Founded {provider.founded}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{provider.headquarters}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{provider.customers} customers</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{provider.datacenters} data centers</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={`rating-${provider.name}-${i}`}
                            className={`h-4 w-4 ${i < Math.floor(provider.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">{provider.rating}/5</span>
                    </div>
                    <Button asChild>
                      <a href={provider.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating</span>
                    <span className="font-medium">{provider.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium">{provider.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customers</span>
                    <span className="font-medium">{provider.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Centers</span>
                    <span className="font-medium">{provider.datacenters}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {provider.specialties.map((specialty) => (
            <Card key={specialty} className="text-center">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium text-gray-800">{specialty}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Key Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {provider.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Pros & Cons</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {provider.pros.map((pro) => (
                      <li key={pro} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {provider.cons.map((con) => (
                      <li key={con} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* VPS Plans Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{provider.name} VPS Plans</CardTitle>
            <p className="text-gray-600">
              Compare all available VPS hosting plans from {provider.name}
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                VPS plans for {provider.name} are displayed in the main comparison table.
              </p>
              <Button asChild>
                <Link href={`/?provider=${encodeURIComponent(provider.name)}`}>
                  View {provider.name} Plans
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Providers */}
        <Card>
          <CardHeader>
            <CardTitle>Similar Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(providerInfo)
                .filter(([key]) => key !== slug)
                .slice(0, 3)
                .map(([key, info]) => (
                  <div key={key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Server className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{info.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">{info.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {info.description.slice(0, 80)}...
                    </p>
                    <Link
                      href={`/providers/${key}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Learn more →
                    </Link>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
