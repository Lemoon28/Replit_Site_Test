import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const { id } = useParams();

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-portfolio-text-dark mb-4">Project Not Found</h1>
            <p className="text-portfolio-text-light mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button data-testid="button-back-home">Back to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </Link>

        {/* Project Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-portfolio-text-light mb-4">
            <span data-testid="text-category">{project.category}</span>
            {project.readTime && (
              <>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span data-testid="text-read-time">{project.readTime}</span>
              </>
            )}
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold text-portfolio-text-dark mb-6" data-testid="text-title">
            {project.title}
          </h1>
          
          <p className="text-lg text-portfolio-text-light mb-6" data-testid="text-description">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" data-testid={`badge-tag-${index}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Project Image */}
          {project.imageUrl && (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-64 lg:h-96 object-cover"
                data-testid="img-project-main"
              />
            </div>
          )}
        </header>

        {/* Project Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {project.content ? (
            <div 
              dangerouslySetInnerHTML={{ __html: project.content }}
              data-testid="content-project-details"
            />
          ) : (
            <p data-testid="text-content-placeholder">
              This project showcases innovative design solutions and technical implementation details.
              The work demonstrates a comprehensive approach to user experience and visual design principles.
            </p>
          )}
        </div>

        {/* Project Actions */}
        <div className="flex justify-between items-center py-8 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" data-testid="button-like">
              <Heart className="w-4 h-4 mr-2" />
              {project.likes || '0'}
            </Button>
            <Button variant="ghost" size="sm" data-testid="button-bookmark">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
          
          <div className="text-sm text-portfolio-text-light" data-testid="text-updated">
            Updated {new Date(project.updatedAt || project.createdAt || new Date()).toLocaleDateString()}
          </div>
        </div>

        {/* Next Project Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/">
            <Button className="w-full lg:w-auto" data-testid="button-view-more-projects">
              View More Projects
            </Button>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
