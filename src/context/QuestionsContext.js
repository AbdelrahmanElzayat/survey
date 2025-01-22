import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// إنشاء الـ Context
const SurveyContext = createContext();

// Provider الخاص بـ Context
export const SurveyProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة لجلب البيانات من الـ API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/surveys/questions`
      );
      if (response.data && response.data.questions) {
        setQuestions(response.data.questions);
      } else {
        setQuestions([]);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند تحميل الـ Provider
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <SurveyContext.Provider
      value={{ questions, loading, error, fetchQuestions }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

// Hook لاستخدام الـ Context بسهولة
export const useSurvey = () => useContext(SurveyContext);
