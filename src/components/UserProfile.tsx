import { useState, FormEvent } from 'react';
import { UserProfile as ProfileType, Ticket } from '../types';
import { User, Phone, Mail, Award, Settings, LogOut, CreditCard, Languages, Bell, Save, CheckCircle } from 'lucide-react';
import { Language } from '../translations';

interface UserProfileProps {
  profile: ProfileType;
  tickets: Ticket[];
  onUpdateProfile: (updated: ProfileType) => void;
  onLogout: () => void;
  language?: Language;
  onChangeLanguage?: (lang: Language) => void;
}

export default function UserProfile({
  profile,
  tickets,
  onUpdateProfile,
  onLogout,
  language = 'ENG',
  onChangeLanguage,
}: UserProfileProps) {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSavedContact, setHasSavedContact] = useState(false);

  // Settings mock currency toggle
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState<'usd' | 'sos'>('usd');

  // Math stats from ticket history
  const activeCount = tickets.filter((t) => t.status === 'active').length;
  const pastCount = tickets.filter((t) => t.status === 'completed').length;
  const loyaltyPoints = pastCount * 120 + 250; // Dynamic loyalty points multiplier

  const handleProfileSave = (e: FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      phone,
      email,
      travelHistoryCount: pastCount,
    });
    setIsEditing(false);
    setHasSavedContact(true);
    setTimeout(() => setHasSavedContact(false), 3000);
  };

  return (
    <div className="px-5 pb-24 text-left space-y-5" id="user-profile-viewport">
      
      {/* 1. Header Profile avatar summary with Loyalty points tier */}
      <div className="bg-gradient-to-r from-brand-blue to-[#085fa8] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        {/* Abstract background blobs for premium card aesthetic */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full filter blur-xl transform translate-x-3 -translate-y-3" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-inner">
            {profile.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-extrabold text-lg leading-tight">{profile.name}</h3>
            <p className="text-[11px] text-teal-200 font-bold tracking-widest uppercase mt-0.5">
              {language === 'SOM' ? '⭐ Safarada Premium' : '⭐ Premium Voyager'}
            </p>
            <div className="flex items-center gap-1.5 mt-2 bg-black/25 w-fit px-2.5 py-1 rounded-full text-[10px] font-semibold">
              <Award size={12} className="text-yellow-400 fill-yellow-400" />
              <span>{loyaltyPoints} Magaalo Miles</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Traveller Stats Counters */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-100 rounded-2xl p-3 text-center shadow-sm">
          <span className="block text-slate-400 text-[9px] font-bold uppercase tracking-wide">{language === 'SOM' ? 'Firfircoon' : 'Active'}</span>
          <span className="block text-lg font-black text-[#0b3fa1] mt-0.5">{activeCount}</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-3 text-center shadow-sm">
          <span className="block text-slate-400 text-[9px] font-bold uppercase tracking-wide">{language === 'SOM' ? 'Dhamaaday' : 'Completed'}</span>
          <span className="block text-lg font-black text-emerald-600 mt-0.5">{pastCount}</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-3 text-center shadow-sm">
          <span className="block text-slate-400 text-[9px] font-bold uppercase tracking-wide">{language === 'SOM' ? 'Dhibcaha' : 'Points Tier'}</span>
          <span className="block text-xs font-black text-[#069faa] mt-1.5">{language === 'SOM' ? 'Dahabi' : 'Gold Class'}</span>
        </div>
      </div>

      {/* 3. Editable Personal details panel */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-extrabold uppercase text-[#0b3fa1] tracking-wider flex items-center gap-1.5">
            <User size={14} className="text-[#069faa]" />
            <span>{language === 'SOM' ? 'Warbixinta Macmiilka' : 'Profile Contact Info'}</span>
          </h4>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold text-[#069faa] hover:underline px-2.5 py-1 rounded bg-slate-50 border border-slate-100"
            id="btn-edit-profile-toggle"
          >
            {isEditing ? (language === 'SOM' ? 'Ka Noqo' : 'Cancel') : (language === 'SOM' ? 'Bedel' : 'Edit Info')}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">{language === 'SOM' ? 'Magaca' : 'Name'}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 mt-1 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">{language === 'SOM' ? 'Telefoonka' : 'Telephone'}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-10 px-3.5 mt-1 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">{language === 'SOM' ? 'Iimaylka' : 'Email'}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3.5 mt-1 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0b3fa1] focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-extrabold rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              id="btn-save-profile"
            >
              <Save size={14} />
              <span>{language === 'SOM' ? 'Keydi Isbedelada' : 'Save Changes'}</span>
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 py-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400"><User size={15} /></span>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase">{language === 'SOM' ? 'Magaca Macmiilka' : 'Passenger Name'}</span>
                <span className="text-xs font-extrabold text-[#0b3fa1]">{profile.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400"><Phone size={15} /></span>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase">{language === 'SOM' ? 'Telefoonka ku xidhan' : 'Telephone Linked'}</span>
                <span className="text-xs font-extrabold text-[#0b3fa1]">{profile.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 py-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400"><Mail size={15} /></span>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase">{language === 'SOM' ? 'Iimaylka Rasmiga' : 'Electronic Mail'}</span>
                <span className="text-xs font-extrabold text-[#0b3fa1]">{profile.email}</span>
              </div>
            </div>
          </div>
        )}

        {hasSavedContact && (
          <div className="mt-3 p-2 text-center bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle size={12} />
            <span>{language === 'SOM' ? 'Macluumaadkaaga waa la cusubaysiiyey.' : 'Profile successfully updated in local directory.'}</span>
          </div>
        )}
      </div>

      {/* 4. Settings toggles and language choices */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-extrabold uppercase text-[#0b3fa1] tracking-wider flex items-center gap-1.5">
          <Settings size={14} className="text-[#069faa]" />
          <span>{language === 'SOM' ? 'Hagaajinta Codsiga' : 'Application Settings'}</span>
        </h4>

        {/* Translation Toggle Som vs Eng */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Languages size={16} className="text-slate-400" />
            <div>
              <span className="block text-xs font-bold text-slate-700">{language === 'SOM' ? 'Afka Interface-ka' : 'Display Language'}</span>
              <span className="block text-[9px] text-slate-400 font-semibold uppercase">Currently: {language === 'SOM' ? 'Af-Soomaali (SOM)' : 'English (ENG)'}</span>
            </div>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-lg border">
            <button
              onClick={() => {
                if (onChangeLanguage) onChangeLanguage('ENG');
              }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-md ${
                language === 'ENG' ? 'bg-[#0b3fa1] text-white' : 'text-slate-600'
              }`}
            >
              ENG
            </button>
            <button
              onClick={() => {
                if (onChangeLanguage) onChangeLanguage('SOM');
              }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-md ${
                language === 'SOM' ? 'bg-[#0b3fa1] text-white' : 'text-slate-600'
              }`}
            >
              SOM
            </button>
          </div>
        </div>

        {/* Currency selection USD vs Somali Shilling */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-slate-400" />
            <div>
              <span className="block text-xs font-bold text-slate-700">{language === 'SOM' ? 'Nooca Lacagta' : 'Display Currency'}</span>
              <span className="block text-[9px] text-slate-400 font-semibold uppercase">{language === 'SOM' ? 'Qiimaha Sarifka' : 'Rates conversion'}</span>
            </div>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-lg border">
            <button
              onClick={() => setCurrency('usd')}
              className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                currency === 'usd' ? 'bg-[#069faa] text-white' : 'text-slate-600'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => {
                setCurrency('sos');
                alert(language === 'SOM' ? 'Sariifka la dooray: 1 USD = 8,500 Shilin Soomaali.' : 'Rates shown will be converted: 1 USD = 8,500 Somali Shilling (Simulated).');
              }}
              className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                currency === 'sos' ? 'bg-[#069faa] text-white' : 'text-slate-600'
              }`}
            >
              SOS (Sh)
            </button>
          </div>
        </div>

        {/* Push notifications switch */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-slate-400" />
            <div>
              <span className="block text-xs font-bold text-slate-700">{language === 'SOM' ? 'Ogeysiisyada Tooska ah' : 'Push Notifications'}</span>
              <span className="block text-[9px] text-slate-400 font-semibold">{language === 'SOM' ? 'Ogeysiiska safarada JSL' : 'Voyage, delay and gate alerts'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative duration-350 cursor-pointer ${
              notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-350 ${
                notificationsEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 5. Saved Wallets credit screen */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3.5">
        <h4 className="text-xs font-extrabold uppercase text-slate-600 tracking-wider">
          {language === 'SOM' ? 'Habka Lacag-bixinta ee Kaydsan' : 'Saved Payment Methods'}
        </h4>
        
        <div className="flex items-center justify-between p-3.5 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-emerald-700 font-black text-sm bg-white border border-emerald-100 rounded-xl px-2 py-1">ZAAD</span>
            <div>
              <span className="block text-xs font-extrabold text-[#101c3d]">{language === 'SOM' ? 'Boorsada telesom' : 'Telesom Online wallet'}</span>
              <span className="block text-[10px] text-slate-400 font-mono font-bold">+252 63 •••• 234</span>
            </div>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-white rounded-md px-2 py-0.5 border border-emerald-100">{language === 'SOM' ? 'Kowaad' : 'Primary'}</span>
        </div>

        <div className="text-center pt-1.5">
          <button
            onClick={() => alert(language === 'SOM' ? 'Diiwaangalinta e-Dahab / ZAAD cusub ama MasterCard.' : 'Feature to register credit card accounts or mobile wallets will open standard secure forms.')}
            className="text-xs font-semibold text-[#069faa] hover:underline"
          >
            {language === 'SOM' ? '+ Ku xidh Boorso Cusub' : '+ Link New Mobile Wallet'}
          </button>
        </div>
      </div>

      {/* 6. Sign Out/Action Buttons */}
      <button
        onClick={onLogout}
        className="w-full h-13 rounded-2xl bg-white border border-rose-100 hover:bg-rose-50 text-rose-600 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        id="btn-trigger-logout"
      >
        <LogOut size={14} />
        <span>{language === 'SOM' ? 'Ka Bax Koontada' : 'Log Out Account'}</span>
      </button>

      <div className="text-center text-[10px] text-slate-400 font-medium">
        <span>Magaalo Trip Passenger App v2.4.1</span>
        <span className="block mt-1">{language === 'SOM' ? 'Wuxuu shati ka haystaa Wasaaradda Gaadiidka ee JSL.' : 'Licensed under Somaliland Ministry of Transport regulations.'}</span>
      </div>

    </div>
  );
}
