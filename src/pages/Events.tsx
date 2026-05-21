import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEvents } from "@/hooks/useEvents";
import { Calendar, MapPin, Clock, User, BookOpen, Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from "react-helmet-async";

const Events = () => {
  const { data: events = [], isLoading } = useEvents();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Helmet>
        <title>Events & Gatherings | IRID Institute</title>
        <meta name="description" content="Discover upcoming and past events, workshops, and dialogues hosted by the IRID Institute." />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="irid-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <Calendar className="w-4 h-4" />
                Events & Gatherings
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Our <span className="irid-gradient-text">Events</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Workshops, forums, and conferences that shape ideas and drive meaningful dialogue.
              </p>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">
              No events scheduled
            </h3>
            <p className="text-muted-foreground">
              Check back soon for upcoming events and workshops.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {events.map((event, index) => (
              <div key={event.id}>
                {index > 0 && (
                  <div className="irid-container">
                    <hr className="border-border" />
                  </div>
                )}
                <section className="irid-section">
                  <div className="irid-container">
                    {/* Banner Image */}
                    {event.bannerImageUrl && (
                      <div className="rounded-2xl overflow-hidden shadow-lg mb-12 max-h-[600px]">
                        <img 
                          src={event.bannerImageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                      </div>
                    )}

                    <div className="max-w-4xl mx-auto">
                      {event.subtitle && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                          <BookOpen className="w-3 h-3" />
                          {event.subtitle}
                        </div>
                      )}
                      
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                        {event.title}
                      </h2>

                      <div className="flex flex-wrap gap-6 mb-8">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>{formatDate(event.event_date)}</span>
                        </div>
                        {event.event_time && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 text-accent" />
                            <span>{event.event_time}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{event.location}</span>
                        </div>
                        {event.speaker && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4 text-accent" />
                            <span>{event.speaker}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="prose prose-lg max-w-none prose-emerald mb-12">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {event.description}
                        </ReactMarkdown>
                      </div>

                      {/* Gallery */}
                      {event.galleryImageUrls && event.galleryImageUrls.length > 0 && (
                        <div className="mt-12">
                          <h3 className="text-xl font-display font-bold text-foreground mb-6">Event Gallery</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {event.galleryImageUrls.map((url, i) => (
                              <div 
                                key={i} 
                                className={`rounded-xl overflow-hidden shadow-md ${
                                  i % 4 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                }`}
                              >
                                <img 
                                  src={url} 
                                  alt={`${event.title} gallery ${i}`} 
                                  className="w-full h-full min-h-[250px] object-cover hover:scale-105 transition-transform duration-500" 
                                  loading="lazy" 
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Events;
