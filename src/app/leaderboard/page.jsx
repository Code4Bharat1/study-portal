"use client";
import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";

// Static leaderboard data
const leaderboardData = [
  { name: "Alex Johnson", totalPoints: 387 },
  { name: "Samantha Lee", totalPoints: 360 },
  { name: "Rahul Sharma", totalPoints: 340 },
  { name: "Emily Davis", totalPoints: 310 },
  { name: "Michael Brown", totalPoints: 295 },
  { name: "Priya Patel", totalPoints: 280 },
  { name: "David Kim", totalPoints: 260 },
  { name: "Aisha Khan", totalPoints: 245 },
  { name: "Carlos Rivera", totalPoints: 230 },
  { name: "Sophie Turner", totalPoints: 210 },
];

// Sort leaderboard data by totalPoints in descending order and assign ranks
const sortedLeaderboard = leaderboardData
  .sort((a, b) => b.totalPoints - a.totalPoints)
  .map((user, index) => ({
    rank: index + 1,
    name: user.name,
    totalPoints: user.totalPoints,
  }));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const rowVariants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const medalVariants = {
  hover: { scale: 1.2, transition: { duration: 0.2 } },
};

export default function Leaderboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center p-6 font-sans">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border-2 border-blue-800 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Gradient and Animation */}
        <motion.div
          className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 shadow-md"
          variants={headerVariants}
        >
          <h2 className="text-4xl font-bold text-white text-center drop-shadow-md">Leaderboard</h2>
        </motion.div>

        {/* Table */}
        <motion.div className="p-6" variants={itemVariants}>
          <div className="w-full space-y-3">
            {sortedLeaderboard.map((user, index) => (
              <motion.div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg shadow-md border border-blue-200 ${
                  user.rank === 1
                    ? "bg-blue-50 shadow-[0_0_10px_#00BFFF50]"
                    : user.rank === 2
                    ? "bg-yellow-50 shadow-[0_0_10px_#FFD70050]"
                    : user.rank === 3
                    ? "bg-gray-50 shadow-[0_0_10px_#C0C0C050]"
                    : "bg-white"
                }`}
                variants={rowVariants}
                whileHover="hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-24">
                    {user.rank === 1 && (
                      <motion.div variants={medalVariants} whileHover="hover">
                        <FaMedal className="text-[#00BFFF] drop-shadow-md" size={20} />
                      </motion.div>
                    )}
                    {user.rank === 2 && (
                      <motion.div variants={medalVariants} whileHover="hover">
                        <FaMedal className="text-[#FFD700] drop-shadow-md" size={20} />
                      </motion.div>
                    )}
                    {user.rank === 3 && (
                      <motion.div variants={medalVariants} whileHover="hover">
                        <FaMedal className="text-[#C0C0C0] drop-shadow-md" size={20} />
                      </motion.div>
                    )}
                    <span className="text-gray-800 font-semibold">{user.rank}</span>
                  </div>
                  <span className="text-gray-800 font-medium w-48">{user.name}</span>
                </div>
                <span className="text-gray-800 font-semibold">{user.totalPoints}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}