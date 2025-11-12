import { useNavigate } from "react-router-dom";
import { MoviePreferencesForm } from "@/components/MoviePreferencesForm";
import { motion } from "framer-motion";

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
    sessionStorage.setItem("moviePreferences", JSON.stringify(preferences));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background text-foreground relative overflow-hidden">
      {/* Fondo radial decorativo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60" />

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-16 flex flex-col items-center lg:justify-start lg:pt-24 gap-12">
        
        {/* Logo y título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left space-y-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <img
              src="/icon3.png"
              alt="7Frames Logo"
              className="h-12 w-12 object-contain animate-pulse"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Descubre tu{" "}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Próxima Película Favorita
            </span>
          </h1>

          <p className="text-xl sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Responde unas simples preguntas y recibe recomendaciones personalizadas que se ajusten a tus gustos.
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-3xl bg-card/40 backdrop-blur-sm border border-border/20 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <MoviePreferencesForm onSubmit={handleSubmit} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
