import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import LoggedInRoutes from "./components/LoggedInRoutes"
import Profile from "./pages/Profile"
import CreateQuiz from "./pages/CreateQuiz"
import DashboardLayout from "./components/DashboardLayout"
import CreateQuestions from "./pages/CreateQuestions"
import AdminQuizes from "./pages/AdminQuizes"
import AttemptQuiz from "./pages/AttemptQuiz"
import QuizResult from "./pages/QuizResult"
import { useSelector } from "react-redux"
import History from "./pages/History"
import Leaderboard from "./pages/Leaderboard"
import QuizLeaderboard from "./pages/QuizLeaderboard"

function App() {
  const { user } = useSelector(state => state.auth)

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen font-sans selection:bg-blue-100 selection:text-[#1e3a8a]">
      <div className="min-h-screen">
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* User Routes */}
          <Route
            path="/"
            element={
              <LoggedInRoutes>
                <Home />
              </LoggedInRoutes>
            }
          />

          <Route
            path="/quiz/:id"
            element={
              <LoggedInRoutes>
                <AttemptQuiz />
              </LoggedInRoutes>
            }
          />

          <Route
            path="/quiz-results"
            element={
              <LoggedInRoutes>
                <QuizResult />
              </LoggedInRoutes>
            }
          />

          {/* ✅ QUIZ-SPECIFIC LEADERBOARD — MOVED OUTSIDE DASHBOARD */}
          <Route
            path="/quiz/:id/leaderboard"
            element={
              <LoggedInRoutes>
                <QuizLeaderboard />
              </LoggedInRoutes>
            }
          />

          {/* GLOBAL LEADERBOARD */}
          <Route
            path="/leaderboard"
            element={
              <LoggedInRoutes>
                <Leaderboard />
              </LoggedInRoutes>
            }
          />

          {/* Dashboard Routes */}
          <Route path="/dashboard">

            <Route
              index
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />

            <Route
              path="history"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <History />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />

            <Route
              path="create-quiz"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <CreateQuiz />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />

            <Route
              path="create-quiz/:id"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <CreateQuestions />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />

            <Route
              path="quizes"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <AdminQuizes />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />

            <Route
              path="edit-quiz/:id"
              element={
                <LoggedInRoutes>
                  <DashboardLayout>
                    <CreateQuiz />
                  </DashboardLayout>
                </LoggedInRoutes>
              }
            />

          </Route>

        </Routes>
      </div>
    </div>
  )
}

export default App
