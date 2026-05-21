import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvent, useCreateEvent, useUpdateEvent, uploadEventImage } from '@/hooks/useEvents';
import { getStorageUrl } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, X, Save, Loader2, Image as ImageIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminEventForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const { data: existingEvent, isLoading: loadingEvent } = useEvent(id);
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  
  const [bannerPath, setBannerPath] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  
  const [galleryPaths, setGalleryPaths] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setSubtitle(existingEvent.subtitle || '');
      setDescription(existingEvent.description);
      setEventDate(existingEvent.event_date);
      setEventTime(existingEvent.event_time || '');
      setLocation(existingEvent.location);
      setSpeaker(existingEvent.speaker || '');
      setIsPublished(existingEvent.is_published);
      setBannerPath(existingEvent.banner_image_path);
      setGalleryPaths(existingEvent.gallery_image_paths || []);
    }
  }, [existingEvent]);

  const handleGalleryFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setGalleryFiles(prev => [...prev, ...newFiles]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeGalleryPath = (path: string) => {
    setGalleryPaths(prev => prev.filter(p => p !== path));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !eventDate || !location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      // 1. Upload Banner
      let finalBannerPath = bannerPath;
      if (bannerFile) {
        finalBannerPath = await uploadEventImage(bannerFile, 'banner');
      }

      // 2. Upload Gallery Images
      const newUploadedPaths = await Promise.all(
        galleryFiles.map(file => uploadEventImage(file, 'gallery'))
      );
      
      const finalGalleryPaths = [...galleryPaths, ...newUploadedPaths];

      const payload = {
        title,
        subtitle: subtitle || null,
        description,
        event_date: eventDate,
        event_time: eventTime || null,
        location,
        speaker: speaker || null,
        is_published: isPublished,
        banner_image_path: finalBannerPath,
        gallery_image_paths: finalGalleryPaths,
      };

      if (isEditing && id) {
        await updateMutation.mutateAsync({ id, ...payload });
        toast.success('Event updated');
      } else {
        await createMutation.mutateAsync(payload);
        toast.success('Event created');
      }

      navigate('/admin/events');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save event');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (isEditing && loadingEvent) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/events')}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Event' : 'New Event'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" required />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                  <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Short catchy phrase" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
                  <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                  <Input value={eventTime} onChange={(e) => setEventTime(e.target.value)} placeholder="e.g. 6:30 PM (EAT)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Venue or Online" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Speaker</label>
                  <Input value={speaker} onChange={(e) => setSpeaker(e.target.value)} placeholder="Guest speaker name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description (Markdown supported) *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people about the event..."
                  rows={10}
                  required
                  className="w-full rounded-md border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y font-sans"
                />
              </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                  Event Gallery
                </h3>
                <label className="cursor-pointer text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  Add Photos
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleGalleryFiles(e.target.files)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Existing Gallery Paths */}
                {galleryPaths.map((path) => (
                  <div key={path} className="relative aspect-square rounded-lg border overflow-hidden group">
                    <img
                      src={getStorageUrl('publications', path)}
                      className="w-full h-full object-cover"
                      alt="Gallery"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryPath(path)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* New Gallery Files Previews */}
                {galleryFiles.map((file, index) => (
                  <div key={index} className="relative aspect-square rounded-lg border border-emerald-200 overflow-hidden group">
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover opacity-70"
                      alt="Gallery preview"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">New</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Empty State / Add Placeholder */}
                {(galleryPaths.length === 0 && galleryFiles.length === 0) && (
                  <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-100 rounded-lg">
                    <ImageIcon className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">No gallery images yet. Add some photos to show off the event!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Banner Image</label>
                {(bannerPath && !bannerFile) ? (
                  <div className="relative inline-block w-full">
                    <img
                      src={getStorageUrl('publications', bannerPath)}
                      alt="Banner"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setBannerPath(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : bannerFile ? (
                  <div className="relative inline-block w-full">
                    <img
                      src={URL.createObjectURL(bannerFile)}
                      alt="Banner preview"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setBannerFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-10 cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors">
                    <Upload className="w-8 h-8 text-gray-300 mb-2" />
                    <span className="text-sm text-gray-500 text-center">Upload primary banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
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
                      {isEditing ? 'Update Event' : 'Publish Event'}
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
