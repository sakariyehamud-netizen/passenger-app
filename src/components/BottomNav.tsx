import { Home, Search, Ticket, User } from 'lucide-react';
import { Language } from '../translations';

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'tickets' | 'profile';
  onChangeTab: (tab: 'home' | 'search' | 'tickets' | 'profile') => void;
  language?: Language;
}

export default function BottomNav({ activeTab, onChangeTab, language = 'ENG' }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: language === 'SOM' ? 'Hoyga' : 'Home', icon: Home },
    { id: 'search', label: language === 'SOM' ? 'Baadh' : 'Search', icon: Search },
    { id: 'tickets', label: language === 'SOM' ? 'Tigidhada' : 'Tickets', icon: Ticket },
    { id: 'profile', label: language === 'SOM' ? 'Profile' : 'Profile', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] rounded-t-3xl max-w-md mx-auto">
      <div className="flex justify-around items-center h-20 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 h-full py-2 transition-all duration-300"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              id={`nav-btn-${tab.id}`}
            >
              {/* Active Tab Top Indicator Line */}
              {isActive && (
                <div className="absolute top-0 w-12 h-[3px] bg-[#069faa] rounded-b-full transition-all duration-300" />
              )}

              <div
                className={`p-1 duration-200 transition-transform ${
                  isActive ? 'text-[#069faa] scale-110' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>

              <span
                className={`text-[11px] font-semibold mt-1 tracking-wide transition-colors ${
                  isActive ? 'text-[#0b3fa1]' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
