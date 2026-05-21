import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import iridLogo from "@/assets/irid-logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Events", href: "/events" },
  { name: "Publications", href: "/research" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <nav className="irid-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={iridLogo} 
              alt="IRID Institute" 
              className="h-10 md:h-12 w-auto rounded-xl"
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-display font-bold text-primary tracking-wide">IRID</span>
              <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em]">Institute</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

           {/* CTA Button */}
           <div className="hidden md:flex items-center gap-4">
             <Button variant="ghost" size="sm" className="text-muted-foreground">
               Partner With Us
             </Button>
             <a 
               href="https://docs.google.com/forms/d/e/1FAIpQLSdMJ8nwSGhH6Km5gJrR8tAYu3kmJe0Y2a7PLE_GKjB7JBmz1w/viewform?usp=publish-editor"
               target="_blank"
               rel="noopener noreferrer"
               className="irid-btn-primary text-sm px-5 py-2"
             >
               Join IRID
             </a>
           </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                 <Button variant="outline" size="sm">
                   Partner With Us
                 </Button>
                 <a 
                   href="https://docs.google.com/forms/d/e/1FAIpQLSdMJ8nwSGhH6Km5gJrR8tAYu3kmJe0Y2a7PLE_GKjB7JBmz1w/viewform?usp=publish-editor"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="irid-btn-primary text-sm"
                 >
                   Join IRID
                 </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
