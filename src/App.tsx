import { useState, useEffect } from 'react';
import { Voyage, Ticket, UserNotification, RouteOption } from './types';
import { MOCK_VOYAGES, INITIAL_TICKETS, INITIAL_NOTIFICATIONS } from './mockData';
import { TRANSLATIONS, Language } from './translations';
import Header from './components/Header';
import SearchCard from './components/SearchCard';
import PopularRoutes from './components/PopularRoutes';
import SearchResults from './components/SearchResults';
import BookingForm from './components/BookingForm';
import TicketsList from './components/TicketsList';
import UserProfile from './components/UserProfile';
import NotificationModal from './components/NotificationModal';
import AuthScreen from './components/AuthScreen';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import { CheckCircle, ArrowRight, Calendar, Ticket as TicketIcon } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('magaalo_lang');
    return (saved === 'SOM' ? 'SOM' : 'ENG') as Language;
  });

  const t = TRANSLATIONS[language];

  useEffect(() => {
    localStorage.setItem('magaalo_lang', language);
  }, [language]);

  // Authentication State (defaults to null to let visitors run through clean onboarding)
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string; email: string } | null>(() => {
    const saved = localStorage.getItem('magaalo_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // Nav Tabs configuration
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'tickets' | 'profile'>('home');
  
  // Home Navigation stack view Router
  const [currentView, setCurrentView] = useState<'home' | 'results' | 'booking' | 'confirmation'>('home');

  // Core Data sets
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('magaalo_tickets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TICKETS;
  });

  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem('magaalo_notifs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [notificationOpen, setNotificationOpen] = useState(false);

  // Search parameters
  const [searchParams, setSearchParams] = useState<{
    departureCity: string;
    arrivalCity: string;
    voyageDate: string;
    manifest: string;
    passengerCount: number;
  } | null>(null);

  // Selected voyage for seat mapping and checkout booking
  const [selectedVoyage, setSelectedVoyage] = useState<Voyage | null>(null);
  
  // Last ticket purchased for overlay confirmation
  const [newlyBookedTicket, setNewlyBookedTicket] = useState<Ticket | null>(null);

  // Sync to LS
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('magaalo_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('magaalo_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('magaalo_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('magaalo_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Auth helper
  const handleLogin = (user: { name: string; phone: string; email: string }) => {
    setCurrentUser(user);
    // Push welcoming notification
    const welcomeNotif: UserNotification = {
      id: 'welcome-' + Date.now(),
      title: language === 'SOM' ? 'Diiwaan gelintu Waay Guulaysatay' : 'Authentication Successful',
      description: language === 'SOM' 
        ? `Ku soo dhowow Magaalo Trip, ${user.name}! Koontadaada safarka waa mid dhib yar oo firfircoon.`
        : `Welcome to Magaalo Trip, ${user.name}! Your Somali travel dashboard is active.`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('magaalo_user');
    setActiveTab('home');
    setCurrentView('home');
  };

  // Search trigger
  const handleSearchSubmit = (params: typeof searchParams) => {
    setSearchParams(params);
    setCurrentView('results');
    setActiveTab('home'); // keep tab on Home/Search workspace
  };

  // Direct Quick Route selection
  const handleSelectRoute = (route: RouteOption) => {
    const params = {
      departureCity: route.from,
      arrivalCity: route.to,
      voyageDate: '24 Oct, 2026',
      manifest: language === 'SOM' ? '1 Qof Weyn' : '1 Adult',
      passengerCount: 1,
    };
    setSearchParams(params);
    setCurrentView('results');
  };

  // Booking details confirmation submission
  const handleConfirmBookingDetails = (ticket: Ticket) => {
    // Append ticket into database state
    setTickets((prev) => [ticket, ...prev]);
    setNewlyBookedTicket(ticket);

    // Add real-time booking alert notification
    const newNotif: UserNotification = {
      id: 'notif-' + ticket.id,
      title: language === 'SOM' ? 'Safarkaaga Waa La Hubiyey! 🛡️' : 'Voyage Confirmed! 🛡️',
      description: language === 'SOM'
        ? `Tigidhkaaga ${ticket.departureCity} ilaa ${ticket.arrivalCity} waa la saxay. Kursiga: ${ticket.seatNumber}. Nambarka: ${ticket.id}.`
        : `Your ticket from ${ticket.departureCity} to ${ticket.arrivalCity} is verified. Seat: ${ticket.seatNumber}. Ticket No: ${ticket.id}.`,
      timestamp: '1 min ago',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Slide view
    setCurrentView('confirmation');
  };

  // Cancel reservation
  const handleCancelTicket = (ticketId: string) => {
    const cancelPrompt = language === 'SOM'
      ? 'Ma xaqiijinaysaa inaad baajiso boos-garayntan? (Kharashka adeegga waxaa laga jartaa 5% tixgelin)'
      : 'Are you holding requests to cancel this reservation? (Refunding transaction is subject to 5% system deduction)';
    
    if (confirm(cancelPrompt)) {
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: 'cancelled' as const } : t))
      );
      
      const cancelledNotif: UserNotification = {
        id: 'cancel-' + Date.now(),
        title: language === 'SOM' ? 'Safar La Baajiyey' : 'Booking Cancelled',
        description: language === 'SOM'
          ? `Tigidhka ${ticketId} waa la baajiyey si guul ah. Lacag-celinta waxaa loo soo dirayaa boorsadaada.`
          : `Ticket ${ticketId} was cancelled successfully. Refund is being processed back to your wallet.`,
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [cancelledNotif, ...prev]);
    }
  };

  // Profile update handler
  const handleUpdateProfile = (updated: { name: string; phone: string; email: string }) => {
    if (currentUser) {
      setCurrentUser({
        name: updated.name,
        phone: updated.phone,
        email: updated.email,
      });
    }
  };

  // Notifications manipulation
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 1. Core Onboarding Splash screen shown first on boot
  if (showSplash) {
    return (
      <SplashScreen
        onDismiss={() => setShowSplash(false)}
        language={language}
      />
    );
  }

  // Unauthenticated screen return (Login ➔ SignUp ➔ OTP)
  if (!currentUser) {
    return (
      <AuthScreen 
        onLoginSuccess={handleLogin} 
        language={language}
        onChangeLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfe] text-slate-800 antialiased flex flex-col max-w-md mx-auto relative pb-24" id="magaalo-trip-root">
      
      {/* Screen Content Scrollable Wrapper */}
      <div className="flex-1 overflow-y-auto pb-4">
        
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div>
            {currentView === 'home' && (
              <>
                <Header
                  title="Magaalo Trip"
                  subtitle={t.welcome}
                  notificationCount={unreadCount}
                  onNotificationClick={() => setNotificationOpen(true)}
                  currentLanguage={language}
                  onChangeLanguage={setLanguage}
                />
                <SearchCard onSearch={handleSearchSubmit} language={language} />
                <PopularRoutes
                  onSelectRoute={handleSelectRoute}
                  onExploreAll={() => {
                    alert(language === 'SOM' 
                      ? 'Inka weyn gobolada JSL: Hargeisa, Berbera, Borama, Burco, Bosaso, Galkayo, Garowe.' 
                      : 'Showing regional grid: Hargeisa, Berbera, Borama, Burco, Bosaso, Galkayo, Garowe.');
                  }}
                  language={language}
                />
                
                {/* Local Somali Notice Alert banner */}
                <div className="mx-6 my-4 bg-emerald-500/10 border border-emerald-500/15 rounded-2xl p-4 flex gap-3 text-left">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <h4 className="text-[11px] font-black uppercase text-emerald-800 tracking-wider">
                      {t.covidBannerTitle}
                    </h4>
                    <p className="text-[10px] text-emerald-700/80 font-bold leading-normal mt-0.5">
                      {t.covidBannerText}
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentView === 'results' && searchParams && (
              <>
                <Header
                  title={t.searchResults}
                  onBack={() => setCurrentView('home')}
                  currentLanguage={language}
                  onChangeLanguage={setLanguage}
                />
                <SearchResults
                  departureCity={searchParams.departureCity}
                  arrivalCity={searchParams.arrivalCity}
                  date={searchParams.voyageDate}
                  manifest={searchParams.manifest}
                  voyages={MOCK_VOYAGES}
                  onSelectVoyage={(voyage) => {
                    setSelectedVoyage(voyage);
                    setCurrentView('booking');
                  }}
                  onGoBack={() => setCurrentView('home')}
                  language={language}
                />
              </>
            )}

            {currentView === 'booking' && selectedVoyage && searchParams && (
              <>
                <Header
                  title={t.voyageCheckout}
                  onBack={() => setCurrentView('results')}
                  currentLanguage={language}
                  onChangeLanguage={setLanguage}
                />
                <BookingForm
                  voyage={selectedVoyage}
                  travelDate={searchParams.voyageDate}
                  userEmail={currentUser.email}
                  onConfirmBooking={handleConfirmBookingDetails}
                  onGoBack={() => setCurrentView('results')}
                  language={language}
                />
              </>
            )}

            {currentView === 'confirmation' && newlyBookedTicket && (
              <div className="px-5 pt-8 pb-12 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 animate-bounce">
                  <CheckCircle size={36} className="stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <p className="text-[#069faa] text-xs font-black uppercase tracking-widest leading-none">
                    {t.successfulTransaction}
                  </p>
                  <h2 className="text-xl font-black text-[#0b3fa1] tracking-tight">
                    {t.bookingConfirmed}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold max-w-[300px] mx-auto mt-2 leading-relaxed">
                    {language === 'SOM' 
                      ? `Tigidhkaaga safarka ee dhulka waxaa lagu diiwaangeliyey lambarka ${newlyBookedTicket.id}. SMS booqasho ah ayaa lagu diiriyeey lambarka ${newlyBookedTicket.passengerPhone}.`
                      : `Your road transit reservation is registered under ticket ${newlyBookedTicket.id}. An SMS invoice has been prompted to ${newlyBookedTicket.passengerPhone}.`}
                  </p>
                </div>

                {/* Visual Boarding Voucher Card mockup representation */}
                <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.04)] text-left w-full space-y-4">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-dashed border-slate-100">
                    <span className="font-extrabold text-slate-500">{newlyBookedTicket.operatorName}</span>
                    <span className="font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      {language === 'SOM' ? 'WAA LABIXIYEY:' : 'PAID VIA'} {newlyBookedTicket.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase">{language === 'SOM' ? 'BIXID' : 'OUT'}</span>
                      <span className="text-base font-black text-[#0b3fa1] leading-none">{newlyBookedTicket.departureCity}</span>
                      <span className="block text-xs font-semibold text-slate-400 mt-0.5">{newlyBookedTicket.departureTime}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center px-2">
                      <span className="text-[9px] text-slate-300 font-bold uppercase">{language === 'SOM' ? 'Bas Toos ah' : 'Direct Bus'}</span>
                      <ArrowRight size={14} className="text-[#069faa]" />
                      <span className="text-[10px] text-[#069faa] font-extrabold bg-teal-50 px-2.5 py-0.5 rounded-full mt-1">
                        {language === 'SOM' ? 'KURSIGA' : 'SEAT'} {newlyBookedTicket.seatNumber}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase">{language === 'SOM' ? 'IMAATIN' : 'IN'}</span>
                      <span className="text-base font-black text-[#0b3fa1] leading-none">{newlyBookedTicket.arrivalCity}</span>
                      <span className="block text-xs font-semibold text-slate-400 mt-0.5">{newlyBookedTicket.arrivalTime}</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-semibold text-slate-400 text-center flex items-center justify-center gap-1">
                    <Calendar size={13} />
                    <span>{language === 'SOM' ? 'Taariikhda Bixidda' : 'Scheduled for'} {newlyBookedTicket.date}</span>
                  </div>
                </div>

                {/* Confirmation Actions */}
                <div className="w-full space-y-3 pt-4">
                  <button
                    onClick={() => {
                      setActiveTab('tickets');
                      setCurrentView('home');
                    }}
                    className="w-full h-13 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                    id="btn-confirm-view-pass"
                  >
                    <TicketIcon size={14} />
                    <span>{t.viewDigitalPass}</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('home');
                    }}
                    className="w-full h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase cursor-pointer"
                    id="btn-confirm-book-another"
                  >
                    {t.bookAnother}
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 2: SEARCH */}
        {activeTab === 'search' && (
          <div>
            <Header 
              title={t.searchVoyages} 
              subtitle={language === 'SOM' ? 'Magaalooyinka JSL' : 'Direct Connections'} 
              currentLanguage={language}
              onChangeLanguage={setLanguage}
            />
            <div className="p-2 space-y-4">
              <SearchCard onSearch={handleSearchSubmit} language={language} />
              
              <div className="px-6 py-2 text-left">
                <h4 className="text-xs font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-2">
                  {t.popularInquiries}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Hargeisa to Berbera', 'Bosaso to Galkayo', 'Hargeisa to Borama', 'Burco to Hargeisa'].map((routeText) => {
                    const translatedText = language === 'SOM'
                      ? routeText.replace(' to ', ' ilaa ')
                      : routeText;
                    return (
                      <button
                        key={routeText}
                        onClick={() => {
                          const parts = routeText.split(' to ');
                          const params = {
                            departureCity: parts[0],
                            arrivalCity: parts[1],
                            voyageDate: '24 Oct, 2026',
                            manifest: language === 'SOM' ? '1 Qof Weyn' : '1 Adult',
                            passengerCount: 1,
                          };
                          setSearchParams(params);
                          setCurrentView('results');
                          setActiveTab('home');
                        }}
                        className="bg-white hover:bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm"
                      >
                        ⚡ {translatedText}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TICKETS */}
        {activeTab === 'tickets' && (
          <div>
            <Header 
              title={t.myBoardingPasses} 
              subtitle={t.boardingPassesSubtitle} 
              currentLanguage={language}
              onChangeLanguage={setLanguage}
            />
            <div className="pt-4">
              <TicketsList 
                tickets={tickets} 
                onCancelTicket={handleCancelTicket} 
                language={language}
              />
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && currentUser && (
          <div>
            <Header 
              title={t.voyagerProfile} 
              subtitle={t.accountConsole} 
              currentLanguage={language}
              onChangeLanguage={setLanguage}
            />
            <div className="pt-4">
              <UserProfile
                profile={{
                  name: currentUser.name,
                  phone: currentUser.phone,
                  email: currentUser.email,
                  travelHistoryCount: tickets.filter((t) => t.status === 'completed').length,
                }}
                tickets={tickets}
                onUpdateProfile={handleUpdateProfile}
                onLogout={handleLogout}
                language={language}
                onChangeLanguage={setLanguage}
              />
            </div>
          </div>
        )}

      </div>

      {/* Persistent Bottom Nav inside root wrapper */}
      <BottomNav 
        activeTab={activeTab} 
        onChangeTab={(tab) => {
          setActiveTab(tab);
          // Always reset stacked views to root when changing tabs for clean routing experience
          setCurrentView('home');
        }} 
        language={language}
      />

      {/* Floating Alerts notifications Drawer modal over the entire app */}
      <NotificationModal
        notifications={notifications}
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearAllNotifications}
      />

    </div>
  );
}
