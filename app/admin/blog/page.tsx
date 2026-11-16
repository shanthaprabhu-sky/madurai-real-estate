'use client';

import { useState, useEffect } from 'react';
import { FileText, Plus } from 'lucide-react';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', imageUrl: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: '', excerpt: '', content: '', imageUrl: '' });
      fetchBlogs();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Manage Blog Posts</h2>

      {/* Add Blog Form */}
      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Plus className="h-5 w-5" /> Post New Article
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Article Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="border rounded-lg px-3 py-2 bg-background text-sm"
          />
          <input
            type="url"
            placeholder="Featured Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="border rounded-lg px-3 py-2 bg-background text-sm"
          />
        </div>
        <input
          type="text"
          placeholder="Short Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          required
          className="w-full border rounded-lg px-3 py-2 bg-background text-sm"
        />
        <textarea
          placeholder="Full article content..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={5}
          className="w-full border rounded-lg px-3 py-2 bg-background text-sm"
        />
        <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          Publish Article
        </button>
      </form>

      {/* Blog Posts List */}
      <div className="bg-card border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Published Articles</h3>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading posts...</p>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No blog posts found.</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((b) => (
              <div key={b.id} className="border rounded-lg p-4 flex gap-4 items-center bg-background">
                {b.imageUrl && <img src={b.imageUrl} alt={b.title} className="w-20 h-16 rounded-lg object-cover" />}
                <div className="flex-1">
                  <h4 className="font-bold">{b.title}</h4>
                  <p className="text-xs text-muted-foreground">Published on {new Date(b.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm mt-1">{b.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}