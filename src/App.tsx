import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AICompanion from "./pages/AICompanion";
import WellnessTools from "./pages/WellnessTools";
import PeerSupport from "./pages/PeerSupport";
import CrisisSupport from "./pages/CrisisSupport";
import Gamification from "./pages/Gamification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/ai-companion" element={<AICompanion />} />
          <Route path="/wellness-tools" element={<WellnessTools />} />
          <Route path="/peer-support" element={<PeerSupport />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          <Route path="/gamification" element={<Gamification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
