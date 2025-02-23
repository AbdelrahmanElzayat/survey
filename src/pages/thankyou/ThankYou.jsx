import { motion } from "framer-motion";
import React from "react";

const ThankYou = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">شكراً لك!</h1>
        <p className="text-gray-600">شكراً لتعبئة الإستبيان نقدر وقتك وجهودك</p>
      </div>
    </motion.div>
  );
};

export default ThankYou;
