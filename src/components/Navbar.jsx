import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Sun, Moon, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * Navbar Component
 * Windows XP Luna Taskbar styled sticky top navigation bar
 */
export default function Navbar({
  currentTheme = 'luna',
  onThemeChange = () => {},
  onTakeSnap = () => {}
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMuteToggle = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) sounds.playClick();
  };

  return (
    <nav className="xp-navbar-sticky">
      {/* 1. Left: Windows XP Start Brand Button */}
      <a 
        href="#" 
        className="xp-nav-brand"
        onClick={() => sounds.playPop()}
        title="Fox Photography Home"
      >
        {/* 4-Color Windows Flag */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 5.5C5.5 4.5 8 5.5 11 6V11.5C8 11 5.5 10 3 11V5.5Z" fill="#ff4d4d" />
          <path d="M13 6.3C16 5.8 18.5 6.8 21 6V11.5C18.5 12.3 16 11.3 13 11.8V6.3Z" fill="#8bc34a" />
          <path d="M3 12.5C5.5 11.5 8 12.5 11 13V18.5C8 18 5.5 17 3 18V12.5Z" fill="#29b6f6" />
          <path d="M13 13.3C16 12.8 18.5 13.8 21 13V18.5C18.5 19.3 16 18.3 13 18.8V13.3Z" fill="#ffca28" />
        </svg>
        <span>Fox Photography</span>
      </a>

      {/* 2. Middle: Page Navigation Anchors */}
      <div className="xp-nav-links">
        <a 
          href="#gallery" 
          className="xp-nav-link"
          onClick={() => sounds.playClick()}
        >
          <span>🖼️ Pictures</span>
        </a>

        <a 
          href="#sort-info" 
          className="xp-nav-link"
          onClick={() => sounds.playClick()}
        >
          <span>🔍 Sort & Info Window</span>
        </a>

        <a 
          href="#about" 
          className="xp-nav-link"
          onClick={() => sounds.playClick()}
        >
          <span>👤 About Fox</span>
        </a>

        <a 
          href="#contact" 
          className="xp-nav-link"
          onClick={() => sounds.playClick()}
        >
          <span>✉️ Book Shoot</span>
        </a>
      </div>

      {/* 3. Right: System Controls, Theme Switcher & Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Shutter snapshot sound trigger */}
        <button
          type="button"
          className="xp-button"
          style={{ padding: '2px 8px', height: '22px' }}
          onClick={() => { sounds.playShutter(); onTakeSnap(); }}
          title="Take Shutter Flash"
        >
          <Camera size={12} color="#0054e3" />
          <span>Shutter</span>
        </button>

        {/* Theme Picker */}
        <select
          value={currentTheme}
          onChange={(e) => {
            sounds.playClick();
            onThemeChange(e.target.value);
          }}
          style={{
            height: '22px',
            fontSize: '11px',
            fontFamily: 'Tahoma, sans-serif',
            border: '1px solid #002e7a',
            borderRadius: '2px',
            backgroundColor: '#ffffff',
            padding: '1px 4px'
          }}
          title="Switch Windows XP Theme"
        >
          <option value="luna">Luna Blue</option>
          <option value="silver">Silver XP</option>
          <option value="olive">Olive Green</option>
        </select>

        {/* Audio Mute */}
        <button
          type="button"
          onClick={handleMuteToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title={isMuted ? 'XP Sounds Muted (Click to Unmute)' : 'XP Sounds Active (Click to Mute)'}
        >
          {isMuted ? <VolumeX size={15} color="#fca5a5" /> : <Volume2 size={15} color="#ffffff" />}
        </button>

        {/* System Clock */}
        <div
          style={{
            background: 'linear-gradient(180deg, #0d9bf2 0%, #0c82d4 25%, #08559e 100%)',
            borderLeft: '1px solid #144984',
            padding: '2px 8px',
            height: '22px',
            borderRadius: '2px',
            color: '#ffffff',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            fontSize: '11px'
          }}
        >
          {currentTime || '3:30 PM'}
        </div>
      </div>
    </nav>
  );
}
