import React, { useState } from 'react';
import { Camera, Award, BookOpen, Mail, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * AboutWindow Component
 * Styled after Windows XP "System Properties" with tabbed navigation:
 * - General (Artist Bio & Portrait)
 * - Exhibitions & Awards
 * - Philosophy & Analog Craft
 */
export default function AboutWindow({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('general');

  const handleTabChange = (tab) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ece9d8', padding: '10px' }}>
      {/* Windows XP Tabstrip */}
      <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid #707070', paddingLeft: '6px' }}>
        <button
          className="xp-button"
          style={{
            borderBottom: activeTab === 'general' ? '1px solid #ece9d8' : '1px solid #707070',
            backgroundColor: activeTab === 'general' ? '#ece9d8' : '#e0dcd0',
            fontWeight: activeTab === 'general' ? 'bold' : 'normal',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginBottom: '-1px',
            zIndex: activeTab === 'general' ? 2 : 1
          }}
          onClick={() => handleTabChange('general')}
        >
          General Bio
        </button>

        <button
          className="xp-button"
          style={{
            borderBottom: activeTab === 'exhibitions' ? '1px solid #ece9d8' : '1px solid #707070',
            backgroundColor: activeTab === 'exhibitions' ? '#ece9d8' : '#e0dcd0',
            fontWeight: activeTab === 'exhibitions' ? 'bold' : 'normal',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginBottom: '-1px',
            zIndex: activeTab === 'exhibitions' ? 2 : 1
          }}
          onClick={() => handleTabChange('exhibitions')}
        >
          Exhibitions & Awards
        </button>

        <button
          className="xp-button"
          style={{
            borderBottom: activeTab === 'craft' ? '1px solid #ece9d8' : '1px solid #707070',
            backgroundColor: activeTab === 'craft' ? '#ece9d8' : '#e0dcd0',
            fontWeight: activeTab === 'craft' ? 'bold' : 'normal',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            marginBottom: '-1px',
            zIndex: activeTab === 'craft' ? 2 : 1
          }}
          onClick={() => handleTabChange('craft')}
        >
          Analog Philosophy
        </button>
      </div>

      {/* Tab Panel Body */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#ece9d8',
          border: '1px solid #ffffff',
          borderRightColor: '#707070',
          borderBottomColor: '#707070',
          padding: '16px',
          overflowY: 'auto'
        }}
      >
        {activeTab === 'general' && (
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Left: Photographer Portrait */}
            <div style={{ width: '150px', flexShrink: 0, textAlign: 'center' }}>
              <img
                src="/avatar.jpg"
                alt="Fox Photography"
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'cover',
                  border: '2px solid #707070',
                  boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                  borderRadius: '3px'
                }}
              />
              <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#002e7a' }}>Fox</div>
              <div style={{ fontSize: '10px', color: '#555' }}>Independent Photographer</div>
              <div style={{ fontSize: '10px', color: '#555' }}>Amsterdam & Global</div>
            </div>

            {/* Right: Bio & Background */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', lineHeight: 1.5 }}>
              <div>
                <b style={{ color: '#002e7a', fontSize: '12px' }}>Windows XP Professional - Photography Edition</b>
                <div style={{ color: '#666', fontSize: '10px' }}>Version 2026 (Service Pack 3)</div>
              </div>

              <div style={{ borderTop: '1px solid #aca899', paddingTop: '8px' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  Welcome! I am an independent documentary, portrait, and fine-art landscape photographer.
                  My visual work investigates the quiet intersections of natural topography, urban geometry, and fleeting human gestures.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  Trained across classical darkroom developing and modern high-resolution digital imaging,
                  I operate both 35mm rangefinders (Leica M6), medium-format 120 cameras (Hasselblad 500C/M),
                  and modern mirrorless platforms.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '8px', borderRadius: '3px' }}>
                <b>Available Commissions:</b>
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  <li>Editorial & Lifestyle Portrait Sessions</li>
                  <li>Architectural & Commercial Spaces</li>
                  <li>Analog 35mm & 120 Darkroom Fine-Art Prints</li>
                  <li>Documentary & Travel Expeditions</li>
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="xp-button primary"
                  onClick={() => {
                    sounds.playPop();
                    onOpenContact && onOpenContact();
                  }}
                >
                  <Mail size={13} />
                  <span>Send Booking Inquiry...</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exhibitions' && (
          <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 'bold', color: '#002e7a', fontSize: '12px' }}>
              Selected Solo & Group Exhibitions
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#003399' }}>2025 • "Granite & Fog: Dolomites on 120 Film"</div>
                <div style={{ color: '#555' }}>Galleria del Corso, Milan — Solo Exhibition</div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#003399' }}>2024 • "Tokyo After Twilight"</div>
                <div style={{ color: '#555' }}>Shinjuku Arts Hub, Tokyo — Curated Group Show</div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '8px' }}>
                <div style={{ fontWeight: 'bold', color: '#003399' }}>2023 • "Silent Horizons: Nordic Solitude"</div>
                <div style={{ color: '#555' }}>Reykjavik Center for Contemporary Photography</div>
              </div>
            </div>

            <div style={{ fontWeight: 'bold', color: '#002e7a', fontSize: '12px', marginTop: '6px' }}>
              Honors & Featured In
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '6px' }}>
                🏆 <b>LensCulture</b> — Emerging Talent Award
              </div>
              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '6px' }}>
                🏆 <b>Sony World Photography Awards</b> — Shortlist (Landscape)
              </div>
              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '6px' }}>
                📰 <b>Aperture Magazine</b> — Featured Portfolio
              </div>
              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '6px' }}>
                📰 <b>British Journal of Photography</b> — Interview
              </div>
            </div>
          </div>
        )}

        {activeTab === 'craft' && (
          <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: 'bold', color: '#002e7a', fontSize: '12px' }}>
              The Slow Craft of Analog Film
            </div>
            <p style={{ margin: 0 }}>
              In an age of instant digital burst-rates and algorithmic perfection, analog film demands intention.
              With only 12 exposures per roll on a medium format 6x6 Hasselblad or 36 frames on a 35mm Leica,
              each release of the shutter is a deliberate decision.
            </p>
            <p style={{ margin: 0 }}>
              The organic silver halide crystal structure gives film its characteristic tonality—smooth highlight roll-offs,
              true chromatic warmth, and physical grain that gives life and soul to photographs.
            </p>

            <div style={{ background: '#fff', border: '1px solid #aca899', padding: '10px', marginTop: '6px' }}>
              <b>Archival Quality Guarantee:</b>
              <p style={{ margin: '4px 0 0 0', color: '#444' }}>
                All prints are produced on 310gsm 100% cotton rag archival paper using 12-color pigment inks,
                certified for 100+ years lightfastness without fading under museum glass.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Dialog Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
        <button className="xp-button primary" onClick={() => sounds.playClick()}>
          OK
        </button>
        <button className="xp-button" onClick={() => sounds.playClick()}>
          Cancel
        </button>
        <button className="xp-button" onClick={() => sounds.playClick()}>
          Apply
        </button>
      </div>
    </div>
  );
}
