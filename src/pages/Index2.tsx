//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoviePreferencesForm } from "@/components/MoviePreferencesForm";
import { motion } from "framer-motion";
import { MoviePreferences } from "@/data/domain/MoviePreferences";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (preferences: MoviePreferences) => {
    sessionStorage.setItem("moviePreferences", JSON.stringify(preferences));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 px-6 md:px-12 lg:px-20 py-16 lg:py-24 max-w-7xl mx-auto">
        
        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-0 text-center lg:text-left space-y-6 "
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src="/icon3.png"
              alt="7Frames Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain animate-pulse"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Descubre tu{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Próxima Película Favorita
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Responde unas simples preguntas y recibe recomendaciones 
            personalizadas que se ajusten a tus gustos.
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-3xl lg:max-w-7xl bg-card/40 backdrop-blur-sm border border-border/20 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <MoviePreferencesForm onSubmit={handleSubmit} />
        </motion.div>
      </div>

      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60" />
    </div>
  );
};

export default Index;