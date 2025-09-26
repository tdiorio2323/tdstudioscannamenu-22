import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, Repeat2 } from "lucide-react";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  trigger?: "hover" | "click" | "both"; // how flipping is triggered
  coverImage?: string;
  coverAlt?: string;
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  trigger = "hover",
  coverImage,
  coverAlt,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const allowHover = trigger === "hover" || trigger === "both";
  const allowClick = trigger === "click" || trigger === "both";
  const toggle = () => setIsFlipped((v) => !v);

  const handleStartToday = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking button
    navigate('/contact');
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-[280px] h-[360px] group [perspective:2000px] mx-auto",
        allowClick && "cursor-pointer"
      )}
      onMouseEnter={allowHover ? () => setIsFlipped(true) : undefined}
      onMouseLeave={allowHover ? () => setIsFlipped(false) : undefined}
      onClick={allowClick ? toggle : undefined}
      role="button"
      tabIndex={allowClick ? 0 : -1}
      onKeyDown={
        allowClick
          ? (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }
          : undefined
      }
      aria-label="Flip card"
    >
      <div
        className={cn(
          "relative w-full h-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-zinc-50/90 dark:bg-zinc-900/80",
            "border border-zinc-200/60 dark:border-zinc-800/60",
            "shadow-xs dark:shadow-lg",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="relative h-full overflow-hidden bg-gradient-to-b from-zinc-100/50 to-white/30 dark:from-zinc-900/40 dark:to-black/30">
            {coverImage ? (
              <div className="relative h-[75%] w-full">
                <img
                  src={coverImage}
                  alt={coverAlt || title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/0 to-black/40" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-start justify-center pt-24">
                <div className="relative w-[200px] h-[100px] flex items-center justify-center">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute w-[50px] h-[50px]",
                        "rounded-[140px]",
                        "animate-[cardflipScale_3s_linear_infinite]",
                        "opacity-0",
                        "shadow-[0_0_50px_rgba(255,165,0,0.5)]",
                        "group-hover:animate-[cardflipScale_2s_linear_infinite]"
                      )}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 pt-4 pb-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white leading-snug tracking-tighter transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-200 line-clamp-2 tracking-tight transition-all duration-500 ease-out-expo group-hover:translate-y-[-4px] delay-&lsqb;50ms&rsqb;">
                  {subtitle}
                </p>
              </div>
              <div className="relative group/icon">
                <div className="absolute inset-[-8px] rounded-lg transition-opacity duration-300 bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent" />
                <Repeat2 className="relative z-10 w-4 h-4 text-orange-500 transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:-rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "p-6 rounded-2xl",
            "bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black",
            "border border-zinc-200 dark:border-zinc-800",
            "shadow-xs dark:shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-lg dark:group-hover:shadow-xl",
            !isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white leading-snug tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 tracking-tight line-clamp-2">
                {description}
              </p>
            </div>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 transition-all duration-500"
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 100 + 200}ms`
                  }}
                >
                  <ArrowRight className="w-3 h-3 text-orange-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div
              className={cn(
                "group/start relative",
                "flex items-center justify-between",
                "p-3 -m-3 rounded-xl",
                "transition-all duration-300",
                "bg-gradient-to-r from-zinc-100 via-zinc-100 to-zinc-100",
                "dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800",
                "hover:from-orange-500/10 hover:via-orange-500/5 hover:to-transparent",
                "dark:hover:from-orange-500/20 dark:hover:via-orange-500/10 dark:hover:to-transparent",
                "hover:scale-[1.02] hover:cursor-pointer"
              )}
              onClick={handleStartToday}
            >
              <span className="text-sm font-medium text-zinc-900 dark:text-white transition-colors duration-300 group-hover/start:text-orange-600 dark:group-hover/start:text-orange-400">
                Start today
              </span>
              <div className="relative group/icon">
                <div className="absolute inset-[-6px] rounded-lg transition-all duration-300 bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent opacity-0 group-hover/start:opacity-100 scale-90 group-hover/start:scale-100" />
                <ArrowRight className="relative z-10 w-4 h-4 text-orange-500 transition-all duration-300 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes cardflipScale {
            0% { transform: scale(2); opacity: 0; box-shadow: 0 0 50px rgba(255,165,0,.5); }
            50% { transform: translate(0,-5px) scale(1); opacity: 1; box-shadow: 0 8px 20px rgba(255,165,0,.5); }
            100% { transform: translate(0,5px) scale(.1); opacity: 0; box-shadow: 0 10px 20px rgba(255,165,0,0); }
          }
        `}
      </style>
    </div>
  );
}
