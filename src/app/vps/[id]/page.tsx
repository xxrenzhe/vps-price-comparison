import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cpu, MemoryStick, HardDrive, Network, Server, Globe, DollarSign, ExternalLink, ArrowLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { VPSPlan } from '@/types/vps';
import { mockVPSData } from '@/services/vpsData';

async function getPlanDetails(id: string): Promise<{ plan: VPSPlan; otherPlans: VPSPlan[] } | null> {
  const plan = mockVPSData.find(p => p.id === id);

  if (!plan) {
    return null;
  }
  
  const otherPlans = mockVPSData
    .filter(p => p.provider === plan.provider && p.id !== id)
    .slice(0, 3);
    
  return { plan, otherPlans };
}

type VPSDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: VPSDetailPageProps): Promise<Metadata> {
  const { id } = params;
  const data = await getPlanDetails(id);
  
  if (!data?.plan) {
    return { title: 'VPS Plan Not Found' };
  }
  
  const { plan } = data;
  return {
    title: `${plan.provider} - ${plan.planName} | VPS Details`,
    description: `Detailed specifications for the ${plan.planName} plan from ${plan.provider}.`,
  };
}

export default async function VPSDetailPage({ params }: VPSDetailPageProps) {
  const { id } = params;
  const data = await getPlanDetails(id);

  if (!data?.plan) {
    notFound();
  }

  const { plan, otherPlans } = data;

  const specItems = [
    { icon: Cpu, label: 'CPU', value: plan.cpu },
    { icon: MemoryStick, label: 'RAM', value: plan.ram },
    { icon: HardDrive, label: 'Storage', value: plan.storage },
    { icon: Network, label: 'Bandwidth', value: plan.bandwidth },
    { icon: Server, label: 'Virtualization', value: plan.virtualization },
    { icon: Globe, label: 'Location', value: `${plan.location.city}, ${plan.location.country}` },
    { icon: Tag, label: 'Type', value: plan.type },
  ];

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Comparison
              </Link>
            </Button>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50 border-b p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <Link href={`/providers/${plan.providerSlug}`} className="text-sm text-blue-600 hover:underline">{plan.provider}</Link>
                  <CardTitle className="text-3xl font-bold mt-1">{plan.planName}</CardTitle>
                  <CardDescription className="mt-2 text-gray-600">
                    Detailed specifications and features for this VPS plan.
                  </CardDescription>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold text-orange-600">
                    ${plan.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">per {plan.frequency}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {specItems.map(item => (
                      <div key={item.label} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <item.icon className="h-5 w-5 text-gray-500 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">{item.label}</p>
                          <p className="font-medium text-gray-800">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Included Features</h3>
                  <div className="space-y-2">
                    {plan.includedFeatures.map(feature => (
                      <div key={feature} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {otherPlans.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    More Plans from {plan.provider}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherPlans.map(otherPlan => (
                      <Link
                        key={otherPlan.id}
                        href={`/vps/${otherPlan.id}`}
                        className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <p className="font-semibold text-gray-800">{otherPlan.planName}</p>
                        <p className="text-sm text-orange-600 font-medium">${otherPlan.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{otherPlan.cpu} / {otherPlan.ram} / {otherPlan.storage}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t text-center">
                <Button asChild size="lg">
                  <a href={plan.url} target="_blank" rel="noopener noreferrer nofollow">
                    Order Now on {plan.provider}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
} 