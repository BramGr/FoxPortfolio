import React from 'react';
import { Shield, HardDrive, Camera, Sparkles } from 'lucide-react';

/**
 * Footer Component
 * Classic Windows XP Status Bar at the bottom of the portfolio page
 */
export default function Footer({ totalPhotos = 12 }) {
  return (
    <footer className="xp-statusbar" style={{ marginTop: 'auto', borderTop: '2px solid #002e7a' }}>
      {/* Left Pane */}
      <div className="xp-status-pane" style={{ flex: 1 }}>
        <span>
          © 2026 <b>Fox Photography</b> • Fine Art, Documentary & Editorial
        </span>
      </div>

      {/* Middle Pane */}
      <div className="xp-status-pane" style={{ minWidth: '160px' }}>
        <Camera size={12} color="#0054e3" />
        <span>{totalPhotos} Works Published</span>
      </div>

      {/* Right Pane */}
      <div className="xp-status-pane" style={{ minWidth: '180px' }}>
        <Shield size={12} color="#2e7d32" />
        <span>Windows XP • Photography Edition</span>
      </div>
    </footer>
  );
}
