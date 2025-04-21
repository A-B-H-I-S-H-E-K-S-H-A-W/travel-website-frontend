import React, { useEffect } from "react";
import loader from "../../assets/png/airplane.png";
import { motion, easeInOut, useAnimation } from "framer-motion";

const Loading = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Start the first animation
    controls
      .start({
        z: 7,
        opacity: 1,
        transition: { duration: 1.7, delay: 2.8 },
      })
      .then(() => {
        // Trigger the "end" animation after the first one finishes
        controls.start({
          opacity: 0,
          transition: { duration: 0.5 }, // Define duration for the end animation
        });
      });
  }, [controls]);
  return (
    <>
      <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ z: 10, display: "block" }}
          animate={{ z: 0, display: "none" }}
          transition={{ duration: 5 }}
        >
          <motion.img
            initial={{
              translateX: -800,
              rotate: 45,
            }}
            animate={{
              translateX: 1200,
              width: "480px",
              height: "480px",
              visibility: "hidden",
            }}
            transition={{ duration: 3.4, ease: easeInOut }}
            src={loader}
            className="size-20 md:size-80"
            alt="img"
          />
        </motion.div>
        <motion.div
          className="absolute"
          initial={{ z: 0, opacity: 0 }}
          animate={controls}
        >
          <h1 className="md:text-6xl text-cyan-700 text-3xl font-semibold style-regular">
            WanderSphere
          </h1>
        </motion.div>
      </div>
    </>
  );
};

export default Loading;
