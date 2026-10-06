import React, { useState } from 'react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/photosData';
import { Play, Printer, ShoppingBag, Monitor, Info, Camera, MapPin, Calendar, Film, Layers, Filter } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * ExplorerGallery Component
 * Main photography portfolio structured as Windows XP "My Pictures" Explorer.
 * Updated features:
 * - Single-click opens Picture Viewer directly!
 * - Camera body / Medium filter chips (All, 35mm Analog, Medium Format 120, Full-Frame Digital)
 * - Persistent pinned EXIF details pane in sidebar
 */
export default function ExplorerGallery({
  selectedPhoto,
  onSelectPhoto,
  onOpenViewer,
  onOpenPrints,
  onSetWallpaper,
  searchTerm = '',
  viewMode = 'thumbnails'
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cameraFilter, setCameraFilter] = useState('all'); // all, analog, medium, digital
  const [pictureTasksOpen, setPictureTasksOpen] = useState(true);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);

  // Filter photos by category, camera medium, and search keyword
  const filteredPhotos = PORTFOLIO_PHOTOS.filter((photo) => {
    const matchesCategory = activeCategory === 'all' || photo.category === activeCategory;
    
    let matchesMedium = true;
    if (cameraFilter === 'analog') {
      matchesMedium = photo.camera.includes('Leica') || photo.camera.includes('Nikon FM2') || photo.camera.includes('Olympus');
    } else if (cameraFilter === 'medium') {
      matchesMedium = photo.camera.includes('Hasselblad') || photo.camera.includes('GFX');
    } else if (cameraFilter === 'digital') {
      matchesMedium = photo.camera.includes('Sony') || photo.camera.includes('Canon');
    }

    const matchesSearch =
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.camera.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesMedium && matchesSearch;
  });

  // SINGLE CLICK OPENS PHOTO IN VIEWER DIRECTLY
  const handlePhotoClick = (photo) => {
    sounds.playShutter();
    onSelectPhoto(photo);
    onOpenViewer(photo);
  };

  const handleSelectOnly = (e, photo) => {
    e.stopPropagation();
    sounds.playClick();
    onSelectPhoto(photo);
  };

  const currentDisplayPhoto = selectedPhoto || filteredPhotos[0] || PORTFOLIO_PHOTOS[0];

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* 1. Left Windows XP Collapsible Tasks Sidebar */}
      <aside className="xp-explorer-sidebar">
        {/* Picture Tasks Box */}
        <div className="xp-sidebar-box">
          <div
            className="xp-sidebar-box-header"
            onClick={() => setPictureTasksOpen(!pictureTasksOpen)}
          >
            <span>Picture Tasks</span>
            <span style={{ fontSize: '9px' }}>{pictureTasksOpen ? '▲' : '▼'}</span>
          </div>
          {pictureTasksOpen && (
            <div className="xp-sidebar-box-content">
              <span
                className="xp-sidebar-link"
                onClick={() => {
                  sounds.playPop();
                  onOpenViewer(currentDisplayPhoto, true);
                }}
              >
                <Play size={12} color="#2e7d32" fill="#2e7d32" />
                <span>View as a slide show</span>
              </span>

              <span
                className="xp-sidebar-link"
                onClick={() => {
                  sounds.playClick();
                  onOpenPrints(currentDisplayPhoto);
                }}
              >
                <ShoppingBag size={12} color="#0054e3" />
                <span>Order prints online</span>
              </span>

              <span
                className="xp-sidebar-link"
                onClick={() => {
                  sounds.playShutter();
                  window.print();
                }}
              >
                <Printer size={12} color="#555" />
                <span>Print this picture</span>
              </span>

              <span
                className="xp-sidebar-link"
                onClick={() => {
                  sounds.playPop();
                  if (currentDisplayPhoto) {
                    onSetWallpaper(currentDisplayPhoto.url);
                    alert(`"${currentDisplayPhoto.title}" has been set as your Windows XP desktop wallpaper!`);
                  }
                }}
              >
                <Monitor size={12} color="#0054e3" />
                <span>Set as desktop background</span>
              </span>
            </div>
          )}
        </div>

        {/* Categories / Folders Box */}
        <div className="xp-sidebar-box">
          <div
            className="xp-sidebar-box-header"
            onClick={() => setCategoriesOpen(!categoriesOpen)}
          >
            <span>Photo Galleries</span>
            <span style={{ fontSize: '9px' }}>{categoriesOpen ? '▲' : '▼'}</span>
          </div>
          {categoriesOpen && (
            <div className="xp-sidebar-box-content">
              {PHOTO_CATEGORIES.map((cat) => (
                <span
                  key={cat.id}
                  className="xp-sidebar-link"
                  style={{
                    fontWeight: activeCategory === cat.id ? 'bold' : 'normal',
                    color: activeCategory === cat.id ? '#003c74' : '#0c327d'
                  }}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCategory(cat.id);
                  }}
                >
                  <span style={{ fontSize: '12px' }}>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* PERSISTENT DETAILS / EXIF BOX */}
        <div className="xp-sidebar-box">
          <div
            className="xp-sidebar-box-header"
            onClick={() => setDetailsOpen(!detailsOpen)}
          >
            <span>Details & EXIF</span>
            <span style={{ fontSize: '9px' }}>{detailsOpen ? '▲' : '▼'}</span>
          </div>
          {detailsOpen && currentDisplayPhoto && (
            <div className="xp-sidebar-box-content" style={{ fontSize: '10px' }}>
              <div 
                style={{ textAlign: 'center', marginBottom: '6px', cursor: 'pointer' }}
                onClick={() => onOpenViewer(currentDisplayPhoto)}
                title="Click to launch Windows Picture & Fax Viewer"
              >
                <img
                  src={currentDisplayPhoto.thumbnail || currentDisplayPhoto.url}
                  alt={currentDisplayPhoto.title}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '2px',
                    border: '1px solid #707070'
                  }}
                />
              </div>
              <div style={{ fontWeight: 'bold', color: '#002e7a' }}>{currentDisplayPhoto.title}</div>
              <div><b>Camera:</b> {currentDisplayPhoto.camera}</div>
              <div><b>Lens:</b> {currentDisplayPhoto.lens}</div>
              <div><b>Exposure:</b> {currentDisplayPhoto.aperture} • {currentDisplayPhoto.shutterSpeed} • ISO {currentDisplayPhoto.iso}</div>
              <div><b>Location:</b> {currentDisplayPhoto.location}</div>
              {currentDisplayPhoto.filmStock && (
                <div style={{ color: '#b45309' }}><b>Film:</b> {currentDisplayPhoto.filmStock}</div>
              )}
              <div style={{ marginTop: '4px', fontStyle: 'italic', color: '#444' }}>
                "{currentDisplayPhoto.story}"
              </div>

              <button
                className="xp-button primary"
                style={{ marginTop: '6px', width: '100%' }}
                onClick={() => onOpenViewer(currentDisplayPhoto)}
              >
                🔍 Open in Picture Viewer
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 2. Main Windows Explorer Content Area */}
      <main className="xp-explorer-body">
        {/* Category Header & Filter Chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid #d4d0c8' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>
                {PHOTO_CATEGORIES.find((c) => c.id === activeCategory)?.icon || '📁'}
              </span>
              <h2 style={{ margin: 0, fontSize: '13px', color: '#003399' }}>
                {PHOTO_CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Portfolio'}
              </h2>
              <span style={{ fontSize: '11px', color: '#666' }}>({filteredPhotos.length} photos)</span>
            </div>
            
            <div style={{ fontSize: '11px', color: '#2e7d32', fontWeight: 'bold' }}>
              ⚡ Single-click any photo to view full-screen & EXIF!
            </div>
          </div>

          {/* Quick Medium Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', color: '#555', fontWeight: 'bold' }}>Filter Medium:</span>
            
            <button
              className={`xp-button ${cameraFilter === 'all' ? 'primary' : ''}`}
              style={{ padding: '1px 8px', height: '20px', fontSize: '10px' }}
              onClick={() => { sounds.playClick(); setCameraFilter('all'); }}
            >
              All Formats
            </button>

            <button
              className={`xp-button ${cameraFilter === 'analog' ? 'primary' : ''}`}
              style={{ padding: '1px 8px', height: '20px', fontSize: '10px' }}
              onClick={() => { sounds.playClick(); setCameraFilter('analog'); }}
            >
              🎞️ 35mm Analog (Leica / Nikon)
            </button>

            <button
              className={`xp-button ${cameraFilter === 'medium' ? 'primary' : ''}`}
              style={{ padding: '1px 8px', height: '20px', fontSize: '10px' }}
              onClick={() => { sounds.playClick(); setCameraFilter('medium'); }}
            >
              📷 Medium Format 120 (Hasselblad)
            </button>

            <button
              className={`xp-button ${cameraFilter === 'digital' ? 'primary' : ''}`}
              style={{ padding: '1px 8px', height: '20px', fontSize: '10px' }}
              onClick={() => { sounds.playClick(); setCameraFilter('digital'); }}
            >
              ⚡ Full-Frame Digital (Sony / Canon)
            </button>
          </div>
        </div>

        {/* View Mode 1: Thumbnails (Classic XP Grid - SINGLE CLICK OPENS VIEWER) */}
        {viewMode === 'thumbnails' && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              padding: '6px',
              alignContent: 'flex-start',
              flex: 1,
              overflowY: 'auto'
            }}
          >
            {filteredPhotos.map((photo) => {
              const isSelected = selectedPhoto?.id === photo.id;
              return (
                <div
                  key={photo.id}
                  className={`xp-photo-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handlePhotoClick(photo)}
                  title={`${photo.title}\nCamera: ${photo.camera}\nClick to view full size`}
                >
                  <img
                    src={photo.thumbnail || photo.url}
                    alt={photo.title}
                    className="xp-photo-card-img"
                    loading="lazy"
                  />
                  <div className="xp-photo-card-title">{photo.title}</div>
                  <div style={{ fontSize: '9px', textAlign: 'center', opacity: 0.8, marginTop: '2px' }}>
                    {photo.camera.split(' ')[0]} • {photo.aperture} • {photo.iso}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Filmstrip (Large hero preview with horizontal scrollbar below) */}
        {viewMode === 'filmstrip' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Upper large view */}
            <div className="xp-filmstrip-preview">
              <img
                src={currentDisplayPhoto.url}
                alt={currentDisplayPhoto.title}
                style={{ cursor: 'pointer' }}
                onClick={() => onOpenViewer(currentDisplayPhoto)}
                title="Click to launch full-screen Picture Viewer"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(0,0,0,0.75)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '3px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold' }}>{currentDisplayPhoto.title}</div>
                  <div>
                    {currentDisplayPhoto.camera} | {currentDisplayPhoto.lens} | {currentDisplayPhoto.aperture} | {currentDisplayPhoto.shutterSpeed}
                  </div>
                </div>
                <button
                  className="xp-button primary"
                  onClick={() => onOpenViewer(currentDisplayPhoto)}
                >
                  🔍 View Full
                </button>
              </div>
            </div>

            {/* Lower thumbnail strip */}
            <div className="xp-filmstrip-strip">
              {filteredPhotos.map((photo) => {
                const isSelected = currentDisplayPhoto?.id === photo.id;
                return (
                  <div
                    key={photo.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectPhoto(photo);
                    }}
                    style={{
                      height: '80px',
                      width: '100px',
                      flexShrink: 0,
                      border: isSelected ? '2px solid #0054e3' : '1px solid #707070',
                      boxShadow: isSelected ? '0 0 5px #0054e3' : 'none',
                      cursor: 'pointer',
                      backgroundColor: '#fff',
                      padding: '2px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <img
                      src={photo.thumbnail || photo.url}
                      alt={photo.title}
                      style={{ width: '100%', height: '60px', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        fontSize: '9px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                        marginTop: '2px'
                      }}
                    >
                      {photo.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode 3: Details Table */}
        {viewMode === 'details' && (
          <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#fff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#ece9d8', borderBottom: '1px solid #707070', textAlign: 'left' }}>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #aca899' }}>Name (Click to Open)</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #aca899' }}>Camera</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #aca899' }}>Aperture</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #aca899' }}>Shutter</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #aca899' }}>ISO</th>
                  <th style={{ padding: '4px 8px', borderRight: '1px solid #aca899' }}>Location</th>
                  <th style={{ padding: '4px 8px' }}>Size</th>
                </tr>
              </thead>
              <tbody>
                {filteredPhotos.map((photo) => {
                  const isSelected = selectedPhoto?.id === photo.id;
                  return (
                    <tr
                      key={photo.id}
                      onClick={() => handlePhotoClick(photo)}
                      style={{
                        backgroundColor: isSelected ? '#316ac5' : 'transparent',
                        color: isSelected ? '#ffffff' : '#000000',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <td style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>🖼️</span>
                        <span><b>{photo.title}</b></span>
                      </td>
                      <td style={{ padding: '4px 8px' }}>{photo.camera}</td>
                      <td style={{ padding: '4px 8px' }}>{photo.aperture}</td>
                      <td style={{ padding: '4px 8px' }}>{photo.shutterSpeed}</td>
                      <td style={{ padding: '4px 8px' }}>{photo.iso}</td>
                      <td style={{ padding: '4px 8px' }}>{photo.location}</td>
                      <td style={{ padding: '4px 8px' }}>{photo.fileSize}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
