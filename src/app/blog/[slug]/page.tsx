import { notFound } from 'next/navigation';
import { blogPosts } from '@/services/blogData';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { marked } from 'marked';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author],
        title: post.title,
        description: post.excerpt,
        images: [
            {
                url: post.imageUrl,
                width: 1200,
                height: 630,
                alt: post.title,
            },
        ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
    
  const renderer = new marked.Renderer();
  const originalParagraph = renderer.paragraph.bind(renderer);
  renderer.paragraph = (text) => {
    return originalParagraph(text).replace('<p>', '<p class="mb-4">');
  };

  const parsedContent = await marked.parse(post.content, { renderer });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://vps-price-comparison.com/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: `https://vps-price-comparison.com${post.imageUrl}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VPS Price Comparison',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vps-price-comparison.com/logo.png', // Add your logo URL
      },
    },
    datePublished: post.publishedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <main className="grid lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none">
            <header className="mb-8">
              <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline mb-4 block">
                &larr; Back to Blog
              </Link>
              <p className="text-base text-gray-500 dark:text-gray-400">{post.category} / {post.publishedAt}</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>By {post.author}</span>
                  <span className="mx-2">&bull;</span>
                  <span>{post.readingTime}</span>
              </div>
            </header>

            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full h-auto rounded-lg mb-8 shadow-lg"
              priority
            />
            
            <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
          
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <ul className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <li key={relatedPost.id}>
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <p className="font-semibold">{relatedPost.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{relatedPost.excerpt.substring(0, 70)}...</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </main>
      </div>
      <Footer />
    </>
  );
}
