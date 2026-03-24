import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Briefcase, ShoppingCart, Package, BarChart3, Users, FileText, CreditCard } from "lucide-react";
import AnimatedBubbles from "@/components/AnimatedBubbles";
import ConsumerExpandedHub from "@/components/ConsumerExpandedHub";
import BusinessExpandedHub from "@/components/BusinessExpandedHub";

import appSocial from "@/assets/app-social.jpg";
import appQuiz from "@/assets/app-quiz.jpg";
import appMusic from "@/assets/app-music.jpg";
import appArt from "@/assets/app-art.jpg";
import appFitness from "@/assets/app-fitness.jpg";
import appLanguage from "@/assets/app-language.jpg";
import appRecipe from "@/assets/app-recipe.jpg";
import appPhoto from "@/assets/app-photo.jpg";

type ActivePanel = "none" | "consumer" | "business";

const consumerPreviewApps = [
  { name: "ChatVui", desc: "Trò chuyện vui nhộn với bạn bè, chia sẻ khoảnh khắc đáng nhớ", img: appSocial, tags: ["Xã hội", "Chat"] },
  { name: "QuizMaster", desc: "Thử thách kiến thức với hàng ngàn câu hỏi thú vị", img: appQuiz, tags: ["Trò chơi", "Giáo dục"] },
  { name: "BeatDrop", desc: "Nghe nhạc không giới hạn, tạo playlist yêu thích", img: appMusic, tags: ["Âm nhạc"] },
  { name: "ArtSpace", desc: "Vẽ tranh kỹ thuật số với công cụ sáng tạo", img: appArt, tags: ["Sáng tạo"] },
  { name: "FitBuddy", desc: "Theo dõi sức khoẻ cùng huấn luyện viên AI", img: appFitness, tags: ["Sức khoẻ"] },
  { name: "LingoPlay", desc: "Học ngoại ngữ qua trò chơi thú vị", img: appLanguage, tags: ["Học tập"] },
  { name: "SnapEdit", desc: "Chỉnh sửa ảnh với bộ lọc và sticker độc đáo", img: appPhoto, tags: ["Ảnh", "Sáng tạo"] },
  { name: "NấuNgon", desc: "Khám phá công thức nấu ăn từ khắp nơi", img: appRecipe, tags: ["Ẩm thực"] },
];

const businessPreviewApps = [
  { name: "POS Thông Minh", desc: "Hệ thống bán hàng tại quầy, quản lý đơn hàng nhanh", icon: <ShoppingCart className="w-5 h-5" />, cat: "Bán hàng" },
  { name: "Quản Lý Kho", desc: "Theo dõi tồn kho, nhập xuất hàng hoá tự động", icon: <Package className="w-5 h-5" />, cat: "Quản lý" },
  { name: "Báo Cáo Doanh Thu", desc: "Phân tích doanh thu và xu hướng kinh doanh", icon: <BarChart3 className="w-5 h-5" />, cat: "Tài chính" },
  { name: "CRM Khách Hàng", desc: "Quản lý thông tin và lịch sử mua hàng", icon: <Users className="w-5 h-5" />, cat: "Marketing" },
  { name: "Hoá Đơn Điện Tử", desc: "Xuất hoá đơn VAT, kết nối cơ quan thuế", icon: <FileText className="w-5 h-5" />, cat: "Tài chính" },
  { name: "Thanh Toán Online", desc: "Tích hợp QR code và ví điện tử", icon: <CreditCard className="w-5 h-5" />, cat: "Bán hàng" },
];

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
              <div className="absolute inset-0 bg-gradient-to-br from-consumer-coral/20 via-consumer-bg to-consumer-cyan/15" />
              <AnimatedBubbles />

              <div className="relative h-full flex flex-col overflow-hidden">
                {/* Big centered title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-center pt-12 pb-3 shrink-0 px-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-consumer-coral/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-consumer-coral" />
                  </div>
                  <h2 className="font-playful text-2xl font-extrabold text-consumer-text leading-tight">
                    Bạn khách
                  </h2>
                  <p className="text-consumer-text-muted text-[10px] mt-1.5">
                    Giải trí · Học tập · Kết nối
                  </p>
                </motion.div>

                {/* Scrollable single-column square cards */}
                <div className="flex-1 overflow-y-auto consumer-scroll pb-14 px-2">
                  <div className="flex flex-col gap-2.5">
                    {consumerPreviewApps.map((app, i) => (
                      <motion.div
                        key={app.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + i * 0.06 }}
                        className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md"
                      >
                        <img src={app.img} alt={app.name} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-consumer-text/85 via-consumer-text/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <h3 className="font-playful text-sm font-bold text-consumer-surface leading-tight">{app.name}</h3>
                          <p className="text-consumer-surface/70 text-[9px] mt-0.5 line-clamp-2 leading-relaxed">{app.desc}</p>
                          <div className="flex gap-1 mt-1">
                            {app.tags.map((t) => (
                              <span key={t} className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full bg-consumer-coral/25 text-consumer-surface/90">{t}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom fade + CTA */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-consumer-bg to-transparent pointer-events-none" />
                <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
                  <span className="text-consumer-coral/60 text-[8px] font-semibold uppercase tracking-widest">Nhấn để khám phá →</span>
                </div>
              </div>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center pt-12 pb-3 shrink-0 px-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-business-accent-soft flex items-center justify-center mx-auto mb-3 border border-business-border">
                    <Briefcase className="w-6 h-6 text-business-accent" />
                  </div>
                  <h2 className="font-business text-2xl font-bold text-business-text leading-tight">
                    Bạn quán
                  </h2>
                  <p className="text-business-text-muted text-[10px] mt-1.5">
                    Quản lý · Bán hàng · Tăng trưởng
                  </p>
                </motion.div>

                {/* Scrollable single-column square cards */}
                <div className="flex-1 overflow-y-auto business-scroll pb-14 px-2">
                  <div className="flex flex-col gap-2.5">
                    {businessPreviewApps.map((app, i) => (
                      <motion.div
                        key={app.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        className="relative w-full aspect-square rounded-xl overflow-hidden border border-business-border bg-business-surface/80"
                      >
                        {/* Icon area */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                          <div className="scale-[4] text-business-accent">{app.icon}</div>
                        </div>
                        {/* Content */}
                        <div className="relative h-full flex flex-col justify-end p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 rounded-lg bg-business-accent-soft flex items-center justify-center text-business-accent shrink-0">
                              {app.icon}
                            </div>
                            <h3 className="font-business text-sm font-semibold text-business-text leading-tight">{app.name}</h3>
                          </div>
                          <p className="text-business-text-muted text-[9px] leading-relaxed">{app.desc}</p>
                          <span className="inline-block mt-1.5 text-[7px] font-medium text-business-accent bg-business-accent-soft px-1.5 py-0.5 rounded w-fit">{app.cat}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom fade + CTA */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-business-bg to-transparent pointer-events-none" />
                <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
                  <span className="text-business-accent/40 text-[8px] font-medium uppercase tracking-widest">← Nhấn để khám phá</span>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-business-accent/5 to-transparent" />
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
            <button
              onClick={(e) => { e.stopPropagation(); handleSelect("business"); }}
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
            <button
              onClick={(e) => { e.stopPropagation(); handleSelect("consumer"); }}
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
