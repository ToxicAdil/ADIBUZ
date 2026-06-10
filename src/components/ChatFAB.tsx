import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * ChatFAB - Pure CSS version (no framer-motion).
 * It is delayed in main.tsx so it does not compete with initial mobile render.
 */
export default function ChatFAB() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (location.pathname === '/assistant') return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[9999] flex flex-col items-center gap-0 pointer-events-auto group/btn">
      <div
        className="flex flex-col items-center mb-1 group-hover/btn:translate-y-[-4px] transition-transform duration-300 adibuz-chat-label"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE] text-[#1E1B4B] px-2.5 py-1 rounded-full shadow-xl border border-[#C4B5FD]/50 flex items-center justify-center">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Let's Talk</span>
        </div>
        <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className="-mt-0.5 opacity-60" aria-hidden="true">
          <path
            d="M1 1L6 6L11 1"
            stroke="#6D28D9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative">
        <button
          onClick={() => navigate('/assistant')}
          className="w-[46px] h-[37px] sm:w-[56px] sm:h-[45px] bg-[#3A0F63] border-2 border-white/30 shadow-[0_10px_30px_rgba(58,15,99,0.4)] flex flex-col items-center justify-center relative overflow-hidden group-hover/btn:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ borderRadius: '38%' }}
          aria-label="Open Adibuz assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <div className="flex flex-col items-center gap-1.5 relative z-10 pt-0.5">
            <div className="flex gap-1.5 sm:gap-2" aria-hidden="true">
              <div className="w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] origin-center adibuz-fab-eye" />
              <div className="w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] origin-center adibuz-fab-eye" />
            </div>
            <svg
              width="20"
              height="6"
              viewBox="0 0 20 6"
              fill="none"
              className="sm:w-[24px] sm:h-[7px]"
              aria-hidden="true"
            >
              <path
                d="M4 1.5C4 1.5 7.5 4.5 10 4.5C12.5 4.5 16 1.5 16 1.5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
              />
            </svg>
          </div>

          <div className="absolute inset-0 bg-white adibuz-fab-pulse" />
        </button>
      </div>
    </div>
  );
}
