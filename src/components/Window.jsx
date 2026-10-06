import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Window Component
 * Draggable, resizable, focusable container matching the classic Windows XP window chrome.
 * Wraps any child window content and wires up the Header and Footer.
 */
export default function Window({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  isFocused,
  defaultPosition = { x: 80, y: 50 },
  defaultSize = { width: 850, height: 560 },
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  showExplorerBars = false,
  viewMode,
  onViewModeChange,
  currentPath,
  onBack,
  onForward,
  canGoBack,
  canGoForward,
  searchTerm,
  onSearchChange,
  showFooter = true,
  footerProps = {},
  children
}) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Handle Dragging
  const handleMouseDown = (e) => {
    if (isMaximized) return;
    onFocus(id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragRef.current.initialX + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 80, dragRef.current.initialY + dy));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen || isMinimized) return null;

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 30px)', // Leave space for taskbar
        borderRadius: 0,
        zIndex: isFocused ? 200 : 100
      }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `min(${size.width}px, 95vw)`,
        height: `min(${size.height}px, 86vh)`,
        zIndex: isFocused ? 200 : 100
      };

  return (
    <div
      className={`xp-window ${isFocused ? 'focused' : 'inactive'}`}
      style={windowStyle}
      onMouseDown={() => onFocus(id)}
      role="dialog"
      aria-label={title}
    >
      {/* 1. Header with Window Title, Controls & Explorer Navigation */}
      <Header
        title={title}
        icon={icon}
        windowId={id}
        isMaximized={isMaximized}
        isFocused={isFocused}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
        onMouseDown={handleMouseDown}
        showExplorerBars={showExplorerBars}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        currentPath={currentPath}
        onBack={onBack}
        onForward={onForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      {/* 2. Window Content Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', backgroundColor: '#ffffff' }}>
        {children}
      </div>

      {/* 3. Footer Status Bar */}
      {showFooter && <Footer {...footerProps} />}
    </div>
  );
}
