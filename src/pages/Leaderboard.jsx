import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const response = await apiConnector("GET", "/api/v1/leaderboard");
      if (response?.data?.success) {
        setLeaders(response.data.leaderboard);
      }
    } catch (error) {
      console.log("FAILED TO FETCH LEADERBOARD");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">
        🏆 Leaderboard
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading leaderboard...</p>
      ) : (
        <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Rank</th>
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Accuracy</th>
            <th className="p-3 border">Score</th>
            <th className="p-3 border">Attempts</th>
            <th className="p-3 border">Badges</th>
          </tr>
        </thead>

        <tbody>
          {leaders.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="p-3 border font-bold">{index + 1}</td>

              <td className="p-3 border">{user.username}</td>

              <td className="p-3 border text-blue-700 font-semibold">
                {(user.accuracy * 100).toFixed(2)}%
              </td>

              <td className="p-3 border">
                {user.totalCorrect} / {user.totalQuestions}
              </td>

              <td className="p-3 border">{user.attempts}</td>

              <td className="p-3 border">
                {user.badges?.length > 0 ? user.badges.join(", ") : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      )}
    </div>
  );
};

export default Leaderboard;
