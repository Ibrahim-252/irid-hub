import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useArticles } from '@/hooks/useArticles';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function Articles() {
  const { data: articles = [], isLoading } = useArticles();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="irid-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                News & Insights
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Our <span className="irid-gradient-text">Articles</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Stay updated with the latest news, expert commentaries, and insights from the IRID Institute.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="irid-section pt-0">
          <div className="irid-container max-w-6xl">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20">
                <Newspaper className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  No articles yet
                </h3>
                <p className="text-muted-foreground">
                  Check back later for new content.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/articles/${article.slug}`}
                    className="premium-shadow-hover group flex flex-col bg-card rounded-[2.5rem] border border-border/50 overflow-hidden"
                  >
                    {article.coverImageUrl && (
                      <div className="h-64 overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        <img
                          src={article.coverImageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                           <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground border-white/40">
                             Insight
                           </span>
                        </div>
                      </div>
                    )}
                    <div className="p-8 flex-1 flex flex-col relative bg-gradient-to-b from-transparent to-primary/[0.02]">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>{formatDate(article.published_at || article.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-accent" />
                          <span>{article.author}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h2>

                      <p className="text-muted-foreground leading-relaxed mb-8 flex-1 text-sm">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-all uppercase tracking-widest">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Ensure Newspaper is imported for the empty state
import { Newspaper } from 'lucide-react';
