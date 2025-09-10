import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Bagman-branded auth page with custom background + logo
// Place assets in public/lovable-uploads/ as below
// Use external image as background (direct Imgur link)
const BG_URL = "https://i.imgur.com/ISdTuJI.jpg"; // or replace with /lovable-uploads/bagman-bg.jpg
const LOGO_URL = "/lovable-uploads/bagman-logo.png"; // use the smaller image as logo

const Bagman = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Error", description: "Please enter your email", variant: "destructive" });
      return;
    }
    if (!showPasswordField) { setShowPasswordField(true); return; }
    if (!password) {
      toast({ title: "Error", description: "Please enter your password", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      let auth = await supabase.auth.signInWithPassword({ email, password });
      if (auth.error && auth.error.message.includes('Invalid login credentials')) {
        auth = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/` } });
        if (auth.error) throw auth.error;
        toast({ title: "Account Created", description: "Check your email to verify." });
        return;
      }
      if (auth.error) throw auth.error;
      // role-based redirect
      if (auth.data.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', auth.data.user.id)
          .maybeSingle();
        if (roleData?.role === 'admin') navigate('/admin');
        else if (roleData?.role === 'brand') navigate('/brand');
        else navigate('/shop');
      }
    } catch (err: any) {
      toast({ title: "Auth Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Background image centered; scaled down on desktop (60vh ≈ 40% reduction from full height) */}
      <img
        src={BG_URL}
        alt="Bagman background"
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        draggable={false}
        style={{ height: '60vh', width: 'auto' }}
      />
      {/* Mobile fallback: full-bleed */}
      <img
        src={BG_URL}
        alt="Bagman background"
        className="md:hidden absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/40" />

      <Card className="w-full max-w-md bg-black/10 border-white/10 shadow-white-glow relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            {/* In-card logo (smaller) */}
            <img src={LOGO_URL} alt="Bagman" className="h-24 w-auto" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Button
              variant="chrome"
              className="w-full h-12 text-xl font-semibold rounded-xl font-bebas-neue text-black shadow-md"
              onClick={() => window.open('https://bagmanpack.com', '_blank')}
            >
              Visit Site
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white/90 text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder:text-white/50 border-white/30 h-12 text-base"
                />
              </div>

              {showPasswordField && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90 text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 text-white placeholder:text-white/50 border-white/30 pr-10 h-12 text-base"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-white/60" /> : <Eye className="h-4 w-4 text-white/60" />}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                {isLoading ? 'Loading...' : (!showPasswordField ? 'Continue' : 'Sign In')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bagman;
