import React, { useState } from 'react';
import { 
  HelpCircle, 
  MousePointer, 
  Image, 
  Camera, 
  Keyboard, 
  Monitor, 
  Printer, 
  Mail, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Volume2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * HelpTourWindow Component
 * Authentic recreation of Windows XP "Tour Windows XP / Help and Support Center"
 * explains all features and provides interactive step-by-step navigation tips.
 */
export default function HelpTourWindow({ onOpenApp, onClose }) {
  const [activeTopic, setActiveTopic] = useState('welcome');

  const handleTopicClick = (topic) => {
    sounds.playClick();
    setActiveTopic(topic);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ece9d8' }}>
      {/* Top Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #1941a5 0%, #245edb 60%, #3a7eee 100%)',
          color: '#ffffff',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #ff9900',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#ffffff', borderRadius: '50%', padding: '4px', display: 'flex' }}>
            <HelpCircle size={24} color="#0054e3" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '15px', color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
              How to Use This Portfolio — Windows XP Guided Tour
            </h2>
            <div style={{ fontSize: '11px', opacity: 0.9 }}>
              Discover features, photo viewing, EXIF specs, and retro easter eggs
            </div>
          </div>
        </div>
        <button
          className="xp-button"
          onClick={() => { sounds.playShutter(); }}
          title="Shutter Snapshot"
          style={{ height: '24px', padding: '0 8px' }}
        >
          📷 Test Shutter
        </button>
      </div>

      {/* Main Two-Column Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Topics */}
        <aside
          style={{
            width: '210px',
            backgroundColor: '#d6dff7',
            borderRight: '1px solid #707070',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            overflowY: 'auto',
            fontSize: '11px'
          }}
        >
          <span style={{ fontWeight: 'bold', color: '#002e7a', marginBottom: '4px' }}>Tour Topics:</span>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'welcome' ? '#316ac5' : 'transparent',
              color: activeTopic === 'welcome' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'welcome' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('welcome')}
          >
            <span>✨ Welcome & Single-Click</span>
          </div>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'viewing' ? '#316ac5' : 'transparent',
              color: activeTopic === 'viewing' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'viewing' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('viewing')}
          >
            <span>🖼️ Picture Viewer & EXIF</span>
          </div>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'keyboard' ? '#316ac5' : 'transparent',
              color: activeTopic === 'keyboard' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'keyboard' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('keyboard')}
          >
            <span>⌨️ Keyboard Shortcuts</span>
          </div>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'themes' ? '#316ac5' : 'transparent',
              color: activeTopic === 'themes' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'themes' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('themes')}
          >
            <span>🎨 Themes & Wallpaper</span>
          </div>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'booking' ? '#316ac5' : 'transparent',
              color: activeTopic === 'booking' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'booking' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('booking')}
          >
            <span>✉️ Booking & Print Orders</span>
          </div>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'gear' ? '#316ac5' : 'transparent',
              color: activeTopic === 'gear' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'gear' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('gear')}
          >
            <span>📷 Camera Bag & Hardware</span>
          </div>

          <div
            className="xp-sidebar-link"
            style={{
              backgroundColor: activeTopic === 'easter' ? '#316ac5' : 'transparent',
              color: activeTopic === 'easter' ? '#ffffff' : '#0c327d',
              padding: '6px 8px',
              fontWeight: activeTopic === 'easter' ? 'bold' : 'normal'
            }}
            onClick={() => handleTopicClick('easter')}
          >
            <span>🔊 Sound FX & Easter Eggs</span>
          </div>
        </aside>

        {/* Right Topic Details Pane */}
        <main style={{ flex: 1, backgroundColor: '#ffffff', padding: '16px', overflowY: 'auto', fontSize: '11px', lineHeight: 1.5 }}>
          {activeTopic === 'welcome' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Welcome to Fox Photography (Windows XP Edition)
              </h3>
              <p style={{ margin: 0 }}>
                This portfolio is an authentic interactive recreation of the iconic <b>Windows XP Luna</b> desktop environment, designed to celebrate the golden age of computing alongside fine-art analog and digital photography.
              </p>

              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '10px', borderRadius: '4px' }}>
                <b style={{ color: '#166534', fontSize: '12px' }}>⚡ Single-Click Navigation Enabled:</b>
                <p style={{ margin: '4px 0 0 0', color: '#14532d' }}>
                  No tedious double-clicking required! Single-clicking any desktop icon, photo thumbnail, or menu item will immediately launch the corresponding window or photo.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '3px' }}>
                  <b>📁 My Pictures</b>
                  <p style={{ margin: '2px 0 0 0', color: '#64748b' }}>Browse galleries: Landscapes, Portraits, Street, and 35mm Film.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '3px' }}>
                  <b>🔍 Picture & Fax Viewer</b>
                  <p style={{ margin: '2px 0 0 0', color: '#64748b' }}>Examine high-resolution photos with zoom, rotate, and persistent EXIF.</p>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="xp-button primary"
                  onClick={() => handleTopicClick('viewing')}
                >
                  <span>Next: Picture Viewer & EXIF ➔</span>
                </button>
              </div>
            </div>
          )}

          {activeTopic === 'viewing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Windows Picture and Fax Viewer & Persistent EXIF
              </h3>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '4px' }}>
                <b style={{ color: '#1e40af', fontSize: '12px' }}>Persistent EXIF & Camera Specs Panel:</b>
                <p style={{ margin: '4px 0 0 0', color: '#1e3a8a' }}>
                  When you open any picture, the <b>EXIF Info panel remains permanently docked and open on the right side</b>. It shows:
                </p>
                <ul style={{ margin: '6px 0 0 16px', padding: 0, color: '#1e3a8a' }}>
                  <li><b>Exposure</b>: Aperture (e.g. f/1.4), Shutter Speed (1/500s), ISO sensitivity</li>
                  <li><b>Hardware</b>: Camera Body (Leica M6, Hasselblad 500C/M), Lens Model</li>
                  <li><b>Film Stock</b>: Kodak Portra 400, Tri-X, CineStill 800T (for analog photos)</li>
                  <li><b>Location</b>: Dolomites, Tokyo, Big Sur, Scottish Highlands</li>
                  <li><b>Artist Field Notes</b>: The story and conditions behind the frame</li>
                </ul>
              </div>

              <div>
                <b>Bottom Floating Toolbar Tools:</b>
                <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                  <li><b>Zoom In / Out</b> (+ / -): Inspect micro-contrast and film grain</li>
                  <li><b>Best Fit</b> (1:1): Center and fit to screen</li>
                  <li><b>Slideshow Mode</b> (▶): Hands-free automated presentation every 3.5s</li>
                  <li><b>Rotate</b> (↷ / ↶): Turn photos 90 degrees</li>
                  <li><b>Set as Wallpaper</b> (🖥️): Turn any photograph into your desktop background!</li>
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  className="xp-button"
                  onClick={() => { onOpenApp('gallery'); onClose(); }}
                >
                  Open Gallery Now
                </button>
                <button
                  className="xp-button primary"
                  onClick={() => handleTopicClick('keyboard')}
                >
                  <span>Next: Keyboard Shortcuts ➔</span>
                </button>
              </div>
            </div>
          )}

          {activeTopic === 'keyboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Full Keyboard Navigation Shortcuts
              </h3>
              <p style={{ margin: 0 }}>
                Control your viewing experience directly from your keyboard:
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #cbd5e1' }}>
                <thead>
                  <tr style={{ background: '#ece9d8', textAlign: 'left' }}>
                    <th style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}>Shortcut</th>
                    <th style={{ padding: '6px 10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}><b>→ (Right Arrow)</b></td>
                    <td style={{ padding: '6px 10px' }}>Next photograph</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}><b>← (Left Arrow)</b></td>
                    <td style={{ padding: '6px 10px' }}>Previous photograph</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}><b>Spacebar</b></td>
                    <td style={{ padding: '6px 10px' }}>Start / Pause automated slideshow</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}><b>+ / -</b></td>
                    <td style={{ padding: '6px 10px' }}>Zoom in / Zoom out</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}><b>R</b></td>
                    <td style={{ padding: '6px 10px' }}>Rotate photo clockwise</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 10px', borderRight: '1px solid #cbd5e1' }}><b>Enter / Space</b></td>
                    <td style={{ padding: '6px 10px' }}>Open selected desktop icon</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="xp-button primary"
                  onClick={() => handleTopicClick('themes')}
                >
                  <span>Next: Themes & Wallpaper ➔</span>
                </button>
              </div>
            </div>
          )}

          {activeTopic === 'themes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Desktop Customization: Display Properties
              </h3>
              <p style={{ margin: 0 }}>
                You can customize the desktop background and color theme at any time via <b>Display Properties</b>:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}>
                  <b>Wallpapers Included:</b>
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    <li><b>Bliss</b> (Classic rolling green hills)</li>
                    <li><b>Autumn</b> (Golden fall foliage sunbeams)</li>
                    <li><b>Azul</b> (Pristine tropical ocean ripples)</li>
                    <li><b>Red Desert</b> (Cinematic sand dunes)</li>
                    <li><b>Any Portfolio Photo!</b></li>
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}>
                  <b>Color Themes:</b>
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    <li><b>Luna Blue</b> (Default vibrant blue)</li>
                    <li><b>Windows XP Silver</b> (Sleek brushed slate)</li>
                    <li><b>Olive Green</b> (Warm forest sage)</li>
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="xp-button primary"
                  onClick={() => { onOpenApp('display'); }}
                >
                  Open Display Properties Now
                </button>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="xp-button primary"
                  onClick={() => handleTopicClick('booking')}
                >
                  <span>Next: Booking & Prints ➔</span>
                </button>
              </div>
            </div>
          )}

          {activeTopic === 'booking' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Booking Shoots & Ordering Prints
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '4px' }}>
                  <b style={{ color: '#1e40af' }}>✉️ Outlook Express (Booking / Contact Wizard):</b>
                  <p style={{ margin: '4px 0 0 0', color: '#1e3a8a' }}>
                    Open <b>"Book a Shoot.msg"</b> on the desktop or Start Menu to book portrait commissions, commercial architecture, or analog weddings. Enter your project timeline and details, then hit <b>Send</b>!
                  </p>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '10px', borderRadius: '4px' }}>
                  <b style={{ color: '#1e40af' }}>🖨️ Photo Printing Wizard:</b>
                  <p style={{ margin: '4px 0 0 0', color: '#1e3a8a' }}>
                    Click <b>"Order prints online"</b> in the Explorer sidebar to launch the 3-step darkroom print wizard. Choose between <b>Hahnemühle Photo Rag</b> (100% cotton) or <b>Ilford Galerie Pearl</b> in 8x10, 11x14, 16x20, and 24x36 sizes.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="xp-button primary"
                  onClick={() => handleTopicClick('gear')}
                >
                  <span>Next: Camera Bag & Gear ➔</span>
                </button>
              </div>
            </div>
          )}

          {activeTopic === 'gear' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Camera Rig & Hardware (Device Manager)
              </h3>
              <p style={{ margin: 0 }}>
                Explore the photographer's analog cameras, optics, and film stocks in the <b>Device Manager</b> window:
              </p>
              <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
                <li><b>Leica M6 Classic (0.72x)</b> — 35mm rangefinder with Summicron 35mm f/2</li>
                <li><b>Hasselblad 500C/M</b> — 6x6 Medium Format 120 film with Carl Zeiss Planar 80mm f/2.8</li>
                <li><b>Sony α7 IV & Canon EOS R5</b> — Commercial high-speed digital workhorses</li>
                <li><b>Film Stocks</b> — Kodak Portra 400, Tri-X 400, CineStill 800T, Fujifilm Provia 100F</li>
              </ul>
              <button
                className="xp-button primary"
                onClick={() => { onOpenApp('gear'); }}
                style={{ width: 'fit-content' }}
              >
                Open Camera Rig Devices
              </button>
            </div>
          )}

          {activeTopic === 'easter' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, color: '#003399', fontSize: '14px', borderBottom: '1px solid #aca899', paddingBottom: '4px' }}>
                Audio FX, Shutter Flash & Easter Eggs
              </h3>
              <ul style={{ margin: '0 0 0 16px', padding: 0 }}>
                <li><b>📷 Camera Shutter Snapshot</b>: Click the camera icon in the taskbar or press the top right button to hear a mechanical shutter click with an onscreen camera flash!</li>
                <li><b>🔊 Web Audio Synthesizer</b>: Genuine XP clicks, error chords, and startup tones synthesized in memory. Use the speaker icon in the taskbar to mute/unmute.</li>
                <li><b>🗑️ Recycle Bin</b>: Check the desktop Recycle Bin to inspect discarded test negatives and lost lens caps.</li>
                <li><b>📝 guestbook.txt</b>: Open Notepad on the desktop to read client reviews and write your own guestbook comment.</li>
              </ul>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="xp-button primary"
                  onClick={onClose}
                >
                  Start Exploring Portfolio!
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Bottom Dialog Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderTop: '1px solid #aca899', backgroundColor: '#ece9d8' }}>
        <span style={{ fontSize: '10px', color: '#666' }}>Windows XP Portfolio Help & Support Center</span>
        <button className="xp-button primary" onClick={onClose}>
          Close Tour
        </button>
      </div>
    </div>
  );
}
