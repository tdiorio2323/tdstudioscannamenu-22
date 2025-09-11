export default function QuickPrintz() {
  return (
    <div
      className="min-h-dvh w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/qp-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-md items-center justify-center p-6">
        <div className="w-full rounded-3xl bg-black/80 shadow-[0_0_80px_rgba(0,0,0,0.6)] ring-1 ring-white/10 p-6">
          {/* static logo (no bounce) */}
          <div className="flex justify-center mb-6">
            <img src="/qp-logo.png" alt="Quick Printz" className="h-20 w-auto" />
          </div>

          {/* buttons */}
          <nav className="space-y-3">
            <a
              href="/mylar-bags"
              className="block w-full rounded-xl px-5 py-3 text-center font-semibold tracking-wide
                         bg-gradient-to-b from-white/90 to-white/70 text-black ring-1 ring-white/40 hover:from-white"
            >
              MYLAR BAGS
            </a>
            <a
              href="/designs"
              className="block w-full rounded-xl px-5 py-3 text-center font-semibold tracking-wide
                         bg-gradient-to-b from-white/90 to-white/70 text-black ring-1 ring-white/40 hover:from-white"
            >
              DESIGNS
            </a>
            <a
              href="/website"
              className="block w-full rounded-xl px-5 py-3 text-center font-semibold tracking-wide
                         bg-gradient-to-b from-white/90 to-white/70 text-black ring-1 ring-white/40 hover:from-white"
            >
              WEBSITE
            </a>
          </nav>

          {/* optional media area (remove if not needed) */}
          {/* <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img src="/some-photo.jpg" alt="" className="w-full h-auto" />
          </div> */}
        </div>
      </main>
    </div>
  );
}