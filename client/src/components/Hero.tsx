import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="home" className="hero-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-portfolio-text-dark mb-6" data-testid="text-hero-title">
              Creative <span className="text-portfolio-primary">Digital</span><br />
              Experiences
            </h1>
            <p className="text-lg text-portfolio-text-light mb-8 max-w-lg" data-testid="text-hero-description">
              I craft user-friendly and visually engaging digital solutions, 
              transforming complex challenges into functional design principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects">
                <Button className="portfolio-primary text-white px-8 py-3 rounded-lg hover:portfolio-primary:hover transition-colors font-medium" data-testid="button-view-projects">
                  View Projects
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline" className="border-portfolio-text-light text-portfolio-text-dark px-8 py-3 rounded-lg hover:border-portfolio-primary hover:text-portfolio-primary transition-colors font-medium" data-testid="button-get-in-touch-hero">
                  Get In Touch
                </Button>
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden bg-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800"
                  alt="Creative professional headshot"
                  className="w-full h-full object-cover"
                  data-testid="img-profile-hero"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
