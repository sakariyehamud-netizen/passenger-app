import { useState, FormEvent } from 'react';
import { Voyage, Ticket } from '../types';
import { Phone, Mail, User, AlertCircle, Check } from 'lucide-react';
import { TRANSLATIONS, Language } from '../translations';

interface BookingFormProps {
  voyage: Voyage;
  travelDate: string;
  onConfirmBooking: (ticket: Ticket) => void;
  onGoBack: () => void;
  userEmail?: string;
  language?: Language;
}

export default function BookingForm({
  voyage,
  travelDate,
  onConfirmBooking,
  onGoBack,
  userEmail = 'sakariyehamud@gmail.com',
  language = 'ENG',
}: BookingFormProps) {
  const t = TRANSLATIONS[language];
  
  // Seat Picker States
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  
  // Passenger details
  const [name, setName] = useState('Sakariye Hamud');
  const [phone, setPhone] = useState('+252 63 487234');
  const [email, setEmail] = useState(userEmail);
  const [paymentGateway, setPaymentGateway] = useState<'zaad' | 'edahab' | 'visa'>('zaad');
  const [mobileNumber, setMobileNumber] = useState('063487234');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [formError, setFormError] = useState('');

  // Generate mock bus seats grid dynamically based on selected vehicle model (Hiace 15 seats vs Toyota 30 seats)
  const isHiace = voyage.busType === 'hiace';
  const totalSeats = isHiace ? 15 : 30;

  const seats = Array.from({ length: totalSeats }, (_, i) => {
    const seatId = (i + 1).toString().padStart(2, '0');
    // Voyage has dynamic available seats array
    const isAvailable = voyage.availableSeats.includes(i + 1);
    return { id: seatId, isAvailable };
  });

  // Billing Math
  const fee = 1.5;
  const totalCost = voyage.price + fee;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!selectedSeat) {
      setFormError(t.seatRequired);
      return;
    }
    if (!name.trim()) {
      setFormError(t.invalidName);
      return;
    }
    if (!phone.trim()) {
      setFormError(t.invalidPhone);
      return;
    }

    // Payment validation dummy
    if (paymentGateway !== 'visa') {
      if (!mobileNumber.trim()) {
        setFormError(language === 'SOM' ? 'Fadhlan gali lambarkaaga moobilka si lacagta looga jaro.' : 'Please enter your mobile money number.');
        return;
      }
    } else {
      if (!cardNumber.trim() || cardNumber.length < 15) {
        setFormError(language === 'SOM' ? 'Fadhlan gali lambarka kaarka oo sax ah.' : 'Please enter a valid credit card number.');
        return;
      }
    }

    // Success - assemble ticket object
    const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000).toString();
    const mockTicket: Ticket = {
      id: ticketId,
      voyageId: voyage.id,
      departureCity: voyage.departureCity,
      arrivalCity: voyage.arrivalCity,
      departureTime: voyage.departureTime,
      arrivalTime: voyage.arrivalTime,
      date: travelDate,
      seatNumber: selectedSeat,
      passengerName: name,
      passengerPhone: phone,
      passengerEmail: email,
      price: totalCost,
      qrCodeData: `MATCH-MGO-${voyage.departureCity.substring(0,3).toUpperCase()}-${voyage.arrivalCity.substring(0,3).toUpperCase()}-${ticketId}-SEAT${selectedSeat}`,
      status: 'active',
      operatorName: voyage.operatorName,
      bookingTime: new Date().toLocaleString(),
      paymentMethod: paymentGateway === 'zaad' ? 'ZAAD Service' : paymentGateway === 'edahab' ? 'e-Dahab' : 'Visa / MasterCard',
    };

    onConfirmBooking(mockTicket);
  };

  return (
    <div className="px-5 pb-24 text-left" id="booking-form-viewport">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 1. SEAT PICKER */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#0b3fa1] text-xs font-bold leading-none">
                1
              </span>
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                {t.chooseSeat}
              </h3>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
              isHiace ? 'bg-amber-50 text-amber-700 border border-amber-200/50' : 'bg-indigo-50 text-indigo-700 border border-indigo-200/50'
            }`}>
              {isHiace ? t.hiaceText : t.toyotaText}
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
            {t.occupancyNotif}
          </p>

          {/* Map details representation */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 flex flex-col items-center">
            {/* Bus Wheel Steering Logo representation */}
            <div className="w-full flex justify-between items-center pb-3 border-b border-slate-200/65 mb-4 px-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
                <span className="block w-2 h-2 rounded-full bg-emerald-500" />
                {t.frontDriverSide} ({isHiace ? 'Hiace 15-Seater' : 'Toyota 30-Seater'})
              </span>
              <div className="w-6 h-4 border-2 border-slate-500 rounded flex items-center justify-center text-[10px] font-black text-slate-500">
                ⚙️
              </div>
            </div>

            {/* Simulated Seats Grid */}
            <div className={`grid ${isHiace ? 'grid-cols-3 gap-x-8' : 'grid-cols-4 gap-x-6'} gap-y-3 w-fit justify-center`} id="seat-selection-grid">
              {seats.map((seat, index) => {
                const isSelected = selectedSeat === seat.id;
                
                // Add physical aisle space after column 2
                const isLeftColumn = isHiace ? (index % 3 === 1) : (index % 4 === 1);

                return (
                  <div key={seat.id} className={`flex ${isLeftColumn ? 'mr-6' : ''}`}>
                    <button
                      type="button"
                      disabled={!seat.isAvailable}
                      onClick={() => setSelectedSeat(seat.id)}
                      className={`w-9 h-9 rounded-xl text-[11px] font-bold flex items-center justify-center transition-all ${
                        !seat.isAvailable
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white ring-2 ring-offset-2 ring-brand-cyan scale-105 font-black shadow-md'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-[#069faa] hover:text-[#069faa]'
                      }`}
                      id={`seat-cap-${seat.id}`}
                    >
                      {seat.id}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Seat legend */}
            <div className="flex justify-around items-center w-full mt-5 pt-3 border-t border-slate-200/40 text-[10px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="block w-3.5 h-3.5 rounded bg-white border border-slate-300" />
                <span>{language === 'SOM' ? 'Banaan' : 'Available'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="block w-3.5 h-3.5 rounded bg-slate-200" />
                <span>{language === 'SOM' ? 'Boos-garaysan' : 'Occupied'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="block w-3.5 h-3.5 rounded bg-gradient-to-r from-brand-blue to-brand-cyan" />
                <span className="text-[#069faa] font-extrabold">{language === 'SOM' ? 'La Dooray' : 'Selected'}</span>
              </div>
            </div>

          </div>

          {selectedSeat && (
            <div className="mt-3.5 bg-teal-50/70 border border-slate-200/10 rounded-xl p-3 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold">{language === 'SOM' ? 'Sifaha Kursiga la Dooray:' : 'Selected seat identifier:'}</span>
              <span className="text-sm font-black text-[#069faa] uppercase bg-white border border-teal-100 px-3 py-1 rounded-lg">
                {language === 'SOM' ? 'Kursiga' : 'Seat'} {selectedSeat}
              </span>
            </div>
          )}

        </div>

        {/* 2. PASSENGER INFORMATION */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#0b3fa1] text-xs font-bold leading-none">
              2
            </span>
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
              {t.passengerDetails}
            </h3>
          </div>

          <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
            {language === 'SOM' ? 'Waa inay la mid noqoto aqoonsiga rakaabka. Hubi iimaylka si tigidhka laguugu soo diro.' : 'Must match passenger ID. Double-check email for ticket delivery.'}
          </p>

          <div className="space-y-3.5">
            {/* Passenger full name */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                {t.fullName}
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
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 font-semibold text-sm focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
                  id="passenger-name-input"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                {t.phoneNumber}
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
                  placeholder="e.g. +252 63 487234"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 font-semibold text-sm focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
                  id="passenger-phone-input"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider mb-1.5">
                {language === 'SOM' ? 'Iimaylka' : 'Email Address'}
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
                  placeholder="sakariyehamud@gmail.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 font-semibold text-sm focus:border-[#0b3fa1] focus:outline-none focus:ring-1 focus:ring-brand-blue/30"
                  id="passenger-email-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. PAYMENT GATEWAY */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#0b3fa1] text-xs font-bold leading-none">
              3
            </span>
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
              {t.paymentMethod}
            </h3>
          </div>

          <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
            {language === 'SOM' ? 'Dooro habka aad doorbidayso. Lacagaha moobilka waxaa si toos ah loo helayaa SMS hubin.' : 'Select of preferred option. Mobile Money supports automatic prompts.'}
          </p>

          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {/* Telesom ZAAD */}
            <button
              type="button"
              onClick={() => setPaymentGateway('zaad')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentGateway === 'zaad'
                  ? 'border-[#0b3fa1] bg-[#0b3fa1]/5 ring-1 ring-brand-blue'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="block text-xs font-black text-emerald-600">ZAAD</span>
              <span className="text-[10px] text-slate-400 font-medium">Telesom</span>
            </button>

            {/* Somtel eDahab */}
            <button
              type="button"
              onClick={() => setPaymentGateway('edahab')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentGateway === 'edahab'
                  ? 'border-[#069faa] bg-[#069faa]/5 ring-1 ring-[#069faa]'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="block text-xs font-black text-rose-600">e-DAHAB</span>
              <span className="text-[10px] text-slate-400 font-medium">Somtel</span>
            </button>

            {/* Card */}
            <button
              type="button"
              onClick={() => setPaymentGateway('visa')}
              className={`p-3 rounded-2xl border text-center transition-all ${
                paymentGateway === 'visa'
                  ? 'border-slate-800 bg-slate-900 text-white animate-pulse'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="block text-xs font-black">CREDIT CARD</span>
              <span className="text-[10px] opacity-75 font-medium">Visa / Amex</span>
            </button>
          </div>

          {paymentGateway !== 'visa' ? (
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold text-[#0b3fa1] uppercase tracking-wider">
                {paymentGateway === 'zaad' ? (language === 'SOM' ? 'Nambarka ZAAD-ka' : 'ZAAD Wallet Number') : (language === 'SOM' ? 'Nambarka e-Dahab-ka' : 'eDahab Wallet Number')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold font-mono">
                  +252
                </span>
                <input
                  type="text"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 63487234"
                  className="w-full h-11 pl-14 pr-4 rounded-xl border border-slate-200 font-bold text-sm text-slate-800 tracking-wider"
                  id="mobile-number-wallet-payment"
                />
              </div>
              <span className="text-[10px] text-slate-400 block mt-1 tracking-wide">
                {language === 'SOM' 
                  ? `* Fariin toos ah oo PIN-waydiin ah ayaa ka soo muuqan doonta telefoonkaaga si loo ogolaado lacag bixinta $${totalCost.toFixed(2)}.`
                  : `* An automatic PIN prompt will appear on your linked telephone to authorize $${totalCost.toFixed(2)}.`}
              </span>
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <label className="block text-[9px] font-extrabold text-slate-500 uppercase">{language === 'SOM' ? 'Nambarka Kaarka' : 'Card Holder Number'}</label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4000 1234 5678 9010"
                  className="w-full h-10 px-3 mt-1 underline-none border border-slate-200 bg-white rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-extrabold text-slate-500 uppercase">{language === 'SOM' ? 'Taariikhda Dhicitaanka' : 'Exp Date'}</label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full h-10 px-3 mt-1 underline-none border border-slate-200 bg-white rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-extrabold text-slate-500 uppercase">CVV</label>
                  <input
                    type="password"
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="***"
                    className="w-full h-10 px-3 mt-1 underline-none border border-slate-200 bg-white rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. BILLING SUMMARY */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3.5">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            {language === 'SOM' ? 'Faahfaahinta Bixinta' : 'Booking Breakdown'}
          </h4>

          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>{language === 'SOM' ? 'Qiimaha Tigidhka' : 'Ticket Price'} ({voyage.departureCity} ➔ {voyage.arrivalCity})</span>
            <span className="font-extrabold text-slate-700">${voyage.price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>{language === 'SOM' ? 'Cashuurta Wadooyinka iyo Kharashka Adeegga' : 'Local Somali Road Levy & System Fee'}</span>
            <span className="font-extrabold text-slate-700">${fee.toFixed(2)}</span>
          </div>

          <div className="border-t border-dashed border-slate-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-extrabold text-[#0b3fa1]">{language === 'SOM' ? 'Wadarta Guud:' : 'Total Cost Due:'}</span>
            <span className="text-xl font-black text-[#0b3fa1] tracking-tight">
              ${totalCost.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Form error warning alert */}
        {formError && (
          <div className="flex gap-2.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-2xl">
            <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onGoBack}
            className="flex-1 h-14 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-sm uppercase transition-all"
          >
            {language === 'SOM' ? 'Ku laabo' : 'Go Back'}
          </button>
          
          <button
            type="submit"
            className="flex-[2] h-14 bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 text-white font-extrabold rounded-2xl text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(11,63,161,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            id="btn-trigger-payment"
          >
            <Check size={18} className="stroke-[2.5]" />
            <span>{t.confirmPay}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
