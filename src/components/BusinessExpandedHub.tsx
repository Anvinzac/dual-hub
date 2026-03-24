import { Search, BarChart3, ShoppingCart, Users, FileText, Settings, CreditCard, Package, TrendingUp, Shield } from "lucide-react";
import BusinessAppCard from "./BusinessAppCard";

const categories = [
  { label: "Tất cả", active: true },
  { label: "Quản lý" },
  { label: "Bán hàng" },
  { label: "Tài chính" },
  { label: "Nhân sự" },
  { label: "Marketing" },
];

const apps = [
  { title: "POS Thông Minh", description: "Hệ thống bán hàng tại quầy, quản lý đơn hàng và thanh toán nhanh chóng", category: "Bán hàng", icon: <ShoppingCart className="w-5 h-5" /> },
  { title: "Quản Lý Kho", description: "Theo dõi tồn kho, nhập xuất hàng hoá và quản lý nhà cung cấp", category: "Quản lý", icon: <Package className="w-5 h-5" /> },
  { title: "Báo Cáo Doanh Thu", description: "Phân tích doanh thu, lợi nhuận và xu hướng kinh doanh theo thời gian thực", category: "Tài chính", icon: <BarChart3 className="w-5 h-5" /> },
  { title: "CRM Khách Hàng", description: "Quản lý thông tin khách hàng, lịch sử mua hàng và chương trình khách hàng thân thiết", category: "Marketing", icon: <Users className="w-5 h-5" /> },
  { title: "Hoá Đơn Điện Tử", description: "Xuất hoá đơn VAT, quản lý chứng từ và kết nối cơ quan thuế", category: "Tài chính", icon: <FileText className="w-5 h-5" /> },
  { title: "Thanh Toán Online", description: "Tích hợp nhiều cổng thanh toán, QR code và ví điện tử", category: "Bán hàng", icon: <CreditCard className="w-5 h-5" /> },
  { title: "Phân Tích Kinh Doanh", description: "Dashboard thông minh với AI dự báo xu hướng và đề xuất chiến lược", category: "Quản lý", icon: <TrendingUp className="w-5 h-5" /> },
  { title: "Bảo Mật & Quyền", description: "Quản lý phân quyền nhân viên, bảo vệ dữ liệu kinh doanh", category: "Nhân sự", icon: <Shield className="w-5 h-5" /> },
];

const BusinessExpandedHub = () => {
  return (
    <div className="h-full flex flex-col bg-business-bg business-scroll overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-business-accent" />
          <span className="text-xs font-medium text-business-accent uppercase tracking-widest">Giải pháp</span>
        </div>
        <h1 className="font-business text-3xl font-bold text-business-text leading-tight">
          Bạn quán
        </h1>
        <p className="text-business-text-muted text-sm mt-1">Bộ công cụ quản lý dành cho doanh nghiệp</p>
      </div>

      {/* Search */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-business-text-muted" />
          <input
            type="text"
            placeholder="Tìm giải pháp kinh doanh..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-business-surface text-business-text text-sm border border-business-border focus:border-business-accent/50 outline-none transition-colors placeholder:text-business-text-muted/60"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`shrink-0 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                cat.active
                  ? "bg-business-accent text-business-text"
                  : "bg-business-surface text-business-text-muted border border-business-border hover:border-business-accent/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-5 pb-4">
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg bg-business-surface border border-business-border p-3">
            <p className="text-business-text-muted text-[10px] uppercase tracking-wider">Ứng dụng</p>
            <p className="text-business-text font-business text-xl font-bold mt-0.5">24+</p>
          </div>
          <div className="flex-1 rounded-lg bg-business-surface border border-business-border p-3">
            <p className="text-business-text-muted text-[10px] uppercase tracking-wider">Ngành nghề</p>
            <p className="text-business-text font-business text-xl font-bold mt-0.5">8</p>
          </div>
          <div className="flex-1 rounded-lg bg-business-surface border border-business-border p-3">
            <p className="text-business-text-muted text-[10px] uppercase tracking-wider">Đối tác</p>
            <p className="text-business-text font-business text-xl font-bold mt-0.5">150+</p>
          </div>
        </div>
      </div>

      {/* Apps list */}
      <div className="px-5 pb-8 flex flex-col gap-2.5">
        {apps.map((app) => (
          <BusinessAppCard key={app.title} {...app} />
        ))}
      </div>
    </div>
  );
};

export default BusinessExpandedHub;
