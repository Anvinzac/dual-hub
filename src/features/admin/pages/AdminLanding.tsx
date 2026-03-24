import { Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { BUSINESS_BASE_PATH, CONSUMER_BASE_PATH } from "@/features/hub/routes";

const AdminLanding = () => {
  return (
    <div className="business-shell bg-themed-gradient min-h-screen px-4 py-6 text-foreground">
      <div className="max-w-3xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Admin dashboards</h1>
          <p className="text-sm text-business-text-muted mt-1">Manage each audience separately, with live interaction totals.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/admin/consumer"
            className="rounded-3xl border border-business-border/70 bg-business-surface/70 p-5 shadow-[0_16px_32px_rgba(15,23,42,0.18)]"
          >
            <div className="w-11 h-11 rounded-2xl bg-consumer-coral/15 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-consumer-coral" />
            </div>
            <h2 className="text-lg font-semibold font-display">Consumer team</h2>
            <p className="text-sm text-business-text-muted mt-1">Edit consumer apps, their tags, and their plays/favorites totals.</p>
          </Link>

          <Link
            to="/admin/business"
            className="rounded-3xl border border-business-border/70 bg-business-surface/70 p-5 shadow-[0_16px_32px_rgba(15,23,42,0.18)]"
          >
            <div className="w-11 h-11 rounded-2xl bg-business-accent-soft flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-business-accent" />
            </div>
            <h2 className="text-lg font-semibold font-display">Business team</h2>
            <p className="text-sm text-business-text-muted mt-1">Manage business apps with favorites, tryouts, and forks counts.</p>
          </Link>
        </div>

        <div className="text-sm text-business-text-muted">
          Shortcuts: <Link className="underline" to={CONSUMER_BASE_PATH}>consumer hub</Link> and <Link className="underline" to={BUSINESS_BASE_PATH}>business hub</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
