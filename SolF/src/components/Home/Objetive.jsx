import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import aiMano1 from '../../assets/ai_mano1.png';
import aiMano2 from '../../assets/ai_mano2.png';


export default function ObjectiveSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  }

  const borderLightVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { 
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  }

  return (
    <div ref={ref} className="min-h-screen w-full from-black via-gray-900 bg-black relative overflow-hidden flex flex-col justify-center items-center">
      {/* Gradient Orbs - unchanged */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      
      <motion.img 
        src={aiMano2}
        alt="Robot hand"
        className="absolute opacity-40 mb-150
        right-0 w-150 h-150 object-contain"
        variants={animationVariants}
        initial="hidden"
        animate={controls}
      />

      <motion.img
        src={aiMano1}
        alt="Robot hand"
        className="absolute bottom-0 left-0 w-150 h-150 object-contain"
        variants={animationVariants}
        initial="hidden"
        animate={controls}
      />

      <div className="relative container mb-100 mx-auto px-20 py-20">
        <span className="w-full h-full">
          <motion.h2
            className="text-6xl font-bold text-center mb-16 bg-gradient-to-r text-white bg-clip-text mt-60"
            variants={animationVariants}
            initial="hidden"
            animate={controls}
          >
            Objetivo
          </motion.h2>
        </span>

        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={animationVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl blur-xl opacity-30" />
          <div className="relative backdrop-blur-sm bg-gray-900/90 p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial="hidden"
              animate={controls}
            >
              <motion.path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="0.5"
                variants={borderLightVariants}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                </linearGradient>
              </defs>
            </motion.svg>
            
            <p className="text-gray-100 text-lg leading-relaxed relative z-10 ">
              SigNa es un intérprete que utiliza Machine Learning y Deep Learning para reducir las barreras de comunicación entre personas Sordas y Oyentes. Al facilitar la interacción en entornos educativos, laborales y cotidianos, promueve la igualdad de oportunidades y fomenta la inclusión social.
            </p>
          </div>
          <div className="absolute -top-4 -right-4 bg-emerald-400 w-12 h-12 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
              1
            </div>
        </motion.div>
      </div>
    </div>
  )
}
