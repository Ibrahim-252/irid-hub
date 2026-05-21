import { Lightbulb, MessageCircle, BookOpen } from "lucide-react";
import iridLogo from "@/assets/irid-logo-blue.png";

const highlights = [
  { icon: Lightbulb, label: "Insights", description: "Evidence-driven understanding" },
  { icon: BookOpen, label: "Research", description: "Applied research for impact" },
  { icon: MessageCircle, label: "Dialogue", description: "Informed discourse and debate" },
];

export function WhoWeAre() {
  return (
    <section className="irid-section">
      <div className="irid-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
              The Institute for<br />
              <span className="text-primary">Research, Insights & Dialogue</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">IRID Institute</strong> stands for <em>Institute for Research, Insights, and Dialogue</em> — 
                the three pillars that define our mission. Founded with a vision to bridge the gap between 
                knowledge and action, we serve as a dynamic platform where innovative minds converge.
              </p>
              <p>
                We are not a traditional educational institution. Instead, we are an <strong className="text-foreground">Institute 
                for Research, Insights and Dialogue</strong> that brings together youth, professionals, researchers, and policy 
                leaders to tackle pressing challenges through applied research, strategic analysis, 
                and evidence-informed dialogue.
              </p>
              <p>
                Our approach is rooted in the belief that transformative ideas emerge when diverse 
                perspectives engage in thoughtful, evidence-based discourse. We create spaces where 
                curiosity is celebrated, critical thinking is nurtured, and impactful solutions are born.
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Top row - Insights & Research */}
            <div className="flex justify-between w-full max-w-md">
              {[highlights[0], highlights[1]].map((item) => (
                <div key={item.label} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/10 transition-colors shadow-sm">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-foreground mb-1">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Center Logo */}
            <div className="w-24 h-24 rounded-full border-4 border-primary bg-card flex items-center justify-center shadow-lg">
              <img src={iridLogo} alt="IRID" className="w-16 h-16 object-contain rounded-xl" />
            </div>

            {/* Bottom - Dialogue */}
            {(() => {
              const DialogueIcon = highlights[2].icon;
              return (
                <div className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/10 transition-colors shadow-sm">
                    <DialogueIcon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="font-display font-bold text-foreground mb-1">{highlights[2].label}</h4>
                  <p className="text-xs text-muted-foreground">{highlights[2].description}</p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
