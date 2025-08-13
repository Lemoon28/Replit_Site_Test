import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Plus, Edit, Trash2, Eye, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-primary mx-auto mb-4"></div>
          <p className="text-portfolio-text-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-portfolio-text-dark">Portfolio Admin</h1>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const publishedProjects = projects?.filter(p => !p.isDraft) || [];
  const draftProjects = projects?.filter(p => p.isDraft) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-portfolio-text-dark">Portfolio Admin</h1>
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-view-site">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-portfolio-text-light" data-testid="text-user-email">
                  {(user as any).email || 'Admin User'}
                </span>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.href = '/api/logout'}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-portfolio-text-dark">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-portfolio-primary" data-testid="text-total-projects">
                {projects?.length || 0}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-portfolio-text-dark">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600" data-testid="text-published-projects">
                {publishedProjects.length}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-portfolio-text-dark">
                Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600" data-testid="text-draft-projects">
                {draftProjects.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Manage Projects</CardTitle>
              <Link href="/admin/projects/new">
                <Button data-testid="button-add-project">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {!projects || projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-portfolio-text-light mb-4" data-testid="text-no-projects">
                  No projects yet. Create your first project to get started.
                </p>
                <Link href="/admin/projects/new">
                  <Button data-testid="button-create-first-project">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-portfolio-text-dark">Project</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-portfolio-text-dark">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-portfolio-text-dark">Updated</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-portfolio-text-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} data-testid={`row-project-${project.id}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {project.imageUrl && (
                              <div className="w-10 h-10 bg-gray-100 rounded-lg mr-3 flex items-center justify-center overflow-hidden">
                                <img 
                                  src={project.imageUrl} 
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-portfolio-text-dark" data-testid={`text-project-title-${project.id}`}>
                                {project.title}
                              </div>
                              <div className="text-sm text-portfolio-text-light" data-testid={`text-project-category-${project.id}`}>
                                {project.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge 
                            variant={project.isDraft ? "secondary" : "default"}
                            data-testid={`badge-status-${project.id}`}
                          >
                            {project.isDraft ? "Draft" : "Published"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-portfolio-text-light" data-testid={`text-updated-${project.id}`}>
                          {new Date(project.updatedAt || project.createdAt || new Date()).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Link href={`/admin/projects/${project.id}/edit`}>
                              <Button variant="ghost" size="sm" data-testid={`button-edit-${project.id}`}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" data-testid={`button-delete-${project.id}`}>
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the project "{project.title}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel data-testid={`button-cancel-delete-${project.id}`}>
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteMutation.mutate(project.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                    data-testid={`button-confirm-delete-${project.id}`}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
