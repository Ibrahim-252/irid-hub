import { useParams, Link } from 'react-router-dom';
import { useArticleBySlug } from '@/hooks/useArticles';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';

export default function ArticleDetail() {
  const { slug } = useParams();
  const { data: article, isLoading, error } = useArticleBySlug(slug);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.title} | IRID Institute</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        {article.coverImageUrl && <meta property="og:image" content={article.coverImageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Header />
      <main className="py-24 md:py-32">
        <article className="irid-container max-w-4xl">
          {/* Back button */}
          <Link
            to="/articles"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border pb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-500" />
                <span className="font-medium text-foreground">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span>{formatDate(article.published_at || article.created_at)}</span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {article.coverImageUrl && (
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-md">
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content (Rendered Markdown) */}
          <div className="prose prose-lg max-w-none prose-emerald prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
