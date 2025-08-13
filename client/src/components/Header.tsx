import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showAdminLink?: boolean;
}

export default function Header({ showAdminLink = false }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-portfolio-text-dark cursor-pointer" data-testid="text-logo">
                Portfolio
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-portfolio-text-dark hover:text-portfolio-primary transition-colors" data-testid="link-home">
              Home
            </a>
            <a href="#projects" className="text-portfolio-text-dark hover:text-portfolio-primary transition-colors" data-testid="link-projects">
              Projects
            </a>
            <a href="#about" className="text-portfolio-text-dark hover:text-portfolio-primary transition-colors" data-testid="link-about">
              About
            </a>
            <a href="#contact" className="text-portfolio-text-dark hover:text-portfolio-primary transition-colors" data-testid="link-contact">
              Contact
            </a>
            {showAdminLink && (
              <Link href="/admin">
                <span className="text-portfolio-text-dark hover:text-portfolio-primary transition-colors cursor-pointer" data-testid="link-admin">
                  Admin
                </span>
              </Link>
            )}
          </nav>
          <a href="#contact">
            <Button className="portfolio-primary text-white px-6 py-2 rounded-lg hover:portfolio-primary:hover transition-colors" data-testid="button-get-in-touch">
              Get in Touch
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
