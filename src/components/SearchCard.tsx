import { useState } from 'react';
import { MapPin, Calendar, Users, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { Voyage } from '../types';
import { TRANSLATIONS, Language } from '../translations';

interface SearchCardProps {
  onSearch: (params: {
    departureCity: string;
    arrivalCity: string;
    voyageDate: string;
    manifest: string;
    passengerCount: number;
  }) => void;
  initialDeparture?: string;
  initialArrival?: string;
  initialDate?: string;
  language?: Language;
}

const CITIES = ['Hargeisa', 'Berbera', 'Borama', 'Galkayo', 'Bosaso', 'Garowe', 'Burco'];

export default function SearchCard({
  onSearch,
  initialDeparture = 'Hargeisa',
  initialArrival = 'Berbera',
  initialDate = '24 Oct, 2026',
  language = 'ENG',
}: SearchCardProps) {
  const t = TRANSLATIONS[language];
  const [departure, setDeparture] = useState(initialDeparture);
  const [arrival, setArrival] = useState(initialArrival);
  const [date, setDate] = useState(initialDate);
  const [passengerCount, setPassengerCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  // Popover controls
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [showArrivalDropdown, setShowArrivalDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showManifestDropdown, setShowManifestDropdown] = useState(false);

  const handleSwap = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const getManifestText = () => {
    let text = `${passengerCount} ${passengerCount > 1 ? t.adults : t.adult}`;
    if (childCount > 0) {
      text += `, ${childCount} ${childCount > 1 ? t.children : t.child}`;
    }
    return text;
  };

  const handleSearchSubmit = () => {
    onSearch({
      departureCity: departure,
      arrivalCity: arrival,
      voyageDate: date,
      manifest: getManifestText(),
      passengerCount: passengerCount + childCount,
    });
  };

  // Generate date choices (next few days) starting from late Oct 2026 or near future
  const generateDateChoices = () => {
    const dates = [
      '24 Oct, 2026',
      '25 Oct, 2026',
      '26 Oct, 2026',
      '27 Oct, 2026',
      '28 Oct, 2026',
      '12 May, 2026',
      '28 Jul, 2026',
    ];
    // Add current date nicely
    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    if (!dates.includes(formattedToday)) {
      dates.unshift(formattedToday);
    }
    return dates;
  };

  const dateChoices = generateDateChoices();

  return (
    <div className="relative -mt-8 px-6 pb-2" id="magaalo-search-card-container">
      <div className="bg-white rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-5 border border-slate-50 relative z-10">
        
        {/* Departure city layout */}
        <div className="relative mb-3">
          <div
            onClick={() => {
              setShowDepartureDropdown(!showDepartureDropdown);
              setShowArrivalDropdown(false);
              setShowDateDropdown(false);
              setShowManifestDropdown(false);
            }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#edf2f7]/45 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            id="field-departure"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-[#0b3fa1]">
              <MapPin size={22} className="stroke-[2.5]" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                {t.departureCity}
              </span>
              <span className="block text-[#0b3fa1] font-extrabold text-lg tracking-tight mt-1">
                {departure}
              </span>
            </div>
            <ChevronDown size={18} className="text-slate-400" />
          </div>

          {/* Departure Dropdown Options */}
          {showDepartureDropdown && (
            <div className="absolute left-0 right-0 top-[82px] z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 max-h-56 overflow-y-auto">
              {CITIES.map((city) => (
                <button
                  key={city}
                  disabled={city === arrival}
                  onClick={() => {
                    setDeparture(city);
                    setShowDepartureDropdown(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    city === departure
                      ? 'bg-[#0b3fa1]/10 text-[#0b3fa1] bg-slate-100'
                      : city === arrival
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{city}</span>
                  {city === departure && <Check size={16} className="text-[#069faa]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Swap button floating */}
        <div className="absolute right-12 top-[66px] z-20">
          <button
            onClick={handleSwap}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#069faa] shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-100 hover:scale-105 active:scale-95 transition-all"
            id="city-swap-button"
            title="Swap cities"
          >
            <ArrowUpDown size={18} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Arrival city layout */}
        <div className="relative mb-4">
          <div
            onClick={() => {
              setShowArrivalDropdown(!showArrivalDropdown);
              setShowDepartureDropdown(false);
              setShowDateDropdown(false);
              setShowManifestDropdown(false);
            }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#edf2f7]/45 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            id="field-arrival"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-50 text-[#069faa]">
              <MapPin size={22} className="stroke-[2.5]" />
            </div>
            <div className="flex-1 text-left">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                {t.arrivalCity}
              </span>
              <span className="block text-[#069faa] font-extrabold text-lg tracking-tight mt-1">
                {arrival}
              </span>
            </div>
            <ChevronDown size={18} className="text-slate-400" />
          </div>

          {/* Arrival Dropdown Options */}
          {showArrivalDropdown && (
            <div className="absolute left-0 right-0 top-[82px] z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 max-h-56 overflow-y-auto">
              {CITIES.map((city) => (
                <button
                  key={city}
                  disabled={city === departure}
                  onClick={() => {
                    setArrival(city);
                    setShowArrivalDropdown(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    city === arrival
                      ? 'bg-teal-50 text-[#069faa]'
                      : city === departure
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{city}</span>
                  {city === arrival && <Check size={16} className="text-[#069faa]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date and Passengers section side-by-side */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Voyage Date */}
          <div className="relative">
            <div
              onClick={() => {
                setShowDateDropdown(!showDateDropdown);
                setShowDepartureDropdown(false);
                setShowArrivalDropdown(false);
                setShowManifestDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-[#edf2f7]/45 border border-transparent hover:border-slate-200 transition-all cursor-pointer h-20"
              id="field-date"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100/80 text-slate-500 shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                  {t.voyageDate}
                </span>
                <span className="block text-[#0b3fa1] font-black text-[13px] tracking-tight mt-1 whitespace-nowrap overflow-ellipsis">
                  {date}
                </span>
              </div>
            </div>

            {/* Date Picker Picker list */}
            {showDateDropdown && (
              <div className="absolute left-0 right-0 top-[85px] z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 w-[180px] max-h-52 overflow-y-auto">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-3 py-1 text-left">{t.selectTravelDate}</p>
                {dateChoices.map((dt) => (
                  <button
                    key={dt}
                    onClick={() => {
                      setDate(dt);
                      setShowDateDropdown(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${
                      dt === date ? 'bg-[#0b3fa1] text-white' : 'text-slate-700 hover:bg-[#0b3fa1]/10 hover:bg-slate-50'
                    }`}
                  >
                    {dt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Passengers Selector */}
          <div className="relative">
            <div
              onClick={() => {
                setShowManifestDropdown(!showManifestDropdown);
                setShowDepartureDropdown(false);
                setShowArrivalDropdown(false);
                setShowDateDropdown(false);
              }}
              className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-[#edf2f7]/45 border border-transparent hover:border-slate-200 transition-all cursor-pointer h-20"
              id="field-manifest"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100/80 text-slate-500 shrink-0">
                <Users size={18} />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                  {t.manifest}
                </span>
                <span className="block text-[#0b3fa1] font-black text-[13px] tracking-tight mt-1 whitespace-nowrap overflow-ellipsis">
                  {passengerCount + childCount === 1 ? `1 ${t.adult}` : `${passengerCount + childCount} ${t.passengers}`}
                </span>
              </div>
            </div>

            {/* Passengers Manifest Popover Selector */}
            {showManifestDropdown && (
              <div className="absolute right-0 top-[85px] z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 w-[220px]">
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 text-left">{t.travellers}</p>
                
                {/* Adults Count */}
                <div className="flex items-center justify-between mb-3 bg-slate-50 p-2 rounded-xl">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">{t.adults}</span>
                    <span className="text-[10px] text-slate-400 block">Age 12+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={passengerCount <= 1}
                      type="button"
                      onClick={() => setPassengerCount(curr => Math.max(1, curr - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold flex items-center justify-center text-slate-600 disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{passengerCount}</span>
                    <button
                      disabled={passengerCount + childCount >= 6}
                      type="button"
                      onClick={() => setPassengerCount(curr => curr + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold flex items-center justify-center text-slate-600 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Kids Count */}
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-800 block">{t.children}</span>
                    <span className="text-[10px] text-slate-400 block">Age 2-11</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={childCount <= 0}
                      type="button"
                      onClick={() => setChildCount(curr => Math.max(0, curr - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold flex items-center justify-center text-slate-600 disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{childCount}</span>
                    <button
                      disabled={passengerCount + childCount >= 6}
                      type="button"
                      onClick={() => setChildCount(curr => curr + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold flex items-center justify-center text-slate-600 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowManifestDropdown(false)}
                    className="w-full py-1.5 rounded-lg bg-[#069faa] text-white text-xs font-semibold hover:bg-[#05848e] transition-all"
                  >
                    {t.applyConfig}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search gradient button */}
        <button
          onClick={handleSearchSubmit}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-extrabold text-[15px] tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_6px_20px_rgba(6,159,170,0.3)] hover:scale-[1.01] active:scale-95 duration-200 cursor-pointer"
          id="btn-find-voyage"
        >
          <svg
            className="w-5 h-5 text-white stroke-[2.5]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span>{t.findBestVoyage}</span>
        </button>

      </div>
    </div>
  );
}
