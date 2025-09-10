import React, { useEffect, useRef } from "react";

type Props = {
  src?: string | string[];
  width?: number; // px
  height?: number; // px
  speed?: number; // px per frame at ~60fps
};

// Full-screen bouncing logo (old-school screensaver style)
export const BouncingLogoBackground: React.FC<Props> = ({
  src = "/lovable-uploads/29251ffd-00b5-4b7d-b8a1-a2f82a9b0479.png",
  width = 120,
  height = 120,
  speed = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const hueRef = useRef<number>(0);
  const glowRef = useRef<number>(0); // 0..1 pulse on bounce

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    let x = Math.random() * 100; // randomize start
    let y = Math.random() * 100;
    let dx = speed;
    let dy = speed;

    const tick = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;

      x += dx;
      y += dy;

      // Bounce on edges
      let bounced = false;
      if (x <= 0) {
        x = 0;
        dx = Math.abs(dx);
        bounced = true;
      } else if (x + width >= cw) {
        x = Math.max(0, cw - width);
        dx = -Math.abs(dx);
        bounced = true;
      }

      if (y <= 0) {
        y = 0;
        dy = Math.abs(dy);
        bounced = true;
      } else if (y + height >= ch) {
        y = Math.max(0, ch - height);
        dy = -Math.abs(dy);
        bounced = true;
      }

      // On bounce: pulse glow and rotate hue
      if (bounced) {
        hueRef.current = (hueRef.current + 30 + Math.random() * 120) % 360;
        glowRef.current = 1;
      }

      // Decay glow each frame
      glowRef.current = Math.max(0, glowRef.current * 0.92);

      const scale = 1 + glowRef.current * 0.08;
      const glowPx = 4 + glowRef.current * 10;
      const glowAlpha = 0.35 + glowRef.current * 0.4;

      logo.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      logo.style.filter = `drop-shadow(0 0 ${glowPx}px rgba(0, 200, 255, ${glowAlpha})) hue-rotate(${hueRef.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      // Nudge inside bounds on resize
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      x = Math.min(x, Math.max(0, cw - width));
      y = Math.min(y, Math.max(0, ch - height));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [height, speed, width]);

  const sources = Array.isArray(src) ? src : [src];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <img
        ref={logoRef}
        src={sources[0]}
        width={width}
        height={height}
        alt=""
        className="select-none will-change-transform"
        draggable={false}
        style={{ transform: "translate3d(0,0,0)" }}
        onError={(e) => {
          // Try fallbacks if provided
          const el = e.currentTarget as HTMLImageElement;
          const current = sources.indexOf(el.src);
          const next = current >= 0 && current < sources.length - 1 ? current + 1 : 1; // default try second
          if (sources[next]) {
            el.src = sources[next];
          }
        }}
      />
    </div>
  );
};

export default BouncingLogoBackground;
