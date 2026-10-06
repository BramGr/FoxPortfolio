import React from 'react';
import { Camera, MapPin, Sparkles, Image, Mail } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * Header Component
 * Portfolio Hero Header with Windows XP Bliss backdrop, artist portrait, and bio tags
 */
export default function Header() {
  return (
    <header
      style={{
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.65)), url(/bliss.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        color: '#ffffff',
        padding: '60px 20px 48px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        borderBottom: '4px solid #0055ea'
      }}
    >
      <div className="container-xp" style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
        {/* Photographer Avatar Card */}
        <div
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #ece9d8 100%)',
            padding: '8px',
            border: '2px solid #003c74',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            textAlign: 'center',
            width: '160px',
            flexShrink: 0
          }}
        >
          <img
            src="/avatar.jpg"
            alt="Photographer Bram"
            style={{
              width: '144px',
              height: '144px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid #707070'
            }}
          />
          <div style={{ marginTop: '6px', fontWeight: 'bold', color: '#002e7a', fontSize: '13px' }}>
            Bram / Fox
          </div>
          <div style={{ fontSize: '10px', color: '#555' }}>Visual Artist & 35mm</div>
        </div>

        {/* Hero Title & Bio */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(0, 84, 227, 0.85)',
              border: '1px solid #7697c7',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 'bold',
              marginBottom: '12px'
            }}
          >
            <Sparkles size={12} color="#ffca28" />
            <span>Windows XP Photography Edition</span>
          </div>

          <h1
            style={{
              margin: '0 0 10px 0',
              fontFamily: 'Trebuchet MS, sans-serif',
              fontSize: '34px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '-0.5px'
            }}
          >
            Fox Photography
          </h1>

          <p
            style={{
              margin: '0 0 18px 0',
              fontSize: '14px',
              lineHeight: 1.5,
              maxWidth: '650px',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
            }}
          >
            Documentary, editorial portraiture, and fine-art landscapes captured across
            vintage 35mm analog film, medium-format 120, and modern high-resolution optics.
          </p>

          {/* Camera Gear Badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#002e7a',
                padding: '3px 10px',
                borderRadius: '3px',
                border: '1px solid #707070',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Camera size={12} /> Leica M6 Classic
            </span>

            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#002e7a',
                padding: '3px 10px',
                borderRadius: '3px',
                border: '1px solid #707070',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Camera size={12} /> Hasselblad 500C/M (120 Film)
            </span>

            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#002e7a',
                padding: '3px 10px',
                borderRadius: '3px',
                border: '1px solid #707070',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Camera size={12} /> Sony α7 IV
            </span>

            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#002e7a',
                padding: '3px 10px',
                borderRadius: '3px',
                border: '1px solid #707070',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <MapPin size={12} color="#dc2626" /> Amsterdam & Global
            </span>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="#gallery"
              className="xp-button primary"
              style={{ padding: '6px 18px', fontSize: '12px' }}
              onClick={() => sounds.playClick()}
            >
              <Image size={14} />
              <span>Explore Gallery</span>
            </a>

            <a
              href="#contact"
              className="xp-button"
              style={{ padding: '6px 18px', fontSize: '12px' }}
              onClick={() => sounds.playClick()}
            >
              <Mail size={14} />
              <span>Book a Photoshoot</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
