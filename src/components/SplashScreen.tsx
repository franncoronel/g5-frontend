import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles from "@/components/ui/Particles";
import LongTimeAgo from "./ui/LongTimeAgo";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 3300; // duración total del splash
    const interval = 20; // actualizar cada 20ms
    let elapsed = 0;

    const t = setInterval(() => {
      elapsed += interval;
      setProgress(elapsed / total);
      if (elapsed >= total) {
        clearInterval(t);
        onFinish(); // dispara la app principal
      }
    }, interval);

    return () => clearInterval(t);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, rgba(10,10,10,0.95) 0%, rgba(0,0,0,0.98) 100%)",
        backdropFilter: "blur(3px)",
        opacity: 1 - progress, // desaparece de a poquito
      }}
    >
      {/* Partículas sutiles con ligero movimiento */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.25] animate-pulse">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={5}
          speed={0.03} // un poco más rápido que antes
          particleBaseSize={120}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>

      <div className="flex items-center justify-center h-full">
        <LongTimeAgo />
      </div>
    </motion.div>
  );
}
