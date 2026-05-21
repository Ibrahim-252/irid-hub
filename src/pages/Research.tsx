import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BookOpen, ArrowRight, Download, Calendar, Search,
  FileText, ScrollText, BarChart3, MessageSquareText,
  Users, ClipboardList, ArrowLeft, SortAsc, SortDesc,
  X, Loader2
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/hooks/useCategories";
import { usePublications } from "@/hooks/usePublications";

// Helper to map icon string from DB to Lucide component
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'FileText': return <FileText className="w-6 h-6" />;
    case 'ScrollText': return <ScrollText className="w-6 h-6" />;
    case 'BarChart3': return <BarChart3 className="w-6 h-6" />;
    case 'MessageSquareText': return <MessageSquareText className="w-6 h-6" />;
    case 'Users': return <Users className="w-6 h-6" />;
    case 'ClipboardList': return <ClipboardList className="w-6 h-6" />;
    default: return <FileText className="w-6 h-6" />;
  }
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};

const Research = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { data: publications = [], isLoading: loadingPublications } = usePublications();

  const filteredPublications = useMemo(() => {
    let items = [...publications];

    if (activeCategory) {
      items = items.filter((p) => p.category_id === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q)
      );
    }

    items.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return items;
  }, [publications, activeCategory, searchQuery, sortOrder]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Publications & Research | IRID Institute</title>
        <meta name="description" content="Explore our library of evidence-based research, policy briefs, and analytical reports on governance, peacebuilding, and sustainable development." />
        <meta property="og:title" content="Publications & Research | IRID Institute" />
        <meta property="og:description" content="Evidence-based research and policy dialogue for Somalia and beyond." />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="irid-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Knowledge Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Our <span className="irid-gradient-text">Publications</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Evidence-based research, policy briefs, and analytical reports
                that inform policy decisions and drive meaningful change.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar (always visible) */}
        <section className="irid-container -mt-8 mb-12 relative z-20">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-primary/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search knowledge hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-12 h-16 rounded-2xl border-white/40 glass shadow-2xl text-lg focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="irid-section pt-0 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="irid-container relative z-10">
            {loadingCategories || loadingPublications ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : !activeCategory && !searchQuery.trim() ? (
              /* Category Grid */
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                   <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    Strategic <span className="italic text-primary">Research Areas</span>
                  </h2>
                  <div className="w-12 h-1 bg-accent/30 mx-auto mt-4 rounded-full" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="group text-left p-8 rounded-[2.5rem] glass border-white/40 premium-shadow-hover transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <div className="flex flex-col items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                          {getIcon(cat.icon)}
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                              {cat.title}
                            </h3>
                            <span className="text-xs font-bold text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                              {cat.count} Papers
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary group-hover:text-accent transition-all uppercase tracking-[0.2em]">
                        Explore Library
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Publication List */
              <div className="max-w-5xl mx-auto">
                {/* Header with back button and sort */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-4">
                    {activeCategory && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setActiveCategory(null);
                          setSearchQuery("");
                        }}
                        className="gap-2 text-muted-foreground hover:text-primary font-bold uppercase tracking-widest text-xs"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                    )}
                    <div>
                      <h2 className="text-3xl font-display font-bold text-foreground leading-none mb-2">
                        {searchQuery.trim()
                          ? `Search Results`
                          : activeCategoryData?.title ?? "Publications"}
                      </h2>
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-tighter">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        {filteredPublications.length} Found in archive
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      setSortOrder((o) =>
                        o === "newest" ? "oldest" : "newest"
                      )
                    }
                    className="gap-2 w-fit rounded-2xl glass font-bold uppercase tracking-widest text-xs border-white/40"
                  >
                    {sortOrder === "newest" ? (
                      <SortDesc className="w-4 h-4" />
                    ) : (
                      <SortAsc className="w-4 h-4" />
                    )}
                    {sortOrder === "newest" ? "Latest" : "Oldest"}
                  </Button>
                </div>

                {/* Publication Items */}
                {filteredPublications.length === 0 ? (
                  <div className="text-center py-24 glass rounded-[3rem] border-white/40">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                       <BookOpen className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                      Resource Not Found
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                      {searchQuery.trim()
                        ? "We couldn't find any resources matching your search terms."
                        : "Our team is currently finalizing papers for this research area."}
                    </p>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-8"
                      onClick={() => {
                        setActiveCategory(null);
                        setSearchQuery("");
                      }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      View All Research
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredPublications.map((pub) => (
                      <div
                        key={pub.id}
                        className="group grid md:grid-cols-5 gap-0 items-stretch glass rounded-[2.5rem] border-white/40 overflow-hidden premium-shadow-hover transition-all duration-500"
                      >
                        {/* Cover */}
                        {pub.coverImageUrl && (
                          <div className="md:col-span-2 h-64 md:h-auto relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <img
                              src={pub.coverImageUrl}
                              alt={pub.title}
                              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 z-20">
                               <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground border-white/40">
                                 {pub.badge || "Academic"}
                               </span>
                            </div>
                          </div>
                        )}

                        {/* Details */}
                        <div
                          className={`${
                            pub.coverImageUrl ? "md:col-span-3" : "md:col-span-5"
                          } p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-transparent to-primary/[0.03]`}
                        >
                          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-accent" />
                              <span>{formatDate(pub.date)}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <span className="text-primary">Institutional Paper</span>
                          </div>

                          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                            {pub.title}
                          </h3>

                          <p className="text-muted-foreground leading-relaxed mb-10 text-sm md:text-base">
                            {pub.summary}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-auto">
                            {pub.pdfUrl && (
                              <>
                                <Button className="irid-btn-primary px-8 h-12 rounded-xl" asChild>
                                  <a href={pub.pdfUrl} download>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Full PDF
                                  </a>
                                </Button>
                                <Button variant="outline" className="h-12 rounded-xl glass border-white/40 px-8" asChild>
                                  <a
                                    href={pub.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Read Online
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                  </a>
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
