import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { supabase } from "@/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BouncingLogoBackground from "@/components/BouncingLogoBackground";

interface AuthPageProps {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
  brandLogoSrc?: string; // optional override for centered card logo
  bounceSrc?: string | string[]; // optional override for bouncing background logo
  showBounceOnMobile?: boolean; // if false, hides bouncing logo on mobile
  hideAuthForm?: boolean; // hide email/password form
  hideExtraButtons?: boolean; // hide buttons after the second one
  extraImageSrc?: string; // optional image/embed shown after CTAs
  bgImageSrc?: string; // optional full-screen background image
}

export const AuthPage = ({ onLogin, brandLogoSrc, bounceSrc, showBounceOnMobile = true, hideAuthForm = false, hideExtraButtons = false, extraImageSrc, bgImageSrc }: AuthPageProps) => {
  const navigate = useNavigate();
  // Force refresh to clear isSignUp reference error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const { toast } = useToast();
  const [videoError, setVideoError] = useState(false);

  // Background media (video optional; can be overridden by a static image)
  const videoSrc = "/lovable-uploads/auth-bg.mp4"; // optional
  const posterSrc = "/lovable-uploads/67d6d2cf-3ae5-48f0-8b30-8cbded3815b7.png";
  // Bouncing logo source (overrideable)
  const defaultBounce = [
    "https://i.imgur.com/tWH4c48.png",
    "https://i.imgur.com/tWH4c48.jpg",
  ];
  const bounceLogoSrc = bounceSrc || defaultBounce;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // If password field is not shown yet, show it after email is entered
    if (!showPasswordField) {
      setShowPasswordField(true);
      return;
    }

    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // First try to sign in
      let authResult = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // If sign in fails, try to sign up
      if (authResult.error && authResult.error.message.includes('Invalid login credentials')) {
        authResult = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          }
        });
        
        if (authResult.error) throw authResult.error;
        
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account",
        });
        return;
      }
      
      if (authResult.error) throw authResult.error;

      if (authResult.data.user) {
        // Get user role from user_roles table
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authResult.data.user.id)
          .maybeSingle();

        if (roleData) {
          const userRole = roleData.role;
          
          // Navigate based on role
          if (userRole === 'admin') {
            navigate('/admin');
          } else if (userRole === 'brand') {
            navigate('/brand');
          } else {
            navigate('/shop');
          }
          
          // Call onLogin if provided (for backward compatibility)
          if (onLogin) {
            onLogin(userRole);
          }
        } else {
          // Default to customer role if no role found
          navigate('/shop');
        }
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    navigate('/shop'); // Mock Google auth
  };

  const handleAppleAuth = () => {
    navigate('/shop'); // Mock Apple auth
  };

  const brandLogo = brandLogoSrc || "/lovable-uploads/29251ffd-00b5-4b7d-b8a1-a2f82a9b0479.png";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Diamond background */}
      {bgImageSrc && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10"
          style={{ backgroundImage: `url(${bgImageSrc})` }}
        />
      )}
      {/* Fallback solid black background */}
      <div className="absolute inset-0 bg-black" />
      {/* Bouncing logo removed */}

      <Card className="w-full max-w-md bg-black/10 border-white/10 shadow-white-glow relative z-20">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img 
              src={brandLogo}
              alt="Brand Logo" 
              className="h-28 w-auto"
            />
          </div>
          
        </CardHeader>

        <CardContent className="space-y-6">
          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              variant="chrome"
              className="w-full h-12 text-2xl font-semibold rounded-xl font-bebas-neue text-black shadow-md"
              onClick={() => {}}
            >
              GET A LINK PAGE
            </Button>
            <Button
              variant="chrome"
              className="w-full h-12 text-2xl font-semibold rounded-xl font-bebas-neue text-black shadow-md"
              onClick={() => window.open('https://t.me/+mx113PockSVjNzgx', '_blank')}
            >
              CONTACT
            </Button>
            <Button
              variant="chrome"
              className="w-full h-12 text-2xl font-semibold rounded-xl font-bebas-neue text-black shadow-md"
              onClick={() => {}}
            >
              WEBSITE
            </Button>
          </div>

          {/* MTV Video Box */}
          <div className="w-full h-80 bg-black border border-white/20 rounded-xl overflow-hidden relative">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              key="mtv-video"
            >
              <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" type="video/mp4" />
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
            </video>
            
            {/* Static overlay effect */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                animation: 'staticNoise 0.1s infinite'
              }}
            />
          </div>

          {extraImageSrc && (
            extraImageSrc.includes('/a/') ? (
              <div className="w-full overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src={`${extraImageSrc.replace(/\/?$/, '')}/embed`}
                  className="w-full h-[300px]"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full overflow-hidden rounded-xl border border-white/10">
                <img src={extraImageSrc} alt="promo" className="w-full h-[300px] object-cover" />
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};
