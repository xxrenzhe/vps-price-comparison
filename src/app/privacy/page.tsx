import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, User, Mail, Database, Cookie } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy - Best VPS List',
  description: 'Understand how we collect, use, and protect your data when you use our website and services.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: FileText,
      title: "Introduction",
      content: "Welcome to Best VPS List. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
    },
    {
      icon: User,
      title: "Information We Collect",
      content: "We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name and email address, which you voluntarily provide to us when you subscribe to our newsletter or contact us."
    },
    {
      icon: Mail,
      title: "Use of Your Information",
      content: "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to send you our newsletter, respond to your inquiries, and monitor and analyze usage and trends to improve your experience."
    },
    {
      icon: Database,
      title: "Data Security",
      content: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse."
    },
    {
      icon: Cookie,
      title: "Policy for Children",
      content: "We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <Card key={index} className="mb-6 border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <section.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xl">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-xl">Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at: 
                <a href="mailto:privacy@bestvpslist.com" className="text-blue-600 hover:underline ml-1">
                  privacy@bestvpslist.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 