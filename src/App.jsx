import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StartMenu from './components/StartMenu';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import ExplorerGallery from './components/ExplorerGallery';
import PictureViewer from './components/PictureViewer';
import AboutWindow from './components/AboutWindow';
import GearWindow from './components/GearWindow';
import ContactWindow from './components/ContactWindow';
import DisplayProperties from './components/DisplayProperties';
import NotepadGuestbook from './components/NotepadGuestbook';
import OrderPrintsModal from './components/OrderPrintsModal';
import HelpTourWindow from './components/HelpTourWindow';

import { PORTFOLIO_PHOTOS } from './data/photosData';
import { sounds } from './utils/soundEffects';

export default function App() {
  // Desktop state
  const [wallpaper, setWallpaper] = useState('/bliss.jpg');
  const [theme, setTheme] = useState('luna');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [cameraFlash, setCameraFlash] = useState(false);

  // Gallery & viewer state
  const [selectedPhoto, setSelectedPhoto] = useState(PORTFOLIO_PHOTOS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('thumbnails'); // thumbnails, filmstrip, details
  const [viewerIsSlideshow, setViewerIsSlideshow] = useState(false);

  // Window Management State
  const [windows, setWindows] = useState([
    {
      id: 'gallery',
      title: 'My Pictures - Fox Photography Portfolio',
      icon: '🖼️',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 50, y: 30 },
      defaultSize: { width: 920, height: 600 },
      showExplorerBars: true
    },
    {
      id: 'help',
      title: 'Tour Windows XP - How to Use This Portfolio',
      icon: '❓',
      isOpen: true, // Open on initial load so visitor immediately discovers all features!
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 190, y: 60 },
      defaultSize: { width: 720, height: 500 },
      showExplorerBars: false
    },
    {
      id: 'viewer',
      title: 'Windows Picture and Fax Viewer',
      icon: '🔍',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 100, y: 40 },
      defaultSize: { width: 900, height: 600 },
      showExplorerBars: false
    },
    {
      id: 'about',
      title: 'System Properties - Fox Biography & Exhibitions',
      icon: '👤',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 180, y: 70 },
      defaultSize: { width: 620, height: 520 },
      showExplorerBars: false
    },
    {
      id: 'gear',
      title: 'Device Manager - Camera Bag & Prime Optics',
      icon: '📷',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 210, y: 85 },
      defaultSize: { width: 680, height: 490 },
      showExplorerBars: false
    },
    {
      id: 'contact',
      title: 'Outlook Express - New Message (Book a Shoot)',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 160, y: 65 },
      defaultSize: { width: 660, height: 520 },
      showExplorerBars: false
    },
    {
      id: 'guestbook',
      title: 'guestbook.txt - Notepad',
      icon: '📝',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 240, y: 105 },
      defaultSize: { width: 600, height: 440 },
      showExplorerBars: false
    },
    {
      id: 'display',
      title: 'Display Properties',
      icon: '🎨',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 280, y: 80 },
      defaultSize: { width: 480, height: 480 },
      showExplorerBars: false
    },
    {
      id: 'prints',
      title: 'Photo Printing Wizard',
      icon: '🖨️',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      defaultPosition: { x: 220, y: 95 },
      defaultSize: { width: 600, height: 460 },
      showExplorerBars: false
    }
  ]);

  const [focusedWindowId, setFocusedWindowId] = useState('help');

  // Sync theme attribute onto body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle Window Actions
  const handleOpenWindow = (winId, extraState = {}) => {
    sounds.playPop();
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id === winId) {
          return { ...win, isOpen: true, isMinimized: false };
        }
        return win;
      })
    );
    setFocusedWindowId(winId);

    if (winId === 'viewer' && extraState.slideshow !== undefined) {
      setViewerIsSlideshow(extraState.slideshow);
    }
  };

  const handleCloseWindow = (winId) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === winId ? { ...win, isOpen: false } : win))
    );
    const openWins = windows.filter((w) => w.id !== winId && w.isOpen && !w.isMinimized);
    if (openWins.length > 0) {
      setFocusedWindowId(openWins[openWins.length - 1].id);
    } else {
      setFocusedWindowId(null);
    }
  };

  const handleMinimizeWindow = (winId) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === winId ? { ...win, isMinimized: true } : win))
    );
    if (focusedWindowId === winId) {
      const openWins = windows.filter((w) => w.id !== winId && w.isOpen && !w.isMinimized);
      if (openWins.length > 0) {
        setFocusedWindowId(openWins[openWins.length - 1].id);
      } else {
        setFocusedWindowId(null);
      }
    }
  };

  const handleMaximizeWindow = (winId) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === winId ? { ...win, isMaximized: !win.isMaximized } : win))
    );
  };

  const handleFocusWindow = (winId) => {
    setFocusedWindowId(winId);
    setWindows((prev) =>
      prev.map((win) => (win.id === winId ? { ...win, isMinimized: false } : win))
    );
  };

  const handleTaskbarWindowClick = (winId) => {
    const target = windows.find((w) => w.id === winId);
    if (!target) return;

    if (target.isMinimized) {
      handleFocusWindow(winId);
    } else if (focusedWindowId === winId) {
      handleMinimizeWindow(winId);
    } else {
      handleFocusWindow(winId);
    }
  };

  const handleMinimizeAll = () => {
    setWindows((prev) => prev.map((win) => ({ ...win, isMinimized: true })));
    setFocusedWindowId(null);
  };

  // Launch Picture Viewer from single click on photo
  const handleLaunchViewer = (photo, isSlideshow = false) => {
    if (photo) setSelectedPhoto(photo);
    setViewerIsSlideshow(isSlideshow);
    handleOpenWindow('viewer', { slideshow: isSlideshow });
  };

  // Trigger camera snapshot shutter flash effect
  const handleTakeSnap = () => {
    setCameraFlash(true);
    setTimeout(() => {
      setCameraFlash(false);
    }, 380);
  };

  // Global keybindings (e.g. F1 for Tour, Esc to close top window)
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      if (e.key === 'F1') {
        e.preventDefault();
        handleOpenWindow('help');
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  // Desktop shortcuts with SINGLE CLICK OPENING
  const desktopShortcuts = [
    { id: 'help', title: 'How to Use.chm', icon: '❓' },
    { id: 'gallery', title: 'My Pictures', icon: '📁' },
    { id: 'viewer', title: 'Picture Viewer', icon: '🔍' },
    { id: 'about', title: 'Artist Bio.txt', icon: '📄' },
    { id: 'gear', title: 'Camera Rig.exe', icon: '📷' },
    { id: 'contact', title: 'Book a Shoot.msg', icon: '✉️' },
    { id: 'prints', title: 'Order Prints', icon: '🖨️' },
    { id: 'guestbook', title: 'guestbook.txt', icon: '📝' },
    { id: 'display', title: 'Display Props', icon: '🎨' },
    { id: 'recycle', title: 'Recycle Bin', icon: '🗑️' }
  ];

  const handleDesktopIconOpen = (id) => {
    if (id === 'recycle') {
      sounds.playError();
      alert('Recycle Bin contents:\n• 3 blurry test negatives (Kodak Gold 200)\n• 1 misplaced 49mm lens cap\n• 0 deleted master photos!');
      return;
    }
    handleOpenWindow(id);
  };

  return (
    <div
      className="desktop-container"
      style={{
        backgroundImage: wallpaper.startsWith('http') || wallpaper.startsWith('/')
          ? `url(${wallpaper})`
          : undefined,
        backgroundColor: wallpaper === 'solid-blue' ? '#004e98' : undefined
      }}
      onClick={() => {
        setSelectedIconId(null);
        if (startMenuOpen) setStartMenuOpen(false);
      }}
    >
      {/* Visual Camera Flash Animation */}
      {cameraFlash && <div className="camera-flash-overlay" />}

      {/* 1. Desktop Icon Grid (SINGLE CLICK TO OPEN) */}
      <div className="desktop-icons-area">
        {desktopShortcuts.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            title={item.title}
            icon={item.icon}
            isSelected={selectedIconId === item.id}
            onSelect={(id) => setSelectedIconId(id)}
            onOpen={handleDesktopIconOpen}
          />
        ))}
      </div>

      {/* 2. Windows Environment (All Open Windows) */}

      {/* WINDOW 1: Photography Explorer Gallery ("My Pictures") */}
      {(() => {
        const win = windows.find((w) => w.id === 'gallery');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={true}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFooter={true}
            footerProps={{
              itemCount: PORTFOLIO_PHOTOS.length,
              selectedItem: selectedPhoto,
              totalSize: '184 MB',
              freeDiskSpace: '142 GB free',
              zone: 'Local Intranet'
            }}
          >
            <ExplorerGallery
              selectedPhoto={selectedPhoto}
              onSelectPhoto={setSelectedPhoto}
              onOpenViewer={handleLaunchViewer}
              onOpenPrints={(photo) => {
                if (photo) setSelectedPhoto(photo);
                handleOpenWindow('prints');
              }}
              onSetWallpaper={setWallpaper}
              searchTerm={searchTerm}
              viewMode={viewMode}
            />
          </Window>
        );
      })()}

      {/* WINDOW 2: Tour Windows XP / How to Use Guide */}
      {(() => {
        const win = windows.find((w) => w.id === 'help');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <HelpTourWindow
              onOpenApp={handleOpenWindow}
              onClose={() => handleCloseWindow('help')}
            />
          </Window>
        );
      })()}

      {/* WINDOW 3: Windows Picture and Fax Viewer (Persistent EXIF Panel Open) */}
      {(() => {
        const win = windows.find((w) => w.id === 'viewer');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={`${win.title} - ${selectedPhoto?.filename || 'Portfolio'}`}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={true}
            footerProps={{
              statusText: `${selectedPhoto?.title} • ${selectedPhoto?.camera} • ${selectedPhoto?.dimensions} • ${selectedPhoto?.fileSize}`
            }}
          >
            <PictureViewer
              currentPhoto={selectedPhoto}
              isOpen={win.isOpen}
              isSlideshowInitial={viewerIsSlideshow}
              onClose={() => handleCloseWindow('viewer')}
              onSelectPhoto={setSelectedPhoto}
              onSetWallpaper={setWallpaper}
            />
          </Window>
        );
      })()}

      {/* WINDOW 4: About Fox / System Properties */}
      {(() => {
        const win = windows.find((w) => w.id === 'about');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <AboutWindow onOpenContact={() => handleOpenWindow('contact')} />
          </Window>
        );
      })()}

      {/* WINDOW 5: Camera Gear / Device Manager */}
      {(() => {
        const win = windows.find((w) => w.id === 'gear');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <GearWindow />
          </Window>
        );
      })()}

      {/* WINDOW 6: Outlook Express Booking / Contact */}
      {(() => {
        const win = windows.find((w) => w.id === 'contact');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <ContactWindow onClose={() => handleCloseWindow('contact')} />
          </Window>
        );
      })()}

      {/* WINDOW 7: Client Guestbook / Notepad */}
      {(() => {
        const win = windows.find((w) => w.id === 'guestbook');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <NotepadGuestbook />
          </Window>
        );
      })()}

      {/* WINDOW 8: Display Properties */}
      {(() => {
        const win = windows.find((w) => w.id === 'display');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <DisplayProperties
              currentWallpaper={wallpaper}
              currentTheme={theme}
              onWallpaperChange={setWallpaper}
              onThemeChange={setTheme}
            />
          </Window>
        );
      })()}

      {/* WINDOW 9: Photo Printing Wizard */}
      {(() => {
        const win = windows.find((w) => w.id === 'prints');
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            isFocused={focusedWindowId === win.id}
            defaultPosition={win.defaultPosition}
            defaultSize={win.defaultSize}
            onFocus={handleFocusWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onClose={handleCloseWindow}
            showExplorerBars={false}
            showFooter={false}
          >
            <OrderPrintsModal
              photo={selectedPhoto}
              onClose={() => handleCloseWindow('prints')}
              onOpenContact={() => handleOpenWindow('contact')}
            />
          </Window>
        );
      })()}

      {/* 3. Windows XP Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={handleOpenWindow}
      />

      {/* 4. Windows XP Taskbar (Navbar Component) */}
      <Navbar
        windows={windows.filter((w) => w.isOpen)}
        focusedWindowId={focusedWindowId}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => setStartMenuOpen(!startMenuOpen)}
        onWindowClick={handleTaskbarWindowClick}
        onMinimizeAll={handleMinimizeAll}
        onOpenWindow={handleOpenWindow}
        onTakeSnap={handleTakeSnap}
      />
    </div>
  );
}
