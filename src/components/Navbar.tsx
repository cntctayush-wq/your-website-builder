import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/upload", label: "Upload" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
        <Link to="/dashboard" className="flex items-center gap-2" data-testid="link-logo">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline">AI Detect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant={isActive(link.href) ? "secondary" : "ghost"}
                size="sm"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" data-testid="button-account">
            <User className="h-5 w-5" />
          </Button>
          <Link to="/">
            <Button variant="ghost" size="icon" data-testid="button-logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
