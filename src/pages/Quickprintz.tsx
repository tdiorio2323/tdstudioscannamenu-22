import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/supabase/client';

export default function QuickPrintz() {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            source: 'quickprintz'
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed!",
            description: "This email is already subscribed to our newsletter.",
            variant: "default",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been added to our newsletter. Thank you!",
          variant: "default",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update page meta tags for social sharing
  useEffect(() => {
    document.title = 'QUICK PRINTZ - Professional Packaging & Design Services';
    
    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('og:title', 'QUICK PRINTZ');
    updateMetaTag('og:description', 'Professional packaging and design services for your business needs');
    updateMetaTag('og:image', '/quickprintz-og-image.png');
    updateMetaTag('og:url', window.location.href);

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = 'visual-intuition-seeker-tool';
      updateMetaTag('og:title', 'TD STUDIOS');
      updateMetaTag('og:description', 'Lovable Generated Project');
      updateMetaTag('og:image', '/og-image.png');
    };
  }, []);
  
  const recentImages = [
    '/images/c2da14e385bf0dd84ed26bb791c0bf051b6b2bb9.png',
    '/images/2bf3682bba5ef9d490d0b0225d2548b601d317be.jpeg',
    '/images/650021112868abd1046a39d586a18ab0baa1be1f.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % recentImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [recentImages.length]);
  return (
    <div
      className="min-h-dvh w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/quick printz store.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg items-center justify-center p-3 sm:p-6">
        <div className="w-full h-[calc(100dvh-1.5rem)] sm:h-[calc(100dvh-3rem)] rounded-3xl bg-black/80 shadow-[0_0_80px_rgba(255,255,255,0.3)] ring-1 ring-white/10 p-4 sm:p-6 relative overflow-hidden drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] flex flex-col">
          {/* blueredsmoke background image inside card */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <img src="/images/blueredsmoke.png" alt="Blue Red Smoke" className="w-full h-full object-cover opacity-70" />
          </div>
          
          {/* static logo (no bounce) - positioned over the smoke image */}
          <div className="flex justify-center mb-4 sm:mb-6 relative z-10">
            <img src="/quickprintz-logo.png" alt="Quick Printz" className="h-40 sm:h-60 w-auto" />
          </div>

          {/* buttons */}
          <nav className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10">
            <a
              href="https://getquickprintz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 sm:h-24 w-full rounded-xl text-center font-bold tracking-wide text-lg sm:text-2xl
                         bg-red-500/20 backdrop-blur-md text-white ring-1 ring-red-300/30 shadow-lg drop-shadow-md hover:bg-red-500/30 transition-all duration-300
                         flex items-center justify-center"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              PACKAGING
            </a>
            <a
              href="https://t.me/TDSTUDIOSCORP"
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 sm:h-24 w-full rounded-xl text-center font-bold tracking-wide text-lg sm:text-2xl
                         bg-blue-500/20 backdrop-blur-md text-white ring-1 ring-blue-300/30 shadow-lg drop-shadow-md hover:bg-blue-500/30 transition-all duration-300
                         flex items-center justify-center"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              DESIGNS
            </a>
            <div className="col-span-2 w-full flex justify-center h-20 sm:h-32">
              <div className="flex gap-2 sm:gap-3 w-full justify-between">
                <a
                  href="https://cash.app/$reservetank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 sm:h-32 flex-1 aspect-square bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-white/20 transition-all duration-300"
                >
                  <img src="/Cash_App-Logo.wine.svg" alt="Cash App" className="w-full h-full p-2 sm:p-4" />
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/quickprintz401/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 sm:h-32 flex-1 aspect-square bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-white/20 transition-all duration-300"
                >
                  <img src="/Instagram-Logo.wine (1).svg" alt="Instagram" className="w-full h-full p-2 sm:p-4" />
                </a>
                {/* Gmail */}
                <a
                  href="https://getquickprintz.com/portal#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 sm:h-32 flex-1 aspect-square bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-white/20 transition-all duration-300"
                >
                  <img src="/Gmail-Logo.wine.svg" alt="Gmail" className="w-full h-full p-3 sm:p-6" />
                </a>
                {/* Zelle */}
                <a
                  href="mailto:derekcasiano16@gmail.com?subject=Zelle Payment Request"
                  className="h-20 sm:h-32 flex-1 aspect-square bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-white/20 transition-all duration-300"
                >
                  <img src="/zelle svg.svg" alt="Zelle" className="w-full h-full p-2 sm:p-4" />
                </a>
              </div>
            </div>
            </nav>

          {/* Newsletter signup form */}
          <form onSubmit={handleNewsletterSubmit} className="mt-4 sm:mt-6 relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 ring-1 ring-white/20 shadow-lg">
            <div className="text-center mb-3">
              <p className="text-white font-semibold text-sm sm:text-base mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                GET UPDATES & SPECIAL OFFERS
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white font-bold px-4 py-2 disabled:opacity-50"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
              </Button>
            </div>
          </form>

          {/* slideshow of recent images */}
          <div className="mt-4 sm:mt-6 overflow-hidden rounded-2xl ring-1 ring-white/10 relative z-10 flex-1">
            <img 
              src={recentImages[currentImage]} 
              alt="QuickPrintz Showcase" 
              className="w-full h-full object-cover transition-opacity duration-500" 
            />
          </div>
        </div>
      </main>
    </div>
  );
}