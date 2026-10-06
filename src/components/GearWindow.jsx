import React, { useState } from 'react';
import { GEAR_LIST } from '../data/photosData';
import { Camera, ChevronRight, ChevronDown, Check, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * GearWindow Component
 * Styled after Windows XP "Device Manager"
 * Displays camera bag, lenses, and film stocks in a tree view with hardware property pane.
 */
export default function GearWindow() {
  const [expandedSections, setExpandedSections] = useState({
    'Primary Camera Bodies': true,
    'Lenses & Prime Optics': true,
    'Favorite Film Stocks': true
  });
  const [selectedItem, setSelectedItem] = useState(GEAR_LIST[0].items[0]);

  const toggleSection = (cat) => {
    sounds.playClick();
    setExpandedSections((prev) => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const handleSelectItem = (item) => {
    sounds.playClick();
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ece9d8' }}>
      {/* Top Device Manager Bar */}
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #aca899', fontSize: '11px', color: '#333' }}>
        <span>Hardware Devices attached to <b>Photographer Rig (WORKSTATION-XP)</b></span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left: Device Tree View */}
        <div
          style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #707070',
            padding: '8px',
            overflowY: 'auto',
            fontSize: '11px'
          }}
        >
          {GEAR_LIST.map((group) => {
            const isExpanded = !!expandedSections[group.category];
            return (
              <div key={group.category} style={{ marginBottom: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#002e7a'
                  }}
                  onClick={() => toggleSection(group.category)}
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>📁 {group.category}</span>
                </div>

                {isExpanded && (
                  <div style={{ marginLeft: '18px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {group.items.map((item) => {
                      const isSelected = selectedItem?.name === item.name;
                      return (
                        <div
                          key={item.name}
                          onClick={() => handleSelectItem(item)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '3px 6px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#316ac5' : 'transparent',
                            color: isSelected ? '#ffffff' : '#000000',
                            borderRadius: '2px'
                          }}
                        >
                          <span>📸</span>
                          <span>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Device Properties Panel */}
        <div style={{ flex: 1, padding: '14px', backgroundColor: '#ece9d8', overflowY: 'auto', fontSize: '11px' }}>
          {selectedItem ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #aca899', paddingBottom: '8px' }}>
                <span style={{ fontSize: '28px' }}>📷</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '13px', color: '#003399' }}>{selectedItem.name}</h3>
                  <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>Device Status: This device is working properly.</span>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '10px', borderRadius: '3px' }}>
                <b>Hardware Specifications:</b>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {selectedItem.type && <div><b>Device Type:</b> {selectedItem.type}</div>}
                  {selectedItem.mount && <div><b>Lens Mount:</b> {selectedItem.mount}</div>}
                  {selectedItem.format && <div><b>Film Format:</b> {selectedItem.format}</div>}
                  {selectedItem.year && <div><b>Manufacture Year:</b> {selectedItem.year}</div>}
                  {selectedItem.status && <div><b>Assignment:</b> {selectedItem.status}</div>}
                  {selectedItem.desc && <div><b>Optical Rendering:</b> {selectedItem.desc}</div>}
                  {selectedItem.note && <div><b>Tone Profile:</b> {selectedItem.note}</div>}
                  <div><b>Driver Provider:</b> Mechanical Shutter & Zeiss / Leica Precision Glass</div>
                  <div><b>Driver Date:</b> 10/25/2001 (Authentic Classic Vintage)</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid #aca899', padding: '8px' }}>
                <b>Troubleshooting Note:</b>
                <p style={{ margin: '4px 0 0 0', color: '#555' }}>
                  If you require high-speed synchronization or analog push-processing (+1 / +2 stops),
                  contact the photographer directly for custom shoot calibrations.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ color: '#666', fontStyle: 'italic' }}>Select a camera or optic from the list to view specifications.</div>
          )}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '8px 12px', borderTop: '1px solid #aca899' }}>
        <button className="xp-button primary" onClick={() => sounds.playClick()}>
          Properties
        </button>
        <button className="xp-button" onClick={() => sounds.playClick()}>
          Close
        </button>
      </div>
    </div>
  );
}
