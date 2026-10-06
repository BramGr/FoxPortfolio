import React from 'react';
import { sounds } from '../utils/soundEffects';

/**
 * DesktopIcon Component
 * Clickable Windows XP desktop shortcut configured for single-click opening
 * with responsive hover and focus feedback.
 */
export default function DesktopIcon({
  id,
  title,
  icon,
  isSelected,
  onSelect,
  onOpen
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    sounds.playPop();
    onSelect(id);
    onOpen(id);
  };

  return (
    <div
      className={`xp-desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      tabIndex={0}
      title={`Click to open ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
    >
      <div className="icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('.')) ? (
          <img src={icon} alt="" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
        ) : (
          <span style={{ fontSize: '38px', lineHeight: 1 }}>{icon}</span>
        )}
      </div>
      <span>{title}</span>
    </div>
  );
}
