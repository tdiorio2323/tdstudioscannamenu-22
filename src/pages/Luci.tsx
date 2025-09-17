export default function Luci() {
  return (
    <div
      className="min-h-dvh w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/rose-gold-bracelets-earrings-rings-jewelery-pink-water-background-luxury-glamour-holiday-beauty-design-jewelry-brand-ads.jpg')",
        backgroundPosition: "center center"
      }}
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-sm items-center justify-center pt-8 pb-8 px-6">
        <div className="w-full">
          {/* Image Box at Top Center */}
          <div className="mb-6 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg">
            <img
              src="/luci 2.jpg"
              alt="Luci"
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Name Typography */}
          <div className="mb-8 w-full">
            <h2
              className="text-white text-center text-6xl font-light tracking-wider relative"
              style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
                background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Luciana
            </h2>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-2"></div>
          </div>

          {/* Links Section */}
          <nav className="space-y-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/luiciana_34/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-bold text-white uppercase tracking-wider
                         bg-red-600/70 backdrop-blur-md border-2 border-red-400/60
                         hover:bg-red-500/80 hover:border-red-300 transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif" }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </div>
            </a>

            {/* OnlyFans */}
            <a
              href="https://onlyfans.com/luicianasalas"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-bold text-white uppercase tracking-wider
                         bg-red-600/70 backdrop-blur-md border-2 border-red-400/60
                         hover:bg-red-500/80 hover:border-red-300 transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif" }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13h-4v4h-4v-4H6v-2h4V7h4v4h4v2z"/>
                </svg>
                <span>OnlyFans</span>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/qJFUw3I5SKg4N2U5"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-bold text-white uppercase tracking-wider
                         bg-red-600/70 backdrop-blur-md border-2 border-red-400/60
                         hover:bg-red-500/80 hover:border-red-300 transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif" }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Telegram</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=50664572209&text=%F0%9F%91%8B%F0%9F%8F%BDHola%20mis%20amores%20%F0%9F%92%9A%20%0AEste%20es%20mi%20enlace%20de%20whats%20%0APara%20suscribirse%20mensualmente%20%F0%9F%93%85%20%0A%F0%9F%93%8DSolo%20debes%20enviarme%20el%20baucher%20del%20sinpe%20movil%20%F0%9F%93%9D%20%0A%20%F0%9F%93%B2%20N%C3%BAmero%20de%20sinpe%206%EF%B8%8F%E2%83%A34%EF%B8%8F%E2%83%A35%EF%B8%8F%E2%83%A37%EF%B8%8F%E2%83%A32%EF%B8%8F%E2%83%A32%EF%B8%8F%E2%83%A30%EF%B8%8F%E2%83%A39%EF%B8%8F%E2%83%A3%20%0A%20%20%20%20%2064572209%20%0AAparece%20a%20nombre%20de%20Luiciana%20Salas%20"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-bold text-white uppercase tracking-wider
                         bg-red-600/70 backdrop-blur-md border-2 border-red-400/60
                         hover:bg-red-500/80 hover:border-red-300 transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif" }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z"/>
                </svg>
                <span>WhatsApp</span>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/Luicianasalas"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-bold text-white uppercase tracking-wider
                         bg-red-600/70 backdrop-blur-md border-2 border-red-400/60
                         hover:bg-red-500/80 hover:border-red-300 transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif" }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </div>
            </a>
          </nav>

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