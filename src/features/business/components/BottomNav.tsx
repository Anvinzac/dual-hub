import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, BookOpen, PlusCircle, Heart } from "lucide-react";
import { useLikedApps } from "@/features/business/hooks/useLikedApps";
import {
  BUSINESS_AI_GUIDE_PATH,
  BUSINESS_BASE_PATH,
  BUSINESS_BOOKMARKS_PATH,
  BUSINESS_SUBMIT_PATH,
} from "@/features/business/routes";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { count } = useLikedApps();

  const tabs = [
    { id: BUSINESS_BASE_PATH, label: "Gallery", icon: LayoutGrid, badge: 0 },
    { id: BUSINESS_BOOKMARKS_PATH, label: "My Tools", icon: Heart, badge: count },
    { id: BUSINESS_AI_GUIDE_PATH, label: "AI Guide", icon: BookOpen, badge: 0 },
    { id: BUSINESS_SUBMIT_PATH, label: "Submit", icon: PlusCircle, badge: 0 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t-0 rounded-t-2xl">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => {
          const isActive = path === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-coral text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNav;
