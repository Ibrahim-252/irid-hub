import { Users, MessageSquare, FileSearch, ArrowUpRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const focusAreas = [
  {
    icon: FileSearch,
    title: "Research & Publications",
    description: "Evidence-based investigations into pressing challenges, producing insights, policy briefs, and publications that inform decision-making and drive meaningful change.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/40",
    featured: true,
  },
  {
    icon: MessageSquare,
    title: "Debates & Forums",
    description: "Structured dialogues bringing diverse perspectives together to explore complex issues, challenge assumptions, and foster intellectual discourse on policy matters.",
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    featured: false,
  },
  {
    icon: Users,
    title: "Workshops",
    description: "Hands-on learning experiences designed to build practical skills in research methodology, critical thinking, and collaborative problem-solving.",
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
    featured: false,
  },
];

export function FocusCards() {
  return (
    <section className="irid-section bg-secondary/20 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]" />

      <div className="irid-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold text-accent uppercase tracking-[0.3em] mb-4">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Core Strategic Pillars
          </h2>
          <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Advancing evidence-based solutions through a multidimensional approach to research, 
            public discourse, and capacity development.
          </p>
        </motion.div>
 
        <div className="grid md:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`premium-shadow-hover group cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-500 ${
                area.featured 
                  ? 'glass border-accent/30 bg-white/40 md:scale-105 shadow-2xl relative' 
                  : 'bg-card border-border/50 hover:border-primary/20'
              }`}
            >
              {/* Decorative background circle on hover */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-16 h-16 rounded-2xl ${area.bgColor} flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md group-hover:rotate-3 transition-all duration-500`}>
                <area.icon className={`w-8 h-8 ${area.color}`} />
              </div>
              
              <h3 className={`font-display font-bold text-foreground mb-4 flex items-center justify-between ${area.featured ? 'text-2xl' : 'text-xl'}`}>
                {area.title}
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </div>
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {area.description}
              </p>

              <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-colors uppercase tracking-widest">
                Learn More
                <div className="h-px bg-current w-0 group-hover:w-8 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}