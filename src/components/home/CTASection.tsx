import { Link } from "react-router-dom";
import { ArrowRight, Handshake, UserPlus } from "lucide-react";

export function CTASection() {
  return (
    <section className="irid-section">
      <div className="irid-container">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-irid-blue-dark" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAyMGMtNC40MTggMC04LTMuNTgyLTgtOHMzLjU4Mi04IDgtOCA4IDMuNTgyIDggOC0zLjU4MiA4LTggOHoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-50" />
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-accent/20 blur-xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />

          {/* Content */}
          <div className="relative px-6 py-16 md:px-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
                Ready to Shape the Future?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Whether you're a researcher, innovator, or organization seeking meaningful collaboration, 
                IRID Institute welcomes you to be part of our mission.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/contact?tab=membership"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-primary bg-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
                >
                  <UserPlus className="mr-2 w-5 h-5" />
                  Join IRID
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact?tab=partnership"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-primary-foreground border-2 border-primary-foreground/30 hover:border-accent hover:text-accent transition-colors group"
                >
                  <Handshake className="mr-2 w-5 h-5" />
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
