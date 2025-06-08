import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ result, setResult }) => {
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [result, setResult]);

  if (!result) return null;

  const bgColor = result.success ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  return (
    <AnimatePresence>
      <motion.div
        id="toast-bottom-right"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className={`fixed flex items-center w-full max-w-xs p-4 rounded-lg shadow-md right-5 bottom-5 z-50 ${bgColor} ${textColor}`}
        role="alert"
      >
        <div className="text-sm font-semibold">{result.message}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
