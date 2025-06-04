"use client";
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login to view the leaderboard.');
        }

        const response = await fetch(`https://sp-api.code4bharat.com/api/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const text = await response.text(); // Capture raw response
        console.log("Raw leaderboard response:", text); // Log for debugging
        console.log("Response status:", response.status); // Log status code

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
            throw new Error('Session expired. Please login again.');
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
  }, []);

  const getMedalIcon = (medal) => {
    if (medal === 'diamond') return '💎';
    if (medal === 'gold') return '🥇';
    if (medal === 'silver') return '🥈';
    return null;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🏆 Leaderboard</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {userRank && (
        <div className="mb-8 p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Your Rank</h2>
          <p className="text-lg">
            <span className="font-bold">Rank: {userRank.rank}</span> | {userRank.username} | {userRank.skillPoints} Skill Points
            {userRank.medal && <span className="ml-2">{getMedalIcon(userRank.medal)}</span>}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Skill Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="border-t">
                  <td className="px-4 py-2">
                    {entry.rank} {getMedalIcon(entry.medal)}
                  </td>
                  <td className="px-4 py-2">{entry.username}</td>
                  <td className="px-4 py-2">{entry.skillPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}