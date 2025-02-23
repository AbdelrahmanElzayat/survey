import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SurveyForm = ({ questions, baseurl }) => {
  const { t } = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [selectedValues, setSelectedValues] = useState({});
  const handleSelection = (key, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [key]: value, // Update the selected value for the specific question
    }));
  };
  // Create a dynamic validation schema based on questions
  const validationSchema = Yup.object(
    questions.reduce(
      (schema, question) => {
        const ratingKey = `rating_${question.id}`;
        schema[ratingKey] = Yup.number()
          .required(t("rateRequired"))
          .min(1, t("rateMin"))
          .max(5, t("rateMax"));
        return schema;
      },
      {
        notes: Yup.string().max(500, t("noteMax")),
      }
    )
  );
  const navigate = useNavigate(); // استدعاء useNavigate للتنقل

  const handleSubmit = async (values, { resetForm }) => {
    const qs = questions?.map((item) => {
      return { question_id: item?.id, answer: values?.[`rating_${item?.id}`] };
    });

    try {
      await axios.post(`${baseurl}/surveys/answers`, {
        answers: qs,
        comments: values?.notes,
      });
      toast.success(t("formSuccess"));
      resetForm(); // تفريغ الفورم
      setSelectedValues({});
      navigate("/thankYou"); // الانتقال للصفحة الرئيسية
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("formError"));
    }
  };

  return (
    <section className="SurveyForm flex flex-col justify-center items-center mt-10">
      <h4 className="md:text-lg text-xs font-[500] text-right text-white mb-6 leading-5 md:leading-7">
        {t("rateHint")}
      </h4>
      <Formik
        initialValues={questions.reduce(
          (values, question) => {
            values[`rating_${question.id}`] = "";
            return values;
          },
          { notes: "" }
        )}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        // onSubmit={(values) => {
        //   handleSubmit(values);
        // }}
      >
        {({ errors, touched }) => (
          <Form className="w-full max-w-md p-6 flex flex-col gap-10">
            {questions.map((item) => {
              const ratingKey = `rating_${item.id}`;
              return (
                <div key={item.id} className="mb-4 flex flex-col gap-3">
                  <label
                    className={`block text-white mb-2 ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {lang === "ar" ? item.question : item.question_en}
                  </label>
                  <div className="flex flex-row-reverse justify-center gap-3 md:gap-4">
                    {[5, 4, 3, 2, 1].map((value) => (
                      <React.Fragment key={value}>
                        <Field
                          type="radio"
                          name={ratingKey}
                          value={String(value)}
                          className="hidden peer"
                          id={`${ratingKey}-${value}`}
                          onClick={() => handleSelection(ratingKey, value)}
                        />
                        <label
                          htmlFor={`${ratingKey}-${value}`}
                          className={`leading-7 md:w-12 md:h-12 w-8 h-8 flex items-center justify-center text-white cursor-pointer transition-all duration-200 ${
                            selectedValues[ratingKey] === value
                              ? "bg-[#BFA879]"
                              : "bg-[rgba(161,255,230,0.20)]"
                          }`}
                        >
                          {value}
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                  {errors[ratingKey] && touched[ratingKey] && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors[ratingKey]}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="mb-4 flex flex-col gap-3">
              <label
                className={`leading-7 block text-white mb-2 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("note")}
              </label>
              <Field
                as="textarea"
                name="notes"
                placeholder={t("noteHolder")}
                className="w-full h-[100px] resize-none bg-[rgba(161,255,230,0.2)] py-3 px-4 text-right text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.notes && touched.notes && (
                <p className="text-red-500 text-sm mt-2">{errors.notes}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#BFA879] text-white text-sm font-[600] text-center py-2 h-[40px] hover:bg-green-800"
            >
              {t("confirm")}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SurveyForm;
