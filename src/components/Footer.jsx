import React from 'react';
import { HardDrive, CheckCircle2, Shield, Camera } from 'lucide-react';

/**
 * Footer Component
 * Serves as the classic Windows XP Status Bar for open windows and explorers,
 * displaying file counts, selection sizes, disk space, and security zone status.
 */
export default function Footer({
  itemCount = 0,
  selectedItem = null,
  totalSize = '168 MB',
  freeDiskSpace = '84.2 GB free',
  statusText = '',
  zone = 'My Computer'
}) {
  return (
    <footer className="xp-statusbar" role="status">
      {/* Left Pane: Object status or custom message */}
      <div className="xp-status-pane" style={{ flex: 1, overflow: 'hidden' }}>
        {statusText ? (
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {statusText}
          </span>
        ) : selectedItem ? (
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            1 object(s) selected: <b>{selectedItem.title}</b> ({selectedItem.fileSize || '12 MB'})
          </span>
        ) : (
          <span>
            {itemCount} objects ({totalSize})
          </span>
        )}
      </div>

      {/* Middle Pane: Camera / Disk space indicator */}
      <div className="xp-status-pane" style={{ minWidth: '130px' }}>
        <HardDrive size={12} color="#0054e3" />
        <span>{freeDiskSpace}</span>
      </div>

      {/* Right Pane: Security Zone / OS Environment */}
      <div className="xp-status-pane" style={{ minWidth: '115px' }}>
        <Shield size={12} color="#2e7d32" />
        <span>{zone}</span>
      </div>
    </footer>
  );
}
