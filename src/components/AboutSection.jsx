import React, { useState } from 'react';
import { Camera, Award, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * AboutSection Component
 * Portfolio section styled like Windows XP System Properties
 */
export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" style={{ margin: '36px 0 24px 0' }}>
      <div className="xp-window" style={{ width: '100%' }}>
        {/* Titlebar */}
        <div className="xp-titlebar">
          <div className="xp-titlebar-left">
            <span>👤</span>
            <span>System Properties - Artist Biography & Exhibitions</span>
          </div>
          <div className="xp-titlebar-controls">
            <button className="xp-control-btn min" onClick={() => sounds.playClick()}>–</button>
            <button className="xp-control-btn max" onClick={() => sounds.playClick()}>□</button>
          </div>
        </div>

        {/* Tabstrip */}
        <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid #707070', padding: '6px 10px 0 10px', backgroundColor: '#ece9d8' }}>
          <button
            className="xp-button"
            style={{
              borderBottom: activeTab === 'bio' ? '1px solid #ece9d8' : '1px solid #707070',
              backgroundColor: activeTab === 'bio' ? '#ece9d8' : '#e0dcd0',
              fontWeight: activeTab === 'bio' ? 'bold' : 'normal',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              marginBottom: '-1px',
              zIndex: activeTab === 'bio' ? 2 : 1
            }}
            onClick={() => { sounds.playClick(); setActiveTab('bio'); }}
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
            onClick={() => { sounds.playClick(); setActiveTab('exhibitions'); }}
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
            onClick={() => { sounds.playClick(); setActiveTab('craft'); }}
          >
            Analog Philosophy
          </button>
        </div>

        {/* Content Body */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', minHeight: '160px', fontSize: '11px', lineHeight: 1.5 }}>
          {activeTab === 'bio' && (
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <img
                src="/avatar.jpg"
                alt="Photographer Bram"
                style={{ width: '130px', height: '130px', objectFit: 'cover', border: '2px solid #707070', borderRadius: '4px' }}
              />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <b style={{ color: '#002e7a', fontSize: '13px' }}>Fox Photography — Bram</b>
                <div style={{ color: '#666', marginBottom: '8px' }}>Visual Artist & Darkroom Printmaker</div>

                <p style={{ margin: '0 0 8px 0' }}>
                  I work at the quiet intersection of human presence, architectural form, and natural light.
                  My photographic methodology embraces deliberate, tactile craftsmanship—shooting predominantly on
                  35mm rangefinders (Leica M6) and medium format 120 cameras (Hasselblad 500C/M).
                </p>
                <p style={{ margin: 0 }}>
                  Based in Amsterdam and available internationally for editorial commissions, commercial architectural
                  assignments, portrait sessions, and bespoke darkroom fine art prints.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'exhibitions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}>
                <b style={{ color: '#003399' }}>2025 • "Granite & Fog: Dolomites on 120 Film"</b>
                <div style={{ color: '#555' }}>Galleria del Corso, Milan — Solo Exhibition</div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px' }}>
                <b style={{ color: '#003399' }}>2024 • "Tokyo After Twilight"</b>
                <div style={{ color: '#555' }}>Shinjuku Arts Hub, Tokyo — Curated Group Show</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginTop: '4px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '6px' }}>
                  🏆 <b>LensCulture</b> — Emerging Talent Award
                </div>
                <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', padding: '6px' }}>
                  🏆 <b>Sony World Photo Awards</b> — Shortlist (Landscape)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'craft' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <b style={{ color: '#002e7a', fontSize: '12px' }}>The Intentional Rhythm of Analog Film</b>
              <p style={{ margin: 0 }}>
                With only 12 exposures per roll on a 6x6 medium-format Hasselblad or 36 frames on a 35mm Leica,
                each shutter actuation is a thoughtful commitment. The physical grain of silver halide crystals
                imparts three-dimensional depth, luminous highlight roll-offs, and timeless emotional authenticity.
              </p>
              <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', padding: '8px', marginTop: '4px' }}>
                <b>Archival Print Standards:</b> All collector prints are produced on 310gsm 100% cotton rag archival paper
                with 12-color pigment inks, rated for 100+ years lightfastness without fading.
              </div>
            </div>
          )}
        </div>

        {/* Statusbar */}
        <div className="xp-statusbar">
          <div className="xp-status-pane" style={{ flex: 1 }}>
            <span>Artist Properties: Ready for commissions & gallery loans</span>
          </div>
        </div>
      </div>
    </section>
  );
}
