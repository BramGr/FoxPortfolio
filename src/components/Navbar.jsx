import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Camera, Wifi, ShieldAlert, Monitor, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * Navbar Component (Windows XP Taskbar)
 * Includes the iconic green "start" button, quick-launch shortcuts,
 * active window task tabs, and notification area (clock, audio mute, camera shutter).
 */
export default function Navbar({
  windows = [],
  focusedWindowId = null,
  startMenuOpen = false,
  onToggleStartMenu = () => {},
  onWindowClick = () => {},
  onMinimizeAll = () => {},
  onOpenWindow = () => {},
  onTakeSnap = () => {}
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
      setCurrentDate(now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  const handleStartClick = (e) => {
    e.stopPropagation();
    sounds.playClick();
    onToggleStartMenu();
  };

  return (
    <nav className="xp-taskbar" aria-label="Windows XP Taskbar">
      {/* 1. Green Windows XP Start Button */}
      <button
        type="button"
        className={`xp-start-btn ${startMenuOpen ? 'open' : ''}`}
        onClick={handleStartClick}
        aria-expanded={startMenuOpen}
        title="Click here to begin"
      >
        {/* Iconic Windows XP 4-color Flag Emblem */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }}>
          {/* Red top-left */}
          <path d="M3 5.5C5.5 4.5 8 5.5 11 6V11.5C8 11 5.5 10 3 11V5.5Z" fill="#ff4d4d" />
          {/* Green top-right */}
          <path d="M13 6.3C16 5.8 18.5 6.8 21 6V11.5C18.5 12.3 16 11.3 13 11.8V6.3Z" fill="#8bc34a" />
          {/* Blue bottom-left */}
          <path d="M3 12.5C5.5 11.5 8 12.5 11 13V18.5C8 18 5.5 17 3 18V12.5Z" fill="#29b6f6" />
          {/* Yellow bottom-right */}
          <path d="M13 13.3C16 12.8 18.5 13.8 21 13V18.5C18.5 19.3 16 18.3 13 18.8V13.3Z" fill="#ffca28" />
        </svg>
        <span>start</span>
      </button>

      {/* 2. Quick Launch Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '0 6px', borderRight: '1px solid #144984' }}>
        {/* Show Desktop */}
        <button
          type="button"
          className="xp-tool-btn"
          style={{ padding: '2px', height: '22px', width: '22px', justifyContent: 'center' }}
          title="Show Desktop"
          onClick={() => { sounds.playClick(); onMinimizeAll(); }}
        >
          <Monitor size={15} color="#ffffff" />
        </button>

        {/* Quick Launch: My Pictures Gallery */}
        <button
          type="button"
          className="xp-tool-btn"
          style={{ padding: '2px', height: '22px', width: '22px', justifyContent: 'center' }}
          title="Open Photography Portfolio"
          onClick={() => { sounds.playClick(); onOpenWindow('gallery'); }}
        >
          <span style={{ fontSize: '13px' }}>🖼️</span>
        </button>

        {/* Camera Flash / Shutter button */}
        <button
          type="button"
          className="xp-tool-btn"
          style={{ padding: '2px', height: '22px', width: '22px', justifyContent: 'center' }}
          title="Take Shutter Snapshot (Audio FX)"
          onClick={() => { sounds.playShutter(); onTakeSnap && onTakeSnap(); }}
        >
          <Camera size={14} color="#ffd166" />
        </button>
      </div>

      {/* 3. Running Window Task Tabs */}
      <div className="xp-taskbar-tasks">
        {windows.map((win) => {
          const isActive = focusedWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              type="button"
              className={`xp-task-tab ${isActive ? 'active' : ''}`}
              title={win.title}
              onClick={() => {
                sounds.playClick();
                onWindowClick(win.id);
              }}
            >
              <span style={{ fontSize: '13px', flexShrink: 0 }}>{win.icon || '📁'}</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {win.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Notification Area (System Tray) */}
      <div className="xp-system-tray">
        {/* Photography SD Card / Camera Online Status */}
        <span 
          title="Camera Tethered: Leica & Hasselblad Online"
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => sounds.playShutter()}
        >
          <Camera size={13} color="#ffffff" />
        </span>

        {/* Network Icon */}
        <span title="Connected to Local Network (100.0 Mbps)" style={{ display: 'flex', alignItems: 'center' }}>
          <Wifi size={13} color="#ffffff" />
        </span>

        {/* Audio Mute / Unmute Toggle */}
        <button
          type="button"
          onClick={handleAudioToggle}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#ffffff' }}
          title={isMuted ? 'XP Sounds Muted (Click to Unmute)' : 'XP Sounds Enabled (Click to Mute)'}
        >
          {isMuted ? <VolumeX size={14} color="#fca5a5" /> : <Volume2 size={14} color="#ffffff" />}
        </button>

        {/* Digital Clock with Tooltip */}
        <div 
          style={{ cursor: 'default', fontWeight: 'bold', marginLeft: '2px' }}
          title={currentDate}
        >
          {currentTime || '3:30 PM'}
        </div>
      </div>
    </nav>
  );
}
