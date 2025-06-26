"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Building2, Globe, DollarSign } from "lucide-react";
import { useVPSData } from "@/hooks/useVPSData";

export default function ProviderStats() {
  const { data, total, loading } = useVPSData({
    pageSize: 1000, // Get more data for stats
    autoRefresh: true
  });

  const [stats, setStats] = useState({
    totalPlans: 0,
    totalProviders: 0,
    countriesCount: 0,
    avgPrice: 0,
    lowestPrice: 0
  });

  useEffect(() => {
    if (data.length > 0) {
      const providers = new Set(data.map(vps => vps.provider));
      const countries = new Set(data.map(vps => vps.location.country));
      const prices = data.map(vps => vps.monthlyPrice);
      const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      const lowestPrice = Math.min(...prices);

      setStats({
        totalPlans: total,
        totalProviders: providers.size,
        countriesCount: countries.size,
        avgPrice,
        lowestPrice
      });
    }
  }, [data, total]);

  const statCards = [
    {
      id: "plans",
      icon: Server,
      label: "VPS Plans",
      value: stats.totalPlans.toLocaleString(),
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: "providers",
      icon: Building2,
      label: "Providers",
      value: stats.totalProviders.toString(),
      color: "bg-green-100 text-green-800"
    },
    {
      id: "countries",
      icon: Globe,
      label: "Countries",
      value: stats.countriesCount.toString(),
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: "price",
      icon: DollarSign,
      label: "Lowest Price",
      value: `${stats.lowestPrice.toFixed(2)}/mo`,
      color: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
