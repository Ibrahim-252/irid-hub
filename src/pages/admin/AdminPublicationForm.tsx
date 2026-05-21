import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePublication, useCreatePublication, useUpdatePublication, uploadPublicationFile } from '@/hooks/usePublications';
import { useCategories } from '@/hooks/useCategories';
import { getStorageUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, X, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPublicationForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const { data: existingPub, isLoading: loadingPub } = usePublication(id);
  const { data: categories = [] } = useCategories();
  const createMutation = useCreatePublication();
  const updateMutation = useUpdatePublication();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [badge, setBadge] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [coverPath, setCoverPath] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Load existing data when editing
  useEffect(() => {
    if (existingPub) {
      setTitle(existingPub.title);
      setSummary(existingPub.summary);
      setCategoryId(existingPub.category_id);
      setDate(existingPub.date);
      setBadge(existingPub.badge || '');
      setIsPublished(existingPub.is_published);
      setPdfPath(existingPub.pdf_path);
      setCoverPath(existingPub.cover_image_path);
    }
  }, [existingPub]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      let finalPdfPath = pdfPath;
      let finalCoverPath = coverPath;

      // Upload PDF if new file selected
      if (pdfFile) {
        finalPdfPath = await uploadPublicationFile(pdfFile, 'pdfs');
      }

      // Upload cover if new file selected
      if (coverFile) {
        finalCoverPath = await uploadPublicationFile(coverFile, 'covers');
      }

      const payload = {
        title,
        summary,
        category_id: categoryId,
        date,
        badge: badge || undefined,
        is_published: isPublished,
        pdf_path: finalPdfPath,
        cover_image_path: finalCoverPath,
      };

      if (isEditing && id) {
        await updateMutation.mutateAsync({ id, ...payload });
        toast.success('Publication updated');
      } else {
        await createMutation.mutateAsync(payload);
        toast.success('Publication created');
      }

      navigate('/admin/publications');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save publication');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (isEditing && loadingPub) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/publications')}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Publication' : 'New Publication'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900">Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Publication title" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Summary *</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the publication..."
              rows={4}
              required
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-white"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Badge Text</label>
            <Input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="e.g. Policy Brief, Research Report" />
          </div>
        </div>

        {/* File Uploads */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-gray-900">Files</h2>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">PDF Document</label>
            {(pdfPath && !pdfFile) ? (
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-lg">
                <span className="text-sm text-blue-700 flex-1 truncate">
                  {pdfPath.split('/').pop()}
                </span>
                <a
                  href={getStorageUrl('publications', pdfPath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View
                </a>
                <button type="button" onClick={() => setPdfPath(null)} className="text-blue-400 hover:text-blue-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : pdfFile ? (
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2.5 rounded-lg">
                <span className="text-sm text-green-700 flex-1 truncate">{pdfFile.name}</span>
                <button type="button" onClick={() => setPdfFile(null)} className="text-green-400 hover:text-green-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-300 mb-2" />
                <span className="text-sm text-gray-500">Click to upload PDF</span>
                <span className="text-xs text-gray-400 mt-1">PDF up to 50MB</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                />
              </label>
            )}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
            {(coverPath && !coverFile) ? (
              <div className="relative inline-block">
                <img
                  src={getStorageUrl('publications', coverPath)}
                  alt="Cover"
                  className="w-40 h-24 object-cover rounded-lg border"
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
              <div className="relative inline-block">
                <img
                  src={URL.createObjectURL(coverFile)}
                  alt="Cover preview"
                  className="w-40 h-24 object-cover rounded-lg border"
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
                <span className="text-sm text-gray-500">Click to upload cover image</span>
                <span className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</span>
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

        {/* Publish Toggle & Submit */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
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
              <p className="text-xs text-gray-400 mt-1 ml-14">
                {isPublished ? 'Visible on the public website' : 'Only visible in admin panel'}
              </p>
            </div>

            <Button type="submit" disabled={saving} className="bg-[hsl(232,45%,18%)] hover:bg-[hsl(232,45%,25%)]">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update' : 'Create'}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
