import React, { useState } from 'react';
import { Send, Paperclip, CheckCircle2, Clock, Mail } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * ContactWindow Component
 * Recreates Windows XP Outlook Express "New Message" composition dialog
 * for booking photography shoots, prints, and inquiries.
 */
export default function ContactWindow({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Editorial Portrait',
    date: '',
    budget: '$1,000 - $3,000',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      sounds.playError();
      alert('Please fill out Name, Email, and Message before sending.');
      return;
    }

    sounds.playClick();
    setStatus('sending');

    // Simulate authentic Outlook Express mail dispatch
    setTimeout(() => {
      sounds.playStartup();
      setStatus('success');
    }, 1400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ece9d8' }}>
      {/* Outlook Express Toolbar */}
      <div className="xp-toolbar" style={{ borderBottom: '1px solid #707070' }}>
        <button
          className="xp-button primary"
          onClick={handleSubmit}
          disabled={status === 'sending'}
          style={{ height: '24px', padding: '0 10px' }}
        >
          <Send size={12} color="#0054e3" />
          <span><b>Send</b></span>
        </button>

        <button className="xp-tool-btn" onClick={() => sounds.playClick()}>
          <Paperclip size={13} color="#555" />
          <span>Attach Photo</span>
        </button>

        <div className="xp-tool-divider" />

        <button className="xp-tool-btn" onClick={() => sounds.playClick()}>
          <span>Spelling</span>
        </button>
      </div>

      {status === 'success' ? (
        <div
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📬</div>
          <h3 style={{ margin: '0 0 6px 0', color: '#002e7a' }}>Message Delivered!</h3>
          <p style={{ color: '#555', maxWidth: '380px', margin: '0 0 16px 0', fontSize: '11px', lineHeight: 1.4 }}>
            Thank you, <b>{formData.name}</b>. Your booking inquiry for <b>{formData.service}</b> has been queued and sent to Fox Photography. I typically reply within 24 hours.
          </p>
          <button
            className="xp-button primary"
            onClick={() => {
              setStatus('idle');
              setFormData({
                name: '',
                email: '',
                service: 'Editorial Portrait',
                date: '',
                budget: '$1,000 - $3,000',
                message: ''
              });
            }}
          >
            Compose Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ece9d8' }}>
          {/* Header Fields (To, Cc, Subject) */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid #aca899' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '60px', color: '#444', textAlign: 'right', fontWeight: 'bold' }}>To:</span>
              <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #7f9db9', padding: '2px 6px', fontSize: '11px' }}>
                Fox Photography &lt;fox@foxportfolio.com&gt;
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '60px', color: '#444', textAlign: 'right', fontWeight: 'bold' }}>From:</span>
              <input
                type="text"
                name="name"
                placeholder="Your Name (e.g. Elena)"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '45%', border: '1px solid #7f9db9', padding: '2px 6px', fontSize: '11px' }}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="your.email@domain.com"
                value={formData.email}
                onChange={handleChange}
                style={{ flex: 1, border: '1px solid #7f9db9', padding: '2px 6px', fontSize: '11px' }}
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '60px', color: '#444', textAlign: 'right', fontWeight: 'bold' }}>Type:</span>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                style={{ flex: 1, border: '1px solid #7f9db9', padding: '2px', fontSize: '11px' }}
              >
                <option value="Editorial Portrait">Editorial & Personal Portraiture</option>
                <option value="Architectural / Commercial">Architectural & Commercial Spaces</option>
                <option value="Analog 35mm Wedding">Analog 35mm & Film Celebration</option>
                <option value="Fine Art Print Order">Custom Fine Art Darkroom Print</option>
                <option value="General Collaboration">General Creative Collaboration</option>
              </select>

              <span style={{ color: '#444', fontWeight: 'bold' }}>Target Date:</span>
              <input
                type="text"
                name="date"
                placeholder="Approximate Date"
                value={formData.date}
                onChange={handleChange}
                style={{ width: '110px', border: '1px solid #7f9db9', padding: '2px 6px', fontSize: '11px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '60px', color: '#444', textAlign: 'right', fontWeight: 'bold' }}>Subject:</span>
              <input
                type="text"
                readOnly
                value={`[Portfolio Booking] ${formData.service} Inquiry from ${formData.name || 'Client'}`}
                style={{ flex: 1, backgroundColor: '#f5f5f5', border: '1px solid #aca899', padding: '2px 6px', fontSize: '11px', color: '#333' }}
              />
            </div>
          </div>

          {/* Email Body TextArea */}
          <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column' }}>
            <textarea
              name="message"
              placeholder="Write your project details, location ideas, timeline, and questions here..."
              value={formData.message}
              onChange={handleChange}
              style={{
                flex: 1,
                width: '100%',
                resize: 'none',
                fontFamily: 'Tahoma, Segoe UI, sans-serif',
                fontSize: '12px',
                padding: '8px',
                border: '1px solid #7f9db9',
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Outlook Express Status & Action bar */}
          <div style={{ padding: '6px 10px', borderTop: '1px solid #aca899', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ece9d8' }}>
            <span style={{ fontSize: '10px', color: '#666' }}>
              {status === 'sending' ? 'Connecting to SMTP server...' : 'Ready to send message'}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="submit"
                className="xp-button primary"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
