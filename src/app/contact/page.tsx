import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  MessageSquare,
  Twitter,
  MessageCircle,
  Clock,
  MapPin,
  Phone,
  Send,
  User,
  HelpCircle,
  Bug,
  Lightbulb,
  Star
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

const contactInfo = {
  address: "123 Cloud St, San Francisco, CA 94107",
  phone: "+1 (555) 123-4567",
  email: "hello@bestvpslist.com",
  hours: "Mon-Fri, 9am - 5pm PT"
};

export const metadata: Metadata = {
  title: 'Contact - Best VPS List',
  description: 'Get in touch with the Best VPS List team. Send us your questions, feedback, or suggestions about VPS hosting.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or feedback",
      contact: "hello@bestvpslist.com",
      responseTime: "Within 24 hours",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Twitter,
      title: "Twitter",
      description: "Follow us for updates and quick questions",
      contact: "@bestvpslist",
      responseTime: "Within 4 hours",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Reddit Community",
      description: "Join our community discussions",
      contact: "r/bestvps",
      responseTime: "Community moderated",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const inquiryTypes = [
    {
      icon: HelpCircle,
      title: "General Support",
      description: "Questions about using our platform or VPS hosting in general"
    },
    {
      icon: Bug,
      title: "Bug Reports",
      description: "Found an issue? Let us know so we can fix it"
    },
    {
      icon: Lightbulb,
      title: "Feature Requests",
      description: "Suggest new features or improvements"
    },
    {
      icon: Star,
      title: "Provider Submissions",
      description: "Suggest new VPS providers to add to our database"
    }
  ];

  const faqs = [
    {
      question: "How often is pricing data updated?",
      answer: "We update pricing data every 30 seconds for real-time accuracy. Our system continuously monitors provider APIs and websites."
    },
    {
      question: "Do you accept payments from hosting providers?",
      answer: "No, we don't accept payments for rankings or featured placements. Our comparisons are based purely on data and user value."
    },
    {
      question: "Can I suggest a new VPS provider?",
      answer: "Absolutely! Use our contact form or email us with provider details. We evaluate all suggestions for inclusion."
    },
    {
      question: "How do you verify provider information?",
      answer: "Our team manually verifies all provider claims, tests services when possible, and continuously monitors for accuracy."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Have questions about VPS hosting or our platform? We're here to help!
            Reach out to us using any of the methods below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-6 w-6 text-blue-600" />
                  <span>Send us a Message</span>
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-type" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiry-type"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Support</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="provider">Provider Submission</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us more about your question or feedback..."
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.title} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${method.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{method.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                        <p className="text-sm font-medium text-blue-600">{method.contact}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{method.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Inquiry Types */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">What can we help with?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inquiryTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.title} className="flex items-start space-x-3">
                      <Icon className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{type.title}</h4>
                        <p className="text-xs text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Our Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium text-gray-800">Best VPS List</p>
                    <p>{contactInfo.address}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone</p>
                    <p>{contactInfo.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p>{contactInfo.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Hours</p>
                    <p>{contactInfo.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Media & Community */}
        <Card className="border-0 shadow-sm mb-12">
          <CardHeader>
            <CardTitle className="text-xl text-center">Join Our Community</CardTitle>
            <p className="text-center text-gray-600">
              Connect with us on social media for updates, tips, and community discussions.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button variant="outline" asChild>
                <Link href="https://twitter.com/bestvpslist" className="flex items-center space-x-2">
                  <Twitter className="h-4 w-4 text-blue-500" />
                  <span>Follow on Twitter</span>
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="https://reddit.com/r/bestvps" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-orange-500" />
                  <span>Join Reddit Community</span>
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/newsletter" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-500" />
                  <span>Subscribe Newsletter</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Notice */}
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Response Times</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• <strong>Email:</strong> We typically respond within 24 hours</p>
                  <p>• <strong>Twitter:</strong> Quick questions answered within 4 hours</p>
                  <p>• <strong>Bug Reports:</strong> Critical issues addressed within 12 hours</p>
                  <p>• <strong>Feature Requests:</strong> Acknowledged within 48 hours</p>
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
