import { Search, Sparkles, Star, TrendingUp, Gamepad2, Music, Palette, BookOpen, Dumbbell, MessageCircle } from "lucide-react";
import ConsumerAppCard from "./ConsumerAppCard";
import appSocial from "@/assets/app-social.jpg";
import appQuiz from "@/assets/app-quiz.jpg";
import appMusic from "@/assets/app-music.jpg";
import appArt from "@/assets/app-art.jpg";
import appFitness from "@/assets/app-fitness.jpg";
import appLanguage from "@/assets/app-language.jpg";

const categories = [
  { icon: <Sparkles className="w-4 h-4" />, label: "Nổi bật", active: true },
  { icon: <Gamepad2 className="w-4 h-4" />, label: "Trò chơi" },
  { icon: <Music className="w-4 h-4" />, label: "Âm nhạc" },
  { icon: <Palette className="w-4 h-4" />, label: "Sáng tạo" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Học tập" },
  { icon: <Dumbbell className="w-4 h-4" />, label: "Sức khoẻ" },
  { icon: <MessageCircle className="w-4 h-4" />, label: "Xã hội" },
];

const apps = [
  { title: "ChatVui", description: "Trò chuyện vui nhộn với bạn bè, chia sẻ khoảnh khắc đáng nhớ mỗi ngày", tags: ["Xã hội", "Chat", "Miễn phí"], plays: 45200, favorites: 12800, imageUrl: appSocial, url: "#" },
  { title: "QuizMaster", description: "Thử thách kiến thức với hàng ngàn câu hỏi thú vị từ nhiều chủ đề", tags: ["Trò chơi", "Giáo dục"], plays: 32100, favorites: 8900, imageUrl: appQuiz, url: "#" },
  { title: "BeatDrop", description: "Nghe nhạc không giới hạn, tạo playlist và khám phá nghệ sĩ mới", tags: ["Âm nhạc", "Giải trí"], plays: 67500, favorites: 23400, imageUrl: appMusic, url: "#" },
  { title: "ArtSpace", description: "Vẽ tranh kỹ thuật số với hàng trăm công cụ và hiệu ứng sáng tạo", tags: ["Sáng tạo", "Nghệ thuật"], plays: 18700, favorites: 6200, imageUrl: appArt, url: "#" },
  { title: "FitBuddy", description: "Theo dõi sức khoẻ, lập kế hoạch tập luyện cùng huấn luyện viên AI", tags: ["Sức khoẻ", "Thể thao"], plays: 28300, favorites: 9100, imageUrl: appFitness, url: "#" },
  { title: "LingoPlay", description: "Học ngoại ngữ qua trò chơi, phát âm chuẩn với AI thông minh", tags: ["Học tập", "Ngôn ngữ"], plays: 51800, favorites: 15600, imageUrl: appLanguage, url: "#" },
];

const ConsumerExpandedHub = () => {
  return (
    <div className="h-full flex flex-col bg-consumer-bg consumer-scroll overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-5 h-5 text-consumer-amber fill-consumer-amber" />
          <span className="text-xs font-semibold text-consumer-coral uppercase tracking-wider">Khám phá</span>
        </div>
        <h1 className="font-playful text-3xl font-extrabold text-consumer-text leading-tight">
          Bạn khách
        </h1>
        <p className="text-consumer-text-muted text-sm mt-1">Ứng dụng giải trí & học tập dành cho bạn</p>
      </div>

      {/* Search */}
      <div className="px-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-consumer-text-muted" />
          <input
            type="text"
            placeholder="Tìm ứng dụng yêu thích..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-consumer-surface text-consumer-text text-sm border-2 border-consumer-coral/15 focus:border-consumer-coral/40 outline-none transition-colors placeholder:text-consumer-text-muted/60"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                cat.active
                  ? "bg-consumer-coral text-consumer-surface shadow-md"
                  : "bg-consumer-surface text-consumer-text-muted hover:bg-consumer-coral/10"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending section */}
      <div className="px-5 pb-3">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-consumer-magenta" />
          <h2 className="font-playful text-lg font-bold text-consumer-text">Xu hướng</h2>
        </div>
      </div>

      {/* App grid */}
      <div className="px-5 pb-8 grid grid-cols-2 gap-3">
        {apps.map((app) => (
          <ConsumerAppCard key={app.title} {...app} />
        ))}
      </div>
    </div>
  );
};

export default ConsumerExpandedHub;
