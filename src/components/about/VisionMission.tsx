import { Eye, Target, Compass } from "lucide-react";

const cards = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be Somalia's leading think tank, recognized for rigorous, evidence-based research and practical solutions that strengthen governance, institutions, and sustainable societal development.",
    color: "primary",
  },
  {
    icon: Target,
    title: "Our Mission",
    description: "We advance Somalia's development by conducting applied research, strategic analysis, and evidence-informed dialogue that turns insights into actionable solutions for policy, governance, and societal development.",
    color: "accent",
  },
  {
    icon: Compass,
    title: "Our Values",
    description: "Integrity, intellectual rigor, inclusivity, and collaboration guide everything we do. We believe in the power of diverse perspectives united by common purpose.",
    color: "primary",
  },
];

export function VisionMission() {
  return (
    <section className="irid-section bg-secondary/30">
      <div className="irid-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Our Foundation
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Vision, Mission & Values
          </h2>
          <p className="text-muted-foreground">
            The guiding principles that shape our work and define our commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={card.title}
              className="relative group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="irid-card h-full p-8 border-t-4 border-t-transparent group-hover:border-t-accent transition-colors">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  card.color === 'accent' 
                    ? 'bg-accent/10' 
                    : 'bg-primary/10'
                }`}>
                  <card.icon className={`w-8 h-8 ${
                    card.color === 'accent' 
                      ? 'text-accent' 
                      : 'text-primary'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-4">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
