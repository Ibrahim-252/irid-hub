import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticle, useCreateArticle, useUpdateArticle, uploadArticleCover } from '@/hooks/useArticles';
import { getStorageUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, X, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminArticleForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const { data: existingArticle, isLoading: loadingArticle } = useArticle(id);
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('IRID Institute');
  const [isPublished, setIsPublished] = useState(false);
  const [coverPath, setCoverPath] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  }, [title, isEditing]);

  // Load existing data when editing
  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title);
      setSlug(existingArticle.slug);
      setExcerpt(existingArticle.excerpt);
      setContent(existingArticle.content);
      setAuthor(existingArticle.author);
      setIsPublished(existingArticle.is_published);
      setCoverPath(existingArticle.cover_image_path);
    }
  }, [existingArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      let finalCoverPath = coverPath;

      // Upload cover if new file selected
      if (coverFile) {
        finalCoverPath = await uploadArticleCover(coverFile);
      }

      const payload = {
        title,
        slug,
        excerpt,
        content,
        author,
        is_published: isPublished,
        cover_image_path: finalCoverPath,
      };

      if (isEditing && id) {
        await updateMutation.mutateAsync({ id, ...payload });
        toast.success('Article updated');
      } else {
        await createMutation.mutateAsync(payload);
        toast.success('Article created');
      }

      navigate('/admin/articles');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save article. Ensure the slug is unique.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (isEditing && loadingArticle) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/articles')}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Article' : 'New Article'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Content (Markdown supported) *</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here..."
                  rows={20}
                  required
                  className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y font-mono"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug *</label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="url-friendly-slug" required />
                <p className="text-xs text-gray-400 mt-1">Must be unique.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short summary for previews..."
                  rows={4}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
                {(coverPath && !coverFile) ? (
                  <div className="relative inline-block w-full">
                    <img
                      src={getStorageUrl('publications', coverPath)}
                      alt="Cover"
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverPath(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : coverFile ? (
                  <div className="relative inline-block w-full">
                    <img
                      src={URL.createObjectURL(coverFile)}
                      alt="Cover preview"
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    <Upload className="w-8 h-8 text-gray-300 mb-2" />
                    <span className="text-sm text-gray-500">Upload cover image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setIsPublished(!isPublished)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      isPublished ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        isPublished ? 'translate-x-[22px]' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </label>

                <Button type="submit" disabled={saving} className="w-full bg-[hsl(232,45%,18%)] hover:bg-[hsl(232,45%,25%)]">
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update Article' : 'Publish Article'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
