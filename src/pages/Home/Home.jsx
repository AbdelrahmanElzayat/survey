import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import eye from "../../assets/icons/eye.svg";
import download from "../../assets/icons/download.svg";
import document from "../../assets/icons/document.svg";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageContext } from "../../context/LanguageContext";
const Home = () => {
  const { setLang } = useContext(LanguageContext);
  useEffect(() => {
    setLang("ar");
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {/* <Header /> */}
      <title>شريك || الرئيسية</title>

      <main>
        <div className="container">
          <div className="flex flex-col justify-center items-center gap-7">
            <img src={logo} alt="logo" />
            <h1 className="text-white text-2xl font-bold">
              {/* {t("PartyFile")} */}
              ملف الحفل / Party File
            </h1>
            <div className="flex flex-col justify-center items-center gap-5 w-full">
              <div className="cursor-pointer border border-[#BFA879] flex items-center gap-3 py-3 px-3 w-full md:max-w-full max-w-[380px]">
                <img src={eye} alt="" />
                <span className="flex-grow text-white text-base font-[500]">
                  {/* {t("AgendaCeremony")} */}
                  برنامج الحفل / Agenda Ceremony
                </span>
                <button className="bg-[#BFA879] w-9 h-9 flex justify-center items-center">
                  <img src={download} alt="" />
                </button>
              </div>
              <a
                href={`/menu.pdf`}
                target="blank"
                download
                className="cursor-pointer border border-[#BFA879] flex items-center gap-3 py-3 px-3 w-full md:max-w-full max-w-[380px]"
              >
                <img src={eye} alt="" />
                <span className="flex-grow text-white text-base font-[500]">
                  {/* {t("Menu")} */}
                  قائمة الطعام / Menu
                </span>
                <button className="bg-[#BFA879] w-9 h-9 flex justify-center items-center">
                  <img src={document} alt="" />
                </button>
              </a>
              <Link
                to={"/survey"}
                className="cursor-pointer border border-[#BFA879] flex items-center gap-3 py-3 px-3 w-full md:max-w-full max-w-[380px]"
              >
                <img src={eye} alt="" />
                <span className="flex-grow text-white text-base font-[500]">
                  {/* {t("CeremonySurvey")} */}
                  استبيان الحفل / Ceremony Survey
                </span>
                <button className="bg-[#BFA879] w-9 h-9 flex justify-center items-center">
                  <img src={document} alt="" />
                </button>
              </Link>
              <div className="cursor-pointer border border-[#BFA879] flex items-center gap-3 py-3 px-3 w-full md:max-w-full max-w-[380px]">
                <img src={eye} alt="" />
                <span className="flex-grow text-white text-base font-[500]">
                  {/* {t("AboutMuntajat")} */}
                  عن شركة منتجات / About Muntajat
                </span>
                <button className="bg-[#BFA879] w-9 h-9 flex justify-center items-center">
                  <img src={download} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;
