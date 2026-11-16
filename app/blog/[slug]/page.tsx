import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/lib/types';

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

async function getPost(slug: string) {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data as BlogPost | null;
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container-page py-8">
      <Link href="/blog" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {post.featured_image_url && (
        <div className="relative mb-8 aspect-[16/8] overflow-hidden rounded-xl bg-muted">
          <Image src={post.featured_image_url} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        {post.category && (
          <span className="text-sm font-medium uppercase tracking-wide text-primary">{post.category}</span>
        )}
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          {post.author_name && <span>{post.author_name}</span>}
          {post.published_at && (
            <>
              <span>·</span>
              <span>{new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </>
          )}
        </div>

        <div className="mt-8 prose prose-sm max-w-none sm:prose-base">
          <div className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
            {post.content}
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
