import { useState, FormEvent } from 'react';
import { Bus, Phone, Mail, User, Lock, Eye, EyeOff, KeyRound, Sparkles, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../translations';

interface AuthScreenProps {
  onLoginSuccess: (user: { name: string; phone: string; email: string }) => void;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
}

export default function AuthScreen({ onLoginSuccess, language = 'ENG', onChangeLanguage }: AuthScreenProps) {
  // Step state within onboarding / authentication flow: 'login' | 'signup' | 'otp'
  const [step, setStep] = useState<'login' | 'signup' | 'otp'>('login');
  
  // Onboarding Demo details prefilled
  const [name, setName] = useState('Sakariye Hamud');
  const [phone, setPhone] = useState('+252 63 487234');
  const [email, setEmail] = useState('sakariyehamud@gmail.com');
  const [password, setPassword] = useState('Safar2026!');
  const [otpCode, setOtpCode] = useState('2026'); // Pre-filled for demo speed
  
  // Password visual toggles & loaders
  const [showPassword, setShowPassword] = useState(false);
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

  // Path 1: Login Submit -> directly to Home Page
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone.trim()) {
      setError(isSom ? 'Fadhlan qor nambarkaaga telefoonka.' : 'Please provide a valid linked phone number.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError(isSom ? 'Fadhlan gali koodhka sirta ah.' : 'Please supply correct password credentials.');
      return;
    }

    setIsLoading(true);

    // Simulate standard lookup
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: name || 'Sakariye Hamud',
        phone,
        email: email || `${phone.replace(/\D/g, '')}@magaalotrip.com`,
      });
    }, 1200);
  };

  // Path 2: Signup Submit -> enters 'otp' stage
  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(isSom ? 'Fadhlan qor magacaaga rakaabka.' : 'Please write your full passenger name.');
      return;
    }
    if (!phone.trim()) {
      setError(isSom ? 'Fadhlan qor nambarka telefoonka gabdhka.' : 'Please type a valid linked phone number.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setError(isSom ? 'Fadhlan u samee koodh sir ah oo adag.' : 'Please create a secure password (min 4 characters).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp'); // advance to OTP confirmation next
    }, 1200);
  };

  // Path 3: OTP Verify -> logs into Home Page
  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otpCode.trim() || otpCode.length !== 4) {
      setError(isSom ? 'Fadhlan gali koodhka OTP ee 4-ta xaraf ah.' : 'Please type the 4-digit OTP code correctly.');
      return;
    }

    setIsLoading(true);

    // Simulate OTP server check
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name,
        phone,
        email: email || `${phone.replace(/\D/g, '')}@magaalotrip.com`,
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center p-4 py-10 animate-fade-in" id="auth-screen-viewport">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-[0_16px_48px_rgba(11,63,161,0.06)] overflow-hidden border border-slate-100 flex flex-col justify-between">
        
        {/* Upper Brand Blue/Cyan Header with dynamic wave illustration */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-cyan px-6 pt-10 pb-8 rounded-b-[36px] text-center text-white relative">
          
          {/* Multilingual language widget in header */}
          <div className="absolute top-4 right-4 z-20 flex bg-white/15 backdrop-blur-md rounded-xl p-0.5 border border-white/10 text-xs shadow-sm">
            <button
              type="button"
              onClick={() => handleLangToggle('ENG')}
              className={`px-2.5 py-1 font-extrabold rounded-lg transition-all ${
                currentLang === 'ENG' ? 'bg-white text-[#0b3fa1] shadow-sm' : 'text-white'
              }`}
            >
              ENG
            </button>
            <button
              type="button"
              onClick={() => handleLangToggle('SOM')}
              className={`px-2.5 py-1 font-extrabold rounded-lg transition-all ${
                currentLang === 'SOM' ? 'bg-white text-[#0b3fa1] shadow-sm' : 'text-white'
              }`}
            >
              SOM
            </button>
          </div>

          <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl" />
          <div className="absolute bottom-[-10px] left-[15%] w-16 h-16 bg-white/10 rounded-full filter blur-md" />

          {/* Magaalo Circular Brand Icon */}
          <div className="w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto shadow-inner mb-4">
            <div className="bg-[#0b3fa1] text-white p-2 text-xl rounded-xl">
              <Bus size={24} className="stroke-[2.5]" />
            </div>
          </div>

          <p className="text-teal-200 text-[10px] font-black tracking-widest uppercase mb-1">
            {isSom ? 'NIDAAMKA GAADHIIDKA JSL' : 'E-Transit Voyager Platform'}
          </p>
          <h2 className="text-2xl font-black tracking-tight">Magaalo Trip</h2>
          <p className="text-xs text-white/70 max-w-[270px] mx-auto mt-2 leading-relaxed">
            {isSom 
              ? 'Hel tigidhada baska oo ku dhex safar gobolada gudaheeda si badbaado leh.' 
              : 'Secure online bus vouchers for regional and interstate travel.'}
          </p>
        </div>

        {/* Lower Authentication Stack area */}
        <div className="p-7 space-y-6 text-left" id="auth-forms-stack">
          
          {/* STEP 1: LOGIN (Telephone & Password) */}
          {step === 'login' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-[#0b3fa1] uppercase tracking-wide">
                  {isSom ? 'Soo Gal' : 'Sign In Account'}
                </h3>
                <button
                  onClick={() => {
                    setStep('signup');
                    setError('');
                  }}
                  className="text-xs font-bold text-[#069faa] hover:underline"
                  id="btn-goto-signup"
                >
                  {isSom ? 'Diiwaangeli Koonto' : 'Create Account ➔'}
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Phone Field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isSom ? 'Lambarka Talifoonka ku Xidhan' : 'Telephone Linked'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+252 63 ••• •••"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30 font-mono"
                      id="login-phone"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isSom ? 'Koodhka Sirta ah (Password)' : 'Account Password'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isSom ? 'Gali password' : 'Enter security password'}
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
                      id="login-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-center">
                    ⚠️ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(11,63,161,0.2)] hover:opacity-95 transition-all cursor-pointer disabled:opacity-55"
                  id="btn-login-submit"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={14} className="text-teal-200" />
                      <span>{isSom ? 'Galo si Badbaado leh ➔' : 'Login Dashboard ➔'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Demo Assist Banner */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] text-slate-400 leading-normal text-center">
                <span className="font-extrabold block text-slate-500 mb-1">
                  💡 {isSom ? 'SI TIHIN AMAAN RAASMI AH:' : 'DEMO LOGIN ASSISTANCE:'}
                </span>
                <span>
                  {isSom 
                    ? 'Koonto tijaabo ah ayaa diyaar u ah. Kaliya taabo badhanka "Galo" si aad u tijaabiso hoyga.'
                    : 'The fields are preloaded for stress-free review. Just click "Login Dashboard" to proceed directly.'}
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: SIGNUP (Passenger Name, Telephone, Password) */}
          {step === 'signup' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <button
                  onClick={() => {
                    setStep('login');
                    setError('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-[#0b3fa1] flex items-center gap-1"
                >
                  <ArrowLeft size={13} />
                  <span>{isSom ? 'Ku noqo' : 'Back to Login'}</span>
                </button>
                <h3 className="text-sm font-extrabold text-[#0b3fa1] uppercase tracking-wide">
                  {isSom ? 'Is-diiwaangeli' : 'Create Profiling'}
                </h3>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {/* Passenger Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isSom ? 'Magaca Rakaabka Buuxa' : 'Passenger Name'}
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
                      placeholder="e.g. Abdirahman Omar"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
                      id="signup-name"
                    />
                  </div>
                </div>

                {/* Telephone Linked */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isSom ? 'Nambarka Talifoonka ku Xidhan' : 'Telephone Linked'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+252 63 ••• •••"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none font-mono"
                      id="signup-phone"
                    />
                  </div>
                </div>

                {/* Account Password */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {isSom ? 'Koodhka Sirta ah (Password)' : 'Account Password'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
                      id="signup-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-center">
                    ⚠️ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(11,63,161,0.15)] hover:opacity-95 cursor-pointer disabled:opacity-55"
                  id="btn-signup-submit"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isSom ? 'Diiwaangeli & Hel OTP ➔' : 'Register & Send OTP ➔'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: OTP SCREEN (4-Digit SMS verification) */}
          {step === 'otp' && (
            <div className="space-y-5 animate-fade-in" id="otp-form-panel">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <button
                  onClick={() => {
                    setStep('signup');
                    setError('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-[#0b3fa1] flex items-center gap-1"
                >
                  <ArrowLeft size={13} />
                  <span>{isSom ? 'Bedel Macluumaadka' : 'Edit Info'}</span>
                </button>
                <h3 className="text-sm font-extrabold text-[#0b3fa1] uppercase tracking-wide">
                  {isSom ? 'Xaqiijinta' : 'OTP Verification'}
                </h3>
              </div>

              <div className="text-center space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-600">
                  {isSom ? 'Koodhka Amniga la Diiray' : 'One Time Password Sent'}
                </p>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                  {isSom 
                    ? `Waxaan u dirnay 4-ta lambar ee aqoonsiga telefonka ee ${phone}` 
                    : `We prompted a 4-digit security code to your telephone: ${phone}`}
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                {/* OTP Input box */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                    {isSom ? 'GALI 4 PIN EE CASRIGA AH' : 'ENTER VERIFICATION KEY'}
                  </label>
                  
                  <div className="flex justify-center my-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#069faa]">
                      <ShieldCheck size={20} className="animate-pulse" />
                    </span>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-48 h-12 text-center text-xl font-black tracking-[0.75em] bg-slate-50/50 rounded-2xl border-2 border-slate-200 focus:border-[#0b3fa1] focus:outline-none focus:ring-2 focus:ring-[#0b3fa1]/20 font-mono pl-10"
                      id="otp-input-field"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-600 font-bold bg-rose-50 border border-rose-100 p-2.5 rounded-xl text-center">
                    ⚠️ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-blue via-[#085fa8] to-brand-cyan text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-55"
                  id="btn-otp-verify-submit"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound size={14} className="text-teal-200" />
                      <span>{isSom ? 'Xaqiiji & Bilow ➔' : 'Verify & Launch App ➔'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* OTP Help & Resend Options */}
              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    alert(isSom ? 'Koodh cusub ayaa loo diray talifoonkaaga.' : 'A new code has been simulated and pushed.');
                    setOtpCode('2026');
                  }}
                  className="text-xs font-bold text-[#069faa] hover:underline"
                >
                  {isSom ? '🔄 Mar kale dir koodhka (Resend)' : '🔄 Resend SMS Code'}
                </button>

                <p className="text-[10px] text-slate-400 font-mono">
                  {isSom ? 'SI TIHIN DEMO: Isticmaal koodhka pre-filled ama 2026' : 'FOR DEMO PREVIEW: Use prefilled key or 2026'}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
