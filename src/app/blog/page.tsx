import Link from 'next/link';
import { blogPosts } from '@/services/blogData';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog | BestVPSList.com',
  description: 'Explore our blog for the latest articles, guides, and comparisons on VPS hosting, server management, and web performance optimization.',
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Our Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            In-depth articles, guides, and comparisons to help you navigate the world of VPS hosting.
          </p>
        </header>

        <main>
          {/* Featured Post Section */}
          <section className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{featuredPost.category}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{featuredPost.publishedAt}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{featuredPost.readingTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* Other Posts Grid */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-8">
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
