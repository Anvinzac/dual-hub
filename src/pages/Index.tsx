import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBubbles from "@/components/AnimatedBubbles";
import ChildAppStats from "@/features/business/components/ChildAppStats";
import { consumerPreviewApps } from "@/features/hub/data";
import { appFolders } from "@/features/business/data/apps";
import { BUSINESS_BASE_PATH, CONSUMER_BASE_PATH } from "@/features/hub/routes";

const elegantEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const gentleEase: [number, number, number, number] = [0.33, 1, 0.68, 1];

const Index = () => {
  const navigate = useNavigate();

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 24,
    mass: 0.8,
  };

  const titleFlyLeft = {
    hidden: { opacity: 0, x: -120, y: 12, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.95, ease: elegantEase, delay: 0.08 },
    },
  };

  const titleFlyRight = {
    hidden: { opacity: 0, x: 120, y: 12, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.95, ease: elegantEase, delay: 0.3 },
    },
  };

  const consumerCardSlide = {
    hidden: { opacity: 0, x: -42, y: 10, filter: "blur(8px)" },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.72,
        ease: gentleEase,
        delay: 0.72 + index * 0.07,
      },
    }),
  };

  const businessCardSlide = {
    hidden: { opacity: 0, x: 42, y: 10, filter: "blur(8px)" },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.72,
        ease: gentleEase,
        delay: 0.96 + index * 0.075,
      },
    }),
  };

  const promptFade = {
    hidden: { opacity: 0, y: 12 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: gentleEase, delay },
    }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex relative">
      <AnimatePresence mode="wait">
        <>
            {/* Consumer panel (left) */}
            <motion.div
              key="consumer-half"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ x: "-100%", width: 0 }}
              transition={springTransition}
              className="relative h-full cursor-pointer overflow-hidden"
              onClick={() => navigate(CONSUMER_BASE_PATH, { state: { from: "landing" } })}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-consumer-coral/20 via-consumer-bg to-consumer-cyan/15" />
              <AnimatedBubbles />

              <div className="relative h-full flex flex-col overflow-hidden">
                {/* Big centered title */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={titleFlyLeft}
                  className="text-center pt-12 pb-3 shrink-0 px-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-consumer-coral/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-consumer-coral" />
                  </div>
                  <h2 className="font-playful text-2xl font-extrabold text-consumer-text leading-tight">
                    Bạn khách
                  </h2>
                  <p className="text-consumer-text-muted text-xs mt-1.5">
                    Giải trí · Học tập · Kết nối
                  </p>
                </motion.div>

                {/* Scrollable single-column square cards */}
                <div className="flex-1 overflow-y-auto consumer-scroll pb-14 px-2">
                  <div className="flex flex-col gap-2.5">
                    {consumerPreviewApps.map((app, i) => (
                      <motion.div
                        key={app.name}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={consumerCardSlide}
                        className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md"
                      >
                        <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-consumer-text/85 via-consumer-text/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <h3 className="font-playful text-lg font-bold text-consumer-surface leading-tight">{app.name}</h3>
                          <p className="text-consumer-surface/80 text-sm mt-1 line-clamp-2 leading-relaxed">{app.description}</p>
                          <div className="flex gap-1 mt-1">
                            {app.tags.map((t) => (
                              <span key={t} className="text-xs font-semibold px-2 py-1 rounded-full bg-consumer-coral/25 text-consumer-surface/90">{t}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom fade + CTA */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-consumer-bg to-transparent pointer-events-none" />
                <motion.div
                  custom={1.06}
                  initial="hidden"
                  animate="visible"
                  variants={promptFade}
                  className="absolute bottom-2 inset-x-0 text-center pointer-events-none"
                >
                  <span className="text-consumer-coral/70 text-[11px] font-semibold uppercase tracking-[0.22em]">Nhấn để khám phá →</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.7, ease: gentleEase, delay: 0.42 }}
              className="w-[1px] h-full bg-border shrink-0 z-10 origin-center"
            />

            {/* Business panel (right) */}
            <motion.div
              key="business-half"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ x: "100%", width: 0 }}
              transition={springTransition}
              className="relative h-full cursor-pointer overflow-hidden"
              onClick={() => navigate(BUSINESS_BASE_PATH, { state: { from: "landing" } })}
            >
              <div className="absolute inset-0 bg-business-bg" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(210 100% 56%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 56%) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 shimmer-bg" />

              <div className="relative h-full flex flex-col overflow-hidden">
                {/* Big centered title */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={titleFlyRight}
                  className="text-center pt-12 pb-3 shrink-0 px-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-business-accent-soft flex items-center justify-center mx-auto mb-3 border border-business-border">
                    <Briefcase className="w-6 h-6 text-business-accent" />
                  </div>
                  <h2 className="font-business text-2xl font-bold text-business-text leading-tight">
                    Bạn quán
                  </h2>
                  <p className="text-business-text-muted text-xs mt-1.5">
                    Quản lý · Bán hàng · Tăng trưởng
                  </p>
                </motion.div>

                {/* Scrollable single-column square cards */}
                <div className="flex-1 overflow-y-auto business-scroll pb-14 px-2">
                  <div className="flex flex-col gap-2.5">
                    {appFolders.map((folder, i) => {
                      return (
                        <motion.div
                          key={folder.id}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={businessCardSlide}
                          className="relative w-full aspect-square overflow-hidden rounded-[1.35rem] border border-business-border/80 bg-business-surface/85 shadow-[0_16px_30px_rgba(15,23,42,0.26)]"
                        >
                          <div
                            className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-business-accent/70 to-transparent"
                            aria-hidden="true"
                          />
                          <div
                            className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-business-accent/10 blur-2xl"
                            aria-hidden="true"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-business-accent/10 via-transparent to-business-gold/10" />
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-business-accent-soft/20" />
                          <div className="relative h-full flex flex-col p-3">
                            <div>
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-business text-lg font-semibold text-business-text leading-tight pr-2">
                                  {folder.name}
                                </h3>
                                <span className="inline-flex shrink-0 text-[11px] font-medium text-business-accent bg-business-accent-soft px-2 py-1 rounded-full w-fit">
                                  {folder.childApps.length} apps
                                </span>
                              </div>
                              <p className="text-business-text-muted text-sm leading-relaxed mt-2">{folder.description}</p>
                            </div>
                            <div className="mt-3 flex-1 flex flex-col justify-end gap-2">
                              {folder.childApps.slice(0, 3).map((child) => (
                                <div
                                  key={child.id}
                                  className="flex items-center gap-3 rounded-xl border border-business-border/70 bg-business-bg/82 px-3 py-2.5"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-business-accent-soft border border-business-border flex items-center justify-center text-[11px] font-semibold text-business-text shrink-0">
                                    {child.iconLabel}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium leading-snug text-business-text line-clamp-1">
                                      {child.name}
                                    </p>
                                    <ChildAppStats
                                      hearts={child.hearts}
                                      tryouts={child.tryouts}
                                      forks={child.forks}
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom fade + CTA */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-business-bg to-transparent pointer-events-none" />
                <motion.div
                  custom={1.28}
                  initial="hidden"
                  animate="visible"
                  variants={promptFade}
                  className="absolute bottom-2 inset-x-0 text-center pointer-events-none"
                >
                  <span className="text-business-accent/50 text-[11px] font-medium uppercase tracking-[0.22em]">← Nhấn để khám phá</span>
                </motion.div>
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-business-accent/5 to-transparent" />
            </motion.div>
        </>
      </AnimatePresence>
    </div>
  );
};

export default Index;
