import { ArrowRight, Lightbulb, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-accent/5 blur-[100px] animate-pulse-soft" style={{ animationDelay: "2s" }} />
        
        {/* Abstract shapes for premium feel */}
        <svg className="absolute right-0 top-0 h-full w-1/3 text-primary/[0.02] transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100">
          <path d="M0 0 L100 0 L100 100 Z" />
        </svg>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="irid-container relative z-10 w-full">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-md border border-border/50 mb-8 shadow-sm"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest">Research • Insight • Dialogue</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[1.1] mb-8 tracking-tight"
          >
            Evidence for <br className="hidden sm:block" />
            <span className="irid-gradient-text relative">
              better governance
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </motion.h1>

          <div className="grid md:grid-cols-12 gap-8 items-end">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-7"
            >
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 text-balance border-l-4 border-accent/20 pl-6">
                IRID Institute is Somalia's premier independent think tank, 
                bridging the gap between rigorous research and 
                transformative policy action.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  to="/contact?tab=partnership"
                  className="irid-btn-primary w-full sm:w-auto text-base group px-8 py-4"
                >
                  Partner With Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact?tab=membership" 
                  className="irid-btn-secondary w-full sm:w-auto text-base px-8 py-4 glass border-white/20"
                >
                  <Users className="mr-2 w-5 h-5" />
                  Join Our Community
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="md:col-span-5 hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                <div className="relative glass p-8 rounded-[2rem] border-white/40 shadow-2xl overflow-hidden group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Latest Insight</div>
                      <div className="text-xs text-muted-foreground">Updated 2 days ago</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-4">The Future of Governance in Digital Era</h3>
                  <div className="space-y-3">
                    <div className="h-2 bg-muted rounded-full w-full" />
                    <div className="h-2 bg-muted rounded-full w-[90%]" />
                    <div className="h-2 bg-muted rounded-full w-[40%]" />
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-card bg-primary/10 flex items-center justify-center overflow-hidden">
                           <Users className="w-5 h-5 text-primary/40" />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-bold text-accent uppercase tracking-tighter">Explore Now</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
