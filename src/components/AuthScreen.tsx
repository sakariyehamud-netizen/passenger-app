import { useState, FormEvent } from 'react';
import { Bus, Phone, Mail, User, KeyRound, Sparkles, Globe } from 'lucide-react';
import { Language } from '../translations';

interface AuthScreenProps {
  onLoginSuccess: (user: { name: string; phone: string; email: string }) => void;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
}

export default function AuthScreen({ onLoginSuccess, language = 'ENG', onChangeLanguage }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('Sakariye Hamud');
  const [phone, setPhone] = useState('+252 63 487234');
  const [email, setEmail] = useState('sakariyehamud@gmail.com');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(language);

  const handleLangToggle = (lang: Language) => {
    setCurrentLang(lang);
    if (onChangeLanguage) {
      onChangeLanguage(lang);
    }
  };

  const isSom = currentLang === 'SOM';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim()) {
      setError(isSom ? 'Fadhlan qor nambarkaaga telefoonka.' : 'Please provide a valid Somali phone contact.');
      return;
    }
    if (!pin.trim() || pin.length < 4) {
      setError(isSom ? 'Fadhlan gali PIN badbaado oo ka kooban 4 lambar.' : 'Please supply a standard 4-digit security PIN verification.');
      return;
    }
    if (!isLogin && !name.trim()) {
      setError(isSom ? 'Fadhlan qor magacaaga oo buuxa.' : 'Please supply your full passenger name.');
      return;
    }

    setIsLoading(true);

    // Simulate database lookup/creation
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: isLogin ? (name || 'Sakariye Hamud') : name,
        phone,
        email: email || `${phone.replace(/\D/g,'')}@magaalotrip.com`,
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center p-4 py-12" id="auth-screen-viewport">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-[0_16px_48px_rgba(11,63,161,0.06)] overflow-hidden border border-slate-100 flex flex-col justify-between">
        
        {/* Upper Brand Info graphic with beautiful blue to teal gradient header */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-cyan px-6 pt-10 pb-8 rounded-b-[36px] text-center text-white relative">
          
          {/* Language selection toggle on upper card right */}
          <div className="absolute top-4 right-4 z-20 flex bg-white/14 backdrop-blur-md rounded-xl p-0.5 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => handleLangToggle('ENG')}
              className={`px-2 py-1 font-bold rounded-lg transition-all ${
                currentLang === 'ENG' ? 'bg-white text-[#0b3fa1]' : 'text-white'
              }`}
            >
              ENG
            </button>
            <button
              type="button"
              onClick={() => handleLangToggle('SOM')}
              className={`px-2 py-1 font-bold rounded-lg transition-all ${
                currentLang === 'SOM' ? 'bg-white text-[#0b3fa1]' : 'text-white'
              }`}
            >
              SOM
            </button>
          </div>

          {/* Decorative graphic patterns */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl" />
          <div className="absolute bottom-[-10px] left-[15%] w-16 h-16 bg-white/10 rounded-full filter blur-md" />

          {/* Magaalo Logo Box */}
          <div className="w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto shadow-inner mb-4">
            <div className="bg-[#0b3fa1] text-white p-2 text-xl rounded-xl">
              <Bus size={24} className="stroke-[2.5]" />
            </div>
          </div>

          <p className="text-teal-200 text-xs font-black tracking-widest uppercase mb-1">
            {isSom ? 'NIDAAMKA TIGIDHAADA JSL' : 'Pass Travel System'}
          </p>
          <h2 className="text-2xl font-black tracking-tight">Magaalo Trip</h2>
          <p className="text-xs text-white/70 max-w-[250px] mx-auto mt-2 leading-relaxed">
            {isSom 
              ? 'Tikidho deg-deg ah oo loogu talagalay safarada gawaadhida tooska ah ee Bariga Afrika.' 
              : 'Instant booking of direct and reliable bus transport voyages in East Africa.'}
          </p>
        </div>

        {/* Lower Auth forms layout */}
        <div className="p-7 space-y-6 text-left">
          <div className="flex bg-slate-100 rounded-xl p-1 border">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-1.5 text-center text-xs font-extrabold uppercase rounded-lg transition-all ${
                isLogin ? 'bg-white text-[#0b3fa1] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {isSom ? 'Soo Gal' : 'Log In'}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-1.5 text-center text-xs font-extrabold uppercase rounded-lg transition-all ${
                !isLogin ? 'bg-white text-[#0b3fa1] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {isSom ? 'Is-diiwaangeli' : 'Sign Up'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* If sign up we ask for full name */}
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                  {isSom ? 'Magaca Buuxa' : 'Full Passenger Name'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sakariye Hamud"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
                  />
                </div>
              </div>
            )}

            {/* Telephone input (both logins and signups) */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                {isSom ? 'Lambarka Talifoonka' : 'Somali Phone Number'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +252 63 487234"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30 font-mono"
                />
              </div>
            </div>

            {/* Email Address */}
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                  {isSom ? 'Iimaylka Rasmiga ah' : 'Email Address'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sakariye@mail.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* 4-digit PIN indicator */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                {isSom ? 'PIN-ka Badbaadada (4 Lambar)' : '4-Digit Security PIN'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <KeyRound size={16} />
                </span>
                <input
                  type="password"
                  required
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm font-bold tracking-widest focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30 font-mono"
                />
              </div>
            </div>

            {/* Error notifications */}
            {error && (
              <p className="text-xs text-rose-600 font-bold bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-center animate-shake">
                ⚠️ {error}
              </p>
            )}

            {/* Submit button with loader */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(11,63,161,0.2)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50"
              id="btn-auth-submit"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={14} className="text-teal-200" />
                  <span>
                    {isLogin 
                      ? (isSom ? 'Soo Gal si Badbaado leh' : 'Log In Securely') 
                      : (isSom ? 'Abuur Koontadaada' : 'Sign Up Account')}
                  </span>
                </>
              )}
            </button>

          </form>

          {/* Quick instructions to play */}
          <div className="pt-2 bg-slate-50/50 p-3 rounded-2xl text-[10px] text-slate-400 border border-dashed border-slate-200 leading-relaxed text-center">
            <span className="font-extrabold block text-slate-500 mb-0.5">
              {isSom ? '💡 MACLUUMAADKA DEMO-KA:' : '💡 DEMO MODE INSTRUCTIONS:'}
            </span>
            <span>
              {isSom 
                ? 'Waxaad si toos ah u gali kartaa xogta diyaarsan ama waxaad samaysan kartaa koonto rakaab oo cusub! Xogta waxaa lagu kaydiyaa browser-kaaga.'
                : 'You can log in directly with the pre-filled telephone credentials or sign up a brand-new passenger! Passwords are saved under local storage.'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
