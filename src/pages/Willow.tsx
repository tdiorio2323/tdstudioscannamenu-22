export default function Willow() {
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
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            {/* Profile Photo */}
            <div className="mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="Willow" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            
            {/* Name */}
            <h1 className="text-2xl font-bold text-white text-center mb-2 drop-shadow-lg">
              Willow
            </h1>
            
            {/* Bio/Description */}
            <p className="text-white/90 text-center text-sm max-w-xs drop-shadow-md">
              Content creator • Influencer • Artist
            </p>
          </div>

          {/* Links Section */}
          <nav className="space-y-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📷</span>
                <span>Instagram</span>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🎵</span>
                <span>TikTok</span>
              </div>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📺</span>
                <span>YouTube</span>
              </div>
            </a>

            {/* OnlyFans */}
            <a
              href="https://onlyfans.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/60 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🔥</span>
                <span>EXCLUSIVE</span>
              </div>
            </a>
          </nav>

          {/* Image Box */}
          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
              alt="Willow" 
              className="w-full h-80 object-cover" 
            />
          </div>

          {/* Verification Badge */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2 bg-[#1da1f2]/90 backdrop-blur-sm 
                          rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white text-xs font-medium">Verified Profile</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}