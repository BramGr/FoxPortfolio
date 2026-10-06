import React from 'react';
import { Camera, Image, FileText, Settings, Sliders, Mail, Power, LogOut, HelpCircle, HardDrive, Printer, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * StartMenu Component
 * Classic 2-column Windows XP Start Menu with photographer user card,
 * pinned portfolio shortcuts, system folders, and power controls.
 */
export default function StartMenu({
  isOpen,
  onClose,
  onOpenApp
}) {
  if (!isOpen) return null;

  const handleItemClick = (appId) => {
    sounds.playPop();
    onOpenApp(appId);
    onClose();
  };

  const handleTurnOff = () => {
    sounds.playError();
    alert('It is now safe to turn off your computer... or keep exploring photographs!');
  };

  const handleLogOff = () => {
    sounds.playClick();
    alert('Log Off Photographer Profile: Welcome back any time!');
  };

  return (
    <div className="xp-start-menu" onClick={(e) => e.stopPropagation()}>
      {/* 1. Top Header Profile Banner */}
      <div className="xp-start-header">
        <img
          src="/avatar.jpg"
          alt="Photographer Avatar"
          className="xp-start-avatar"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="xp-start-username">Fox Photography</span>
          <span style={{ fontSize: '11px', opacity: 0.85, color: '#e0edff' }}>Bram • Visual Artist & 35mm</span>
        </div>
      </div>

      {/* 2. Body (Two Columns) */}
      <div className="xp-start-body">
        {/* Left Column: Pinned & Favorite Programs */}
        <div className="xp-start-col-left">
          {/* Main Portfolio */}
          <div 
            className="xp-start-item"
            onClick={() => handleItemClick('gallery')}
          >
            <span style={{ fontSize: '20px' }}>🖼️</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>My Pictures (Portfolio)</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Browse landscape, portrait & street galleries</div>
            </div>
          </div>

          {/* Picture and Fax Viewer */}
          <div 
            className="xp-start-item"
            onClick={() => handleItemClick('viewer')}
          >
            <span style={{ fontSize: '20px' }}>🔍</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>Picture & Fax Viewer</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Full-screen presentation & EXIF data</div>
            </div>
          </div>

          {/* Bio / About */}
          <div 
            className="xp-start-item"
            onClick={() => handleItemClick('about')}
          >
            <span style={{ fontSize: '20px' }}>👤</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>Artist Bio & Statement</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Exhibitions, publications & background</div>
            </div>
          </div>

          {/* Camera Gear */}
          <div 
            className="xp-start-item"
            onClick={() => handleItemClick('gear')}
          >
            <span style={{ fontSize: '20px' }}>📷</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>Camera Bag & Gear</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Leica, Hasselblad & analog film stocks</div>
            </div>
          </div>

          {/* Contact / Booking */}
          <div 
            className="xp-start-item"
            onClick={() => handleItemClick('contact')}
          >
            <span style={{ fontSize: '20px' }}>✉️</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>Outlook Express (Booking)</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Inquire for shoots, prints & licensing</div>
            </div>
          </div>

          {/* Guestbook */}
          <div 
            className="xp-start-item"
            onClick={() => handleItemClick('guestbook')}
          >
            <span style={{ fontSize: '20px' }}>📝</span>
            <div>
              <div style={{ fontWeight: 'bold' }}>Client Guestbook.txt</div>
              <div style={{ fontSize: '10px', color: '#666' }}>Read client testimonials or sign note</div>
            </div>
          </div>

          <div style={{ height: '1px', background: '#d4d0c8', margin: '4px 2px' }} />

          {/* All Programs item */}
          <div 
            className="xp-start-item"
            style={{ justifyContent: 'space-between', padding: '6px 8px' }}
            onClick={() => handleItemClick('gallery')}
          >
            <span style={{ fontWeight: 'bold' }}>All Programs</span>
            <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>▶</span>
          </div>
        </div>

        {/* Right Column: System Folders & Utilities */}
        <div className="xp-start-col-right">
          <div className="xp-start-item-right" onClick={() => handleItemClick('gallery')}>
            <span style={{ fontSize: '16px' }}>📁</span>
            <span>My Pictures</span>
          </div>

          <div className="xp-start-item-right" onClick={() => handleItemClick('gear')}>
            <span style={{ fontSize: '16px' }}>💻</span>
            <span>My Camera Gear</span>
          </div>

          <div className="xp-start-item-right" onClick={() => handleItemClick('display')}>
            <span style={{ fontSize: '16px' }}>🎨</span>
            <span>Display Properties</span>
          </div>

          <div className="xp-start-item-right" onClick={() => handleItemClick('prints')}>
            <span style={{ fontSize: '16px' }}>🖨️</span>
            <span>Order Prints</span>
          </div>

          <div style={{ height: '1px', background: '#9ebbe8', margin: '4px 2px' }} />

          <div className="xp-start-item-right" onClick={() => handleItemClick('display')}>
            <span style={{ fontSize: '16px' }}>⚙️</span>
            <span>Control Panel</span>
          </div>

          <div className="xp-start-item-right" onClick={() => handleItemClick('help')}>
            <span style={{ fontSize: '16px' }}>❓</span>
            <span>Help & Support (Tour)</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Footer (Log Off / Turn Off) */}
      <div className="xp-start-footer">
        <button 
          type="button" 
          className="xp-start-footer-btn"
          onClick={handleLogOff}
        >
          <LogOut size={16} color="#ffca28" />
          <span>Log Off</span>
        </button>

        <button 
          type="button" 
          className="xp-start-footer-btn"
          onClick={handleTurnOff}
        >
          <Power size={16} color="#ff4d4d" />
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
}
