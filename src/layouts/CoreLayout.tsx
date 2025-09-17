import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { CartPreview } from '@/components/CartPreview';

// robust body scroll lock (iOS-safe)
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    if (locked) {
      html.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
    } else {
      const top = parseInt(body.style.top || '0', 10) || 0;
      html.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      if (top) window.scrollTo(0, -top);
    }
    return () => {
      html.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
    };
  }, [locked]);
}

const CoreLayout: React.FC<CoreLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // lock body scroll when mobile menu is open
  useBodyScrollLock(isMobileMenuOpen);

  // close mobile on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const navigationLinks = [
    { to: '/', label: 'HOME' },
    { to: '/shop', label: 'SHOP' },
    { to: '/custom-websites', label: 'WEBSITES' },
    { to: '/referral', label: 'REFERRAL' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header is always on top to avoid route-specific overlays capturing clicks */}
      <header className="sticky top-0 z-[100] pointer-events-auto bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Logo Row */}
            <div className="flex justify-center mb-4">
              <NavLink
                to="/"
                onClick={(e) => {
                  // force client-side nav and stop any parent handlers
                  e.preventDefault(); e.stopPropagation(); navigate('/');
                }}
                className="text-2xl font-bold tracking-wider hover:text-white/80 transition-colors cursor-pointer"
                aria-label="Go to home"
              >
                TD STUDIOS
              </NavLink>
            </div>

            {/* Navigation Row */}
            <div className="flex justify-center">
              <nav className="flex items-center space-x-8">
              {navigationLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-all duration-300 hover:text-white hover:scale-105 ${
                      isActive
                        ? 'text-white border-b-2 border-white/50'
                        : 'text-white/70'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center">
                      {totalCount}
                    </span>
                  )}
                </button>

              </nav>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Mobile Logo */}
            <NavLink
              to="/"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/'); }}
              className="text-xl font-bold tracking-wider hover:text-white/80 transition-colors cursor-pointer"
              aria-label="Go to home"
            >
              TD STUDIOS
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-[90]"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <nav
                className="lg:hidden absolute left-0 right-0 top-full z-[95] bg-black/95 backdrop-blur-md border-t border-white/10"
                role="menu"
              >
              <div className="space-y-2 p-4">
                {navigationLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-white/10 text-white"
                    role="menuitem"
                  >
                    {label}
                  </NavLink>
                ))}

                {/* Mobile cart button */}
                <div className="pt-2">
                  <button
                    onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Cart{totalCount ? ` (${totalCount})` : ''}
                  </button>
                </div>
              </div>
            </nav>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
        {children}
      </main>

      {/* Cart preview overlay */}
      <CartPreview open={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <NavLink to="/" className="text-xl font-bold hover:text-white/80 transition-colors cursor-pointer">
                  TD STUDIOS
                </NavLink>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium design solutions for cannabis brands, mylar packaging,
                and digital assets. Elevating your brand to luxury standards.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                {navigationLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className="block text-white/60 hover:text-white text-sm transition-colors duration-300"
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get In Touch</h3>
              <div className="space-y-2 text-sm text-white/60">
                <p>Ready to elevate your brand?</p>
                <p>Contact us for premium design solutions.</p>
                <div className="pt-4">
                  <NavLink
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    Start Your Project
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © 2024 TD Studios. All rights reserved. Premium design solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoreLayout;
