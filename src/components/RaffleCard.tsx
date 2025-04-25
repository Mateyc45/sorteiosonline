import React, {useEffect} from 'react';
import { Share2Icon } from 'lucide-react';
import { cn } from '../lib/utils';

interface RaffleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  gradient?: string;
}

export function RaffleCard({
  title,
  description,
  icon,
  onClick,
  className,
  gradient = 'from-gray-500 to-gray-400',
}: RaffleCardProps) {
  
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div
      className={cn(
        'group cursor-pointer rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md border border-gray-200/50 relative overflow-hidden h-full',
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
      
      <div className="relative flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "rounded-lg p-3 transition-colors",
            `bg-gradient-to-r ${gradient}`
          )}>
            <div className="text-white">{icon}</div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <Share2Icon className="h-5 w-5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}