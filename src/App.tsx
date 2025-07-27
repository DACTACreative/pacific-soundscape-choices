import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SimpleTest from "./pages/SimpleTest";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Scenario1 from "./pages/Scenario1";
import Scenario2 from "./pages/Scenario2";
import Scenario3 from "./pages/Scenario3";
import RouteAudioHandler from "./components/RouteAudioHandler";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<Index />} />
          <Route path="/scenario-1" element={<Scenario1 />} />
          <Route path="/scenario-2" element={<Scenario2 />} />
          <Route path="/scenario-3" element={<Scenario3 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <RouteAudioHandler />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
