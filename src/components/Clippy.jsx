import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const CLIPPY_TIPS = [
  {
    title: "It looks like you're browsing Fox's photos!",
    text: "Single-click ANY photograph below to open the Fullscreen Windows Picture & Fax Viewer with zoom and EXIF data!",
    actionLabel: "Try Nyan Cat BG 🌈",
    action: "nyan"
  },
  {
    title: "Did you know?",
    text: "You can change the website wallpaper in the top taskbar to Nyan Cat, 90s Starfield, or Windows 95 Teal!",
    actionLabel: "Cycle Wallpaper 🎨",
    action: "wallpaper"
  },
  {
    title: "Keyboard Shortcuts Active!",
    text: "When viewing any picture in full-screen, press the Left (←) and Right (→) arrow keys to flip photos, or Spacebar for a slideshow!",
    actionLabel: "Next Tip ➔",
    action: "next"
  },
  {
    title: "Analog Film Craft",
    text: "Fox shoots on medium format 120 (Hasselblad 500C/M) and 35mm rangefinders (Leica M6). Check out the Camera Bag section!",
    actionLabel: "Book a Shoot ✉️",
    action: "contact"
  }
];

/**
 * Clippy Component
 * Animated retro Windows Assistant in the bottom right corner
 * giving interactive tips, animations, and quick shortcuts!
 */
export default function Clippy({ onBgChange = () => {} }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Periodic eye blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleNextTip = () => {
    sounds.playClick();
    setTipIndex((prev) => (prev + 1) % CLIPPY_TIPS.length);
  };

  const handleAction = (action) => {
    sounds.playStartup();
    if (action === 'nyan') {
      onBgChange('nyan-cat');
    } else if (action === 'wallpaper') {
      onBgChange('retro-space');
    } else if (action === 'contact') {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNextTip();
    }
  };

  const currentTip = CLIPPY_TIPS[tipIndex];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '36px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none'
      }}
    >
      {/* Speech Bubble */}
      {isOpen && (
        <div
          style={{
            backgroundColor: '#ffffe1',
            border: '1px solid #000000',
            borderRadius: '6px',
            boxShadow: '2px 4px 12px rgba(0,0,0,0.35)',
            padding: '12px 14px',
            maxWidth: '260px',
            marginBottom: '8px',
            fontSize: '11px',
            lineHeight: 1.4,
            color: '#000000',
            fontFamily: 'Tahoma, sans-serif',
            position: 'relative',
            pointerEvents: 'auto',
            animation: 'clippyPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {/* Speech bubble pointer / triangle */}
          <div
            style={{
              position: 'absolute',
              bottom: '-9px',
              right: '32px',
              width: 0,
              height: 0,
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '9px solid #ffffe1'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              right: '32px',
              width: 0,
              height: 0,
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '10px solid #000000',
              zIndex: -1
            }}
          />

          {/* Close / Dismiss */}
          <button
            type="button"
            onClick={() => { sounds.playClick(); setIsOpen(false); }}
            style={{
              position: 'absolute',
              top: '4px',
              right: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '2px'
            }}
            title="Dismiss Clippy"
          >
            ✕
          </button>

          <div style={{ fontWeight: 'bold', color: '#002e7a', marginBottom: '4px', paddingRight: '14px' }}>
            📎 {currentTip.title}
          </div>

          <p style={{ margin: '0 0 10px 0', color: '#222' }}>
            {currentTip.text}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #d4d0c8', paddingTop: '6px' }}>
            <button
              className="xp-button primary"
              style={{ padding: '2px 8px', fontSize: '10px' }}
              onClick={() => handleAction(currentTip.action)}
            >
              {currentTip.actionLabel}
            </button>

            <button
              className="xp-button"
              style={{ padding: '2px 8px', fontSize: '10px' }}
              onClick={handleNextTip}
              title="Next Tip"
            >
              Next Tip &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Clippy Vector Character Body */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'auto',
          cursor: 'pointer'
        }}
        onClick={() => {
          sounds.playPop();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            handleNextTip();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={isOpen ? "Click Clippy for next tip!" : "Click to summon Clippy!"}
      >
        <svg
          width="62"
          height="82"
          viewBox="0 0 100 130"
          style={{
            filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))',
            transform: isHovered ? 'scale(1.08) rotate(-4deg)' : 'scale(1)',
            transition: 'transform 0.15s ease'
          }}
        >
          {/* Paperclip Metallic Wire Body */}
          <path
            d="M 50 120 
               C 35 120, 25 110, 25 90 
               L 25 35 
               C 25 18, 40 8, 55 8 
               C 70 8, 85 18, 85 35 
               L 85 95 
               C 85 115, 68 125, 48 125 
               C 28 125, 12 110, 12 85 
               L 12 38"
            fill="none"
            stroke="#a6b3c2"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M 50 120 
               C 35 120, 25 110, 25 90 
               L 25 35 
               C 25 18, 40 8, 55 8 
               C 70 8, 85 18, 85 35 
               L 85 95 
               C 85 115, 68 125, 48 125 
               C 28 125, 12 110, 12 85 
               L 12 38"
            fill="none"
            stroke="#dce4ed"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 50 120 
               C 35 120, 25 110, 25 90 
               L 25 35 
               C 25 18, 40 8, 55 8 
               C 70 8, 85 18, 85 35 
               L 85 95 
               C 85 115, 68 125, 48 125 
               C 28 125, 12 110, 12 85 
               L 12 38"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="14 10"
          />

          {/* Left Eyebrow */}
          <path
            d="M 32 30 Q 42 22 48 29"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Right Eyebrow */}
          <path
            d="M 60 28 Q 68 20 78 30"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Eye */}
          <ellipse
            cx="42"
            cy="42"
            rx="11"
            ry={isBlinking ? "1.5" : "12"}
            fill="#ffffff"
            stroke="#222"
            strokeWidth="2"
          />
          {!isBlinking && (
            <>
              <circle cx="44" cy="42" r="5" fill="#000000" />
              <circle cx="46" cy="40" r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Right Eye */}
          <ellipse
            cx="68"
            cy="42"
            rx="11"
            ry={isBlinking ? "1.5" : "12"}
            fill="#ffffff"
            stroke="#222"
            strokeWidth="2"
          />
          {!isBlinking && (
            <>
              <circle cx="70" cy="42" r="5" fill="#000000" />
              <circle cx="72" cy="40" r="1.5" fill="#ffffff" />
            </>
          )}
        </svg>

        {/* Small floating hint badge if speech bubble is closed */}
        {!isOpen && (
          <div
            style={{
              backgroundColor: '#ffffe1',
              border: '1px solid #707070',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '10px',
              boxShadow: '1px 2px 4px rgba(0,0,0,0.3)',
              fontWeight: 'bold',
              color: '#002e7a'
            }}
          >
            Need Help?
          </div>
        )}
      </div>
    </div>
  );
}
