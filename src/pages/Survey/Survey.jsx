import React, { useLayoutEffect } from "react";
import Header from "../../components/header/Header";
import logo from "../../assets/images/logo.png";
import SurveyForm from "../../components/surveyForm/SurveyForm";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useSurvey } from "../../context/QuestionsContext";
import LoadingPage from "../LoadingPage";

const Survey = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const { questions, loading, error } = useSurvey();

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <title>شريك || إستبيان الحفل</title>
      <Header />
      <main>
        <div className="container">
          <div className="surveyHeading flex flex-col justify-center items-center gap-4">
            <div className="w-full max-w-[380px] md:max-w-full py-3 px-6 border border-[#BBA577]">
              <p className="text-white text-lg font-[500] text-center">
                {t("MuntajatAnnualTitle")}
              </p>
            </div>
            <img src={logo} alt="logo" className="w-[100px]" />
            <p className="max-w-[380px] md:max-w-full text-white text-xs md:text-xl font-normal text-right leading-5 md:leading-7">
              {t("MuntajatAnnualDes")}
              <span className="text-[#BFA87A]">{t("Sharek")}</span> 2025
            </p>
          </div>
          <SurveyForm questions={questions} />
        </div>
      </main>
    </motion.div>
  );
};

export default Survey;
