//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoviePreferencesForm } from "@/components/MoviePreferencesForm";
import { Film, Sparkles } from "lucide-react";

interface MoviePreferences {
  genres: string[];
  yearRange: [number, number];
  duration: [number, number];
  actors: string;
  directors: string;
}

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (preferences: MoviePreferences) => {
    // Guardar las preferencias y navegar a resultados
    sessionStorage.setItem("moviePreferences", JSON.stringify(preferences));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3">
              <Film className="h-12 w-12 text-primary" />
              <Sparkles className="h-8 w-8 text-accent animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Descubre tu Próxima
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Película Favorita
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Responde unas simples preguntas y te recomendaremos películas perfectas para ti
            </p>
          </div>

          <MoviePreferencesForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Index;
