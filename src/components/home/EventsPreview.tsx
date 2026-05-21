import { Calendar, ArrowRight, MapPin, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";

export function EventsPreview() {
  const { data: events = [], isLoading } = useEvents();
  
  // Only show the latest published event
  const latestEvent = events.length > 0 ? events[0] : null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 bg-secondary/30">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!latestEvent) {
    return null; // Don't show the section if there are no events
  }

  return (
    <section className="irid-section bg-secondary/30">
      <div className="irid-container">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Our Events
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Latest <span className="irid-gradient-text">Event</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most recent policy dialogues and workshops.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Event Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-muted">
            {latestEvent.bannerImageUrl ? (
              <img 
                src={latestEvent.bannerImageUrl} 
                alt={latestEvent.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Calendar className="w-12 h-12 opacity-20" />
              </div>
            )}
          </div>

          {/* Event Details */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              <Calendar className="w-3 h-3" />
              Upcoming Event
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {latestEvent.title}
            </h3>
            {latestEvent.subtitle && (
              <p className="text-primary font-semibold mb-4">
                {latestEvent.subtitle}
              </p>
            )}
            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {latestEvent.description}
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-accent" />
                <span>{formatDate(latestEvent.event_date)}</span>
              </div>
              {latestEvent.event_time && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{latestEvent.event_time}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{latestEvent.location}</span>
              </div>
            </div>
            <Link 
              to="/events" 
              className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors group"
            >
              View event details
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
