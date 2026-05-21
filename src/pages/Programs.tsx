import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  FileSearch, 
  MessageSquare, 
  Users, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2,
  BookOpen,
  Mic,
  Target,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const programs = [
  {
    id: "research",
    icon: FileSearch,
    title: "Research Projects",
    subtitle: "Evidence-Based Policy Research",
    description: "Our research initiatives produce rigorous, evidence-based analyses on pressing societal challenges. We collaborate with experts, institutions, and stakeholders to generate actionable insights that inform policy decisions.",
    features: [
      "Policy analysis and recommendations",
      "Data-driven research methodologies",
      "Cross-sector collaboration",
      "Publication of reports and briefs"
    ],
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
  },
  {
    id: "debates",
    icon: MessageSquare,
    title: "Debates & Forums",
    subtitle: "Structured Policy Dialogue",
    description: "We convene thought leaders, policymakers, and emerging voices to engage in meaningful dialogue on critical issues. Our forums create spaces for constructive debate, knowledge exchange, and consensus-building.",
    features: [
      "Policy roundtables and panels",
      "Expert-led discussions",
      "Youth leadership forums",
      "Cross-generational dialogue"
    ],
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
  },
  {
    id: "workshops",
    icon: Users,
    title: "Workshops",
    subtitle: "Capacity Building & Skills Development",
    description: "Our workshops equip participants with essential skills in research methodology, policy analysis, and innovative thinking. Designed for youth and professionals seeking to make an impact.",
    features: [
      "Research methodology training",
      "Policy writing and analysis",
      "Critical thinking development",
      "Collaborative problem-solving"
    ],
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
  },
  {
    id: "education",
    icon: Lightbulb,
    title: "Education & Awareness",
    subtitle: "Public Engagement & Outreach",
    description: "We raise awareness on key policy issues through public campaigns, educational content, and community engagement. Our initiatives bridge the gap between research and public understanding.",
    features: [
      "Public awareness campaigns",
      "Educational content creation",
      "Community outreach programs",
      "Media engagement and commentary"
    ],
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
  },
];


const Programs = () => {
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
                <Target className="w-4 h-4" />
                Our Programs
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Programs & <span className="irid-gradient-text">Activities</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                From rigorous research to dynamic dialogues, our programs are designed to foster innovation, 
                empower youth, and drive evidence-based policy solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="irid-section">
          <div className="irid-container">
            <div className="space-y-16">
              {programs.map((program, index) => (
                <div 
                  key={program.id}
                  className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${program.bgColor} ${program.color} text-sm font-semibold mb-4`}>
                      <program.icon className="w-4 h-4" />
                      {program.subtitle}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      {program.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {program.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {program.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="irid-btn-primary" asChild>
                      <Link to="/events">
                        View Upcoming Sessions
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className={`relative rounded-[2.5rem] overflow-hidden border-2 ${program.borderColor} glass p-8 md:p-12 premium-shadow-hover`}>
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />
                      <div className={`w-20 h-20 rounded-2xl ${program.bgColor} flex items-center justify-center mb-8 shadow-inner`}>
                        <program.icon className={`w-10 h-10 ${program.color}`} />
                      </div>
                      
                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-1 bg-accent rounded-full" />
                           <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strategic Impact</span>
                        </div>
                        <p className="text-lg font-display font-medium text-foreground/80 leading-relaxed italic">
                           "Contributing to Somalia's evidence-based governance through specialized {program.title.toLowerCase()}."
                        </p>
                      </div>

                      <div className="mt-10 pt-8 border-t border-border/50">
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="w-10 h-10 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">
                                {i === 4 ? "+20" : ""}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm font-bold text-accent uppercase tracking-tighter">Active Program</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="irid-section bg-primary">
          <div className="irid-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
                Ready to Get Involved?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Whether you're a researcher, policy enthusiast, or emerging leader, 
                there's a place for you at IRID Institute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="irid-btn-primary" asChild>
                  <Link to="/events">
                    Browse Events
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to="/contact">
                    Partner With Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;
