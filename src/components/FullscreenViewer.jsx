import React, { useState, useEffect } from 'react';
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
  Download, 
  Info,
  X,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Monitor
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * FullscreenViewer Component
 * Full-screen Windows Picture and Fax Viewer modal.
 * Activated whenever a user clicks any photograph in the gallery.
 */
export default function FullscreenViewer({
  currentPhoto = null,
  photos = [],
  isOpen = false,
  onClose = () => {},
  onSelectPhoto = () => {}
}) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true); // Persistent info panel open by default!

  // Sync index when currentPhoto changes
  useEffect(() => {
    if (currentPhoto && photos.length > 0) {
      const idx = photos.findIndex((p) => p.id === currentPhoto.id);
      if (idx !== -1) setPhotoIndex(idx);
    }
  }, [currentPhoto, photos]);

  const activePhoto = photos[photoIndex] || currentPhoto || photos[0];

  // Auto-advancing slideshow
  useEffect(() => {
    let interval = null;
    if (isSlideshow && isOpen) {
      interval = setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, photoIndex, isOpen, photos]);

  const resetTransform = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleNext = () => {
    sounds.playClick();
    resetTransform();
    const nextIdx = (photoIndex + 1) % photos.length;
    setPhotoIndex(nextIdx);
    onSelectPhoto(photos[nextIdx]);
  };

  const handlePrev = () => {
    sounds.playClick();
    resetTransform();
    const prevIdx = (photoIndex - 1 + photos.length) % photos.length;
    setPhotoIndex(prevIdx);
    onSelectPhoto(photos[prevIdx]);
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

  const handleClose = () => {
    sounds.playClick();
    setIsSlideshow(false);
    resetTransform();
    onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
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
  }, [isOpen, photoIndex, isSlideshow, photos]);

  if (!isOpen || !activePhoto) return null;

  return (
    <div className="xp-fullscreen-modal" role="dialog" aria-modal="true">
      {/* 1. Windows XP Header Titlebar */}
      <div className="xp-fullscreen-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '15px' }}>🔍</span>
          <span>
            Windows Picture and Fax Viewer — <b>{activePhoto.title}</b> ({photoIndex + 1} of {photos.length})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            className="xp-control-btn close"
            onClick={handleClose}
            title="Close Fullscreen (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 2. Main Fullscreen Workspace */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', backgroundColor: '#090909' }}>
        
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

          {/* Floating Left and Right Arrow Navigation */}
          <button
            type="button"
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              color: '#ffffff',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30
            }}
            title="Previous Picture (&larr; Arrow)"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: showInfoPanel ? '16px' : '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50%',
              color: '#ffffff',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 30
            }}
            title="Next Picture (&rarr; Arrow)"
          >
            <ChevronRight size={26} />
          </button>

          {/* Slideshow Active Indicator */}
          {isSlideshow && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(0,0,0,0.85)',
                color: '#4ade80',
                padding: '6px 14px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                border: '1px solid #16a34a',
                zIndex: 30
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              <span>Slideshow Playing (Space to pause)</span>
            </div>
          )}
        </div>

        {/* Persistent EXIF & Photo Info Panel */}
        {showInfoPanel && (
          <aside
            style={{
              width: '300px',
              minWidth: '300px',
              backgroundColor: '#ece9d8',
              borderLeft: '2px solid #707070',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-4px 0 16px rgba(0,0,0,0.5)',
              zIndex: 20,
              overflowY: 'auto'
            }}
          >
            {/* Panel Titlebar */}
            <div
              style={{
                background: 'linear-gradient(180deg, #0058e6 0%, #257bf4 30%, #0054e3 100%)',
                color: '#ffffff',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '11px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={13} color="#ffffff" />
                <span>EXIF & Field Notes</span>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoPanel(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                title="Hide Info Drawer"
              >
                ✕
              </button>
            </div>

            {/* Panel Body */}
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
              {/* Photo Title */}
              <div style={{ background: '#ffffff', border: '1px solid #aca899', padding: '8px', borderRadius: '3px' }}>
                <b style={{ color: '#002e7a', fontSize: '12px' }}>{activePhoto.title}</b>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                  File: {activePhoto.filename}
                </div>
              </div>

              {/* Exposure Settings */}
              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '8px', borderRadius: '3px' }}>
                <div style={{ fontWeight: 'bold', color: '#003c74', borderBottom: '1px solid #d4d0c8', paddingBottom: '3px', marginBottom: '6px' }}>
                  ⚙️ Exposure Settings
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                  <div><b>Aperture:</b> {activePhoto.aperture}</div>
                  <div><b>Shutter:</b> {activePhoto.shutterSpeed}</div>
                  <div><b>ISO:</b> {activePhoto.iso}</div>
                  <div><b>Focal:</b> {activePhoto.focalLength}</div>
                </div>
              </div>

              {/* Camera Hardware & Film */}
              <div style={{ background: '#ffffff', border: '1px solid #7f9db9', padding: '8px', borderRadius: '3px' }}>
                <div style={{ fontWeight: 'bold', color: '#003c74', borderBottom: '1px solid #d4d0c8', paddingBottom: '3px', marginBottom: '6px' }}>
                  📷 Camera & Film Medium
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
                  📍 Geotag & Capture
                </div>
                <div><b>Location:</b> {activePhoto.location}</div>
                <div><b>Captured:</b> {activePhoto.date}</div>
              </div>

              {/* Artist Story */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '8px', borderRadius: '3px' }}>
                <b style={{ color: '#92400e' }}>Artist's Field Notes:</b>
                <p style={{ margin: '4px 0 0 0', fontStyle: 'italic', color: '#78350f', lineHeight: 1.4 }}>
                  "{activePhoto.story}"
                </p>
              </div>

              <a
                href={activePhoto.url}
                target="_blank"
                rel="noopener noreferrer"
                download={activePhoto.filename}
                className="xp-button primary"
                style={{ marginTop: '4px', textDecoration: 'none' }}
              >
                <Download size={12} />
                <span>Download High-Resolution Original</span>
              </a>
            </div>
          </aside>
        )}
      </div>

      {/* 3. Bottom Windows Picture and Fax Viewer Control Bar */}
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

        <div className="xp-tool-divider" />

        {/* Slideshow button */}
        <button
          className="xp-pv-btn"
          title={isSlideshow ? 'Pause Slideshow (Space)' : 'Start Slideshow (Space)'}
          style={{ backgroundColor: isSlideshow ? '#d6dff7' : undefined }}
          onClick={toggleSlideshow}
        >
          {isSlideshow ? <Pause size={14} color="#2e7d32" /> : <Play size={14} color="#2e7d32" fill="#2e7d32" />}
        </button>

        <div className="xp-tool-divider" />

        {/* Previous Image */}
        <button className="xp-pv-btn" title="Previous Image (&larr; Arrow)" onClick={handlePrev}>
          <ChevronLeft size={18} color="#0054e3" />
        </button>

        {/* Next Image */}
        <button className="xp-pv-btn" title="Next Image (&rarr; Arrow)" onClick={handleNext}>
          <ChevronRight size={18} color="#0054e3" />
        </button>

        <div className="xp-tool-divider" />

        {/* Rotate Clockwise */}
        <button className="xp-pv-btn" title="Rotate Clockwise (R)" onClick={handleRotateCw}>
          <RotateCw size={15} color="#0054e3" />
        </button>

        {/* Rotate Counter-Clockwise */}
        <button className="xp-pv-btn" title="Rotate Counter-Clockwise" onClick={handleRotateCcw}>
          <RotateCcw size={15} color="#0054e3" />
        </button>

        <div className="xp-tool-divider" />

        {/* Toggle Info Panel */}
        <button
          className="xp-pv-btn"
          title={showInfoPanel ? 'Hide Info Drawer' : 'Show Info Drawer (EXIF)'}
          style={{ backgroundColor: showInfoPanel ? '#d6dff7' : undefined }}
          onClick={() => { sounds.playClick(); setShowInfoPanel(!showInfoPanel); }}
        >
          <Info size={14} color={showInfoPanel ? '#2e7d32' : '#0054e3'} />
        </button>

        {/* Print Picture */}
        <button className="xp-pv-btn" title="Print..." onClick={() => { sounds.playShutter(); window.print(); }}>
          <Printer size={14} color="#555" />
        </button>

        {/* Close Button */}
        <button className="xp-button primary" onClick={handleClose} style={{ marginLeft: '12px' }}>
          <span>Close (Esc)</span>
        </button>
      </div>
    </div>
  );
}
