import {
  BarChart3,
  BookOpen,
  CreditCard,
  Dumbbell,
  FileText,
  Gamepad2,
  MessageCircle,
  Music,
  Package,
  Palette,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import appArt from "@/assets/app-art.jpg";
import appFitness from "@/assets/app-fitness.jpg";
import appLanguage from "@/assets/app-language.jpg";
import appMusic from "@/assets/app-music.jpg";
import appPhoto from "@/assets/app-photo.jpg";
import appQuiz from "@/assets/app-quiz.jpg";
import appRecipe from "@/assets/app-recipe.jpg";
import appSocial from "@/assets/app-social.jpg";
import type {
  BusinessApp,
  BusinessPreviewApp,
  BusinessStat,
  CategoryOption,
  ConsumerPreviewApp,
} from "@/features/hub/types";

export const consumerPreviewApps: ConsumerPreviewApp[] = [
  { name: "ChatVui", description: "Trò chuyện vui nhộn với bạn bè, chia sẻ khoảnh khắc đáng nhớ", imageUrl: appSocial, tags: ["Xã hội", "Chat"] },
  { name: "QuizMaster", description: "Thử thách kiến thức với hàng ngàn câu hỏi thú vị", imageUrl: appQuiz, tags: ["Trò chơi", "Giáo dục"] },
  { name: "BeatDrop", description: "Nghe nhạc không giới hạn, tạo playlist yêu thích", imageUrl: appMusic, tags: ["Âm nhạc"] },
  { name: "ArtSpace", description: "Vẽ tranh kỹ thuật số với công cụ sáng tạo", imageUrl: appArt, tags: ["Sáng tạo"] },
  { name: "FitBuddy", description: "Theo dõi sức khoẻ cùng huấn luyện viên AI", imageUrl: appFitness, tags: ["Sức khoẻ"] },
  { name: "LingoPlay", description: "Học ngoại ngữ qua trò chơi thú vị", imageUrl: appLanguage, tags: ["Học tập"] },
  { name: "SnapEdit", description: "Chỉnh sửa ảnh với bộ lọc và sticker độc đáo", imageUrl: appPhoto, tags: ["Ảnh", "Sáng tạo"] },
  { name: "NấuNgon", description: "Khám phá công thức nấu ăn từ khắp nơi", imageUrl: appRecipe, tags: ["Ẩm thực"] },
];

export const businessPreviewApps: BusinessPreviewApp[] = [
  { name: "POS Thông Minh", description: "Hệ thống bán hàng tại quầy, quản lý đơn hàng nhanh", icon: ShoppingCart, category: "Bán hàng" },
  { name: "Quản Lý Kho", description: "Theo dõi tồn kho, nhập xuất hàng hoá tự động", icon: Package, category: "Quản lý" },
  { name: "Báo Cáo Doanh Thu", description: "Phân tích doanh thu và xu hướng kinh doanh", icon: BarChart3, category: "Tài chính" },
  { name: "CRM Khách Hàng", description: "Quản lý thông tin và lịch sử mua hàng", icon: Users, category: "Marketing" },
  { name: "Hoá Đơn Điện Tử", description: "Xuất hoá đơn VAT, kết nối cơ quan thuế", icon: FileText, category: "Tài chính" },
  { name: "Thanh Toán Online", description: "Tích hợp QR code và ví điện tử", icon: CreditCard, category: "Bán hàng" },
];

export const consumerCategories: CategoryOption[] = [
  { icon: Sparkles, label: "Nổi bật" },
  { icon: Gamepad2, label: "Trò chơi" },
  { icon: Music, label: "Âm nhạc" },
  { icon: Palette, label: "Sáng tạo" },
  { icon: BookOpen, label: "Học tập" },
  { icon: Dumbbell, label: "Sức khoẻ" },
  { icon: MessageCircle, label: "Xã hội" },
];

export const businessCategories: CategoryOption[] = [
  { label: "Tất cả" },
  { label: "Quản lý" },
  { label: "Bán hàng" },
  { label: "Tài chính" },
  { label: "Nhân sự" },
  { label: "Marketing" },
];

export const businessApps: BusinessApp[] = [
  { title: "POS Thông Minh", description: "Hệ thống bán hàng tại quầy, quản lý đơn hàng và thanh toán nhanh chóng", category: "Bán hàng", icon: ShoppingCart },
  { title: "Quản Lý Kho", description: "Theo dõi tồn kho, nhập xuất hàng hoá và quản lý nhà cung cấp", category: "Quản lý", icon: Package },
  { title: "Báo Cáo Doanh Thu", description: "Phân tích doanh thu, lợi nhuận và xu hướng kinh doanh theo thời gian thực", category: "Tài chính", icon: BarChart3 },
  { title: "CRM Khách Hàng", description: "Quản lý thông tin khách hàng, lịch sử mua hàng và chương trình khách hàng thân thiết", category: "Marketing", icon: Users },
  { title: "Hoá Đơn Điện Tử", description: "Xuất hoá đơn VAT, quản lý chứng từ và kết nối cơ quan thuế", category: "Tài chính", icon: FileText },
  { title: "Thanh Toán Online", description: "Tích hợp nhiều cổng thanh toán, QR code và ví điện tử", category: "Bán hàng", icon: CreditCard },
  { title: "Phân Tích Kinh Doanh", description: "Dashboard thông minh với AI dự báo xu hướng và đề xuất chiến lược", category: "Quản lý", icon: TrendingUp },
  { title: "Bảo Mật & Quyền", description: "Quản lý phân quyền nhân viên, bảo vệ dữ liệu kinh doanh", category: "Nhân sự", icon: Shield },
];

export const businessStats: BusinessStat[] = [
  { label: "Ứng dụng", value: "24+" },
  { label: "Ngành nghề", value: "8" },
  { label: "Đối tác", value: "150+" },
];

export const consumerHeader = {
  badgeIcon: Star,
  badgeLabel: "Khám phá",
  title: "Bạn khách",
  description: "Ứng dụng giải trí và học tập dành cho bạn",
  sectionIcon: TrendingUp,
  sectionTitle: "Xu hướng",
  searchPlaceholder: "Tìm ứng dụng yêu thích...",
};

export const businessHeader = {
  badgeIcon: Settings,
  badgeLabel: "Giải pháp",
  title: "Bạn quán",
  description: "Bộ công cụ quản lý dành cho doanh nghiệp",
  searchPlaceholder: "Tìm giải pháp kinh doanh...",
};
