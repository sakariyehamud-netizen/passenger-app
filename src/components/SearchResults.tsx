import { useState, useMemo } from 'react';
import { Voyage } from '../types';
import { SlidersHorizontal, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRANSLATIONS, Language } from '../translations';

interface SearchResultsProps {
  departureCity: string;
  arrivalCity: string;
  date: string;
  manifest: string;
  voyages: Voyage[];
  onSelectVoyage: (voyage: Voyage) => void;
  onGoBack: () => void;
  language?: Language;
}

export default function SearchResults({
  departureCity,
  arrivalCity,
  date,
  manifest,
  voyages,
  onSelectVoyage,
  onGoBack,
  language = 'ENG',
}: SearchResultsProps) {
  const t = TRANSLATIONS[language];
  const [selectedSort, setSelectedSort] = useState<'price_asc' | 'price_desc' | 'rating'>('price_asc');
  const [filterFeature, setFilterFeature] = useState<string | null>(null);
  const [filterTime, setFilterTime] = useState<'all' | 'morning' | 'afternoon'>('all');
  const [filterBusType, setFilterBusType] = useState<'all' | 'toyota' | 'hiace'>('all');

  // Filter and Sort voyages based on selections
  const processedVoyages = useMemo(() => {
    // 1. Filter by route cities
    let list = voyages.filter(
      (v) =>
        v.departureCity.toLowerCase() === departureCity.toLowerCase() &&
        v.arrivalCity.toLowerCase() === arrivalCity.toLowerCase()
    );

    // Filter by departure time period
    if (filterTime === 'morning') {
      list = list.filter((v) => v.departureTime.includes('AM'));
    } else if (filterTime === 'afternoon') {
      list = list.filter((v) => v.departureTime.includes('PM'));
    }

    // Filter by features
    if (filterFeature) {
      list = list.filter((v) => v.features.includes(filterFeature));
    }

    // Filter by bus type
    if (filterBusType !== 'all') {
      list = list.filter((v) => v.busType === filterBusType);
    }

    // Sorting
    if (selectedSort === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [voyages, departureCity, arrivalCity, filterTime, filterFeature, filterBusType, selectedSort]);

  // Extract all available features for filter pill usage
  const allFeatures = useMemo(() => {
    const set = new Set<string>();
    voyages.forEach((v) => v.features.forEach((f) => set.add(f)));
    return Array.from(set);
  }, [voyages]);

  return (
    <div className="px-5 pb-24 text-left" id="search-results-viewport">
      
      {/* Search Header Info Summary */}
      <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-5 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-base">
            <span>{departureCity}</span>
            <ArrowRight size={14} className="text-[#069faa]" />
            <span>{arrivalCity}</span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {date} • {manifest}
          </p>
        </div>
        
        <button
          onClick={onGoBack}
          className="text-xs bg-slate-50 hover:bg-slate-100 text-[#0b3fa1] font-bold px-3 py-1.5 rounded-xl border border-slate-100 transition-all cursor-pointer"
          id="btn-edit-search"
        >
          {language === 'SOM' ? 'Bedel' : 'Modify'}
        </button>
      </div>

      {/* Interactive Filters Panel */}
      <div className="mb-5 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider mb-3">
          <SlidersHorizontal size={14} className="text-[#069faa]" />
          <span>{language === 'SOM' ? 'Miirayaasha & Kala-soocidda' : 'Filters & sorting'}</span>
        </div>

        {/* Departure period filter */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] w-full text-slate-400 font-bold uppercase mb-1">{language === 'SOM' ? 'Waqtiga Bixidda:' : 'Departure:'}</span>
          <button
            onClick={() => setFilterTime('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              filterTime === 'all'
                ? 'bg-[#0b3fa1] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'Maalinta Dhamaanteed' : 'All Day'}
          </button>
          <button
            onClick={() => setFilterTime('morning')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              filterTime === 'morning'
                ? 'bg-[#0b3fa1] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'Subax (AM)' : 'Morning (AM)'}
          </button>
          <button
            onClick={() => setFilterTime('afternoon')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              filterTime === 'afternoon'
                ? 'bg-[#0b3fa1] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'G.Dambe (PM)' : 'Afternoon (PM)'}
          </button>
        </div>

        {/* Sorting buttons */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] w-full text-slate-400 font-bold uppercase mb-1">{language === 'SOM' ? 'Kala-sooc Qiimaha:' : 'Sort Price:'}</span>
          <button
            onClick={() => setSelectedSort('price_asc')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              selectedSort === 'price_asc'
                ? 'bg-[#069faa] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'Heerka Ugu Hooseeya' : 'Lowest Price'}
          </button>
          <button
            onClick={() => setSelectedSort('price_desc')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              selectedSort === 'price_desc'
                ? 'bg-[#069faa] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'Heerka Ugu Sareeya' : 'Highest Price'}
          </button>
          <button
            onClick={() => setSelectedSort('rating')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              selectedSort === 'rating'
                ? 'bg-[#069faa] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'Heerka Ugu Sareeya' : 'Highest Rated'}
          </button>
        </div>

        {/* Bus Type Filter/Selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] w-full text-slate-400 font-bold uppercase mb-1">{t.busModelCapacity}:</span>
          <button
            onClick={() => setFilterBusType('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              filterBusType === 'all'
                ? 'bg-[#0b3fa1] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {t.allVehicles}
          </button>
          <button
            onClick={() => setFilterBusType('toyota')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              filterBusType === 'toyota'
                ? 'bg-[#0b3fa1] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {t.toyotaText}
          </button>
          <button
            onClick={() => setFilterBusType('hiace')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              filterBusType === 'hiace'
                ? 'bg-[#0b3fa1] text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {t.hiaceText}
          </button>
        </div>

        {/* Feature Filters */}
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] w-full text-slate-400 font-bold uppercase mb-1">{t.amenities}:</span>
          <button
            onClick={() => setFilterFeature(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              !filterFeature
                ? 'bg-slate-800 text-white border-transparent'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
            }`}
          >
            {language === 'SOM' ? 'Dhamaan Adeegyada' : 'All Comforts'}
          </button>
          {allFeatures.map((f) => (
            <button
              key={f}
              onClick={() => setFilterFeature(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                filterFeature === f
                  ? 'bg-slate-800 text-white border-transparent'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-550/10 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Available Voyages */}
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          {language === 'SOM' ? `Safarada La Heli Karo (${processedVoyages.length})` : `Available Voyages (${processedVoyages.length})`}
        </h3>

        {processedVoyages.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-sm text-slate-400 font-semibold mb-2">{t.noVoyagesFound}</p>
            <button
              onClick={() => {
                setFilterTime('all');
                setFilterFeature(null);
                setFilterBusType('all');
                setSelectedSort('price_asc');
              }}
              className="text-xs text-[#069faa] font-bold hover:underline"
            >
              {language === 'SOM' ? 'Dib u deji Miirayaasha' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {processedVoyages.map((voyage) => (
              <div
                key={voyage.id}
                className="bg-white rounded-3xl border border-slate-100 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                id={`voyage-row-${voyage.id}`}
              >
                {/* Operator brand bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-dashed border-slate-100 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center">
                      {voyage.operatorLogo}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-none">
                        {voyage.operatorName}
                      </h4>
                      <div className="flex items-center flex-wrap gap-1.5 mt-1">
                        <span className="text-[10px] text-slate-400 font-medium font-semibold">{t.verifySafe}</span>
                        <ShieldCheck size={11} className="text-emerald-500 fill-emerald-50 text-wrap shrink-0" />
                        {voyage.busType && (
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider ${
                            voyage.busType === 'hiace' 
                              ? 'bg-amber-50 text-amber-700 border border-amber-200/50' 
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200/50'
                          }`}>
                            {voyage.busType === 'hiace' ? t.hiaceText : t.toyotaText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-[#069faa]/10 px-2 py-1 rounded-lg">
                    <Star size={11} className="fill-[#069faa] stroke-none" />
                    <span className="text-[11px] font-extrabold text-[#069faa]">
                      {voyage.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Journey Schedule detail rows */}
                <div className="grid grid-cols-3 items-center text-center py-2.5 mb-2 relative">
                  <div className="text-left">
                    <span className="block text-lg font-black text-[#0b3fa1] tracking-tight">{voyage.departureTime}</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{voyage.departureCity}</span>
                  </div>

                  {/* Mid transit duration visual line */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <span className="text-[10px] text-slate-400 font-bold tracking-wide">{voyage.duration}</span>
                    <div className="relative w-full flex items-center justify-center my-1">
                      <div className="h-[2px] w-full bg-[#069faa]/20 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#069faa]" />
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-400 font-semibold uppercase">{language === 'SOM' ? 'Toos' : 'Direct'}</span>
                  </div>

                  <div className="text-right">
                    <span className="block text-lg font-black text-[#0b3fa1] tracking-tight">{voyage.arrivalTime}</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{voyage.arrivalCity}</span>
                  </div>
                </div>

                {/* Amenities List */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {voyage.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[9px] bg-slate-50 text-slate-500 font-medium px-2 py-0.5 rounded-md"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Lower Action row: Price & selection button */}
                <div className="flex items-center justify-between pt-3.5 border-t border-slate-50">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">{language === 'SOM' ? 'Qiimaha Safarka' : 'Voyage Price'}</span>
                    <span className="text-xl font-black text-[#0b3fa1] tracking-tight mt-0.5">
                      ${voyage.price}
                      <span className="text-xs text-slate-400 font-medium">{language === 'SOM' ? ' / rakaab' : ' / passenger'}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectVoyage(voyage)}
                    className="px-5 py-3 h-11 bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-90 active:scale-95 text-white text-[12px] font-extrabold rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center justify-center cursor-pointer"
                    id={`btn-book-voyage-${voyage.id}`}
                  >
                    {language === 'SOM' ? 'Boos-gareey' : 'Book Now'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
