import React from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ children, className = '' }) => (
  <div className={`bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 ${className}`}>
    {children}
  </div>
);

export default LiquidGlassCard;