"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiAward, FiUser, FiBarChart2, FiChevronUp } from "react-icons/fi";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view the leaderboard.");
          setLoading(false);
          router.push("/login");
          return;
        }

        const response = await fetch(`http://localhost:3902/api/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await response.text();
        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(text);
          } catch (jsonError) {
            console.error("Failed to parse leaderboard response:", text);
            throw new Error("Server returned invalid response");
          }

          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            setError("Session expired. Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000);
            return;
          }
          throw new Error(errorData.message || "Failed to fetch leaderboard.");
        }

        const data = JSON.parse(text);
        setLeaderboard(data.leaderboard);
        setUserRank(data.user);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Leaderboard fetch error:", err);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [router]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const getMedalIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-300 to-gray-400";
    if (rank === 3) return "from-amber-500 to-amber-700";
    return isDarkMode ? "from-gray-700 to-gray-800" : "from-blue-100 to-blue-200";
  };

  const getRankBorder = (rank) => {
    if (rank === 1) return "border-yellow-400";
    if (rank === 2) return "border-gray-300";
    if (rank === 3) return "border-amber-500";
    return isDarkMode ? "border-gray-600" : "border-blue-300";
  };

  const getTop3 = () => leaderboard.slice(0, 3);
  const getTop10 = () => leaderboard.slice(0, 10);
  const getRemaining = () => leaderboard.slice(3);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDarkMode ? "bg-blue-500/10" : "bg-blue-400/20"
            }`}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-purple-600" : "bg-blue-400"
        } top-1/4 -left-32 animate-float`}></div>
        <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-15 ${
          isDarkMode ? "bg-blue-600" : "bg-blue-300"
        } bottom-1/4 -right-48 animate-float-delayed`}></div>
      </div>

      {/* Floating back to top button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed right-8 bottom-8 z-50 p-3 rounded-full shadow-xl transition-all ${
          isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        } ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <FiChevronUp className="text-white text-xl" />
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? "bg-gray-800/50" : "bg-white/80"
            } shadow-lg border ${
              isDarkMode ? "border-gray-700" : "border-blue-200"
            }`}>
              <FiAward className={`text-3xl ${
                isDarkMode ? "text-yellow-400" : "text-blue-600"
              }`} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Global Leaderboard
              </h1>
              <p className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                See where you stand among the best
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"
              } shadow-lg border ${
                isDarkMode ? "border-gray-700" : "border-blue-200"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <FiSun className="text-xl text-yellow-400" />
              ) : (
                <FiMoon className="text-xl text-blue-600" />
              )}
            </motion.button>
          </div>
        </motion.header>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 border-l-blue-500 animate-spin-reverse"></div>
              <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
            </div>
            <p className={`text-xl font-medium ${
              isDarkMode ? "text-blue-300" : "text-blue-600"
            }`}>
              Loading Leaderboard...
            </p>
            <p className={`mt-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Gathering the top performers
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl shadow-lg border backdrop-blur-lg ${
              isDarkMode
                ? "bg-red-900/30 border-red-700 text-red-300"
                : "bg-red-50/70 border-red-200 text-red-600"
            }`}
          >
            <p className="text-lg font-medium text-center">{error}</p>
          </motion.div>
        )}

        {!loading && !error && (
          <>
            {/* User Rank Card */}
            {userRank && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  glareColor="#ffffff"
                  glarePosition="all"
                  scale={1.02}
                  className="rounded-2xl"
                >
                  <div
                    className={`p-6 rounded-2xl shadow-xl border-2 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-gray-700"
                        : "bg-gradient-to-br from-white/90 to-blue-50/90 border-blue-200"
                    } relative overflow-hidden`}
                    aria-labelledby="user-rank-heading"
                  >
                    {/* Decorative elements */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${
                      isDarkMode ? "bg-blue-900/30" : "bg-blue-200/50"
                    } blur-xl`}></div>
                    <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full ${
                      isDarkMode ? "bg-purple-900/30" : "bg-purple-200/50"
                    } blur-xl`}></div>
                    
                    <h2
                      id="user-rank-heading"
                      className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                        isDarkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      <FiUser className="inline" /> Your Position
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                      <div className="relative">
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl font-bold border-4 ${
                            getRankBorder(userRank.rank)
                          } bg-gradient-to-br ${getRankColor(userRank.rank)}`}
                        >
                          {userRank.rank}
                          {getMedalIcon(userRank.rank)}
                        </div>
                        <div className={`absolute -inset-2 rounded-full border-2 ${
                          getRankBorder(userRank.rank)
                        } opacity-50 animate-ping`}></div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="mb-4">
                          <p
                            className={`text-2xl font-bold ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {userRank.username}
                          </p>
                          <p
                            className={`text-lg ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {formatNumber(userRank.skillPoints)} Skill Points
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between text-sm mb-1">
                            <span className={`${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}>Progress</span>
                            <span className={`font-medium ${
                              isDarkMode ? "text-blue-300" : "text-blue-600"
                            }`}>
                              {Math.min(Math.floor((userRank.skillPoints / 10000) * 100), 100)}%
                            </span>
                          </div>
                          <div
                            className={`w-full h-3 rounded-full overflow-hidden ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                                isDarkMode
                                  ? "from-blue-500 to-purple-500"
                                  : "from-blue-400 to-purple-400"
                              }`}
                              style={{
                                width: `${Math.min(
                                  (userRank.skillPoints / 10000) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )}

            {/* Navigation Tabs */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mb-10"
            >
              <div className={`inline-flex rounded-xl p-1 backdrop-blur-lg ${
                isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/80 border border-blue-200"
              }`}>
                {[
                  { id: "all", label: "All Players", icon: <FiBarChart2 className="mr-2" /> },
                  { id: "top3", label: "Top 3", icon: <FiAward className="mr-2" /> },
                  { id: "top10", label: "Top 10", icon: <FiUser className="mr-2" /> }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center ${
                      activeTab === tab.id
                        ? isDarkMode
                          ? "bg-blue-600/90 text-white shadow-lg"
                          : "bg-blue-500 text-white shadow"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700/50"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tab.icon}
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Top 3 Podium */}
            {(activeTab === "all" || activeTab === "top3") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-10"
              >
                {getTop3().map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`relative rounded-t-2xl shadow-2xl ${
                      isDarkMode ? "bg-gray-800/70" : "bg-white/90"
                    } border ${
                      isDarkMode ? "border-gray-700" : "border-blue-200"
                    } overflow-hidden`}
                    style={{
                      height: `${100 - index * 15}%`,
                      marginTop: `${index * 30}px`,
                    }}
                  >
                    {/* Podium decoration */}
                    <div className={`absolute inset-0 ${
                      entry.rank === 1 
                        ? "bg-yellow-500/10" 
                        : entry.rank === 2 
                          ? "bg-gray-400/10" 
                          : "bg-amber-600/10"
                    }`}></div>
                    
                    <div className="relative z-10 p-6">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                          <div
                            className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold border-4 ${
                              getRankBorder(entry.rank)
                            } bg-gradient-to-br ${getRankColor(entry.rank)}`}
                          >
                            {entry.rank}
                            {getMedalIcon(entry.rank)}
                          </div>
                          <div className={`absolute -inset-3 rounded-full border-2 ${
                            getRankBorder(entry.rank)
                          } opacity-40 animate-pulse`}></div>
                        </div>
                        <h3
                          className={`text-xl font-bold text-center mb-2 ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {entry.username}
                        </h3>
                        <p
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-blue-300" : "text-blue-600"
                          }`}
                        >
                          {formatNumber(entry.skillPoints)}
                        </p>
                        <p className={`text-sm mt-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {entry.rank === 1 ? "Champion" : entry.rank === 2 ? "Runner-up" : "Third Place"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-4 ${
                        entry.rank === 1
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                          : entry.rank === 2
                          ? "bg-gradient-to-r from-gray-300 to-gray-400"
                          : "bg-gradient-to-r from-amber-500 to-amber-700"
                      }`}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Leaderboard List */}
            <AnimatePresence>
              {(activeTab === "all" || activeTab === "top10") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ staggerChildren: 0.05 }}
                  className="space-y-4"
                >
                  {(activeTab === "all" ? getRemaining() : getTop10().slice(3)).map(
                    (entry, index) => (
                    <motion.div
                      key={entry.rank}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="relative"
                    >
                      <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareEnable={true}
                        glareMaxOpacity={0.1}
                        glareColor="#ffffff"
                        glarePosition="all"
                        scale={1.01}
                        className="rounded-xl"
                      >
                        <div
                          className={`p-5 rounded-xl shadow-lg border transition-all ${
                            isDarkMode
                              ? "bg-gray-800/70 border-gray-700 hover:border-blue-500/50"
                              : "bg-white/90 border-blue-200 hover:border-blue-400"
                          } relative overflow-hidden group`}
                          role="listitem"
                        >
                          {/* Hover effect background */}
                          <div className={`absolute inset-0 ${
                            isDarkMode ? "bg-blue-900/10" : "bg-blue-100/30"
                          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                          
                          <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                              <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 ${
                                  getRankBorder(entry.rank)
                                } bg-gradient-to-br ${getRankColor(entry.rank)}`}
                              >
                                {entry.rank}
                                {getMedalIcon(entry.rank)}
                              </div>
                              {entry.rank <= 3 && (
                                <div className={`absolute -inset-1 rounded-full border ${
                                  getRankBorder(entry.rank)
                                } opacity-30 group-hover:opacity-60 transition-opacity`}></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p
                                  className={`text-lg font-semibold truncate ${
                                    isDarkMode ? "text-gray-100" : "text-gray-800"
                                  }`}
                                >
                                  {entry.username}
                                </p>
                                <p
                                  className={`text-base font-medium ${
                                    isDarkMode ? "text-blue-300" : "text-blue-600"
                                  }`}
                                >
                                  {formatNumber(entry.skillPoints)}
                                </p>
                              </div>
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className={`${
                                    isDarkMode ? "text-gray-400" : "text-gray-600"
                                  }`}>Skill Level</span>
                                  <span className={`font-medium ${
                                    isDarkMode ? "text-blue-300" : "text-blue-600"
                                  }`}>
                                    {Math.min(Math.floor((entry.skillPoints / 10000) * 100), 100)}%
                                  </span>
                                </div>
                                <div
                                  className={`w-full h-2 rounded-full overflow-hidden ${
                                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                                  }`}
                                >
                                  <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                                      isDarkMode
                                        ? "from-blue-500 to-purple-500"
                                        : "from-blue-400 to-purple-400"
                                    }`}
                                    style={{
                                      width: `${Math.min(
                                        (entry.skillPoints / 10000) * 100,
                                        100
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tilt>
                    </motion.div>
                  )
                )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats Footer */}
            {!loading && !error && leaderboard.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mt-12 p-6 rounded-2xl shadow-lg border backdrop-blur-lg ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white/70 border-blue-200"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <div className="p-4">
                    <p className={`text-3xl font-bold ${
                      isDarkMode ? "text-blue-300" : "text-blue-600"
                    }`}>
                      {leaderboard.length}
                    </p>
                    <p className={`mt-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Total Players
                    </p>
                  </div>
                  <div className="p-4">
                    <p className={`text-3xl font-bold ${
                      isDarkMode ? "text-blue-300" : "text-blue-600"
                    }`}>
                      {formatNumber(leaderboard[0]?.skillPoints || 0)}
                    </p>
                    <p className={`mt-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Top Score
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -10px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, 10px);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}