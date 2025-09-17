export default function TdReferral() {
  return (
    <div
      className="min-h-dvh w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/para.webp')",
        backgroundPosition: "center top"
      }}
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-sm items-center justify-center pt-8 pb-8 px-6">
        <div className="w-full">
          {/* Image Box at Top Center */}
          <div className="mb-8 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg bg-black">
            <img
              src="/TD STUDIOS WHITE TEXT.png"
              alt="TD Studios Referral"
              className="w-full h-80 object-contain p-6"
            />
          </div>

          {/* Links Section */}
          <nav className="space-y-3">
            {/* Referral Program */}
            <a
              href="/referral"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>💰</span>
                <span>Join Referral Program</span>
              </div>
            </a>

            {/* Contact */}
            <a
              href="/contact"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📧</span>
                <span>Contact Us</span>
              </div>
            </a>

            {/* TD Studios Website */}
            <a
              href="/"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🏠</span>
                <span>TD Studios Home</span>
              </div>
            </a>
          </nav>

          {/* Verification Badge */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2 bg-[#1da1f2]/90 backdrop-blur-sm
                          rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white text-xs font-medium">TD Studios Referral</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
