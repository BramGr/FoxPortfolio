import React from 'react';
import { Minus, Square, X, RotateCcw, ArrowLeft, ArrowRight, ArrowUp, Search, Folder, Grid, List, Film } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * Window Header & Titlebar Component
 * Provides authentic Windows XP Luna styling with title, icon, draggable bar,
 * minimize, maximize/restore, and red close button.
 * Optionally renders the Explorer Menu bar, Action Toolbar, and Address bar.
 */
export default function Header({
  title,
  icon,
  windowId,
  isMaximized,
  isFocused,
  onMinimize,
  onMaximize,
  onClose,
  onMouseDown,
  showExplorerBars = false,
  viewMode = 'thumbnails',
  onViewModeChange = () => {},
  currentPath = 'C:\\Documents and Settings\\Photographer\\My Documents\\My Pictures\\Portfolio',
  onBack,
  onForward,
  canGoBack = false,
  canGoForward = false,
  searchTerm = '',
  onSearchChange = () => {}
}) {
  const handleControlClick = (e, action) => {
    e.stopPropagation();
    sounds.playClick();
    action();
  };

  return (
    <div className="xp-header-container">
      {/* Main XP Window Titlebar */}
      <div 
        className={`xp-titlebar ${isFocused ? 'focused' : 'inactive'}`}
        onMouseDown={onMouseDown}
        onDoubleClick={() => onMaximize(windowId)}
      >
        <div className="xp-titlebar-left">
          {typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('.')) ? (
            <img src={icon} alt="" className="xp-titlebar-icon" />
          ) : (
            <span style={{ fontSize: '14px', lineHeight: 1 }}>{icon || '🗂️'}</span>
          )}
          <span style={{ userSelect: 'none' }}>{title}</span>
        </div>

        <div className="xp-titlebar-controls" onMouseDown={(e) => e.stopPropagation()}>
          {/* Minimize Button */}
          <button
            type="button"
            className="xp-control-btn min"
            title="Minimize"
            aria-label="Minimize"
            onClick={(e) => handleControlClick(e, () => onMinimize(windowId))}
          >
            <Minus size={11} strokeWidth={3} />
          </button>

          {/* Maximize / Restore Button */}
          <button
            type="button"
            className="xp-control-btn max"
            title={isMaximized ? 'Restore Down' : 'Maximize'}
            aria-label={isMaximized ? 'Restore Down' : 'Maximize'}
            onClick={(e) => handleControlClick(e, () => onMaximize(windowId))}
          >
            {isMaximized ? (
              <span style={{ fontSize: '10px', lineHeight: 1, fontWeight: 'bold' }}>❐</span>
            ) : (
              <Square size={10} strokeWidth={2.5} />
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            className="xp-control-btn close"
            title="Close"
            aria-label="Close"
            onClick={(e) => handleControlClick(e, () => onClose(windowId))}
          >
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Optional Explorer Header Bars: Menubar, Toolbar & Address bar */}
      {showExplorerBars && (
        <div className="xp-explorer-header-section" onMouseDown={(e) => e.stopPropagation()}>
          {/* Menubar */}
          <div className="xp-menubar">
            <span className="xp-menu-item"><u>F</u>ile</span>
            <span className="xp-menu-item"><u>E</u>dit</span>
            <span className="xp-menu-item"><u>V</u>iew</span>
            <span className="xp-menu-item">F<u>a</u>vorites</span>
            <span className="xp-menu-item"><u>T</u>ools</span>
            <span className="xp-menu-item"><u>H</u>elp</span>
          </div>

          {/* Standard Buttons Toolbar */}
          <div className="xp-toolbar">
            <button
              className="xp-tool-btn"
              disabled={!canGoBack}
              style={{ opacity: canGoBack ? 1 : 0.5 }}
              onClick={() => { sounds.playClick(); onBack && onBack(); }}
            >
              <ArrowLeft size={14} color={canGoBack ? '#2d7a2d' : '#888'} />
              <span>Back</span>
            </button>

            <button
              className="xp-tool-btn"
              disabled={!canGoForward}
              style={{ opacity: canGoForward ? 1 : 0.5 }}
              onClick={() => { sounds.playClick(); onForward && onForward(); }}
            >
              <ArrowRight size={14} color={canGoForward ? '#2d7a2d' : '#888'} />
            </button>

            <button 
              className="xp-tool-btn"
              onClick={() => sounds.playClick()}
            >
              <ArrowUp size={14} color="#0054e3" />
            </button>

            <div className="xp-tool-divider" />

            <button 
              className="xp-tool-btn"
              onClick={() => sounds.playClick()}
            >
              <Search size={14} color="#0054e3" />
              <span>Search</span>
            </button>

            <button 
              className="xp-tool-btn"
              onClick={() => sounds.playClick()}
            >
              <Folder size={14} color="#d4a017" />
              <span>Folders</span>
            </button>

            <div className="xp-tool-divider" />

            {/* View Mode Dropdown Buttons */}
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              <button
                className={`xp-tool-btn ${viewMode === 'thumbnails' ? 'active' : ''}`}
                title="Thumbnails View"
                onClick={() => { sounds.playClick(); onViewModeChange('thumbnails'); }}
              >
                <Grid size={13} color="#0054e3" />
                <span>Thumbnails</span>
              </button>

              <button
                className={`xp-tool-btn ${viewMode === 'filmstrip' ? 'active' : ''}`}
                title="Filmstrip View"
                onClick={() => { sounds.playClick(); onViewModeChange('filmstrip'); }}
              >
                <Film size={13} color="#c2410c" />
                <span>Filmstrip</span>
              </button>

              <button
                className={`xp-tool-btn ${viewMode === 'details' ? 'active' : ''}`}
                title="Details View"
                onClick={() => { sounds.playClick(); onViewModeChange('details'); }}
              >
                <List size={13} color="#0054e3" />
                <span>Details</span>
              </button>
            </div>
          </div>

          {/* Address Bar */}
          <div className="xp-addressbar">
            <span style={{ color: '#555', fontWeight: 'bold' }}>Address</span>
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                className="xp-address-input"
                value={currentPath}
                readOnly
              />
            </div>
            
            {/* Quick Search inside folder */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input 
                type="text"
                placeholder="Filter photos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  height: '20px',
                  fontSize: '11px',
                  padding: '1px 5px',
                  border: '1px solid #7f9db9',
                  borderRadius: '2px',
                  width: '120px'
                }}
              />
            </div>

            <button
              className="xp-button"
              style={{ padding: '1px 6px', height: '21px', minWidth: '32px' }}
              onClick={() => sounds.playClick()}
            >
              <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>➔ Go</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
