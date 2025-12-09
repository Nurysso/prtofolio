import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface Project {
  link: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  icon?: string;
  status: string;
}

interface MysticalCardProps {
  project: Project;
}

const MysticalCard: React.FC<MysticalCardProps> = ({ project }) => {
  const { title, description, tech, color, icon, status } = project;

  return (
    <Link href={project.link || "#"} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          boxShadow: "0 12px 40px 0 rgba(59, 130, 246, 0.4), 0 0 25px rgba(147, 197, 253, 0.3)",
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          group relative block
          w-full h-full
          p-5 rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-500 cursor-pointer text-white
          focus:outline-none focus:ring-2 focus:ring-blue-400/50
          [transform-style:preserve-3d]
        "
        style={{
          background: `linear-gradient(135deg, ${color})`,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(147, 197, 253, 0.2)",
          boxShadow: `
            0 8px 32px 0 rgba(30, 58, 138, 0.25),
            0 0 0 1px rgba(147, 197, 253, 0.1) inset,
            0 2px 4px 0 rgba(59, 130, 246, 0.1) inset
          `,
        }}
      >


        {/* Corner Ornaments */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-blue-300/50 rounded-tl-lg"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-blue-300/50 rounded-tr-lg"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-blue-300/50 rounded-bl-lg"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-blue-300/50 rounded-br-lg"></div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none"></div>


        {/* Project Icon */}
        {icon && (
          <motion.div className="absolute top-3 left-3 text-white text-xl pointer-events-none select-none">
            <Image src={icon} alt={title} width={20} height={20} />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex-1">
            <motion.h2
              className="text-lg md:text-xl font-bold tracking-wide drop-shadow-lg mb-2
                         bg-gradient-to-r from-white/90 via-slate-100 to-white/90 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              {title}
            </motion.h2>
            <p className="text-sm leading-relaxed text-white/90 font-light drop-shadow-md line-clamp-3 mb-3">
              {description}
            </p>
          </div>

          <div className="mt-auto">
            <h3
              className={`text-xs uppercase tracking-widest font-semibold mb-2 drop-shadow-md ${
                status === "Live"
                  ? "text-green-400"
                  : status === "Beta"
                  ? "text-yellow-400"
                  : status === "Coming Soon"
                  ? "text-purple-400"
                  : status === "Research"
                  ? "text-pink-400"
                  : "text-gray-400"
              }`}
            >
              {status}
            </h3>

            <ul className="flex flex-wrap gap-1.5">
              {tech.map((techItem, i) => (
                <motion.li
                  key={i}
                  className="relative px-2.5 py-1 rounded-full
                            text-xs font-medium tracking-wide
                            text-white/90
                            transition-all duration-300
                            hover:scale-105"
                  style={{
                    background: `
                      linear-gradient(135deg,
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(255, 255, 255, 0.05) 50%,
                        rgba(255, 255, 255, 0.1) 100%
                      )
                    `,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.15) inset",
                  }}
                  whileHover={{
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.4) inset, 0 0 8px rgba(255, 255, 255, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/20 opacity-40"></div>
                  <span className="relative z-10">{techItem}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/5 opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Sacred Geometry Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MysticalCard;
