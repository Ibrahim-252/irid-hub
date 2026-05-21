import { Target, Eye, Compass } from "lucide-react";
import eventGroup from "@/assets/event-group.png";

export function AboutPreview() {
  return (
    <section className="irid-section">
      <div className="irid-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              About IRID
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              The Institute for<br />
              <span className="text-primary">Research, Insights & Dialogue</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              IRID Institute (Institute for Research, Insights and Dialogue) is a Somalia-based 
              think and action tank dedicated to advancing governance reform, peacebuilding, 
              and sustainable development in Somalia.
            </p>

            <div className="space-y-4">
              {[
                { icon: Target, title: "Mission", text: "Advancing Somalia's development through applied research and strategic analysis" },
                { icon: Eye, title: "Vision", text: "Somalia's leading think tank for governance and resilience" },
                { icon: Compass, title: "Values", text: "Integrity, collaboration, and intellectual rigor" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Event Photo */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={eventGroup} 
                alt="IRID Institute inaugural event attendees" 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-xl bg-card border border-border shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">Bosaso</div>
                <div className="text-xs text-muted-foreground">Somalia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
