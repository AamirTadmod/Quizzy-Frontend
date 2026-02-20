  // client/src/services/APIs/index.js

  export const authEndpoints = {
    SIGNUP: "/api/v1/register",
    LOGIN: "/api/v1/login",
    UPDATE_PROFILE: "/api/v1/update-profile",
  };

  export const quizEndpoints = {
    CREATE_QUIZ: "/api/v1/quizzes",
    UPDATE_QUIZ: "/api/v1/quizzes",
    DELETE_QUIZ: "/api/v1/quizzes",
    GET_ADMIN_QUIZES: "/api/v1/admin-quizzes",
    GET_SCORES: "/api/v1/attempts",
    GET_ALL_QUIZES: "/api/v1/quizzes",
    GET_QUIZ_DETAILS: "/api/v1/quizzes",
    ATTEMMP_QUIZ: "/api/v1/quizzes",
    GET_USER_ATTEMPS: "/api/v1/attempts",
    GET_QUIZ_LEADERBOARD: "/api/v1/quizzes",
  };

  export const questionEndpoints = {
    CREATE_QUESTION: "/api/v1/questions",
    UPDATE_QUESTION: "/api/v1/questions",
    DELETE_QUESTION: "/api/v1/questions",
    GET_QUIZ_QUESTIONS: "/api/v1/questions",
  };
