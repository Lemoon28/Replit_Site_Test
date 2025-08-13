import { Button } from "@/components/ui/button";

export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-portfolio-text-dark mb-4" data-testid="text-about-title">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Profile Image */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600"
                alt="Professional creative designer"
                className="w-80 h-80 rounded-2xl object-cover shadow-2xl"
                data-testid="img-profile-about"
              />
              <div className="absolute -bottom-4 -right-4 bg-portfolio-primary text-white p-4 rounded-2xl">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column - Bio and Skills */}
          <div className="animate-slide-up">
            <div className="mb-8">
              <p className="text-lg text-portfolio-text-light mb-6" data-testid="text-bio-1">
                I'm a passionate digital designer with over 5 years of experience 
                creating user-centered solutions. My approach combines strategic 
                thinking with creative problem-solving to deliver interfaces that are 
                beautiful but also solve real user problems.
              </p>
              <p className="text-lg text-portfolio-text-light mb-6" data-testid="text-bio-2">
                Specializing in user design, mobile applications, and brand identity, I 
                work closely with clients to understand their vision and transform it 
                into outstanding digital experiences.
              </p>
              <Button className="portfolio-primary text-white px-8 py-3 rounded-lg hover:portfolio-primary:hover transition-colors font-medium" data-testid="button-view-more-about">
                View More About Me
              </Button>
            </div>

            {/* Skills and Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-portfolio-text-dark mb-4" data-testid="text-skills-title">Skills</h3>
                <div className="space-y-2">
                  <div className="text-portfolio-text-light" data-testid="text-skill-1">UI/UX Design</div>
                  <div className="text-portfolio-text-light" data-testid="text-skill-2">Web Development</div>
                  <div className="text-portfolio-text-light" data-testid="text-skill-3">Brand Identity</div>
                  <div className="text-portfolio-text-light" data-testid="text-skill-4">Prototyping</div>
                </div>
              </div>
              
              {/* Tools */}
              <div>
                <h3 className="text-xl font-semibold text-portfolio-text-dark mb-4" data-testid="text-tools-title">Tools</h3>
                <div className="space-y-2">
                  <div className="text-portfolio-text-light" data-testid="text-tool-1">Figma, Adobe XD</div>
                  <div className="text-portfolio-text-light" data-testid="text-tool-2">React, NextJS</div>
                  <div className="text-portfolio-text-light" data-testid="text-tool-3">Adobe Creative</div>
                  <div className="text-portfolio-text-light" data-testid="text-tool-4">Framer Motion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
