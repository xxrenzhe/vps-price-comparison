import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Bell,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Clock,
  Users,
  Globe
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Newsletter - Cheap VPS List',
  description: 'Subscribe to our newsletter for the latest VPS hosting deals, industry news, and exclusive insights delivered to your inbox.',
};

export default function NewsletterPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Weekly Price Alerts",
      description: "Get notified when VPS prices drop or new deals become available from your favorite providers."
    },
    {
      icon: Star,
      title: "Exclusive Reviews",
      description: "Access our in-depth provider reviews and performance tests before they're published publicly."
    },
    {
      icon: Bell,
      title: "Industry News",
      description: "Stay updated with the latest hosting industry trends, mergers, acquisitions, and technology updates."
    },
    {
      icon: Shield,
      title: "Security Alerts",
      description: "Receive immediate notifications about security vulnerabilities affecting VPS providers and hosting platforms."
    },
    {
      icon: Zap,
      title: "New Provider Alerts",
      description: "Be the first to know when we add new VPS providers or when existing providers launch new plans."
    },
    {
      icon: Globe,
      title: "Regional Insights",
      description: "Get region-specific hosting recommendations and datacenter performance insights for your target markets."
    }
  ];

  const stats = [
    { value: "5,000+", label: "Active Subscribers", icon: Users },
    { value: "Weekly", label: "Delivery Schedule", icon: Clock },
    { value: "No Spam", label: "Quality Promise", icon: Shield },
    { value: "Free", label: "Always", icon: CheckCircle }
  ];

  const testimonials = [
    {
      name: "Alex M.",
      role: "DevOps Engineer",
      content: "The weekly deals digest has saved me hundreds of dollars on VPS hosting. Best newsletter in the hosting space!",
      rating: 5
    },
    {
      name: "Sarah K.",
      role: "Startup Founder",
      content: "Love the security alerts. They've helped me avoid providers with known issues and make safer hosting choices.",
      rating: 5
    },
    {
      name: "Mike R.",
      role: "Web Developer",
      content: "The new provider alerts are gold. I've discovered some amazing hosting deals before they became popular.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            VPS Hosting Newsletter
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Stay ahead of the hosting game with weekly insights, price alerts, and exclusive content
            delivered straight to your inbox. Join thousands of developers and business owners who trust our updates.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% free</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-800 mb-1">
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

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Signup Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-6 w-6 text-blue-600" />
                  <span>Subscribe to Our Newsletter</span>
                </CardTitle>
                <p className="text-gray-600">
                  Join our community and never miss a great VPS deal or important hosting update.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                      What interests you most? (Optional)
                    </label>
                    <select
                      id="interests"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your main interest</option>
                      <option value="deals">Price alerts and deals</option>
                      <option value="reviews">Provider reviews and comparisons</option>
                      <option value="security">Security and compliance updates</option>
                      <option value="industry">Industry news and trends</option>
                      <option value="technical">Technical guides and tutorials</option>
                      <option value="all">All of the above</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Role (Optional)
                    </label>
                    <select
                      id="role"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select your role</option>
                      <option value="developer">Developer</option>
                      <option value="devops">DevOps Engineer</option>
                      <option value="founder">Startup Founder</option>
                      <option value="it-admin">IT Administrator</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agree"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="agree" className="text-sm text-gray-600">
                      I agree to receive emails from Cheap VPS List and understand I can unsubscribe at any time.
                      View our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                    </label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Subscribe to Newsletter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Get */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.slice(0, 4).map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 text-sm">{benefit.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Benefits Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Everything You'll Receive
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800">{benefit.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What Our Subscribers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sample Newsletter */}
        <Card className="border-0 shadow-sm mb-12">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sample Newsletter Content</CardTitle>
            <p className="text-center text-gray-600">
              Here's a preview of what you can expect in our weekly newsletter
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="mb-4">
                <Badge className="mb-2">This Week's Top Deals</Badge>
                <div className="space-y-2 text-sm">
                  <p>• <strong>Hostinger VPS:</strong> 40% off all plans - Starting at $2.99/month</p>
                  <p>• <strong>DigitalOcean:</strong> $200 credit for new users</p>
                  <p>• <strong>Vultr:</strong> Double bandwidth on all instances</p>
                </div>
              </div>

              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Security Alert</Badge>
                <p className="text-sm text-gray-600">
                  Critical vulnerability patched in popular control panel software.
                  Check if your provider has applied the latest updates.
                </p>
              </div>

              <div>
                <Badge variant="secondary" className="mb-2">New Provider Spotlight</Badge>
                <p className="text-sm text-gray-600">
                  CloudSigma launches new US West Coast datacenter with
                  competitive pricing and enhanced DDoS protection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Privacy & Data Protection</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• We never sell or share your email address with third parties</p>
                  <p>• You can unsubscribe instantly with one click</p>
                  <p>• All data is encrypted and stored securely</p>
                  <p>• We're fully GDPR compliant for our European subscribers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
