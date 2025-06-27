import RSS from 'rss';
import { blogPosts } from '@/services/blogData';

export async function GET() {
  const feed = new RSS({
    title: 'BestVPSList.com Blog',
    description: 'The latest articles, guides, and comparisons on VPS hosting, server management, and web performance optimization.',
    feed_url: 'https://www.bestvpslist.com/main.rss',
    site_url: 'https://www.bestvpslist.com',
    image_url: 'https://www.bestvpslist.com/icon.png',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  blogPosts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://www.bestvpslist.com/blog/${post.slug}`,
      guid: post.id,
      date: new Date(post.publishedAt),
      author: post.author,
      enclosure: {
        url: `https://www.bestvpslist.com${post.imageUrl}`,
        type: 'image/jpeg',
      }
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
} 