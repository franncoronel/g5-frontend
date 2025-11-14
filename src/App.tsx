import { Toaster } from "@/components/ui/Toaster";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { TooltipProvider } from "@/components/ui/Tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
// import Index from "./pages/Index";
// import Index from "./pages/Index2";
import Index from "./pages/Index3";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recommendations" element={<Recommendations />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="/pelicula/:id" element={<DetallePelicula />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
