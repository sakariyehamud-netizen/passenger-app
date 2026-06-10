import { POPULAR_ROUTES } from '../mockData';
import { RouteOption } from '../types';
import { ArrowRight, Star } from 'lucide-react';
import { TRANSLATIONS, Language } from '../translations';

interface PopularRoutesProps {
  onSelectRoute: (route: RouteOption) => void;
  onExploreAll: () => void;
  language?: Language;
}

export default function PopularRoutes({ onSelectRoute, onExploreAll, language = 'ENG' }: PopularRoutesProps) {
  const t = TRANSLATIONS[language];
  
  return (
    <div className="px-6 py-4" id="popular-routes-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-[#0b3fa1] tracking-tight">
          {t.popularRoutes}
        </h2>
        <button
          onClick={onExploreAll}
          className="text-xs font-bold text-[#069faa] hover:underline uppercase tracking-wider"
          id="btn-explore-all"
        >
          {t.exploreAll}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {POPULAR_ROUTES.slice(0, 4).map((route, idx) => (
          <div
            key={`${route.from}-${route.to}-${idx}`}
            onClick={() => onSelectRoute(route)}
            className="group relative overflow-hidden bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-slate-100 p-3 h-44 flex flex-col justify-between hover:border-slate-300 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            id={`route-card-${route.from}-${route.to}`}
          >
            {/* Visual Route Image with blur overlay */}
            <div className="absolute inset-0 bg-slate-950/20 z-0 group-hover:bg-slate-950/25 transition-all" />
            <img
              src={route.image}
              alt={`${route.from} to ${route.to}`}
              className="absolute inset-0 w-full h-full object-cover z-[-1] group-hover:scale-110 duration-550 transition-transform"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Price Badge top right */}
            <div className="self-end z-10 bg-[#069faa] text-white px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide shadow-sm flex items-center gap-0.5">
              <span>{language === 'SOM' ? 'Ka' : 'From'}</span>
              <span className="text-xs">${route.price}</span>
            </div>

            {/* Bottom info section */}
            <div className="z-10 text-left mt-auto">
              {/* Stars badge layout */}
              <div className="flex items-center gap-0.5 mb-1 bg-white/30 backdrop-blur-sm w-fit px-1.5 py-0.5 rounded text-[8px] font-bold text-white">
                <Star size={8} className="fill-white stroke-none" />
                <span>4.8 {language === 'SOM' ? 'Qiimayn' : 'Rating'}</span>
              </div>
              
              <p className="text-[11px] font-medium text-slate-200 tracking-wide leading-none uppercase">
                {route.duration} {language === 'SOM' ? 'safar' : 'voyage'}
              </p>
              
              <div className="flex items-center gap-1.5 mt-1">
                <span className="font-extrabold text-sm text-white leading-tight">
                  {route.from}
                </span>
                <ArrowRight size={12} className="text-teal-300" />
                <span className="font-extrabold text-sm text-white leading-tight">
                  {route.to}
                </span>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
