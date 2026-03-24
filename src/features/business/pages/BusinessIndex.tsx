import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppDetailSheet from "@/features/business/components/AppDetailSheet";
import BottomNav from "@/features/business/components/BottomNav";
import FolderChildCard from "@/features/business/components/FolderChildCard";
import FolderCard from "@/features/business/components/FolderCard";
import { AppMeta, appFolders } from "@/features/business/data/apps";
import { useApps } from "@/features/business/hooks/useApps";
import { useLikedApps } from "@/features/business/hooks/useLikedApps";
import AudiencePageTransition from "@/features/hub/components/AudiencePageTransition";
import { CONSUMER_BASE_PATH } from "@/features/hub/routes";

const BusinessIndex = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [detailApp, setDetailApp] = useState<AppMeta | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [scrollToScreenshots, setScrollToScreenshots] = useState(false);
  const { isLiked, toggleLike } = useLikedApps();
  const { apps, isLoading, statsMap, getAllTemplates, getAllTypes } = useApps();
  const [localStatsOverrides, setLocalStatsOverrides] = useState<Record<string, { hearts: number }>>({});

  // Open detail sheet from URL param on first load
  useEffect(() => {
    // Only run once when apps are loaded
    if (apps.length === 0 || isLoading) return;
    
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get("tool");
    if (toolId) {
      const app = apps.find((a) => a.id === toolId);
      if (app) {
        setDetailApp(app);
        setScrollToScreenshots(false);
        setDetailVisible(true);
      }
    }
  }, [apps, isLoading]);

  const allTemplates = getAllTemplates();
  const allTypes = getAllTypes();
  const filterChips = [...allTypes, ...allTemplates];

  const normalizedSearch = search.trim().toLowerCase();

  const visibleFolders = appFolders
    .map((folder) => {
      const app = apps.find((entry) => entry.id === folder.parentAppId);
      if (!app) return null;

      const matchesSearch =
        !normalizedSearch ||
        app.name.toLowerCase().includes(normalizedSearch) ||
        app.description?.toLowerCase().includes(normalizedSearch) ||
        folder.childApps.some(
          (child) =>
            child.name.toLowerCase().includes(normalizedSearch) ||
            child.subtitle.toLowerCase().includes(normalizedSearch) ||
            child.description?.toLowerCase().includes(normalizedSearch),
        );
      const matchesFilter =
        !activeFilter ||
        app.type.includes(activeFilter) ||
        app.templates.includes(activeFilter);

      if (!matchesSearch || !matchesFilter) return null;

      return { folder, app };
    })
    .filter((entry): entry is { folder: (typeof appFolders)[number]; app: AppMeta } => Boolean(entry));

  const handleTapName = useCallback((app: AppMeta) => {
    setDetailApp(app);
    setScrollToScreenshots(false);
    setDetailVisible(true);
  }, []);

  const handleCloseDetail = () => setDetailVisible(false);

  const getHearts = (app: AppMeta) =>
    localStatsOverrides[app.id]?.hearts ?? statsMap[app.id]?.hearts ?? app.hearts ?? 0;

  const getTryouts = (app: AppMeta) =>
    statsMap[app.id]?.tryouts ?? app.tryouts ?? 0;

  const handleHeart = (app: AppMeta) => {
    const wasLiked = isLiked(app.id);
    toggleLike(app.id);
    const currentHearts = getHearts(app);
    setLocalStatsOverrides((prev) => ({
      ...prev,
      [app.id]: {
        hearts: wasLiked ? Math.max(currentHearts - 1, 0) : currentHearts + 1,
      },
    }));
  };

  return (
    <AudiencePageTransition audience="business">
      <div className="business-shell bg-themed-gradient min-h-screen pb-20 text-foreground">
        <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-border/50" style={{ background: "hsl(var(--glass-bg))" }}>
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(CONSUMER_BASE_PATH, { state: { from: "business" } })}
                  className="inline-flex items-center gap-1 rounded-full glass px-3 py-2 text-[11px] font-semibold text-consumer-surface active:scale-95 transition-transform"
                >
                  <ChevronLeft size={14} className="text-consumer-amber" />
                  <span className="text-consumer-amber">Bạn khách</span>
                </button>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  <div>
                    <h1 className="text-lg font-bold font-display gradient-text">Bạn quán</h1>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-business-text-muted">Tool gallery</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-business text-business-text">Business Hub</p>
                <p className="text-[10px] text-business-text-muted">Powered by imported mixrepo features</p>
              </div>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full glass rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/60 font-medium"
              />
            </div>
          </div>
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
            <button
              className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap font-semibold shrink-0 transition-all duration-200 ${
                !activeFilter ? "bg-primary text-primary-foreground glow-primary" : "glass text-secondary-foreground"
              }`}
              onClick={() => setActiveFilter(null)}
            >
              All
            </button>
            {filterChips.map((chip) => (
              <button
                key={chip}
                className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap font-semibold shrink-0 transition-all duration-200 ${
                  activeFilter === chip ? "bg-primary text-primary-foreground glow-primary" : "glass text-secondary-foreground"
                }`}
                onClick={() => setActiveFilter(activeFilter === chip ? null : chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="px-3 py-4 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div data-testid="business-folder-list" className="px-3 py-4 flex flex-col gap-3">
            {visibleFolders.map(({ folder, app }) => (
              <motion.section
                key={folder.id}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className={`relative overflow-hidden rounded-[1.6rem] border transition-all duration-300 ${
                  openFolderId === folder.id
                    ? "border-business-accent/60 bg-business-surface shadow-[0_18px_44px_rgba(15,23,42,0.24)]"
                    : "border-business-border/70 bg-business-surface/80 shadow-[0_10px_24px_rgba(15,23,42,0.14)]"
                }`}
              >
                <div className="p-1.5">
                  <FolderCard
                    folder={folder}
                    appCount={folder.childApps.length}
                    isOpen={openFolderId === folder.id}
                    onToggle={() => setOpenFolderId((current) => current === folder.id ? null : folder.id)}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {openFolderId === folder.id && (
                    <motion.div
                      key={`${folder.id}-content`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        data-testid={`folder-${folder.id}-apps`}
                        className="border-t border-business-border/80 bg-business-bg/72 px-4 pb-4 pt-3"
                      >
                        <div className="flex items-center justify-between gap-3 pb-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-business-text-muted">
                              {app.templates.slice(0, 2).join(" / ")}
                            </p>
                            <p className="text-base font-semibold text-business-text mt-1.5">
                              3 sub-apps inside {folder.name}
                            </p>
                          </div>
                          <span className="rounded-full bg-business-accent-soft px-3 py-1.5 text-sm font-medium text-business-text">
                            {folder.childApps.length}
                          </span>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.22 }}
                          className="grid gap-3 md:grid-cols-3"
                        >
                          {folder.childApps.map((child) => (
                            <motion.div
                              key={child.id}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.22 }}
                            >
                              <FolderChildCard
                                app={{
                                  ...child,
                                  hearts: getHearts(child),
                                  tryouts: getTryouts(child),
                                }}
                                isLiked={isLiked(child.id)}
                                onHeart={() => handleHeart(child)}
                                onOpen={handleTapName}
                              />
                            </motion.div>
                          ))}
                        </motion.div>

                        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-business-border/70 bg-business-surface/60 px-3 py-2.5">
                          <div>
                            <p className="text-sm uppercase tracking-[0.14em] text-business-text-muted">Parent template</p>
                            <p className="text-base font-semibold text-business-text">{app.name}</p>
                          </div>
                          <button
                            type="button"
                            className="rounded-xl border border-business-border px-3.5 py-2 text-sm font-medium text-business-text active:scale-95 transition-transform"
                            onClick={() => handleTapName(app)}
                          >
                            Open parent app
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            ))}
          </div>
        )}

        {!isLoading && visibleFolders.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-muted-foreground text-sm">No tools found</p>
          </div>
        )}

        <AppDetailSheet
          app={detailApp}
          visible={detailVisible}
          onClose={handleCloseDetail}
          scrollToScreenshots={scrollToScreenshots}
          isLiked={detailApp ? isLiked(detailApp.id) : false}
          onHeart={(appId) =>
            detailApp && detailApp.id === appId ? handleHeart(detailApp) : undefined
          }
          hearts={detailApp ? getHearts(detailApp) : 0}
          tryouts={detailApp ? getTryouts(detailApp) : 0}
        />

        <BottomNav />
      </div>
    </AudiencePageTransition>
  );
};

export default BusinessIndex;
