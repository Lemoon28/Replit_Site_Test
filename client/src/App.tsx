import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminProjectForm from "@/pages/AdminProjectForm";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/project/:id" component={ProjectDetail} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/project/:id" component={ProjectDetail} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/projects/new" component={AdminProjectForm} />
          <Route path="/admin/projects/:id/edit" component={AdminProjectForm} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
