import { Link } from 'react-router-dom';
import { useAdminPublications } from '@/hooks/usePublications';
import { useAdminArticles } from '@/hooks/useArticles';
import { FileText, Newspaper, Plus, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { data: publications = [] } = useAdminPublications();
  const { data: articles = [] } = useAdminArticles();

  const publishedPubs = publications.filter((p) => p.is_published).length;
  const draftPubs = publications.length - publishedPubs;
  const publishedArticles = articles.filter((a) => a.is_published).length;
  const draftArticles = articles.length - publishedArticles;

  const stats = [
    {
      label: 'Publications',
      total: publications.length,
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/publications',
    },
    {
      label: 'Articles',
      total: articles.length,
      icon: Newspaper,
      color: 'bg-emerald-500',
      link: '/admin/articles',
    },
    {
      label: 'Published',
      total: publishedPubs + publishedArticles,
      icon: Eye,
      color: 'bg-purple-500',
      link: '#',
    },
    {
      label: 'Drafts',
      total: draftPubs + draftArticles,
      icon: EyeOff,
      color: 'bg-amber-500',
      link: '#',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome to the IRID content manager.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.total}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-[hsl(232,45%,18%)] hover:bg-[hsl(232,45%,25%)]">
            <Link to="/admin/publications/new">
              <Plus className="w-4 h-4 mr-2" />
              New Publication
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin/articles/new">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent items */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Publications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Publications</h2>
            <Link to="/admin/publications" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          {publications.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">No publications yet.</p>
          ) : (
            <div className="space-y-3">
              {publications.slice(0, 5).map((pub) => (
                <Link
                  key={pub.id}
                  to={`/admin/publications/${pub.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{pub.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{pub.date}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      pub.is_published
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {pub.is_published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Articles */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Articles</h2>
            <Link to="/admin/articles" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          {articles.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">No articles yet.</p>
          ) : (
            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <Link
                  key={article.id}
                  to={`/admin/articles/${article.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{article.author}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      article.is_published
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {article.is_published ? 'Published' : 'Draft'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
