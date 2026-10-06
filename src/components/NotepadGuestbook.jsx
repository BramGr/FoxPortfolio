import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/photosData';
import { sounds } from '../utils/soundEffects';

/**
 * NotepadGuestbook Component
 * Windows XP Notepad replica displaying client reviews & allowing visitors to add notes.
 */
export default function NotepadGuestbook() {
  const initialContent = `=====================================================
FOX PHOTOGRAPHY - CLIENT GUESTBOOK & TESTIMONIALS
C:\\Documents and Settings\\Photographer\\Desktop\\guestbook.txt
=====================================================

${TESTIMONIALS.map((t, i) => `[Review #${i + 1}] - ${t.author} (${t.date})
"${t.comment}"
-----------------------------------------------------`).join('\n\n')}

[Leave your own message below]:
`;

  const [text, setText] = useState(initialContent);
  const [statusMessage, setStatusMessage] = useState('Ln 24, Col 1');

  const handleSave = () => {
    sounds.playStartup();
    alert('guestbook.txt saved! Thank you for leaving your message.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ffffff' }}>
      {/* Notepad Menu bar */}
      <div className="xp-menubar">
        <span className="xp-menu-item" onClick={handleSave}><u>F</u>ile</span>
        <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>E</u>dit</span>
        <span className="xp-menu-item" onClick={() => sounds.playClick()}>F<u>o</u>rmat</span>
        <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>V</u>iew</span>
        <span className="xp-menu-item" onClick={() => sounds.playClick()}><u>H</u>elp</span>
      </div>

      {/* Editor Body */}
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const lines = e.target.value.substring(0, e.target.selectionStart).split('\n');
          setStatusMessage(`Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`);
        }}
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          outline: 'none',
          padding: '8px',
          fontFamily: "'Lucida Console', 'Courier New', monospace",
          fontSize: '12px',
          lineHeight: '1.4',
          resize: 'none',
          backgroundColor: '#ffffff',
          color: '#000000',
          whiteSpace: 'pre'
        }}
        spellCheck={false}
      />

      {/* Notepad Status bar */}
      <div
        style={{
          height: '20px',
          backgroundColor: '#ece9d8',
          borderTop: '1px solid #aca899',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 8px',
          fontSize: '11px',
          color: '#333'
        }}
      >
        <span style={{ borderLeft: '1px solid #aca899', paddingLeft: '8px' }}>{statusMessage}</span>
      </div>
    </div>
  );
}
