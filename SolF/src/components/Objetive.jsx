'use client'

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 2 } }
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

export default function ObjectiveSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false })

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden")
  }, [controls, inView])

  return (
    <div ref={ref} className="min-h-screen w-full bg-black relative flex flex-col justify-center items-center overflow-hidden">
      
      {/* Gradient Orbs */}
      {["-left-4", "-right-4", "left-20"].map((pos, i) => (
        <div key={i} className={`absolute ${pos} ${i === 2 ? "-bottom-8" : "top-0"} w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-${i * 2000}`} />
      ))}

      {/* Animated Images */}
      {["top-0 right-0", "bottom-0 left-0"].map((pos, i) => (
        <motion.img key={i}
          src={`/src/assets/ai_mano${i + 1}.png`}
          alt="Robot hand"
          className={`absolute opacity-40 ${pos} w-250 h-250 object-contain`}
          variants={animationVariants}
          initial="hidden"
          animate={controls}
        />
      ))}

      {/* Content Section */}
      <div className="relative container mx-auto px-20 py-20 text-center">
        
        <motion.h2 className="text-6xl font-bold text-white mb-16 mt-60"
          variants={animationVariants} initial="hidden" animate={controls}>
          Objetivo
        </motion.h2>

        <motion.div className="relative max-w-3xl mx-auto p-8 bg-gray-900/90 rounded-2xl border border-gray-700 shadow-2xl backdrop-blur-sm overflow-hidden"
          variants={animationVariants} initial="hidden" animate={controls}>
          
          {/* Gradient Border */}
          <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" initial="hidden" animate={controls}>
            <motion.path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="url(#gradient)" strokeWidth="0.5" variants={borderLightVariants} />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
                <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Text Content */}
          <p className="text-gray-100 text-lg leading-relaxed relative z-10">
            SigNa es un intérprete que utiliza Machine Learning y Deep Learning para reducir las barreras de comunicación entre personas Sordas y Oyentes. Al facilitar la interacción en entornos educativos, laborales y cotidianos, promueve la igualdad de oportunidades y fomenta la inclusión social.
          </p>
          
          {/* Number Badge */}
          <div className="absolute -top-4 -right-4 bg-emerald-400 w-12 h-12 rounded-full flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
            1
          </div>
        </motion.div>
      </div>
    </div>
  )
}
