import { useState } from 'react';
import { Ticket } from '../types';
import { Ticket as TicketIcon, ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../translations';

interface TicketsListProps {
  tickets: Ticket[];
  onCancelTicket?: (ticketId: string) => void;
  language?: Language;
}

export default function TicketsList({ tickets, onCancelTicket, language = 'ENG' }: TicketsListProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const filteredTickets = tickets.filter((ticket) => {
    if (activeTab === 'active') {
      return ticket.status === 'active';
    } else {
      return ticket.status === 'completed' || ticket.status === 'cancelled';
    }
  });

  return (
    <div className="px-5 pb-24 text-left" id="tickets-list-viewport">
      
      {/* Tab Selectors */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-5 border border-slate-200/40">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 text-center rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'bg-white text-[#0b3fa1] shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {language === 'SOM' ? 'Safarada Firfircoon' : 'Active Trips'} ({tickets.filter((t) => t.status === 'active').length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-3 text-center rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'past'
              ? 'bg-white text-[#0b3fa1] shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {language === 'SOM' ? 'Taariikhda Safarka' : 'Past History'} ({tickets.filter((t) => t.status !== 'active').length})
        </button>
      </div>

      {/* Tickets List container */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center shadow-sm">
          <TicketIcon size={44} className="mx-auto text-slate-300 mb-3" />
          <h4 className="text-slate-700 font-extrabold text-sm uppercase mb-1">
            {language === 'SOM' ? 'Tigidh Meesha Kuma Jiraan' : 'No Tickets Found'}
          </h4>
          <p className="text-xs text-slate-400 font-medium">
            {activeTab === 'active'
              ? (language === 'SOM' ? 'Ma haysatid wax safaro dhow oo soo socda. Boos-gareey mid hadda!' : "You don't have any upcoming trips. Book a voyage to set off!")
              : (language === 'SOM' ? 'Wax taariikh safar ah laguma hayo xisaabtan.' : 'No travel history recorded in this account.')}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-[28px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 relative"
              id={`ticket-card-${ticket.id}`}
            >
              
              {/* Dynamic status colored line of the ticket card */}
              <div
                className={`h-2.5 w-full ${
                  ticket.status === 'active'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan'
                    : ticket.status === 'completed'
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                }`}
              />

              {/* Main Info */}
              <div className="p-5">
                
                {/* Header bar */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">{language === 'SOM' ? 'Shirkadda Baska' : 'Bus Operator'}</span>
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 pt-0.5">
                      {ticket.operatorName}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">{language === 'SOM' ? 'Nambarka Tigidhka' : 'Ticket Number'}</span>
                    <span className="text-[11px] font-mono font-bold text-slate-800 uppercase pt-0.5 block">
                      {ticket.id}
                    </span>
                  </div>
                </div>

                {/* Cities info row */}
                <div className="flex justify-between items-center bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">{language === 'SOM' ? 'KA' : 'FROM'}</span>
                    <span className="text-base font-extrabold text-[#0b3fa1]">{ticket.departureCity}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] bg-[#069faa]/10 text-[#069faa] font-bold px-2 py-0.5 rounded-full mb-0.5">{language === 'SOM' ? 'Wadada Tooska' : 'Direct Route'}</span>
                    <ArrowRight size={14} className="text-slate-300" />
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">{language === 'SOM' ? 'U GU' : 'DESTINATION'}</span>
                    <span className="text-base font-extrabold text-[#069faa]">{ticket.arrivalCity}</span>
                  </div>
                </div>

                {/* Key timings detail list */}
                <div className="grid grid-cols-3 gap-3 my-4 py-1.5 text-xs text-slate-700 font-bold">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wide leading-tight">{language === 'SOM' ? 'Taariikhda Bixidda' : 'Departure Date'}</span>
                    <span className="tracking-tight text-slate-800 mt-1 block font-extrabold">{ticket.date}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wide leading-tight">{language === 'SOM' ? 'Waqtiga Bixidda' : 'Departure Time'}</span>
                    <span className="tracking-tight text-slate-800 mt-1 block font-extrabold">{ticket.departureTime}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wide leading-tight">{language === 'SOM' ? 'Kursiga' : 'Seat Assigned'}</span>
                    <span className="tracking-tight text-[#069faa] font-black text-sm mt-0.5 block">
                      {language === 'SOM' ? 'Kursiga' : 'SEAT'} {ticket.seatNumber}
                    </span>
                  </div>
                </div>

                {/* Passenger line */}
                <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wide">{language === 'SOM' ? 'Magaca Rakaabka' : 'Traveller Name'}</span>
                    <span className="text-xs font-extrabold text-slate-800 block mt-0.5">{ticket.passengerName}</span>
                  </div>

                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wide text-right">{language === 'SOM' ? 'Habka Lacagta' : 'Paid via'}</span>
                    <span className="text-[10px] bg-slate-50 text-[#0b3fa1] border border-slate-100 px-2.5 py-1 rounded-lg font-bold block mt-0.5 text-right">
                      {ticket.paymentMethod}
                    </span>
                  </div>
                </div>

              </div>

              {/* Jagged border divider simulation with holes */}
              <div className="relative h-6 bg-slate-50/50 flex items-center justify-between border-y border-dashed border-slate-200 overflow-hidden">
                <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#f4f6fa] border border-slate-200/50" />
                <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#f4f6fa] border border-slate-200/50" />
                
                {/* Horizontal dash spacer line */}
                <div className="w-full h-[1px] border-b border-dashed border-slate-200 mx-5" />
              </div>

              {/* QR Code and Actions Footer section */}
              <div className="bg-slate-50/70 p-5 flex flex-col items-center justify-center">
                {ticket.status === 'active' ? (
                  <div className="w-full space-y-4">
                    
                    {/* Visual QR Code Generator block representation, drawn with high fidelity using pure CSS matrix */}
                    <div 
                      className="bg-white p-3 rounded-2xl border border-slate-200 shadow-inner flex flex-col items-center justify-center w-full max-w-[200px] mx-auto cursor-pointer"
                      onClick={() => setSelectedQR(ticket.qrCodeData === selectedQR ? null : ticket.qrCodeData)}
                    >
                      <div className="relative bg-[#101c3d] p-3 rounded-xl">
                        {/* High fidelity simulation of standard pixel grid QR code using pixel gradients */}
                        <div className="w-24 h-24 grid grid-cols-6 gap-0.5">
                          {Array.from({ length: 36 }).map((_, i) => {
                            // Draw corner anchor blocks, and randomize other spots
                            const isAnchor =
                              i < 3 || (i >= 6 && i < 9) || (i >= 12 && i < 15) || // top-left anchor
                              i === 3 || i === 4 || i === 5 || // top-right anchor elements
                              i >= 30; // bottom-left anchor elements
                            const isFilled = isAnchor || (i * 37) % 3 === 0 || (i * 13) % 2 === 0;
                            return (
                              <div
                                key={i}
                                className={`rounded-[2px] ${isFilled ? 'bg-white' : 'bg-transparent'}`}
                              />
                            );
                          })}
                        </div>
                        {/* Central brand locator graphic inside center of code */}
                        <div className="absolute inset-x-0 inset-y-0 m-auto w-6 h-6 rounded-md bg-white border border-slate-800 flex items-center justify-center text-[10px] font-extrabold text-[#0b3fa1]">
                          MGT
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest mt-2">
                        {selectedQR === ticket.qrCodeData 
                          ? (language === 'SOM' ? 'GRIIDKA YAREEY' : 'TAP TO COLLAPSE')
                          : (language === 'SOM' ? 'GRIIDKA WEYNEEY' : 'TAP TO MAGNIFY')}
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-[11px] font-bold text-slate-500 max-w-[260px] mx-auto leading-relaxed">
                        {language === 'SOM' 
                          ? 'U tusi barcode-kan gaarka ah kirishboyga baska marka aad raacayso baska.'
                          : 'Present this custom QR Code to the conductor when boarding at the bus station.'}
                      </p>
                    </div>

                    {/* Check In Action Buttons */}
                    <div className="flex gap-2 pt-1.5" id={`booking-actions-${ticket.id}`}>
                      {onCancelTicket && (
                        <button
                          type="button"
                          onClick={() => onCancelTicket(ticket.id)}
                          className="flex-1 py-2 rounded-xl bg-white border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wide hover:bg-rose-50"
                        >
                          {language === 'SOM' ? 'Safar Baajiy' : 'Cancel Booking'}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => alert(language === 'SOM' ? `Is-diiwaangalinta Kursiga ${ticket.seatNumber} waa lagu guuleystay! Waxaa lagu keydiyay kaydka Magaalo Trip.` : `Self Check-In Successful for Seat ${ticket.seatNumber}! Registered in Magaalo database.`)}
                        className="flex-1 py-2.5 rounded-xl bg-[#069faa] hover:opacity-95 text-white text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Sparkles size={12} className="text-teal-200 fill-teal-200 animate-pulse" />
                        <span>{language === 'SOM' ? 'Is-Diiwaangeli' : 'Self Check-In'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${ticket.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {language === 'SOM' ? `Safar ${ticket.status === 'completed' ? 'Wuu Dhamaaday' : 'La Baajiyey'}` : `Trip ${ticket.status}`}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => alert(language === 'SOM' ? 'Risidka PDF-ka ee tigidhka waa la soo dejiyey (Tijaabo).' : 'Booking invoice receipt PDF downloaded to this device (Simulated).')}
                      className="text-xs font-bold text-[#0b3fa1] hover:underline cursor-pointer"
                    >
                      {language === 'SOM' ? 'Risidka PDF-ka' : 'Receipt PDF'}
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
