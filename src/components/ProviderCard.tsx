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

const providerColors: { [key: string]: { bg: string, border: string, text: string, darkBg: string, darkBorder: string, darkText: string, darkHoverBg: string } } = {
  "a2hosting":     { bg: "bg-green-50/50",   border: "border-green-200",   text: "text-green-800",   darkBg: "dark:bg-green-900/20", darkBorder: "dark:border-green-800/30", darkText: "dark:text-green-300", darkHoverBg: "dark:hover:bg-green-900/40" },
  "bandwagonhost": { bg: "bg-red-50/50",     border: "border-red-200",     text: "text-red-800",     darkBg: "dark:bg-red-900/20",   darkBorder: "dark:border-red-800/30",   darkText: "dark:text-red-300",   darkHoverBg: "dark:hover:bg-red-900/40" },
  "bluehost":      { bg: "bg-blue-50/50",    border: "border-blue-200",    text: "text-blue-800",    darkBg: "dark:bg-blue-900/20",  darkBorder: "dark:border-blue-800/30",  darkText: "dark:text-blue-300",  darkHoverBg: "dark:hover:bg-blue-900/40" },
  "chemicloud":    { bg: "bg-sky-50/50",     border: "border-sky-200",     text: "text-sky-800",     darkBg: "dark:bg-sky-900/20",   darkBorder: "dark:border-sky-800/30",   darkText: "dark:text-sky-300",   darkHoverBg: "dark:hover:bg-sky-900/40" },
  "cloudways":     { bg: "bg-indigo-50/50",  border: "border-indigo-200",  text: "text-indigo-800",  darkBg: "dark:bg-indigo-900/20",darkBorder: "dark:border-indigo-800/30",darkText: "dark:text-indigo-300", darkHoverBg: "dark:hover:bg-indigo-900/40" },
  "dreamhost":     { bg: "bg-fuchsia-50/50", border: "border-fuchsia-200", text: "text-fuchsia-800", darkBg: "dark:bg-fuchsia-900/20",darkBorder: "dark:border-fuchsia-800/30",darkText: "dark:text-fuchsia-300", darkHoverBg: "dark:hover:bg-fuchsia-900/40" },
  "fastcomet":     { bg: "bg-rose-50/50",    border: "border-rose-200",    text: "text-rose-800",    darkBg: "dark:bg-rose-900/20",  darkBorder: "dark:border-rose-800/30",  darkText: "dark:text-rose-300",  darkHoverBg: "dark:hover:bg-rose-900/40" },
  "greengeeks":    { bg: "bg-lime-50/50",    border: "border-lime-200",    text: "text-lime-800",    darkBg: "dark:bg-lime-900/20",  darkBorder: "dark:border-lime-800/30",  darkText: "dark:text-lime-300",  darkHoverBg: "dark:hover:bg-lime-900/40" },
  "hostarmada":    { bg: "bg-pink-50/50",    border: "border-pink-200",    text: "text-pink-800",    darkBg: "dark:bg-pink-900/20",  darkBorder: "dark:border-pink-800/30",  darkText: "dark:text-pink-300",  darkHoverBg: "dark:hover:bg-pink-900/40" },
  "hostpapa":      { bg: "bg-teal-50/50",    border: "border-teal-200",    text: "text-teal-800",    darkBg: "dark:bg-teal-900/20",  darkBorder: "dark:border-teal-800/30",  darkText: "dark:text-teal-300",  darkHoverBg: "dark:hover:bg-teal-900/40" },
  "inmotion":      { bg: "bg-cyan-50/50",    border: "border-cyan-200",    text: "text-cyan-800",    darkBg: "dark:bg-cyan-900/20",  darkBorder: "dark:border-cyan-800/30",  darkText: "dark:text-cyan-300",  darkHoverBg: "dark:hover:bg-cyan-900/40" },
  "interserver":   { bg: "bg-violet-50/50",  border: "border-violet-200",  text: "text-violet-800",  darkBg: "dark:bg-violet-900/20",darkBorder: "dark:border-violet-800/30",darkText: "dark:text-violet-300", darkHoverBg: "dark:hover:bg-violet-900/40" },
  "liquidweb":     { bg: "bg-slate-50",   border: "border-slate-200",   text: "text-slate-800",   darkBg: "dark:bg-slate-800/20",  darkBorder: "dark:border-slate-700/30", darkText: "dark:text-slate-300", darkHoverBg: "dark:hover:bg-slate-800/40" },
  "namecheap":     { bg: "bg-amber-50/50",   border: "border-amber-200",   text: "text-amber-800",   darkBg: "dark:bg-amber-900/20", darkBorder: "dark:border-amber-800/30", darkText: "dark:text-amber-300", darkHoverBg: "dark:hover:bg-amber-900/40" },
  "namehero":      { bg: "bg-indigo-50/50",  border: "border-indigo-200",  text: "text-indigo-800",  darkBg: "dark:bg-indigo-900/20",darkBorder: "dark:border-indigo-800/30",darkText: "dark:text-indigo-300", darkHoverBg: "dark:hover:bg-indigo-900/40" },
  "scalahosting":  { bg: "bg-cyan-50/50",    border: "border-cyan-200",    text: "text-cyan-800",    darkBg: "dark:bg-cyan-900/20",  darkBorder: "dark:border-cyan-800/30",  darkText: "dark:text-cyan-300",  darkHoverBg: "dark:hover:bg-cyan-900/40" },
  "siteground":    { bg: "bg-orange-50/50",  border: "border-orange-200",  text: "text-orange-800",  darkBg: "dark:bg-orange-900/20",darkBorder: "dark:border-orange-800/30",darkText: "dark:text-orange-300", darkHoverBg: "dark:hover:bg-orange-900/40" },
  "default":       { bg: "bg-gray-50",    border: "border-gray-200",    text: "text-gray-800",    darkBg: "dark:bg-gray-800/20",   darkBorder: "dark:border-gray-700/30",  darkText: "dark:text-gray-300",  darkHoverBg: "dark:hover:bg-gray-800/40" }
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const colorClasses = providerColors[provider.id] || providerColors.default;

  return (
    <Card className={`bg-card h-full flex flex-col transition-all duration-300 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.darkBg} ${colorClasses.darkBorder} ${colorClasses.darkHoverBg} hover:shadow-xl hover:-translate-y-1`}>
      <CardHeader className="p-4 sm:p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white border rounded-lg flex items-center justify-center p-1 shadow-sm">
              <Image
                src={provider.logo}
                alt={`${provider.name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <CardTitle className={`text-base sm:text-lg font-bold ${colorClasses.text} ${colorClasses.darkText}`}>
                {provider.name}
              </CardTitle>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Since {provider.founded}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-400 dark:border-green-600">
            {provider.priceRange}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t dark:border-gray-500/20">
          {provider.description}
        </p>
      </CardHeader>

      <CardContent className="bg-card flex-1 flex flex-col justify-between space-y-4 p-4 pt-0">
        <div className="space-y-4">
          {/* Locations */}
          <div>
            <div className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>Locations</span>
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
            <div className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              <Star className="h-4 w-4 mr-1.5" />
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
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
              Specialties
            </div>
            <div className="flex flex-wrap gap-1">
              {provider.specialties.map((specialty) => (
                <Badge key={specialty} className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
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
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
