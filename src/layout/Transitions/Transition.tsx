import { motion } from "framer-motion";
import "./styles/transition.css";

const transition = (MainComponent: React.FC) => {
  return () => {
    const pageVariantsEnter = {
      initial: {
        scaleY: 1,
      },
      animate: {
        scaleY: 0,
      },
      exit: {
        scaleY: 0,
      },
    };

    const pageVariantsExit = {
      initial: {
        scaleY: 0,
      },
      animate: {
        scaleY: 1,
      },
      exit: {
        scaleY: 1,
      },
    };

    const pageTransition = {
      ease: [0.22, 1, 0.36, 1],
      duration: 0.5,
    } as const;

    return (
      <div>
        <MainComponent />
        <motion.div
          className="slide-in"
          initial={pageVariantsEnter.initial}
          animate={pageVariantsEnter.animate}
          exit={pageVariantsEnter.exit}
          transition={pageTransition}
        />
        <motion.div
          className="slide-out"
          initial={pageVariantsExit.initial}
          animate={pageVariantsExit.animate}
          exit={pageVariantsExit.exit}
          transition={pageTransition}
        />
      </div>
    );
  };
};

export default transition;
