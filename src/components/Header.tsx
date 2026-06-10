import { Bell, ArrowLeft, Bus, Globe } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  notificationCount?: number;
  onNotificationClick?: () => void;
  currentLanguage?: 'ENG' | 'SOM';
  onChangeLanguage?: (lang: 'ENG' | 'SOM') => void;
}


export default function Header({
  title = 'Magaalo Trip',
  subtitle = 'Welcome to',
  onBack,
  notificationCount = 0,
  onNotificationClick,
  currentLanguage,
  onChangeLanguage,
}: HeaderProps) {
  return (
    <div className="relative w-full pt-8 pb-14 px-6 bg-gradient-to-r from-brand-blue to-brand-cyan rounded-b-[40px] shadow-lg">
      <div className="flex items-center justify-between">
        
        {/* Left Section: Back Button or Brand Logo */}
        <div className="flex items-center gap-3">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
              id="header-back-btn"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* Unique 'Magaalo Trip' Bus Logo background structure */}
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/15 shadow-inner"
                id="header-bus-logo"
              >
                <div className="bg-[#0b3fa1] text-white p-2 rounded-xl flex items-center justify-center shadow-md">
                  <Bus size={22} className="stroke-[2.5]" />
                </div>
              </div>
              
              <div>
                <p className="text-[12px] text-white/70 font-medium tracking-wide leading-none">{subtitle}</p>
                <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">{title}</h1>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Language switcher & Notification Icon */}
        <div className="flex items-center gap-2">
          {currentLanguage && onChangeLanguage && (
            <button
              type="button"
              onClick={() => onChangeLanguage(currentLanguage === 'ENG' ? 'SOM' : 'ENG')}
              className="flex items-center gap-1.5 px-3 py-2 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-md transition-all cursor-pointer shadow-sm btn-lang-toggle"
              title="Switch Language / Bedel Luuqadda"
              id="lang-toggler-btn"
            >
              <Globe size={13} className="text-white/80" />
              <span>{currentLanguage === 'ENG' ? 'SOM 🇸🇴' : 'ENG 🇬🇧'}</span>
            </button>
          )}

          {onBack && !onNotificationClick ? (
            <div className="text-right">
              <span className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-md h-11 flex items-center justify-center">
                Info
              </span>
            </div>
          ) : (
            onNotificationClick && (
              <button
                onClick={onNotificationClick}
                className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all"
                id="header-notification-btn"
              >
                <Bell size={20} className="stroke-[2]" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white animate-pulse ring-2 ring-brand-cyan">
                    {notificationCount}
                  </span>
                )}
              </button>
            )
          )}
        </div>

      </div>
    </div>
  );
}
