import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Calendar, Server, Star } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

interface Provider {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  founded: string;
  locations: string[];
  features: string[];
  priceRange: string;
  platforms: string[];
  specialties: string[];
}

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center p-1">
              <Image
                src={provider.logo}
                alt={`${provider.name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {provider.name}
              </CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Since {provider.founded}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-green-700 border-green-300">
            {provider.priceRange}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {provider.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Locations */}
        <div>
          <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Locations ({provider.locations.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {provider.locations.slice(0, 3).map((location) => (
              <Badge key={location} variant="secondary" className="text-xs">
                {location}
              </Badge>
            ))}
            {provider.locations.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{provider.locations.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Star className="h-4 w-4 mr-1" />
            <span>Key Features</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {provider.features.slice(0, 4).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Specialties
          </div>
          <div className="flex flex-wrap gap-1">
            {provider.specialties.map((specialty) => (
              <Badge key={specialty} className="text-xs bg-blue-100 text-blue-800">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Platforms
          </div>
          <div className="flex flex-wrap gap-1">
            {provider.platforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              asChild
            >
              <Link href={`/providers/${provider.id}`}>
                View Plans
              </Link>
            </Button>
            <Button
              size="sm"
              className="text-xs"
              asChild
            >
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Visit Site
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
