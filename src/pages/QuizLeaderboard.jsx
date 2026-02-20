import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { quizEndpoints } from "../services/APIs";
import { useSelector } from "react-redux";

const QuizLeaderboard = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await apiConnector(
        "GET",
        `${quizEndpoints.GET_QUIZ_LEADERBOARD}/${id}/attempts`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setData(res.data.data);
    } catch (err) {
      console.log("Leaderboard error", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏆 Quiz Leaderboard</h1>

      {data.length === 0 ? (
        <p>No attempts yet</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="text-center border-t">
                <td className="p-2">{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuizLeaderboard;
