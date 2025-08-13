import { Link } from "wouter";
import { Clock, Heart, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {


  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl project-card overflow-hidden group cursor-pointer" data-testid={`card-project-${project.id}`}>
      <Link href={`/project/${project.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={project.imageUrl || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400`}
            alt={project.title}
            className="w-full h-48 object-cover project-image"
            data-testid={`img-project-${project.id}`}
          />

        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-portfolio-text-light mb-2">
            <span data-testid={`text-category-${project.id}`}>{project.category}</span>
            {project.readTime && (
              <>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                <span data-testid={`text-read-time-${project.id}`}>{project.readTime}</span>
              </>
            )}
          </div>
          <h3 className="text-xl font-semibold text-portfolio-text-dark mb-3" data-testid={`text-title-${project.id}`}>
            {project.title}
          </h3>
          <p className="text-portfolio-text-light mb-4" data-testid={`text-description-${project.id}`}>
            {project.description}
          </p>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs" data-testid={`badge-tag-${project.id}-${tagIndex}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-portfolio-primary hover:text-portfolio-primary-hover font-medium p-0 h-auto" data-testid={`button-read-${project.id}`}>
              Read
            </Button>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="p-0 h-auto text-portfolio-text-light hover:text-portfolio-primary" data-testid={`button-like-${project.id}`}>
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto text-portfolio-text-light hover:text-portfolio-primary" data-testid={`button-bookmark-${project.id}`}>
                <Bookmark className="w-4 h-4" />
              </Button>
              <span className="text-portfolio-text-light text-sm" data-testid={`text-likes-${project.id}`}>
                {project.likes || '0'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
