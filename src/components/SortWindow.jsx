import React, { useState } from 'react';
import { GEAR_LIST } from '../data/photosData';
import { SITE_BACKGROUNDS } from './Navbar';
import { 
  Filter, 
  ArrowUpDown, 
  Search, 
  Camera, 
  Info, 
  Sparkles, 
  Layers, 
  Calendar,
  Grid,
  List,
  Check,
  Minimize2,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * SortWindow Component
 * Authentic Windows XP window containing:
 * - Sorting controls (Date, Title, Camera, Aperture)
 * - Film & Sensor medium format filters (35mm, 120, Digital)
 * - Live search input
 * - Background Wallpaper Selector (Nyan Cat, 90s Space, Win95 Teal, Bliss, etc.)
 * - Photographer biography & camera gear information tabs
 */
export default function SortWindow({
  cameraFilter = 'all',
  onSelectCameraFilter = () => {},
  sortBy = 'date-desc',
  onSelectSortBy = () => {},
  searchTerm = '',
  onSearchChange = () => {},
  currentBg = 'xp-blue',
  onSelectBg = () => {},
  totalPhotos = 12,
  filteredCount = 12
}) {
  const [activeTab, setActiveTab] = useState('sort'); // sort, wallpaper, info, gear, guide
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleTabChange = (tab) => {
    sounds.playClick();
    setActiveTab(tab);
  };

  return (
    <div id="sort-info" style={{ margin: '24px 0 20px 0' }}>
      <div className="xp-window" style={{ width: '100%' }}>
        {/* Windows XP Window Titlebar */}
        <div className="xp-titlebar">
          <div className="xp-titlebar-left">
            <span style={{ fontSize: '14px' }}>📁</span>
            <span>My Pictures - Sorting & Information Center</span>
          </div>

          <div className="xp-titlebar-controls">
            <button
              type="button"
              className="xp-control-btn min"
              title={isCollapsed ? 'Expand Window' : 'Minimize Window'}
              onClick={() => {
                sounds.playClick();
                setIsCollapsed(!isCollapsed);
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{isCollapsed ? '+' : '–'}</span>
            </button>
            <button
              type="button"
              className="xp-control-btn max"
              title="Full Window"
              onClick={() => sounds.playClick()}
            >
              <span style={{ fontSize: '10px' }}>□</span>
            </button>
          </div>
        </div>

        {/* Menubar */}
        <div className="xp-menubar">
          <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>F</u>ile</span>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>E</u>dit</span>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>V</u>iew</span>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>F</u>avorites</span>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>T</u>ools</span>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>H</u>elp</span>
        </div>

        {!isCollapsed && (
          <>
            {/* Windows XP Tabstrip */}
            <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid #707070', padding: '6px 10px 0 10px', backgroundColor: '#ece9d8', overflowX: 'auto' }}>
              <button
                className="xp-button"
                style={{
                  borderBottom: activeTab === 'sort' ? '1px solid #ece9d8' : '1px solid #707070',
                  backgroundColor: activeTab === 'sort' ? '#ece9d8' : '#e0dcd0',
                  fontWeight: activeTab === 'sort' ? 'bold' : 'normal',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  marginBottom: '-1px',
                  zIndex: activeTab === 'sort' ? 2 : 1
                }}
                onClick={() => handleTabChange('sort')}
              >
                <Filter size={12} color="#0054e3" />
                <span>Sort & Filters ({filteredCount})</span>
              </button>

              <button
                className="xp-button"
                style={{
                  borderBottom: activeTab === 'wallpaper' ? '1px solid #ece9d8' : '1px solid #707070',
                  backgroundColor: activeTab === 'wallpaper' ? '#ece9d8' : '#e0dcd0',
                  fontWeight: activeTab === 'wallpaper' ? 'bold' : 'normal',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  marginBottom: '-1px',
                  zIndex: activeTab === 'wallpaper' ? 2 : 1
                }}
                onClick={() => handleTabChange('wallpaper')}
              >
                <ImageIcon size={12} color="#dc2626" />
                <span>🎨 Wallpapers (Nyan Cat & 90s)</span>
              </button>

              <button
                className="xp-button"
                style={{
                  borderBottom: activeTab === 'info' ? '1px solid #ece9d8' : '1px solid #707070',
                  backgroundColor: activeTab === 'info' ? '#ece9d8' : '#e0dcd0',
                  fontWeight: activeTab === 'info' ? 'bold' : 'normal',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  marginBottom: '-1px',
                  zIndex: activeTab === 'info' ? 2 : 1
                }}
                onClick={() => handleTabChange('info')}
              >
                <Info size={12} color="#0054e3" />
                <span>About Fox</span>
              </button>

              <button
                className="xp-button"
                style={{
                  borderBottom: activeTab === 'gear' ? '1px solid #ece9d8' : '1px solid #707070',
                  backgroundColor: activeTab === 'gear' ? '#ece9d8' : '#e0dcd0',
                  fontWeight: activeTab === 'gear' ? 'bold' : 'normal',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  marginBottom: '-1px',
                  zIndex: activeTab === 'gear' ? 2 : 1
                }}
                onClick={() => handleTabChange('gear')}
              >
                <Camera size={12} color="#0054e3" />
                <span>Camera Rig</span>
              </button>

              <button
                className="xp-button"
                style={{
                  borderBottom: activeTab === 'guide' ? '1px solid #ece9d8' : '1px solid #707070',
                  backgroundColor: activeTab === 'guide' ? '#ece9d8' : '#e0dcd0',
                  fontWeight: activeTab === 'guide' ? 'bold' : 'normal',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  marginBottom: '-1px',
                  zIndex: activeTab === 'guide' ? 2 : 1
                }}
                onClick={() => handleTabChange('guide')}
              >
                <Sparkles size={12} color="#2e7d32" />
                <span>Fullscreen Tips</span>
              </button>
            </div>

            {/* Window Content Body */}
            <div style={{ backgroundColor: '#ffffff', padding: '16px', minHeight: '130px' }}>
              {/* TAB 1: SORT & MEDIUM FILTERS */}
              {activeTab === 'sort' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Row: Medium Format Pills & Sort Dropdown */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Camera Medium */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 'bold', color: '#002e7a' }}>Film / Sensor:</span>
                      <button
                        className={`xp-button ${cameraFilter === 'all' ? 'primary' : ''}`}
                        onClick={() => { sounds.playClick(); onSelectCameraFilter('all'); }}
                      >
                        All Media ({totalPhotos})
                      </button>
                      <button
                        className={`xp-button ${cameraFilter === 'analog' ? 'primary' : ''}`}
                        onClick={() => { sounds.playClick(); onSelectCameraFilter('analog'); }}
                      >
                        🎞️ 35mm Analog (Leica / Nikon)
                      </button>
                      <button
                        className={`xp-button ${cameraFilter === 'medium' ? 'primary' : ''}`}
                        onClick={() => { sounds.playClick(); onSelectCameraFilter('medium'); }}
                      >
                        📷 Medium Format 120 (Hasselblad)
                      </button>
                      <button
                        className={`xp-button ${cameraFilter === 'digital' ? 'primary' : ''}`}
                        onClick={() => { sounds.playClick(); onSelectCameraFilter('digital'); }}
                      >
                        ⚡ Full-Frame Digital (Sony / Canon)
                      </button>
                    </div>

                    {/* Sort Order Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 'bold', color: '#002e7a' }}>Sort By:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          sounds.playClick();
                          onSelectSortBy(e.target.value);
                        }}
                        style={{
                          height: '24px',
                          border: '1px solid #7f9db9',
                          fontFamily: 'Tahoma, sans-serif',
                          fontSize: '11px',
                          padding: '2px 6px'
                        }}
                      >
                        <option value="date-desc">Newest Captured First</option>
                        <option value="date-asc">Oldest Captured First</option>
                        <option value="title-asc">Title (A &rarr; Z)</option>
                        <option value="camera-asc">Camera Body Model</option>
                        <option value="aperture-asc">Aperture (Widest f-number)</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Box */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #d4d0c8', paddingTop: '10px' }}>
                    <Search size={14} color="#0054e3" />
                    <span style={{ fontWeight: 'bold', color: '#444' }}>Live Search:</span>
                    <input
                      type="text"
                      placeholder="Type keyword, camera model, or location..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      style={{
                        flex: 1,
                        height: '24px',
                        border: '1px solid #7f9db9',
                        padding: '2px 8px',
                        fontFamily: 'Tahoma, sans-serif',
                        fontSize: '11px',
                        outline: 'none'
                      }}
                    />
                    {searchTerm && (
                      <button
                        className="xp-button"
                        onClick={() => { sounds.playClick(); onSearchChange(''); }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: WALLPAPER SWITCHER */}
              {activeTab === 'wallpaper' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <b style={{ color: '#002e7a', fontSize: '12px' }}>Choose Website Wallpaper Background:</b>
                    <p style={{ margin: '4px 0 10px 0', color: '#555', fontSize: '11px' }}>
                      Click any background below to switch the website theme instantly!
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                    {SITE_BACKGROUNDS.map((bg) => {
                      const isSelected = currentBg === bg.id;
                      return (
                        <div
                          key={bg.id}
                          onClick={() => {
                            sounds.playStartup();
                            onSelectBg(bg.id);
                          }}
                          style={{
                            border: isSelected ? '2px solid #0054e3' : '1px solid #aca899',
                            boxShadow: isSelected ? '0 0 8px rgba(0, 84, 227, 0.6)' : '1px 2px 4px rgba(0,0,0,0.15)',
                            borderRadius: '4px',
                            padding: '6px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#d6dff7' : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.1s ease'
                          }}
                        >
                          {/* Mini Thumbnail */}
                          <div
                            style={{
                              width: '46px',
                              height: '32px',
                              borderRadius: '2px',
                              backgroundColor: bg.type === 'color' ? bg.value : '#000',
                              backgroundImage: bg.type === 'image' ? `url(${bg.value})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              border: '1px solid #707070',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: isSelected ? 'bold' : 'normal', color: isSelected ? '#002e7a' : '#000000', fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {bg.name}
                            </div>
                            <div style={{ fontSize: '9px', color: '#666' }}>
                              {isSelected ? '✓ Active Wallpaper' : 'Click to Apply'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: ABOUT FOX */}
              {activeTab === 'info' && (
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', lineHeight: 1.5 }}>
                  <img
                    src="/avatar.jpg"
                    alt="Fox"
                    style={{ width: '90px', height: '90px', objectFit: 'cover', border: '1px solid #707070', borderRadius: '3px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <b style={{ color: '#002e7a', fontSize: '12px' }}>Fox — Independent Visual Photographer</b>
                    <p style={{ margin: '4px 0 8px 0', color: '#333' }}>
                      Specializing in documentary, architectural lines, and portraiture on analog film.
                      Using both 35mm rangefinders and 120 medium format, each image is developed with archival care.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '2px 6px', color: '#166534' }}>
                        🏆 LensCulture Emerging Talent
                      </span>
                      <span style={{ background: '#eff6ff', border: '1px solid #93c5fd', padding: '2px 6px', color: '#1e40af' }}>
                        🏆 Sony World Photography Awards Shortlist
                      </span>
                      <span style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '2px 6px', color: '#92400e' }}>
                        📰 Aperture & British Journal of Photography
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CAMERA GEAR SPECS */}
              {activeTab === 'gear' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '11px' }}>
                  {GEAR_LIST.map((group) => (
                    <div key={group.category} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '3px' }}>
                      <b style={{ color: '#002e7a' }}>{group.category}</b>
                      <ul style={{ margin: '4px 0 0 14px', padding: 0 }}>
                        {group.items.map((item) => (
                          <li key={item.name} style={{ margin: '2px 0' }}>
                            <b>{item.name}</b> {item.type ? `(${item.type})` : ''}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: HOW TO USE / FULLSCREEN GUIDE */}
              {activeTab === 'guide' && (
                <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '10px', borderRadius: '4px', fontSize: '11px', lineHeight: 1.5 }}>
                  <b style={{ color: '#166534', fontSize: '12px' }}>
                    🖼️ Fullscreen Picture Viewer Features:
                  </b>
                  <ul style={{ margin: '6px 0 0 16px', padding: 0, color: '#14532d' }}>
                    <li><b>Click any image below</b> to instantly launch the high-resolution <b>Windows Picture and Fax Viewer</b> in full-screen.</li>
                    <li><b>Persistent EXIF drawer</b> displays camera model, lens, exposure (f-stop, shutter, ISO), and artist notes.</li>
                    <li><b>Keyboard shortcuts</b>: Use <b>&larr; / &rarr;</b> arrow keys to move between photos, <b>Spacebar</b> for slideshow, <b>+ / -</b> to zoom, and <b>Esc</b> to close!</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Status Pane */}
            <div className="xp-statusbar">
              <div className="xp-status-pane" style={{ flex: 1 }}>
                <span>
                  Showing <b>{filteredCount}</b> of {totalPhotos} photographs • Wallpaper: <b>{SITE_BACKGROUNDS.find(b => b.id === currentBg)?.name || currentBg}</b> • Single-click any photo to view Fullscreen!
                </span>
              </div>
              <div className="xp-status-pane" style={{ minWidth: '160px' }}>
                <span>⚡ Fullscreen Viewer Enabled</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
