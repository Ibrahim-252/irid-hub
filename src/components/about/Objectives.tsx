import { CheckCircle2, TrendingUp, Globe, Handshake, Brain } from "lucide-react";

const objectives = [
  {
    icon: Brain,
    title: "Conduct Applied Research",
    description: "Produce practical research that helps understand and improve Somalia's governance, institutions, and society.",
  },
  {
    icon: Globe,
    title: "Bridge Knowledge Gaps",
    description: "Connect academic research with practical policy-making and community action.",
  },
  {
    icon: Handshake,
    title: "Build Collaborative Networks",
    description: "Create lasting partnerships between researchers, professionals, and emerging leaders.",
  },
  {
    icon: TrendingUp,
    title: "Promote Informed Dialogue",
    description: "Organize discussions, workshops, and forums to share insights and encourage informed debate.",
  },
  {
    icon: CheckCircle2,
    title: "Empower Youth Leadership",
    description: "Equip the next generation with tools and platforms to lead meaningful change.",
  },
];

export function Objectives() {
  return (
    <section className="irid-section">
      <div className="irid-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square relative max-w-md mx-auto">
              {/* Background Circle */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/5 to-accent/5" />
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-display font-bold text-primary mb-2">5</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">Key Objectives</div>
                </div>
              </div>

              {/* Orbiting Icons */}
              {objectives.map((obj, index) => {
                const angle = (index * 72 - 90) * (Math.PI / 180);
                const radius = 42;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                
                return (
                  <div
                    key={obj.title}
                    className="absolute w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all cursor-pointer group"
                    style={{ 
                      left: `${x}%`, 
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={obj.title}
                  >
                    <obj.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Our Goals
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              Strategic Objectives
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our objectives guide our programs and initiatives, ensuring we create 
              lasting impact in the communities we serve.
            </p>

            <div className="space-y-4">
              {objectives.map((obj, index) => (
                <div 
                  key={obj.title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span className="text-sm font-bold text-accent">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{obj.title}</h4>
                    <p className="text-sm text-muted-foreground">{obj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
