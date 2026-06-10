import { useEffect, useState } from 'react';
import { Bus, MapPin, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface SplashScreenProps {
  onDismiss: () => void;
  language?: Language;
}

export default function SplashScreen({ onDismiss, language = 'ENG' }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const isSom = language === 'SOM';

  // Tick up progress bar realistically
  useEffect(() => {
    let startTime = Date.now();
    const duration = 1800; // 1.8 seconds loading simulation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calcProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(calcProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(onDismiss, 200); // Small delay to let the user see 100%
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#0b3fa1] via-[#085fa8] to-[#069faa] text-white flex flex-col justify-between p-7 max-w-md mx-auto overflow-hidden animate-fade-in"
      id="app-splash-screen"
    >
      {/* Decorative floating blurred orbs for premium cosmic aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 rounded-full bg-teal-400/20 filter blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 rounded-full bg-[#0b3fa1]/80 filter blur-3xl" />

      {/* 1. Header: Quick logo note with flag info or safe voyager tag */}
      <div className="flex items-center justify-between relative z-10 pt-4">
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-wider">
          <Shield size={12} className="text-teal-300" />
          <span>{isSom ? 'Wasaarada Gaadiidka' : 'MoT Licensed JSL'}</span>
        </div>
        <button
          onClick={onDismiss}
          className="text-[10px] font-extrabold uppercase bg-black/15 hover:bg-black/25 text-white/90 px-3.5 py-1.5 rounded-full border border-white/5 transition-colors cursor-pointer flex items-center gap-1"
          id="btn-skip-splash"
        >
          <span>{isSom ? 'Gudbi' : 'Skip'}</span>
          <ArrowRight size={10} />
        </button>
      </div>

      {/* 2. Center: Pulsating Logo & Animated Title block */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 my-auto space-y-5">
        
        {/* Animated Double Pulsing Circles rings */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-white/5 border border-white/10 scale-125 animate-ping duration-1000" />
          <div className="absolute inset-0 rounded-[32px] bg-white/10 border border-white/20 scale-110" />
          
          <div className="relative w-20 h-20 bg-white text-[#0b3fa1] rounded-[28px] flex items-center justify-center shadow-2xl border border-white/40 transform hover:rotate-3 transition-transform duration-500">
            <Bus size={42} className="stroke-[2.5]" />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter leading-none flex items-center justify-center gap-1">
            <span>Magaalo</span>
            <span className="text-teal-300 font-medium">Trip</span>
          </h1>
          <p className="text-sm text-teal-100/90 font-medium max-w-[280px] mx-auto leading-relaxed">
            {isSom
              ? 'Tikidho deg-deg ah oo loogu talagalay safarada gawaadhida tooska ah ee JSL.'
              : 'Instant booking of direct and reliable bus transport voyages in East Africa.'}
          </p>
        </div>

        {/* Feature Highlights Tags */}
        <div className="flex items-center justify-center gap-2 pt-2 text-[9px] font-bold text-teal-200 uppercase tracking-widest">
          <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
            <MapPin size={9} /> {isSom ? 'Safar Toos ah' : 'Direct Routes'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
            ⚡ {isSom ? 'Boos-garayn Fudud' : 'Fast Checkout'}
          </span>
        </div>
      </div>

      {/* 3. Bottom: Loading Progress Indicator & Interactive status */}
      <div className="space-y-4 relative z-10 pb-6 w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-teal-100 px-1">
            <span className="animate-pulse">
              {isSom ? 'La soo dejisyayaa...' : 'Initializing travel dashboard...'}
            </span>
            <span className="font-mono font-bold">{progress}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-teal-300 to-emerald-400 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-teal-200/60 font-medium text-center">
          {isSom
            ? 'Tikidhada waxaa laga bixiyaa ZAAD, e-Dahab, Somaliland Ministry of Transport.'
            : 'Safar VIP & standard transit options authorized under regulation.'}
        </p>
      </div>
    </div>
  );
}
