import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// 模拟博客文章数据 (实际应用中这应该来自数据库或CMS)
const blogPosts = [
  {
    id: '1',
    title: 'How to Choose the Right VPS Provider in 2024',
    excerpt: 'A comprehensive guide to selecting the perfect VPS hosting provider for your needs. Learn about key factors like performance, pricing, support, and more.',
    content: `Choosing the right VPS provider in 2024 requires careful consideration of multiple factors that can significantly impact your website's performance, security, and overall success. The virtual private server market has become increasingly competitive, with providers offering various features, pricing models, and performance guarantees.

When evaluating VPS providers, performance should be your primary concern. Look for providers offering modern hardware configurations including NVMe SSD storage, which provides substantially faster read/write speeds compared to traditional SATA SSDs. CPU performance is equally important - providers using AMD EPYC or Intel Xeon processors typically offer superior performance for compute-intensive applications.

Network quality and bandwidth allocation play crucial roles in user experience. Providers with their own network infrastructure or premium network partnerships generally offer better connectivity and lower latency. Consider providers with multiple data center locations if you serve a global audience, as geographical proximity to your users directly impacts loading times.

**Performance & Hardware Considerations**
Modern VPS providers should offer at minimum:
- NVMe SSD storage for database and application performance
- Latest generation CPU architectures (AMD EPYC, Intel Xeon)
- Adequate RAM allocation with potential for upgrades
- High-speed network connectivity (1 Gbps or higher)
- IPv6 support for future-proofing

**Pricing Structure Analysis**
Transparent pricing is essential for budget planning. Be wary of providers offering extremely low introductory rates that increase dramatically upon renewal. Look for:
- Clear monthly and annual pricing without hidden fees
- Transparent resource allocation (CPU cores, RAM, storage)
- Setup fee policies and cancellation terms
- Promotional pricing duration and renewal rates
- Additional costs for backups, support, or premium features

**Support Quality Assessment**
Technical support quality can make or break your hosting experience. Evaluate providers based on:
- 24/7 availability through multiple channels (chat, email, phone)
- Average response times for different priority levels
- Technical expertise of support staff
- Community forums and documentation quality
- Proactive monitoring and notification systems

**Security and Compliance Features**
In 2024, security features are more important than ever:
- DDoS protection and mitigation
- Regular security updates and patches
- Backup and disaster recovery options
- Compliance certifications (SOC 2, ISO 27001)
- Network security and firewall management

**Scalability and Growth Planning**
Your chosen provider should accommodate future growth:
- Easy upgrade paths without service interruption
- Auto-scaling capabilities for traffic spikes
- Load balancer and CDN integration options
- Database and storage expansion possibilities
- Migration assistance for platform changes

**Control Panel and Management Tools**
User-friendly management interfaces save time and reduce complexity:
- Intuitive control panel design
- One-click application installations
- Server monitoring and analytics
- API access for automation
- Mobile app availability

**Provider Reputation and Track Record**
Research provider reliability through:
- Uptime guarantees and historical performance
- Customer reviews and testimonials
- Industry awards and recognitions
- Financial stability and company history
- Transparency in communication and policies

When making your final decision, create a weighted scoring system based on your priorities. A startup might prioritize cost and ease of use, while an enterprise application might focus on performance and support quality. Consider starting with a monthly plan to test the provider's service quality before committing to annual contracts.

Remember that the cheapest option isn't always the best value. Factor in the total cost of ownership, including potential downtime costs, migration expenses, and the value of your time managing the server. The right VPS provider should be a long-term partner in your digital success, offering reliable service, responsive support, and the flexibility to grow with your needs.`,
    author: 'Alex Chen',
    publishedAt: '2024-12-26',
    readingTime: '12 min read',
    category: 'Guides',
    tags: ['VPS Selection', 'Hosting Tips', 'Performance', '2024 Guide'],
    imageUrl: '/blog/vps-selection-guide.jpg'
  },
  {
    id: '2',
    title: 'VPS vs Shared Hosting: Which is Right for You?',
    excerpt: 'Understanding the differences between VPS and shared hosting to make an informed decision for your website or application.',
    content: `The choice between VPS and shared hosting represents one of the most important decisions in your web hosting journey. Understanding the fundamental differences, advantages, and limitations of each option will help you make an informed decision that aligns with your current needs and future growth plans.

**Shared Hosting: The Foundation of Web Hosting**

Shared hosting places multiple websites on a single server, sharing all resources including CPU, RAM, storage, and bandwidth. This arrangement allows hosting providers to offer extremely competitive pricing, making it an attractive option for beginners, small businesses, and personal websites.

The primary advantages of shared hosting include affordability, simplicity, and managed maintenance. With shared hosting, you typically pay between $2-15 per month for hosting that includes everything needed to get online quickly. The hosting provider handles all server maintenance, security updates, and technical management, allowing you to focus on content creation and business development.

However, shared hosting comes with inherent limitations. Resource sharing means your website's performance can be affected by other sites on the same server. If a neighboring website experiences a traffic spike or runs resource-intensive applications, it can impact your site's loading speed and availability. Additionally, shared hosting offers limited customization options and restricted access to server configurations.

**VPS Hosting: Dedicated Resources and Enhanced Control**

Virtual Private Server hosting provides dedicated resources within a virtualized environment. Each VPS operates independently with guaranteed CPU cores, RAM allocation, and storage space. This isolation ensures consistent performance regardless of other users' activities on the physical server.

VPS hosting offers numerous advantages over shared hosting. You receive guaranteed resources, root access for custom configurations, the ability to install custom software, better security isolation, and improved performance consistency. VPS environments also provide better scalability options, allowing you to upgrade resources as your needs grow.

The trade-offs include higher costs (typically $5-100+ per month), increased technical complexity, and the need for more server management knowledge. Unmanaged VPS plans require you to handle software installations, security updates, and system maintenance, which can be time-consuming for non-technical users.

**Performance Comparison and Use Cases**

Shared hosting performs adequately for low to moderate traffic websites, typically handling 1,000-10,000 monthly visitors effectively. Static websites, personal blogs, small business sites, and simple WordPress installations generally function well on shared hosting platforms.

VPS hosting excels with dynamic applications, high-traffic websites, e-commerce stores, and custom web applications. The dedicated resources ensure consistent performance even during traffic spikes, making VPS ideal for business-critical applications where uptime and speed are paramount.

**Security Considerations**

Shared hosting security depends on the provider's infrastructure and the behavior of other users sharing your server. While hosting companies implement security measures, the shared environment creates potential vulnerabilities if other sites become compromised.

VPS hosting provides enhanced security through isolation. Your virtual environment operates independently, reducing the risk of cross-contamination from other users. You also have greater control over security configurations, firewalls, and access controls.

**Cost Analysis and Value Proposition**

When evaluating costs, consider the total cost of ownership beyond monthly hosting fees. Shared hosting appears cheaper initially but may require upgrades as your site grows. Factor in potential revenue losses from downtime, slow loading speeds, or resource limitations.

VPS hosting costs more upfront but provides better value for growing businesses. Calculate the cost per visitor, revenue per page view, and the potential impact of improved performance on conversions and user experience.

**Migration Considerations**

Most websites begin with shared hosting and eventually migrate to VPS as they grow. Plan for this transition by choosing providers that offer easy upgrade paths or provide migration assistance. Understanding when to make this transition helps avoid performance issues that could impact user experience and search engine rankings.

**Making the Right Choice**

Choose shared hosting if you're starting a new website, have limited technical knowledge, operate on a tight budget, or run a low-traffic personal or small business site. The simplicity and affordability make it an excellent entry point into web hosting.

Opt for VPS hosting if you need guaranteed resources, run dynamic applications, require custom software installations, handle sensitive data, or operate business-critical websites where performance and uptime directly impact revenue.

The decision isn't permanent - many successful websites start with shared hosting and graduate to VPS as their needs evolve. Focus on your current requirements while keeping future growth in mind. Both options have their place in the hosting ecosystem, and the right choice depends on your specific circumstances, technical expertise, and business objectives.`,
    author: 'Sarah Johnson',
    publishedAt: '2024-12-25',
    readingTime: '10 min read',
    category: 'Comparisons',
    tags: ['VPS', 'Shared Hosting', 'Hosting Types', 'Performance'],
    imageUrl: '/blog/vps-vs-shared.jpg'
  }
];

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return {
      title: 'Post Not Found - Cheap VPS List Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} - Cheap VPS List Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Hero Image */}
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-20 w-20 text-white/70" />
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                const key = `${post.id}-paragraph-${index}-${paragraph.slice(0, 20).replace(/\s+/g, '-')}`;
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={key} className="text-xl font-semibold text-gray-800 mt-8 mb-4">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                  return (
                    <ul key={key} className="list-disc pl-6 mb-6 space-y-2">
                      {items.map((item, itemIndex) => (
                        <li key={`${key}-item-${itemIndex}-${item.slice(2, 15).replace(/\s+/g, '-')}`} className="text-gray-700">
                          {item.slice(2)}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={key} className="text-gray-700 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Section */}
            <div className="border-t pt-8 mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Found this helpful?
                  </h3>
                  <p className="text-gray-600">
                    Share this article with others who might benefit.
                  </p>
                </div>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{post.author}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {post.author === 'Alex Chen'
                      ? 'Senior DevOps Engineer with 8+ years of experience in cloud infrastructure and VPS hosting. Specializes in performance optimization and cost-effective hosting solutions.'
                      : 'Technical writer and hosting specialist. Passionate about helping businesses find the right hosting solutions for their needs.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <div key={relatedPost.id} className="bg-white rounded-lg shadow-sm p-6">
                <Badge variant="secondary" className="mb-3">
                  {relatedPost.category}
                </Badge>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600">
                    {relatedPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{relatedPost.author}</span>
                  <span>{relatedPost.readingTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
