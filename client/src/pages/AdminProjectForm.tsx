import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { insertProjectSchema, updateProjectSchema, type Project } from "@shared/schema";

export default function AdminProjectForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const isEditing = !!id;
  const schema = isEditing ? updateProjectSchema : insertProjectSchema;

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

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ["/api/admin/projects", id],
    enabled: isEditing,
    retry: false,
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      tags: [],
      readTime: "",
      likes: "0",
      isDraft: true,
      imageUrl: "",
    },
  });

  // Update form when project data loads
  useEffect(() => {
    if (project) {
      form.reset({
        title: project.title || "",
        description: project.description || "",
        content: project.content || "",
        category: project.category || "",
        tags: (project.tags as string[]) || [],
        readTime: project.readTime || "",
        likes: project.likes || "0",
        isDraft: project.isDraft || false,
        imageUrl: project.imageUrl || "",
      });
      if (project.imageUrl) {
        setImagePreview(project.imageUrl);
      }
    }
  }, [project, form]);

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const url = isEditing ? `/api/admin/projects/${id}` : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";
      return await apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({
        title: "Success",
        description: `Project ${isEditing ? "updated" : "created"} successfully`,
      });
      setLocation("/admin");
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
        description: `Failed to ${isEditing ? "update" : "create"} project`,
        variant: "destructive",
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await apiRequest("POST", "/api/admin/upload", formData);
      return await response.json();
    },
    onSuccess: (data) => {
      form.setValue("imageUrl", data.url);
      setImagePreview(data.url);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
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
        description: "Failed to upload image",
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload immediately
      uploadImageMutation.mutate(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    form.setValue("imageUrl", "");
  };

  const onSubmit = (data: any) => {
    // Parse tags if they're a string
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }
    saveMutation.mutate(data);
  };

  if (authLoading || (isEditing && isLoading)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-primary mx-auto mb-4"></div>
          <p className="text-portfolio-text-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/admin")}
                data-testid="button-back"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-portfolio-text-dark">
                {isEditing ? "Edit Project" : "New Project"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle data-testid="text-form-title">
              {isEditing ? `Edit "${project?.title}"` : "Create New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Project title" 
                            data-testid="input-title"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Web Design, Mobile App" 
                            data-testid="input-category"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the project" 
                          className="min-h-[100px]"
                          data-testid="textarea-description"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Project Image</Label>
                  
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                        data-testid="img-preview"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                        data-testid="button-remove-image"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-portfolio-text-light mb-4">Upload project image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                        data-testid="input-image-upload"
                      />
                      <Label htmlFor="image-upload">
                        <Button type="button" variant="outline" asChild data-testid="button-choose-image">
                          <span>Choose Image</span>
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>

                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (HTML)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed project content in HTML format" 
                          className="min-h-[200px] font-mono text-sm"
                          data-testid="textarea-content"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="React, Design, UX" 
                            data-testid="input-tags"
                            value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Read Time</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="5 min read" 
                            data-testid="input-read-time"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="likes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Likes</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="0" 
                            data-testid="input-likes"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Draft Status */}
                <FormField
                  control={form.control}
                  name="isDraft"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Draft</FormLabel>
                        <div className="text-sm text-portfolio-text-light">
                          Keep this project as a draft (not visible to the public)
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-draft"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    type="submit"
                    disabled={saveMutation.isPending || uploadImageMutation.isPending}
                    data-testid="button-save"
                  >
                    {saveMutation.isPending ? "Saving..." : (isEditing ? "Update Project" : "Create Project")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/admin")}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
