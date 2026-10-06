import React, { useState, useEffect } from 'react';
import { PORTFOLIO_PHOTOS } from '../data/photosData';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  RotateCw, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Printer, 
  Trash2, 
  Download, 
  Info,
  X,
  Monitor,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * PictureViewer Component
 * Faithful recreation of the iconic "Windows Picture and Fax Viewer"
 * Updated features:
 * - Persistent EXIF / Info panel OPEN by default
 * - Direct "Set as Desktop Background" button
 * - Keyboard navigation (Left, Right, Space, Zoom, Escape)
 * - Single-click controls
 */
export default function PictureViewer({
  currentPhoto = null,
  isOpen = false,
  isSlideshowInitial = false,
  onClose = () => {},
  onSelectPhoto = () => {},
  onSetWallpaper = () => {}
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(isSlideshowInitial);
  // KEPT OPEN BY DEFAULT as requested
  const [showExifDrawer, setShowExifDrawer] = useState(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  // Sync index with currentPhoto prop
  useEffect(() => {
    if (currentPhoto) {
      const idx = PORTFOLIO_PHOTOS.findIndex((p) => p.id === currentPhoto.id);
      if (idx !== -1) setPhotoIndex(idx);
    }
  }, [currentPhoto]);

  useEffect(() => {
    setIsSlideshow(isSlideshowInitial);
  }, [isSlideshowInitial]);

  const activePhoto = PORTFOLIO_PHOTOS[photoIndex] || PORTFOLIO_PHOTOS[0];

  // Auto-advancing slideshow timer
  useEffect(() => {
    let interval = null;
    if (isSlideshow) {
      interval = setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, photoIndex]);

  // Reset zoom & rotation on photo change
  const resetTransform = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleNext = () => {
    sounds.playClick();
    resetTransform();
    const nextIdx = (photoIndex + 1) % PORTFOLIO_PHOTOS.length;
    setPhotoIndex(nextIdx);
    onSelectPhoto(PORTFOLIO_PHOTOS[nextIdx]);
  };

  const handlePrev = () => {
    sounds.playClick();
    resetTransform();
    const prevIdx = (photoIndex - 1 + PORTFOLIO_PHOTOS.length) % PORTFOLIO_PHOTOS.length;
    setPhotoIndex(prevIdx);
    onSelectPhoto(PORTFOLIO_PHOTOS[prevIdx]);
  };

  const handleZoomIn = () => {
    sounds.playClick();
    setZoomLevel((z) => Math.min(3, z + 0.25));
  };

  const handleZoomOut = () => {
    sounds.playClick();
    setZoomLevel((z) => Math.max(0.5, z - 0.25));
  };

  const handleRotateCw = () => {
    sounds.playClick();
    setRotation((r) => (r + 90) % 360);
  };

  const handleRotateCcw = () => {
    sounds.playClick();
    setRotation((r) => (r - 90 + 360) % 360);
  };

  const handleBestFit = () => {
    sounds.playClick();
    resetTransform();
  };

  const toggleSlideshow = () => {
    sounds.playPop();
    setIsSlideshow(!isSlideshow);
  };

  const handleDeleteClick = () => {
    sounds.playError();
    setShowDeletePrompt(true);
  };

  const confirmDelete = () => {
    sounds.playClick();
    setShowDeletePrompt(false);
    alert(`"${activePhoto.filename}" cannot be deleted because this portfolio is read-only! 😉`);
  };

  const handleSetAsWallpaper = () => {
    sounds.playPop();
    if (onSetWallpaper) {
      onSetWallpaper(activePhoto.url);
      alert(`"${activePhoto.title}" has been set as your Windows XP desktop wallpaper!`);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleSlideshow();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === 'r' || e.key === 'R') {
        handleRotateCw();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photoIndex, isSlideshow]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ffffff', position: 'relative' }}>
      {/* Upper Main Workspace: Photo + Persistent EXIF Panel */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', backgroundColor: '#0a0a0a', position: 'relative' }}>
        
        {/* Photo Viewport */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src={activePhoto.url}
            alt={activePhoto.title}
            style={{
              maxWidth: zoomLevel === 1 ? '92%' : 'none',
              maxHeight: zoomLevel === 1 ? '88%' : 'none',
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              transition: 'transform 0.15s ease-out',
              boxShadow: '0 8px 32px rgba(0,0,0,0.85)',
              userSelect: 'none'
            }}
            draggable={false}
          />

          {/* Slideshow HUD indicator */}
          {isSlideshow && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: '#4ade80',
                padding: '6px 14px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                border: '1px solid #16a34a',
                zIndex: 20
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              <span>Slideshow Active ({photoIndex + 1} / {PORTFOLIO_PHOTOS.length})</span>
              <button
                className="xp-button"
                style={{ padding: '1px 8px', height: '18px' }}
                onClick={toggleSlideshow}
              >
                Pause
              </button>
            </div>
          )}

          {/* Quick arrow controls on photo edges */}
          <button
            type="button"
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              color: '#ffffff',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: showExifDrawer ? '10px' : '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              color: '#ffffff',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10
            }}
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* PERSISTENT DOCKED EXIF INFO TAB (Kept open by default!) */}
        {showExifDrawer && (
          <aside
            style={{
              width: '280px',
              minWidth: '280px',
              backgroundColor: '#ece9d8',
              borderLeft: '2px solid #707070',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-2px 0 10px rgba(0,0,0,0.4)',
              zIndex: 15,
              overflowY: 'auto'
            }}
          >
            {/* Header with Title and Minimize toggle */}
            <div
              style={{
                background: 'linear-gradient(180deg, #0058e6 0%, #257bf4 30%, #0054e3 100%)',
                color: '#ffffff',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '11px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={13} color="#ffffff" />
                <span>EXIF & Photo Info</span>
              </div>
              <button
                type="button"
                onClick={() => setShowExifDrawer(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '11px',
                  padding: '0 4px'
                }}
                title="Hide Info Tab"
              >
                ✕
              </button>
            </div>

            {/* Thumbnail Preview & Title */}
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #aca899', padding: '6px', borderRadius: '3px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#002e7a', marginBottom: '2px' }}>
                  {activePhoto.title}
                </div>
                <div style={{ fontSize: '10px', color: '#666' }}>
                  File: {activePhoto.filename}
                </div>
              </div>

              {/* Exposure Settings Box */}
              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '8px', borderRadius: '3px' }}>
                <div style={{ fontWeight: 'bold', color: '#003c74', borderBottom: '1px solid #d4d0c8', paddingBottom: '3px', marginBottom: '6px' }}>
                  ⚙️ Exposure Settings
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '11px' }}>
                  <div><b>Aperture:</b> {activePhoto.aperture}</div>
                  <div><b>Shutter:</b> {activePhoto.shutterSpeed}</div>
                  <div><b>ISO:</b> {activePhoto.iso}</div>
                  <div><b>Focal:</b> {activePhoto.focalLength}</div>
                </div>
              </div>

              {/* Camera & Lens Specs */}
              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '8px', borderRadius: '3px' }}>
                <div style={{ fontWeight: 'bold', color: '#003c74', borderBottom: '1px solid #d4d0c8', paddingBottom: '3px', marginBottom: '6px' }}>
                  📷 Camera & Hardware
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
                  <div><b>Camera:</b> {activePhoto.camera}</div>
                  <div><b>Lens:</b> {activePhoto.lens}</div>
                  {activePhoto.filmStock && (
                    <div style={{ color: '#b45309' }}>
                      <b>Film Stock:</b> {activePhoto.filmStock}
                    </div>
                  )}
                  <div><b>Resolution:</b> {activePhoto.dimensions}</div>
                  <div><b>File Size:</b> {activePhoto.fileSize}</div>
                </div>
              </div>

              {/* Geotag & Date */}
              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '8px', borderRadius: '3px' }}>
                <div style={{ fontWeight: 'bold', color: '#003c74', borderBottom: '1px solid #d4d0c8', paddingBottom: '3px', marginBottom: '6px' }}>
                  📍 Geotag & Date
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
                  <div><b>Location:</b> {activePhoto.location}</div>
                  <div><b>Captured:</b> {activePhoto.date}</div>
                </div>
              </div>

              {/* Artist Story */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '8px', borderRadius: '3px', fontSize: '11px' }}>
                <b style={{ color: '#92400e' }}>Artist's Field Notes:</b>
                <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: '#78350f', lineHeight: 1.4 }}>
                  "{activePhoto.story}"
                </p>
              </div>

              {/* Set as Wallpaper Action button */}
              <button
                className="xp-button primary"
                onClick={handleSetAsWallpaper}
                style={{ marginTop: '4px' }}
              >
                <Monitor size={12} color="#0054e3" />
                <span>Set as Desktop Background</span>
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* Iconic Windows XP Bottom Picture Viewer Control Bar */}
      <div className="xp-picture-viewer-controls">
        {/* Zoom In */}
        <button className="xp-pv-btn" title="Zoom In (+)" onClick={handleZoomIn}>
          <ZoomIn size={15} color="#0054e3" />
        </button>

        {/* Zoom Out */}
        <button className="xp-pv-btn" title="Zoom Out (-)" onClick={handleZoomOut}>
          <ZoomOut size={15} color="#0054e3" />
        </button>

        {/* Best Fit */}
        <button className="xp-pv-btn" title="Best Fit / 100%" onClick={handleBestFit}>
          <Maximize size={14} color="#0054e3" />
        </button>

        <div className="xp-tool-divider" style={{ height: '22px' }} />

        {/* Slideshow button */}
        <button
          className="xp-pv-btn"
          title={isSlideshow ? 'Pause Slideshow (Space)' : 'Start Slide Show (Space)'}
          style={{ backgroundColor: isSlideshow ? '#d6dff7' : undefined }}
          onClick={toggleSlideshow}
        >
          {isSlideshow ? <Pause size={14} color="#2e7d32" /> : <Play size={14} color="#2e7d32" fill="#2e7d32" />}
        </button>

        <div className="xp-tool-divider" style={{ height: '22px' }} />

        {/* Previous Image */}
        <button className="xp-pv-btn" title="Previous Image (Left Arrow)" onClick={handlePrev}>
          <ChevronLeft size={18} color="#0054e3" />
        </button>

        {/* Next Image */}
        <button className="xp-pv-btn" title="Next Image (Right Arrow)" onClick={handleNext}>
          <ChevronRight size={18} color="#0054e3" />
        </button>

        <div className="xp-tool-divider" style={{ height: '22px' }} />

        {/* Rotate Clockwise */}
        <button className="xp-pv-btn" title="Rotate Clockwise (R)" onClick={handleRotateCw}>
          <RotateCw size={15} color="#0054e3" />
        </button>

        {/* Rotate Counter-Clockwise */}
        <button className="xp-pv-btn" title="Rotate Counter-Clockwise" onClick={handleRotateCcw}>
          <RotateCcw size={15} color="#0054e3" />
        </button>

        <div className="xp-tool-divider" style={{ height: '22px' }} />

        {/* Set as Desktop Wallpaper */}
        <button 
          className="xp-pv-btn" 
          title="Set as Desktop Background" 
          onClick={handleSetAsWallpaper}
        >
          <Monitor size={14} color="#2e7d32" />
        </button>

        {/* Print Picture */}
        <button className="xp-pv-btn" title="Print..." onClick={() => { sounds.playShutter(); window.print(); }}>
          <Printer size={14} color="#555" />
        </button>

        {/* Save Copy / Download */}
        <a 
          href={activePhoto.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          download={activePhoto.filename}
          className="xp-pv-btn" 
          title="Save or Download High-Res Photo"
          style={{ textDecoration: 'none' }}
          onClick={() => sounds.playClick()}
        >
          <Download size={14} color="#0054e3" />
        </a>

        {/* Toggle Info Tab */}
        <button 
          className="xp-pv-btn" 
          title={showExifDrawer ? "Hide EXIF Info Tab" : "Show EXIF Info Tab (Open)"}
          style={{ backgroundColor: showExifDrawer ? '#d6dff7' : undefined }}
          onClick={() => { sounds.playClick(); setShowExifDrawer(!showExifDrawer); }}
        >
          <Info size={14} color={showExifDrawer ? '#2e7d32' : '#0054e3'} />
        </button>

        {/* Delete Photo */}
        <button className="xp-pv-btn" title="Delete (Del)" onClick={handleDeleteClick}>
          <Trash2 size={14} color="#dc2626" />
        </button>
      </div>

      {/* Classic Windows XP Delete Confirmation Dialog Modal */}
      {showDeletePrompt && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            className="xp-window focused"
            style={{ position: 'relative', width: '380px', minHeight: 'auto' }}
          >
            <div className="xp-titlebar">
              <div className="xp-titlebar-left">
                <span>Confirm File Delete</span>
              </div>
              <button 
                type="button" 
                className="xp-control-btn close" 
                onClick={() => setShowDeletePrompt(false)}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '32px' }}>🗑️</span>
              <div>
                Are you sure you want to send <b>'{activePhoto.filename}'</b> to the Recycle Bin?
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '10px 14px', backgroundColor: '#ece9d8', borderTop: '1px solid #aca899' }}>
              <button className="xp-button primary" onClick={confirmDelete}>
                Yes
              </button>
              <button className="xp-button" onClick={() => setShowDeletePrompt(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
