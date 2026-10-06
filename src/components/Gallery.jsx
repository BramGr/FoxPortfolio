import React from 'react';
import { Camera, MapPin, Maximize2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * Gallery Component
 * Photography grid rendering curated photos in Windows XP polaroid/card style.
 * Clicking ANY card immediately launches the Fullscreen Picture Viewer!
 */
export default function Gallery({
  photos = [],
  onPhotoClick = () => {}
}) {
  const handleClick = (photo) => {
    sounds.playShutter();
    onPhotoClick(photo);
  };

  if (photos.length === 0) {
    return (
      <div
        id="gallery"
        style={{
          backgroundColor: '#ffffff',
          border: '2px solid #aca899',
          padding: '40px 20px',
          textAlign: 'center',
          borderRadius: '4px',
          margin: '20px 0'
        }}
      >
        <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔍</div>
        <h3 style={{ margin: 0, color: '#002e7a' }}>No photos found matching your search</h3>
        <p style={{ color: '#666', fontSize: '11px', marginTop: '6px' }}>
          Try clearing your search keyword or switching categories in the Sort Window above.
        </p>
      </div>
    );
  }

  return (
    <section id="gallery" style={{ margin: '10px 0 32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🖼️</span>
          <h2 style={{ margin: 0, fontSize: '16px', color: '#ffffff', fontFamily: 'Trebuchet MS, sans-serif', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            Portfolio Showcase ({photos.length} Works)
          </h2>
        </div>

        <div style={{ color: '#ffffff', fontSize: '11px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Maximize2 size={13} />
          <span>Click any photo to open <b>Fullscreen Picture Viewer</b></span>
        </div>
      </div>

      {/* Grid of Photo Cards */}
      <div className="xp-gallery-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="xp-gallery-card"
            onClick={() => handleClick(photo)}
            title={`Click to view full-screen:\n${photo.title}\nCamera: ${photo.camera}`}
          >
            {/* Image Thumbnail */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={photo.thumbnail || photo.url}
                alt={photo.title}
                className="xp-gallery-card-img"
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  backgroundColor: 'rgba(0, 84, 227, 0.85)',
                  color: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}
              >
                <Maximize2 size={10} />
                <span>Fullscreen</span>
              </div>
            </div>

            {/* Photo Info */}
            <div className="xp-gallery-card-info">
              <div className="xp-gallery-card-title">{photo.title}</div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', color: '#555' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Camera size={11} color="#0054e3" />
                  <b>{photo.camera.split(' ')[0]}</b> • {photo.aperture}
                </span>
                <span>{photo.shutterSpeed}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#666', marginTop: '2px' }}>
                <MapPin size={10} color="#dc2626" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {photo.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
