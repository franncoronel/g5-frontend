import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/Toaster"
import { Toaster as Sonner } from "@/components/ui/Sonner"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Recommendations from "./pages/Recommendations"
import { DetalleRecomendacion } from "./pages/DetalleRecomendacion"
import NotFound from "./pages/NotFound"
import SplashScreen from "./components/SplashScreen"

const queryClient = new QueryClient()

const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Mostrar splash solo si no se ha visto en esta pestaña
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash")
    if (hasSeenSplash) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashFinish = () => {
    setShowSplash(false)
    sessionStorage.setItem("hasSeenSplash", "true")
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash ? (
          <SplashScreen onFinish={handleSplashFinish} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/pelicula/:id" element={<DetalleRecomendacion />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App