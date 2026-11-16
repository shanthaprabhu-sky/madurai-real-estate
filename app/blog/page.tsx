import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: 'Blog',
    description: 'Real estate insights, guides, and tips for property buyers and investors in Madurai.',
  };
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch((error) => {
    console.error('Error fetching blog posts:', error);
    return [];
  });

  return (
    <div className="container-page py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Real Estate Blog</h1>
        <p className="mt-2 text-muted-foreground">Insights, guides, and tips for Madurai property buyers</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
              {post.imageUrl && (
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">{post.title}</h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}