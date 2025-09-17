import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthCardButton {
  label: string;
  url: string;
}

export interface AuthCardData {
  slug: string;
  title: string;
  username: string;
  image: string;
  bgImage?: string;
  buttons: AuthCardButton[];
}

interface AuthCardProps extends AuthCardData {
  className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  username,
  image,
  bgImage,
  buttons,
  className = ""
}) => {
  const backgroundStyle = bgImage ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={backgroundStyle}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Glassmorphism card */}
      <Card className={`w-full max-w-md bg-black/10 border-white/10 shadow-white-glow backdrop-blur-md relative z-20 ${className}`}>
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img 
              src={image}
              alt={title}
              className="h-24 w-24 rounded-full border-4 border-white/20 shadow-lg object-cover"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-white/80">{username}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant="chrome"
              className="w-full h-12 text-2xl font-semibold rounded-xl font-bebas-neue text-black shadow-md"
              onClick={() => window.open(button.url, '_blank')}
            >
              {button.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};