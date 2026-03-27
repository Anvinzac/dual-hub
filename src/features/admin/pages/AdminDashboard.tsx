import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit3, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Audience, CatalogApp, deleteCatalogApp, upsertCatalogApp } from "@/features/admin/lib/catalog";
import { useAudienceCatalog } from "@/features/admin/hooks/useAudienceCatalog";

const emptyApp = (audience: Audience): CatalogApp => ({
  id: "",
  audience,
  name: "",
  description: "",
  url: "",
  repo: "",
  imageUrl: "",
  tags: [],
  category: "",
  favorites: 0,
  tryouts: 0,
  forks: 0,
});

interface AdminDashboardProps {
  audience: Audience;
  backPath: string;
  title: string;
  subtitle: string;
}

const parseTags = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const AdminDashboard = ({ audience, backPath, title, subtitle }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: apps = [], isLoading } = useAudienceCatalog(audience);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedApp = useMemo(
    () => apps.find((app) => app.id === selectedId) ?? null,
    [apps, selectedId],
  );
  const [draft, setDraft] = useState<CatalogApp>(emptyApp(audience));

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["catalog-apps", audience] });
    await queryClient.invalidateQueries({ queryKey: audience === "consumer" ? ["apps"] : ["apps"] });
  };

  const saveMutation = useMutation({
    mutationFn: upsertCatalogApp,
    onSuccess: async () => {
      await refresh();
      setSelectedId(null);
      setDraft(emptyApp(audience));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCatalogApp(audience, id),
    onSuccess: refresh,
  });

  const openForEdit = (app: CatalogApp) => {
    setSelectedId(app.id);
    setDraft(app);
  };

  const startNew = () => {
    setSelectedId(null);
    setDraft(emptyApp(audience));
  };

  return (
    <div className="business-shell bg-themed-gradient min-h-screen pb-24 text-foreground">
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-border/50" style={{ background: "hsl(var(--glass-bg))" }}>
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(backPath)}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="text-right">
            <h1 className="text-base font-bold font-display">{title}</h1>
            <p className="text-[10px] uppercase tracking-[0.24em] text-business-text-muted">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-3xl border border-business-border/70 bg-business-surface/70 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold font-display">Apps</h2>
              <p className="text-sm text-business-text-muted">Edit, delete, or create new records.</p>
            </div>
            <button
              type="button"
              onClick={startNew}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Plus size={14} />
              New
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 rounded-2xl glass animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {apps.map((app) => (
                <div key={app.id} className="rounded-2xl border border-business-border/70 bg-business-bg/70 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-business-text truncate">{app.name}</p>
                      <p className="text-xs text-business-text-muted mt-1 line-clamp-2">{app.description}</p>
                      <p className="text-[11px] text-business-text-muted mt-2 truncate">
                        {app.url || "Direct URL pending"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openForEdit(app)}
                        className="inline-flex items-center gap-1 rounded-full glass px-3 py-1.5 text-xs font-medium"
                      >
                        <Edit3 size={12} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMutation.mutate(app.id)}
                        className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-business-text-muted">
                    <span>{app.favorites} favorites</span>
                    <span>{app.tryouts} tryouts</span>
                    <span>{app.forks} forks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-business-border/70 bg-business-surface/70 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.18)]">
          <h2 className="text-lg font-semibold font-display mb-1">{selectedApp ? "Edit app" : "Create app"}</h2>
          <p className="text-sm text-business-text-muted mb-4">This writes directly to the backend catalog for {audience}.</p>

          <div className="space-y-3">
            <input
              value={draft.id}
              onChange={(e) => setDraft((prev) => ({ ...prev, id: e.target.value }))}
              placeholder="id"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.name}
              onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="name"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.description}
              onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="description"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.url}
              onChange={(e) => setDraft((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="url"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.repo}
              onChange={(e) => setDraft((prev) => ({ ...prev, repo: e.target.value }))}
              placeholder="repo"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.imageUrl ?? ""}
              onChange={(e) => setDraft((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="image url"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.tags.join(", ")}
              onChange={(e) => setDraft((prev) => ({ ...prev, tags: parseTags(e.target.value) }))}
              placeholder="tags, comma separated"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <input
              value={draft.category}
              onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="category"
              className="w-full rounded-xl glass px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={draft.favorites}
                onChange={(e) => setDraft((prev) => ({ ...prev, favorites: Number(e.target.value) }))}
                placeholder="favorites"
                className="w-full rounded-xl glass px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={draft.tryouts}
                onChange={(e) => setDraft((prev) => ({ ...prev, tryouts: Number(e.target.value) }))}
                placeholder="tryouts"
                className="w-full rounded-xl glass px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={draft.forks}
                onChange={(e) => setDraft((prev) => ({ ...prev, forks: Number(e.target.value) }))}
                placeholder="forks"
                className="w-full rounded-xl glass px-3 py-2 text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => saveMutation.mutate(draft)}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-electric px-4 py-3 text-sm font-semibold text-primary-foreground glow-primary"
            >
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
