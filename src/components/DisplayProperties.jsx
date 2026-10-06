import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

export const WALLPAPERS = [
  { id: 'bliss', name: 'Bliss (Default Rolling Hills)', url: '/bliss.jpg' },
  { id: 'autumn', name: 'Autumn (Golden Forest)', url: '/autumn.jpg' },
  { id: 'azul', name: 'Azul (Tropical Ocean Ripple)', url: '/azul.jpg' },
  { id: 'red_desert', name: 'Red Desert Dunes', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80' },
  { id: 'classic_blue', name: 'Windows Classic Royal Blue', url: 'solid-blue' }
];

export const THEMES = [
  { id: 'luna', name: 'Windows XP style (Luna Blue)' },
  { id: 'silver', name: 'Windows XP style (Silver)' },
  { id: 'olive', name: 'Windows XP style (Olive Green)' }
];

/**
 * DisplayProperties Component
 * Classic Windows XP "Display Properties" dialog with CRT monitor live preview,
 * wallpaper picker, and visual style selector.
 */
export default function DisplayProperties({
  currentWallpaper,
  currentTheme,
  onWallpaperChange,
  onThemeChange
}) {
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleApply = () => {
    sounds.playStartup();
    onWallpaperChange(selectedWallpaper);
    onThemeChange(selectedTheme);
  };

  const handleOk = () => {
    handleApply();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ece9d8', padding: '10px' }}>
      {/* Tab Strip */}
      <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid #707070', paddingLeft: '6px' }}>
        <button
          className="xp-button"
          style={{
            borderBottom: '1px solid #ece9d8',
            backgroundColor: '#ece9d8',
            fontWeight: 'bold',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginBottom: '-1px',
            zIndex: 2
          }}
        >
          Desktop & Themes
        </button>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: '#ece9d8',
          border: '1px solid #ffffff',
          borderRightColor: '#707070',
          borderBottomColor: '#707070',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          overflowY: 'auto'
        }}
      >
        {/* Iconic Windows XP CRT Monitor Preview */}
        <div style={{ position: 'relative', width: '180px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* CRT Monitor Case */}
          <div
            style={{
              width: '160px',
              height: '115px',
              backgroundColor: '#d8d4c2',
              borderRadius: '8px',
              border: '2px solid #8c887b',
              boxShadow: 'inset 1px 1px 0 #fff, 2px 2px 5px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
          >
            {/* Monitor Screen Glass */}
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: selectedWallpaper === 'solid-blue' ? '#004e98' : '#000',
                backgroundImage: selectedWallpaper !== 'solid-blue' ? `url(${selectedWallpaper})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid #222',
                borderRadius: '3px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Fake Mini Taskbar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '8px',
                  backgroundColor: selectedTheme === 'silver' ? '#808799' : selectedTheme === 'olive' ? '#5b7337' : '#1941a5'
                }}
              />
            </div>
          </div>
          {/* Monitor Stand Base */}
          <div
            style={{
              width: '45px',
              height: '10px',
              backgroundColor: '#b8b4a2',
              border: '1px solid #707070'
            }}
          />
          <div
            style={{
              width: '80px',
              height: '6px',
              backgroundColor: '#d8d4c2',
              border: '1px solid #707070',
              borderRadius: '2px'
            }}
          />
        </div>

        {/* Wallpaper Picker List */}
        <div style={{ width: '100%', display: 'flex', gap: '12px' }}>
          {/* Left: Background List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#002e7a' }}>Background:</span>
            <div
              style={{
                height: '110px',
                backgroundColor: '#ffffff',
                border: '1px solid #7f9db9',
                overflowY: 'auto',
                padding: '2px'
              }}
            >
              {WALLPAPERS.map((wp) => {
                const isSelected = selectedWallpaper === wp.url;
                return (
                  <div
                    key={wp.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedWallpaper(wp.url);
                    }}
                    style={{
                      padding: '2px 6px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#316ac5' : 'transparent',
                      color: isSelected ? '#ffffff' : '#000000'
                    }}
                  >
                    {wp.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Color Scheme & Theme */}
          <div style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#002e7a' }}>Color scheme:</span>
              <select
                value={selectedTheme}
                onChange={(e) => {
                  sounds.playClick();
                  setSelectedTheme(e.target.value);
                }}
                style={{ width: '100%', marginTop: '4px', border: '1px solid #7f9db9', fontSize: '11px', padding: '2px' }}
              >
                {THEMES.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: '10px', color: '#555', background: '#fff', border: '1px solid #aca899', padding: '6px' }}>
              Select a background and theme, then click Apply to change your desktop.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dialog Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '10px' }}>
        <button className="xp-button primary" onClick={handleOk}>
          OK
        </button>
        <button className="xp-button" onClick={() => sounds.playClick()}>
          Cancel
        </button>
        <button className="xp-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
