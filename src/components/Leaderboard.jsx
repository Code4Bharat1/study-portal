"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tilt from 'react-parallax-tilt';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view the leaderboard.');
          setLoading(false);
          router.push('/login');
          return;
        }

        const response = await fetch(`http://localhost:3902/api/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const text = await response.text();
        console.log("Raw leaderboard response:", text);
        console.log("Response status:", response.status);

        if (!response.ok) {
          let errorData;
          try {
            errorData = JSON.parse(text);
          } catch (jsonError) {
            console.error("Failed to parse leaderboard response:", text);
            throw new Error('Server returned invalid response');
          }

          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            setError('Session expired. Redirecting to login...');
            setTimeout(() => router.push('/login'), 2000);
            return;
          }
          throw new Error(errorData.message || 'Failed to fetch leaderboard.');
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
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const getMedalIcon = (medal) => {
    if (medal === 'diamond') return '💎';
    if (medal === 'gold') return '🥇';
    if (medal === 'silver') return '🥈';
    return null;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`relative min-h-screen p-4 sm:p-8 overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900'
    }`}>
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float-delayed bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold flex items-center justify-center gap-3 animate-fade-in">
            <span className="text-5xl sm:text-6xl">🏆</span> Leaderboard
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-transform duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center animate-pulse">
            <div className="h-16 w-16 mb-4 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <p className={`text-xl font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Loading Leaderboard...
            </p>
          </div>
        )}
        {error && (
          <div className={`p-6 rounded-2xl shadow-lg border animate-slide-up backdrop-blur-lg ${
            isDarkMode ? 'bg-red-900/30 border-red-700 text-red-300' : 'bg-red-50/70 border-red-200 text-red-600'
          }`}>
            <p className="text-lg font-medium text-center">{error}</p>
          </div>
        )}

        {userRank && (
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff">
            <div
              className={`p-6 sm:p-8 rounded-2xl shadow-2xl border transition-all backdrop-blur-lg animate-slide-up ${
                isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-blue-200'
              }`}
              aria-labelledby="user-rank-heading"
            >
              <h2 id="user-rank-heading" className={`text-2xl sm:text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>Your Rank</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className={`text-5xl sm:text-6xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  #{userRank.rank} {getMedalIcon(userRank.medal)}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className={`text-xl sm:text-2xl font-semibold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>{userRank.username}</p>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {userRank.skillPoints} Skill Points
                  </p>
                  <div className="mt-3 group relative">
                    <div className={`w-full h-3 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                          isDarkMode ? 'from-blue-500 to-blue-300' : 'from-blue-600 to-blue-400'
                        }`}
                        style={{ width: `${Math.min((userRank.skillPoints / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                      {userRank.skillPoints} Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        )}

        {!loading && !error && (
          <div className="grid gap-4 animate-slide-up">
            {leaderboard.map((entry, index) => (
              <Tilt key={entry.rank} tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.2} glareColor="#ffffff">
                <div
                  className={`p-6 rounded-xl shadow-lg border transition-all backdrop-blur-lg ${
                    isDarkMode
                      ? index % 2 === 0
                        ? 'bg-gray-800/50 border-gray-700'
                        : 'bg-gray-700/50 border-gray-600'
                      : index % 2 === 0
                        ? 'bg-white/70 border-blue-200'
                        : 'bg-blue-50/50 border-blue-100'
                  }`}
                  role="listitem"
                  style={{ '--index': index }}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className={`text-3xl sm:text-4xl font-bold ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-700'
                    }`}>
                      #{entry.rank} {getMedalIcon(entry.medal)}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className={`text-lg sm:text-xl font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>{entry.username}</p>
                      <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {entry.skillPoints} Skill Points
                      </p>
                      <div className="mt-3 group relative">
                        <div className={`w-full h-3 rounded-full overflow-hidden ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                              isDarkMode ? 'from-blue-500 to-blue-300' : 'from-blue-600 to-blue-400'
                            }`}
                            style={{ width: `${Math.min((entry.skillPoints / 1000) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                          {entry.skillPoints} Points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        html, body {
          font-family: 'Inter', sans-serif;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -20px);
            opacity: 0.3;
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(-20px, 20px);
            opacity: 0.3;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          animation-delay: calc(0.1s * var(--index));
        }
        [role="listitem"] {
          --index: ${Math.floor(Math.random() * 10)};
        }
      `}</style>
    </div>
  );
}