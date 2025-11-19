import { motion } from "framer-motion";

export default function LongTimeAgo() {
  return (
    <motion.p
      className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4bb5ff] via-[#ffb44b] to-[#4bb5ff]"
      style={{
        textShadow: "0 0 8px #4bb5ff, 0 0 16px #ffb44b88, 0 0 24px #ffb44b55",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: [0, 1, 1, 0], y: [30, 0, 0, -30] }}
      transition={{ duration: 3.0, ease: "easeInOut" }}
    >
      A long time ago in a Universidad Nacional de San Martín....
    </motion.p>
  );
}