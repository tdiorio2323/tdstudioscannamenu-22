import React from 'react';
import { NavLink } from 'react-router-dom';
import { AutoSliderBanner } from '@/components/AutoSliderBanner';
import { SplashScreen } from '@/components/SplashScreen';
import ShimmerText from '@/components/ShimmerText';
import { LiquidGlassCard } from '@/components/LiquidGlass';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Home-only entrance splash */}
      <SplashScreen />
      {/* TD STUDIOS shimmer */}
      <section className="px-6 pt-10">
        <ShimmerText text="TD STUDIOS tedtx" className="text-center" />
      </section>

      {/* Fullscreen entrance banner */}
      <section className="px-0 pt-0">
        <AutoSliderBanner />
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Premium design solutions tailored for the cannabis industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mylar Designs */}
            <LiquidGlassCard hover="glow" variant="primary" className="p-8 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Mylar Packaging</h3>
                <p className="text-white/60">
                  Premium mylar bag designs that make your products stand out on dispensary shelves.
                </p>
                <NavLink
                  to="/mylar-designs"
                  className="inline-block text-white/80 hover:text-white font-medium transition-colors"
                >
                  View Designs →
                </NavLink>
              </div>
            </LiquidGlassCard>

            {/* Custom Designs */}
            <LiquidGlassCard hover="glow" variant="primary" className="p-8 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Custom Designs</h3>
                <p className="text-white/60">
                  Bespoke design solutions tailored to your brand's unique identity and vision.
                </p>
                <NavLink
                  to="/custom-designs"
                  className="inline-block text-white/80 hover:text-white font-medium transition-colors"
                >
                  Get Started →
                </NavLink>
              </div>
            </LiquidGlassCard>

            {/* Digital Assets */}
            <LiquidGlassCard hover="glow" variant="primary" className="p-8 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Digital Assets</h3>
                <p className="text-white/60">
                  Social media content, logos, and digital design packs ready for download.
                </p>
                <NavLink
                  to="/digital-assets"
                  className="inline-block text-white/80 hover:text-white font-medium transition-colors"
                >
                  Browse Assets →
                </NavLink>
              </div>
            </LiquidGlassCard>

            {/* Social Content */}
            <LiquidGlassCard hover="glow" variant="primary" className="p-8 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M12 12v4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Social Content</h3>
                <p className="text-white/60">
                  Instagram posts, reels, and stories designed to grow your social presence.
                </p>
                <NavLink
                  to="/social-content"
                  className="inline-block text-white/80 hover:text-white font-medium transition-colors"
                >
                  View Content →
                </NavLink>
              </div>
            </div>

            {/* Custom Websites */}
            <div className="group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Custom Websites</h3>
                <p className="text-white/60">
                  Professional websites and e-commerce solutions for cannabis businesses.
                </p>
                <NavLink
                  to="/custom-websites"
                  className="inline-block text-white/80 hover:text-white font-medium transition-colors"
                >
                  Learn More →
                </NavLink>
              </div>
            </LiquidGlassCard>

            {/* Referral Program */}
            <LiquidGlassCard hover="glow" variant="primary" className="p-8 border border-white/10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Referral Program</h3>
                <p className="text-white/60">
                  Earn rewards by referring new clients to our premium design services.
                </p>
                <NavLink
                  to="/referral"
                  className="inline-block text-white/80 hover:text-white font-medium transition-colors"
                >
                  Join Program →
                </NavLink>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <LiquidGlassCard hover="glow" variant="primary" className="p-12 border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Elevate Your Brand?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Let's create something extraordinary together. Contact us to discuss your premium design needs.
              </p>
              <NavLink
                to="/contact"
                className="inline-flex items-center px-10 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <span className="text-lg font-semibold text-white mr-2">Start Your Project</span>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NavLink>
            </LiquidGlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
