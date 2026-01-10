import { AnimatePresence, motion } from "framer-motion";
import { NavBar } from "./NavBar/NavBar";
import "./styles/FormChallengeLayout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export const FormChallengeLayout = () => {
  const { isDarkTheme } = useTheme();
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 300,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -300,
    },
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5,
  };

  return (
    <div
      className="layout-container"
      data-theme={isDarkTheme ? "dark" : "light"}
    >
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
