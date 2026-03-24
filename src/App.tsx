import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/features/business/components/ErrorBoundary";
import { LikedAppsProvider } from "@/features/business/hooks/useLikedApps";
import AiGuide from "@/features/business/pages/AiGuide";
import Bookmarks from "@/features/business/pages/Bookmarks";
import BusinessIndex from "@/features/business/pages/BusinessIndex";
import Remixes from "@/features/business/pages/Remixes";
import SubmitTool from "@/features/business/pages/SubmitTool";
import ConsumerHubPage from "@/features/hub/pages/ConsumerHubPage";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LikedAppsProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/consumer" element={<ConsumerHubPage />} />
              <Route path="/business" element={<BusinessIndex />} />
              <Route path="/business/bookmarks" element={<Bookmarks />} />
              <Route path="/business/remixes/:appId" element={<Remixes />} />
              <Route path="/business/ai-guide" element={<AiGuide />} />
              <Route path="/business/submit" element={<SubmitTool />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </LikedAppsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
