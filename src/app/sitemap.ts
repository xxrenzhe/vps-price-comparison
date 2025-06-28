import { MetadataRoute } from 'next';
import { blogPosts } from '@/services/blogData';
import { providerDetails } from '@/services/providerData';
import { mockVPSData } from '@/services/vpsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://vps-price-comparison.com';
  const lastModified = new Date('2024-07-26T00:00:00.000Z');

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/providers',
    '/blog',
    '/privacy',
    '/newsletter',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPostRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const providerRoutes = providerDetails.map((provider) => ({
    url: `${siteUrl}/providers/${provider.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  
  const vpsRoutes = mockVPSData.map((plan) => ({
    url: `${siteUrl}/vps/${plan.id}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...blogPostRoutes,
    ...providerRoutes,
    ...vpsRoutes,
  ];
} 