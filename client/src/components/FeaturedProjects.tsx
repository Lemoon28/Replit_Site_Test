import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import type { Project } from "@shared/schema";

export default function FeaturedProjects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-portfolio-text-dark mb-4" data-testid="text-section-title">
            Featured Projects
          </h2>
          <p className="text-lg text-portfolio-text-light max-w-2xl mx-auto" data-testid="text-section-description">
            Explore my latest work in web design, mobile apps, and digital experiences
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : !projects || projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-portfolio-text-light text-lg" data-testid="text-no-projects">
              No projects available yet. Check back soon for exciting new work!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
