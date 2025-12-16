import { Shield, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: ["Features", "Pricing", "API", "Integrations"],
  Resources: ["Documentation", "Blog", "Support", "FAQ"],
  Company: ["About", "Careers", "Contact", "Press"]
};

export function LandingFooter() {
  return (
    <footer className="border-t bg-card/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">AI Detect</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Advanced AI detection for documents and images. Protect authenticity with confidence.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-footer-github">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-footer-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-footer-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.toLowerCase()}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Detect. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-privacy">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
