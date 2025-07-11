import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import imgHome from "../assets/Fondo-CaliZenics.png";
import { Instagram, Twitter, Facebook } from "lucide-react";

const HomePage = () => {
  const benefitVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.5,
        duration: 0.5,
      },
    }),
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-start px-4 pt-[4rem] gap-12"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <h1
          className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-800 to-teal-400 
             text-6xl font-extrabold font-title tracking-wide text-center"
        >
          CaliZenics
        </h1>

        <div className="relative z-10 max-w-3xl text-center text-white border-2 border-white/50 rounded-2xl px-8 py-8 shadow-lg bg-black/50 ">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-yellow-100 drop-shadow-md font-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your body, awaken your mind
          </motion.h1>

          <motion.p
            className="mx-auto max-w-xl text-center font-semibold text-white/90 text-base sm:text-lg font-light py-6 leading-relaxed tracking-wide drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            CaliZenics combines mindful calisthenics and guided meditation to
            help you achieve strength, balance and mental clarity. Designed for
            your well-being, wherever you are.
          </motion.p>

          <div className="flex justify-center gap-4 text-sm sm:text-base font-medium mb-8 text-white/80 flex-wrap">
            {[
              "🧘 Mindful sessions",
              "💪 Personalize your WorkOut",
              "📱 Train anywhere, anytime",
            ].map((text, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={benefitVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                {text}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1.2 }}
          >
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Join us
            </Link>
            <Link
              to="/exercises"
              className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-700 transition-all"
            >
              Our Exercises
            </Link>
          </motion.div>
          <motion.div
            className="flex flex-row justify-center items-center gap-6 mt-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-pink-500/30 transition-colors"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-sky-400/30 transition-colors"
            >
              <Twitter size={28} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-600/30 transition-colors"
            >
              <Facebook size={28} />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
