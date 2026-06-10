import { UserNotification } from '../types';
import { X, Bell, Check, Trash2, ShieldCheck, Mail, Ticket } from 'lucide-react';

interface NotificationModalProps {
  notifications: UserNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export default function NotificationModal({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onClearAll,
}: NotificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left" id="notifications-modal-overlay">
      {/* Black backdrop blur glass layout */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all h-full" 
        onClick={onClose} 
      />

      {/* Floating or Sliding Container */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col h-full z-50">
        
        {/* Header bar */}
        <div className="p-5.5 p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100/40">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-[#0b3fa1]" />
            <span className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
              Voyage Notifications
            </span>
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                {notifications.filter((n) => !n.read).length} New
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            id="btn-close-notifications"
          >
            <X size={20} />
          </button>
        </div>

        {/* List scrollbox */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
              <span className="p-3.5 bg-slate-50 rounded-full text-slate-300">
                <Bell size={32} />
              </span>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Inbox is Empty</p>
              <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                You will receive alerts here about gate times, tickets, and safety notices.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                className={`p-3.5 border rounded-2xl transition-all cursor-pointer relative ${
                  notif.read
                    ? 'bg-slate-50/50 border-slate-100 text-slate-500'
                    : 'bg-indigo-50/15 border-[#0b3fa1]/20 shadow-sm hover:border-[#0b3fa1]/35'
                }`}
                id={`notification-row-${notif.id}`}
              >
                {!notif.read && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#069faa]" />
                )}

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#0b3fa1]">
                    {notif.title.toLowerCase().includes('confirmed') ? (
                      <Ticket size={16} className="text-[#069faa]" />
                    ) : (
                      <ShieldCheck size={16} className="text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h5 className={`text-xs font-black tracking-tight ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>
                      {notif.title}
                    </h5>
                    <p className="text-[11px] font-medium text-slate-400 mt-1 leading-relaxed">
                      {notif.description}
                    </p>
                    <span className="block text-[8px] text-slate-400 font-mono tracking-wider mt-2">
                      {notif.timestamp}
                    </span>
                  </div>
                </div>

                {/* Mark as read helper action inside notif */}
                {!notif.read && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100/50 flex justify-end text-[9px] font-black text-[#0b3fa1] uppercase">
                    <span>Tap to mark read</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer buttons screen */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
            <button
              onClick={onClearAll}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-100"
              id="btn-clear-notifications"
            >
              <Trash2 size={13} />
              <span>Clear Board</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
