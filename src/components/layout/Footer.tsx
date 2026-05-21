import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import iridLogo from "@/assets/irid-logo.png";

const footerLinks = {
  explore: [
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Publications", href: "/research" },
  ],
  engage: [
    { name: "Join IRID", href: "/contact?tab=membership" },
    { name: "Partner With Us", href: "/contact?tab=partnership" },
    { name: "Volunteer", href: "/contact?tab=membership" },
    { name: "Support Our Work", href: "/contact" },
  ],
  resources: [
    { name: "Publications", href: "/publications" },
    { name: "Media Gallery", href: "/media" },
    { name: "Press", href: "/press" },
    { name: "FAQs", href: "/faqs" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="irid-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src={iridLogo} 
                alt="IRID Institute" 
                className="h-10 w-auto rounded-xl"
              />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-display font-bold text-primary-foreground tracking-wide">IRID</span>
                <span className="text-[10px] font-semibold text-primary-foreground/60 uppercase tracking-[0.2em]">Institute</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering Ideas, Research & Dialogue. An Institute for Research, Insights and Dialogue dedicated to fostering meaningful discourse and driving positive change.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/irid-institute-%E2%80%93-research-insights-and-dialogue/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://x.com/IRIDInstitute" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61587340535850" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-primary-foreground/80">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-primary-foreground/80">Engage</h4>
            <ul className="space-y-3">
              {footerLinks.engage.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-primary-foreground/80">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/60">info@iridinstitute.so</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/60">+252 906 791 195</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/60">Bosaso, Somalia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} IRID Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
