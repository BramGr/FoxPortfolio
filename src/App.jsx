import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import SortWindow from './components/SortWindow';
import Gallery from './components/Gallery';
import FullscreenViewer from './components/FullscreenViewer';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import { PORTFOLIO_PHOTOS } from './data/photosData';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [theme, setTheme] = useState('luna');
  const [cameraFlash, setCameraFlash] = useState(false);

  // Sorting & Filtering state
  const [activeCategory, setActiveCategory] = useState('all');
  const [cameraFilter, setCameraFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Fullscreen picture viewer state
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  // Sync theme attribute onto body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Trigger camera snapshot shutter flash effect
  const handleTakeSnap = () => {
    setCameraFlash(true);
    setTimeout(() => {
      setCameraFlash(false);
    }, 380);
  };

  // Filter and sort the photo collection
  const filteredAndSortedPhotos = PORTFOLIO_PHOTOS.filter((photo) => {
    const matchesCategory = activeCategory === 'all' || photo.category === activeCategory;

    let matchesMedium = true;
    if (cameraFilter === 'analog') {
      matchesMedium =
        photo.camera.includes('Leica') ||
        photo.camera.includes('Nikon FM2') ||
        photo.camera.includes('Olympus');
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
  }).sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'camera-asc') {
      return a.camera.localeCompare(b.camera);
    } else if (sortBy === 'aperture-asc') {
      return parseFloat(a.aperture.replace('f/', '')) - parseFloat(b.aperture.replace('f/', ''));
    }
    return 0;
  });

  return (
    <div className="site-wrapper">
      {/* Visual Camera Flash Animation */}
      {cameraFlash && <div className="camera-flash-overlay" />}

      {/* 1. Windows XP Luna Sticky Navbar */}
      <Navbar
        currentTheme={theme}
        onThemeChange={setTheme}
        onTakeSnap={handleTakeSnap}
      />

      {/* 2. Portfolio Hero Header with Bliss Backdrop */}
      <Header />

      {/* 3. Main Site Container */}
      <main className="container-xp" style={{ flex: 1, paddingBottom: '30px' }}>
        {/* Windows XP Sort & Info Center Window */}
        <SortWindow
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          cameraFilter={cameraFilter}
          onSelectCameraFilter={setCameraFilter}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalPhotos={PORTFOLIO_PHOTOS.length}
          filteredCount={filteredAndSortedPhotos.length}
        />

        {/* Photography Grid (Clicking any photo opens Fullscreen Picture Viewer) */}
        <Gallery
          photos={filteredAndSortedPhotos}
          onPhotoClick={(photo) => setFullscreenPhoto(photo)}
        />

        {/* System Properties: About Fox & Exhibitions */}
        <AboutSection />

        {/* Outlook Express: Contact & Booking Form */}
        <ContactSection />
      </main>

      {/* 4. Windows XP Status Bar Footer */}
      <Footer totalPhotos={PORTFOLIO_PHOTOS.length} />

      {/* 5. Fullscreen Windows Picture & Fax Viewer Modal (Triggered on click) */}
      <FullscreenViewer
        currentPhoto={fullscreenPhoto}
        photos={filteredAndSortedPhotos}
        isOpen={fullscreenPhoto !== null}
        onClose={() => setFullscreenPhoto(null)}
        onSelectPhoto={(photo) => setFullscreenPhoto(photo)}
      />
    </div>
  );
}
