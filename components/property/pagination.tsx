import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const createPageUrl = (page: number) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (page === 1) params.delete('page');
      else params.set('page', String(page));
      return `/properties?${params.toString()}`;
    }
    return `/properties?page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex h-9 items-center gap-1 rounded-md border px-3 text-sm hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      )}

      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <Link
            key={idx}
            href={createPageUrl(page)}
            className={cn(
              'flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition-colors',
              page === currentPage
                ? 'border-primary bg-primary text-primary-foreground'
                : 'hover:bg-accent'
            )}
          >
            {page}
          </Link>
        ) : (
          <span key={idx} className="flex h-9 min-w-9 items-center justify-center text-sm text-muted-foreground">
            {page}
          </span>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex h-9 items-center gap-1 rounded-md border px-3 text-sm hover:bg-accent"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
