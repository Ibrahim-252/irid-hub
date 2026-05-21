import { Link } from 'react-router-dom';
import { useAdminPublications, useDeletePublication, useUpdatePublication } from '@/hooks/usePublications';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Eye, EyeOff, Pencil, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPublications() {
  const { data: publications = [], isLoading } = useAdminPublications();
  const deleteMutation = useDeletePublication();
  const updateMutation = useUpdatePublication();

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Publication deleted');
    } catch {
      toast.error('Failed to delete publication');
    }
  };

  const handleTogglePublish = async (pub: typeof publications[0]) => {
    try {
      await updateMutation.mutateAsync({
        id: pub.id,
        category_id: pub.category_id,
        title: pub.title,
        summary: pub.summary,
        date: pub.date,
        badge: pub.badge || undefined,
        is_published: !pub.is_published,
        pdf_path: pub.pdf_path,
        cover_image_path: pub.cover_image_path,
      });
      toast.success(pub.is_published ? 'Unpublished' : 'Published');
    } catch {
      toast.error('Failed to update publication');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Publications</h1>
          <p className="text-gray-500 text-sm mt-1">Manage research publications and policy briefs.</p>
        </div>
        <Button asChild className="bg-[hsl(232,45%,18%)] hover:bg-[hsl(232,45%,25%)]">
          <Link to="/admin/publications/new">
            <Plus className="w-4 h-4 mr-2" />
            New Publication
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : publications.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No publications yet</p>
            <Button asChild variant="outline">
              <Link to="/admin/publications/new">Create your first publication</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Title</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3 hidden sm:table-cell">Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{pub.title}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {pub.category_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm text-gray-500">{pub.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(pub)}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          pub.is_published
                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {pub.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {pub.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/publications/${pub.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(pub.id, pub.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
