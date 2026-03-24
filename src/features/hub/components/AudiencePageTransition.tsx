import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AudiencePageTransitionProps {
  audience: "consumer" | "business";
  children: ReactNode;
}

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AudiencePageTransition = ({ audience, children }: AudiencePageTransitionProps) => {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const initialX =
    audience === "consumer"
      ? from === "business"
        ? "-10%"
        : "-6%"
      : from === "consumer"
        ? "10%"
        : "6%";

  return (
    <motion.div
      initial={{ x: initialX, opacity: 0.72, filter: "blur(8px)" }}
      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: transitionEase }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default AudiencePageTransition;
