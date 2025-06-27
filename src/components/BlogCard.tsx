import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 h-64 md:h-auto">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-orange-500 text-white">Featured</Badge>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-white/70" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User className="h-3 w-3 mr-1" />
                <span className="mr-3">{post.author}</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readingTime}</span>
              </div>

              <Button asChild>
                <Link href={`/blog/${post.slug}`} className="flex items-center">
                  Read More
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative bg-gradient-to-br from-blue-400 to-indigo-500 h-48">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-white/60" />
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/blog/${post.slug}`} className="flex items-center">
                Read
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
