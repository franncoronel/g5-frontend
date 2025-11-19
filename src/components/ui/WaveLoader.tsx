import React from "react";

interface WaveLoaderProps {
  count?: number;
  text?: string;
}

const WaveLoader: React.FC<WaveLoaderProps> = ({count = 5,text = "Cargando recomendaciones...",}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {/* Contenedor de pelotitas */}
      <div className="flex space-x-3">
        {Array.from({ length: count }).map((_, i) => {
          const size = 16 + Math.random() * 8; // 16px a 24px
          const duration = 0.8 + Math.random() * 0.4; // 0.8s a 1.2s

          return (
            <div
              key={i}
              className="rounded-full animate-wave-loader bg-gradient-to-tr
                        from-orange-400 via-orange-500 to-yellow-400 
                        shadow-[0_0_10px_rgba(255,168,0,0.5)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* Texto */}
      <p className="relative z-10 text-2xl font-semibold text-white/90">
        {text}
      </p>
    </div>
  );
};

export default WaveLoader;
