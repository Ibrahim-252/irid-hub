import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { HelmetProvider } from "react-helmet-async";

import { lazy, Suspense } from "react";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Research from "./pages/Research";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// Admin Pages (Lazy Loaded)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPublications = lazy(() => import("./pages/admin/AdminPublications"));
const AdminPublicationForm = lazy(() => import("./pages/admin/AdminPublicationForm"));
const AdminArticles = lazy(() => import("./pages/admin/AdminArticles"));
const AdminArticleForm = lazy(() => import("./pages/admin/AdminArticleForm"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminEventForm = lazy(() => import("./pages/admin/AdminEventForm"));

const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));

const LoadingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

import { ScrollToTop } from "./components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/research" element={<Research />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Admin Auth */}
            <Route path="/admin/login" element={
              <Suspense fallback={<LoadingPage />}>
                <AdminLogin />
              </Suspense>
            } />
            
            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <Suspense fallback={<LoadingPage />}>
                <ProtectedRoute><AdminLayout /></ProtectedRoute>
              </Suspense>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="publications" element={<AdminPublications />} />
              <Route path="publications/new" element={<AdminPublicationForm />} />
              <Route path="publications/:id" element={<AdminPublicationForm />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="articles/new" element={<AdminArticleForm />} />
              <Route path="articles/:id" element={<AdminArticleForm />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="events/new" element={<AdminEventForm />} />
              <Route path="events/:id" element={<AdminEventForm />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
