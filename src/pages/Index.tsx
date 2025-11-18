import { useNavigate } from "react-router-dom";
import { MoviePreferencesForm } from "@/components/MoviePreferencesForm";
import { motion } from "framer-motion";
import { MoviePreferences } from "@/data/domain/MoviePreferences";
import Particles from "@/components/ui/Particles";
// import { MoviePreferencesForm } from "@/components/MoviePreferencesForm2";


const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (preferences: MoviePreferences) => {
    sessionStorage.setItem("moviePreferences", JSON.stringify(preferences));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background text-foreground relative overflow-hidden">
      {/*Particles*/}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0">
        <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={300}
            particleSpread={5}
            speed={0.1}
            particleBaseSize={100}
            alphaParticles={true}
            disableRotation={false}/>
      </div>

        
      {/* Fondo radial decorativo */}
      {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-60" /> */}

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 
                      py-12 md:py-20 lg:py-12 
                      flex flex-col items-center gap-10 lg:gap-14">
        
        {/* Logo y título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-3xl mx-auto lg:space-y-8"
        >
          <div className="flex items-center justify-center gap-3">
            <img
              src="/icon3.png"
              alt="7Frames Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain animate-pulse"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-center">
            Descubre tu{" "}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Próxima Película Favorita
            </span>
          </h1>

          <p className="text-xl sm:text-xl text-muted-foreground max-w-xl mx-auto lg:text-2xl lg:max-w-3xl">
            Responde unas simples preguntas y recibe recomendaciones personalizadas que se ajusten a tus gustos.
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-3xl lg:max-w-7xl 
                      bg-card/40 backdrop-blur-sm border border-border/20 
                      rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <MoviePreferencesForm onSubmit={handleSubmit} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
