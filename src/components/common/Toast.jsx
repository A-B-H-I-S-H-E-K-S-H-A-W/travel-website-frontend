import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ result, setResult }) => {
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 4000); // 4 seconds
      return () => clearTimeout(timer);
    }
  }, [result, setResult]);

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          id="toast-bottom-right"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-800 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm font-semibold">{result.message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
