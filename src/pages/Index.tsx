import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Briefcase } from "lucide-react";
import AnimatedBubbles from "@/components/AnimatedBubbles";
import ConsumerExpandedHub from "@/components/ConsumerExpandedHub";
import BusinessExpandedHub from "@/components/BusinessExpandedHub";

type ActivePanel = "none" | "consumer" | "business";

const Index = () => {
  const [active, setActive] = useState<ActivePanel>("none");

  const handleSelect = (panel: ActivePanel) => {
    setActive(panel);
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 24,
    mass: 0.8,
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex relative">
      <AnimatePresence mode="wait">
        {active === "none" && (
          <>
            {/* Consumer panel (left) */}
            <motion.div
              key="consumer-half"
              initial={{ x: 0 }}
              animate={{ x: 0, width: "50%" }}
              exit={{ x: "-100%", width: 0 }}
              transition={springTransition}
              className="relative h-full cursor-pointer overflow-hidden"
              onClick={() => handleSelect("consumer")}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-consumer-coral/20 via-consumer-bg to-consumer-cyan/15" />
              <AnimatedBubbles />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-consumer-coral/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-7 h-7 text-consumer-coral" />
                  </div>
                  <h2 className="font-playful text-2xl sm:text-3xl font-extrabold text-consumer-text leading-tight">
                    Bạn khách
                  </h2>
                  <p className="text-consumer-text-muted text-xs mt-2 max-w-[140px]">
                    Giải trí · Học tập · Kết nối
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-consumer-coral/50 text-[10px] font-semibold uppercase tracking-widest mt-4"
                >
                  Nhấn để khám phá →
                </motion.div>
              </div>

              {/* Decorative bottom wave */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-consumer-coral/10 to-transparent" />
            </motion.div>

            {/* Divider */}
            <div className="w-[1px] h-full bg-border shrink-0 z-10" />

            {/* Business panel (right) */}
            <motion.div
              key="business-half"
              initial={{ x: 0 }}
              animate={{ x: 0, width: "50%" }}
              exit={{ x: "100%", width: 0 }}
              transition={springTransition}
              className="relative h-full cursor-pointer overflow-hidden"
              onClick={() => handleSelect("business")}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-business-bg" />
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(210 100% 56%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 56%) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Shimmer */}
              <div className="absolute inset-0 shimmer-bg" />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-business-accent-soft flex items-center justify-center mx-auto mb-4 border border-business-border">
                    <Briefcase className="w-7 h-7 text-business-accent" />
                  </div>
                  <h2 className="font-business text-2xl sm:text-3xl font-bold text-business-text leading-tight">
                    Bạn quán
                  </h2>
                  <p className="text-business-text-muted text-xs mt-2 max-w-[140px]">
                    Quản lý · Bán hàng · Tăng trưởng
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-business-accent/40 text-[10px] font-medium uppercase tracking-widest mt-4"
                >
                  ← Nhấn để khám phá
                </motion.div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-business-accent/5 to-transparent" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-business-accent/5 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Expanded Consumer Hub */}
      <AnimatePresence>
        {active === "consumer" && (
          <motion.div
            key="consumer-expanded"
            initial={{ x: "-100%", width: "100%" }}
            animate={{ x: 0, width: "100%" }}
            exit={{ x: "-100%" }}
            transition={springTransition}
            className="absolute inset-0 z-20"
          >
            {/* Switch to business button */}
            <button
              onClick={() => handleSelect("business")}
              className="absolute top-4 right-4 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full bg-business-bg/90 text-business-text text-[10px] font-business font-semibold backdrop-blur-sm border border-business-border shadow-lg hover:bg-business-bg transition-colors"
            >
              <Briefcase className="w-3 h-3" />
              Bạn quán
              <ChevronRight className="w-3 h-3" />
            </button>
            <ConsumerExpandedHub />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Business Hub */}
      <AnimatePresence>
        {active === "business" && (
          <motion.div
            key="business-expanded"
            initial={{ x: "100%", width: "100%" }}
            animate={{ x: 0, width: "100%" }}
            exit={{ x: "100%" }}
            transition={springTransition}
            className="absolute inset-0 z-20"
          >
            {/* Switch to consumer button */}
            <button
              onClick={() => handleSelect("consumer")}
              className="absolute top-4 left-4 z-30 flex items-center gap-1 px-3 py-1.5 rounded-full bg-consumer-surface/90 text-consumer-text text-[10px] font-playful font-bold backdrop-blur-sm shadow-lg border border-consumer-coral/20 hover:bg-consumer-surface transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
              <Sparkles className="w-3 h-3 text-consumer-coral" />
              Bạn khách
            </button>
            <BusinessExpandedHub />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
