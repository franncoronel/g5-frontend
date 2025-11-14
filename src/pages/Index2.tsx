import { useNavigate } from "react-router-dom";
import { MoviePreferencesForm } from "@/components/MoviePreferencesForm";
import { motion } from "framer-motion";
import { MoviePreferences } from "@/data/domain/MoviePreferences";
import Galaxy from "@/components/ui/Galaxy";
import Particles from "@/components/ui/Particles";

const Index = () => {
  const navigate = useNavigate();

  const handleSubmit = (preferences: MoviePreferences) => {
    sessionStorage.setItem("moviePreferences", JSON.stringify(preferences));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/80 to-background text-foreground overflow-hidden relative">
      {/* Galaxy*/}
      {/* <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.8}
          glowIntensity={0.1}
          saturation={0.8}
          hueShift={260}
        />
      </div> */}
      {/*Particles*/}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
        <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={300}
            particleSpread={5}
            speed={0.1}
            particleBaseSize={100}
            alphaParticles={true}
            disableRotation={false}/>
      </div>

      {/* Fondo decorativo */}
      {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                      from-primary/10 via-background to-background opacity-50" /> */}

      {/* Hero + Form Section */}
      <div className="relative flex flex-col lg:flex-row
             items-center justify-center lg:justify-between
             gap-12 lg:gap-20
             /* MOBILE & TABLET:*/
             px-6 py-12 md:py-20 
             /* ESCRITORIO:*/
            lg:py-0 lg:px-0 lg:pl-20 lg:h-screen lg:overflow-hidden">
        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-0 text-center lg:text-left space-y-4 lg:max-w-4xl">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/icon3.png"
              alt="7Frames Logo"
              className="h-20 w-20 sm:h-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain animate-pulse"/>
          </div>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ">
            Descubre tu
            <span className="block lg:block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Próxima Película Favorita
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 lg:text-left">
            Responde unas simples preguntas y recibe recomendaciones 
            personalizadas que se ajusten a tus gustos.
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-3xl lg:max-w-7xl
                     bg-card/40 backdrop-blur-sm 
                     border border-border/20 
                     rounded-2xl shadow-xl 
                     p-6 sm:p-8 lg:p-4 lg:pb-4 lg:scale-[0.95]">
          <MoviePreferencesForm onSubmit={handleSubmit} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;