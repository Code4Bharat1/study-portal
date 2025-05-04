'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

const codeCardVariants = {
  hover: {
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// interface CardProps {
//   // Content props
//   langType: string;
//   titleDesc: string;
//   lang: string;
//   desc: string;
//   codeExample: string;
//   fileName?: string;
//   trustedBy?: string[];
//   ctaButtons?: {
//     href: string;
//     text: string;
//     isExternal?: boolean;
//     variant?: 'primary' | 'secondary' | 'tertiary';
//   }[];
  
//   // Color props
//   primaryColor?: string;
//   secondaryColor?: string;
//   gradientFrom?: string;
//   gradientTo?: string;
//   bgGradientFrom?: string;
//   bgGradientVia?: string;
//   bgGradientTo?: string;
// }

const defaultColors = {
  primaryColor: 'indigo',
  secondaryColor: 'purple',
  gradientFrom: 'indigo-600',
  gradientTo: 'purple-600',
  bgGradientFrom: 'f0f4ff',
  bgGradientVia: 'e0e9ff',
  bgGradientTo: 'd0deff'
};

export default function Card({
  langType,
  titleDesc,
  lang,
  desc,
  codeExample,
  fileName = 'example.py',
  trustedBy = ['Google', 'Microsoft', 'Dropbox', 'Uber', 'Slack', 'NASA'],
  ctaButtons = [
    { href: "/home", text: "Get Started", variant: 'primary' },
    { href: "https://youtu.be/example", text: "Video Tutorial", variant: 'secondary', isExternal: true },
    { href: "/projects", text: "View Projects", variant: 'tertiary' }
  ],
  primaryColor = defaultColors.primaryColor,
  secondaryColor = defaultColors.secondaryColor,
  gradientFrom = defaultColors.gradientFrom,
  gradientTo = defaultColors.gradientTo,
  bgGradientFrom = defaultColors.bgGradientFrom,
  bgGradientVia = defaultColors.bgGradientVia,
  bgGradientTo = defaultColors.bgGradientTo
}) {
  // Generate color classes
  const getButtonClasses = (variant) => {
    switch(variant) {
      case 'primary':
        return `bg-gradient-to-r from-${gradientFrom} to-${gradientTo} hover:from-${gradientFrom.replace('6', '7')} hover:to-${gradientTo.replace('6', '7')} text-white shadow-lg shadow-${primaryColor}-500/20`;
      case 'secondary':
        return `bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md`;
      case 'tertiary':
        return `bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl`;
      default:
        return `bg-gradient-to-r from-${gradientFrom} to-${gradientTo} text-white`;
    }
  };

  return (
    <main className={`min-h-screen bg-gradient-to-br from-[#${bgGradientFrom}] via-[#${bgGradientVia}] to-[#${bgGradientTo}] animate-gradient-shift flex items-center justify-center p-4`}>
      <motion.div
        className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <motion.div 
            className="flex-1 p-8 md:p-12 flex flex-col justify-center"
            variants={itemVariants}
          >
            <div className="mb-2">
              <motion.span 
                className={`inline-block px-3 py-1 text-sm font-semibold text-${primaryColor}-600 bg-${primaryColor}-100 rounded-full`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {langType}
              </motion.span>
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              variants={itemVariants}
            >
              {titleDesc} <span className={`text-${primaryColor}-600 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} bg-clip-text text-transparent`}>{lang}</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8"
              variants={itemVariants}
            >
              {desc}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              variants={containerVariants}
            >
              {ctaButtons.map((button, index) => (
                <motion.div
                  key={button.text}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link 
                    href={button.href} 
                    target={button.isExternal ? '_blank' : undefined} 
                    rel={button.isExternal ? 'noopener' : undefined}
                  >
                    <motion.button
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${getButtonClasses(button.variant || 'primary')}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {button.text}
                    </motion.button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {trustedBy && trustedBy.length > 0 && (
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-500"
                variants={itemVariants}
              >
                <span className="text-sm sm:text-base">Trusted by industry leaders:</span>
                <div className="flex flex-wrap gap-2">
                  {trustedBy.map((company, i) => (
                    <motion.span 
                      key={company} 
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Right Content */}
          <motion.div 
            className={`flex-1 bg-gradient-to-br from-${primaryColor}-50 to-${secondaryColor}-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden`}
            variants={itemVariants}
          >
            {/* Decorative elements */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-${primaryColor}-200/30 blur-xl`}></div>
            <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-${secondaryColor}-200/30 blur-xl`}></div>
            
            <div className="w-full max-w-md relative z-10">
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                variants={codeCardVariants}
                whileHover="hover"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-gray-300 font-mono">{fileName}</div>
                </div>
                <div className="relative">
                  <pre className="p-6 text-sm md:text-base h-[240px] text-gray-800 overflow-x-auto font-mono bg-gray-50">
                    <code className="block whitespace-pre">
                      {codeExample}
                    </code>
                  </pre>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/70 to-transparent"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gray-600 mb-4">Try {lang} right in your browser</p>
                <Link href={`https://replit.com/languages/${lang.toLowerCase()}`} target="_blank" rel="noopener">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span className="relative z-10">Open Replit</span>
                    <span className={`absolute inset-0 rounded-lg bg-gradient-to-r from-${gradientFrom} to-${gradientTo} opacity-0 hover:opacity-100 transition-opacity`}></span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}