import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Server,
  TrendingUp,
  Shield,
  Globe,
  Users,
  Clock,
  Target,
  Heart,
  Star,
  Award
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About - Best VPS List',
  description: 'Learn about Best VPS List, our mission to help you find the best VPS hosting deals, and our commitment to transparent pricing comparison.',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      description: "DevOps engineer with 8+ years of experience in cloud infrastructure and VPS hosting. Passionate about helping others find cost-effective hosting solutions.",
      specialties: ["Performance Optimization", "API Development", "Infrastructure"],
    },
    {
      name: "Sarah Johnson",
      role: "Content Manager",
      description: "Technical writer and hosting specialist with extensive knowledge of the web hosting industry. Creates in-depth guides and reviews.",
      specialties: ["Technical Writing", "Provider Analysis", "Industry Research"],
    },
    {
      name: "Mike Rodriguez",
      role: "Security Specialist",
      description: "Cybersecurity expert focused on VPS security best practices and server hardening techniques.",
      specialties: ["Security Auditing", "Server Management", "Risk Assessment"],
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Price Tracking",
      description: "Monitor VPS pricing changes across multiple providers with automatic updates every 30 seconds."
    },
    {
      icon: Shield,
      title: "Provider Verification",
      description: "We verify all hosting providers and their claims to ensure accurate and reliable information."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Compare VPS plans from providers worldwide with servers in 15+ countries and regions."
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring of provider APIs and service availability to provide up-to-date status."
    }
  ];

  const stats = [
    { label: "VPS Providers", value: "14+", icon: Server },
    { label: "VPS Plans Tracked", value: "25+", icon: Target },
    { label: "Countries Covered", value: "15+", icon: Globe },
    { label: "Daily Users", value: "1000+", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Best VPS List
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            We're on a mission to make VPS hosting comparison simple, transparent,
            and accessible for everyone. Find the best deals without the hassle.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-gray-600">Made with love for the hosting community</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The VPS hosting market can be overwhelming with hundreds of providers,
                complex pricing structures, and promotional offers that make true comparison difficult.
              </p>
              <p className="text-gray-600 mb-4">
                We created Best VPS List to solve this problem by providing real-time,
                transparent pricing data from verified hosting providers. Our platform helps
                you make informed decisions based on actual data, not marketing claims.
              </p>
              <p className="text-gray-600">
                Whether you're a developer looking for a testing environment or a business
                seeking reliable hosting infrastructure, we're here to help you find the
                perfect VPS solution at the best price.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-green-600" />
                <span>Why Choose Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">
                    <strong>Real-time Data:</strong> Live pricing updates and API monitoring
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">
                    <strong>No Bias:</strong> We don't accept payments from providers for rankings
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">
                    <strong>Expert Reviews:</strong> Technical analysis by industry professionals
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">
                    <strong>Community Driven:</strong> User reviews and feedback integration
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="border-0 shadow-sm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <Card className="border-0 shadow-sm mb-12">
          <CardHeader>
            <CardTitle className="text-xl text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Data Collection</h3>
                <p className="text-sm text-gray-600">
                  We continuously monitor VPS provider APIs and websites to collect
                  real-time pricing and feature information.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Verification</h3>
                <p className="text-sm text-gray-600">
                  Our team verifies provider information, tests performance claims,
                  and ensures data accuracy before publishing.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Comparison</h3>
                <p className="text-sm text-gray-600">
                  You get access to clean, organized comparison data that helps
                  you make informed hosting decisions quickly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Find Your Perfect VPS?
          </h2>
          <p className="text-gray-600 mb-6">
            Start comparing VPS hosting plans from top providers and find the best deal for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                Browse VPS Plans
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/providers">
                View All Providers
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
