import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Paperclip } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * ContactSection Component
 * Portfolio booking & contact form styled like Windows XP Outlook Express
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Editorial Portrait',
    date: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

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

    setTimeout(() => {
      sounds.playStartup();
      setStatus('success');
    }, 1200);
  };

  return (
    <section id="contact" style={{ margin: '24px 0 36px 0' }}>
      <div className="xp-window" style={{ width: '100%' }}>
        {/* Titlebar */}
        <div className="xp-titlebar">
          <div className="xp-titlebar-left">
            <span>✉️</span>
            <span>Outlook Express - New Message (Book a Shoot & Inquiries)</span>
          </div>
          <div className="xp-titlebar-controls">
            <button className="xp-control-btn min" onClick={() => sounds.playClick()}>–</button>
            <button className="xp-control-btn max" onClick={() => sounds.playClick()}>□</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="xp-menubar" style={{ borderBottom: '1px solid #707070' }}>
          <button
            type="button"
            className="xp-button primary"
            onClick={handleSubmit}
            disabled={status === 'sending'}
            style={{ height: '22px' }}
          >
            <Send size={11} color="#0054e3" />
            <span>Send Message</span>
          </button>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}>Attach Photo</span>
          <span className="xp-menu-item" onClick={() => sounds.playClick()}>Spelling</span>
        </div>

        {/* Body */}
        <div style={{ backgroundColor: '#ece9d8', padding: '16px' }}>
          {status === 'success' ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #7f9db9',
                padding: '30px 20px',
                textAlign: 'center',
                borderRadius: '3px'
              }}
            >
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>📬</div>
              <h3 style={{ margin: '0 0 6px 0', color: '#002e7a' }}>Booking Inquiry Delivered!</h3>
              <p style={{ color: '#555', fontSize: '11px', maxWidth: '420px', margin: '0 auto 16px auto' }}>
                Thank you, <b>{formData.name}</b>! Your inquiry for <b>{formData.service}</b> has been received.
                Fox Photography will review your dates and reply to <b>{formData.email}</b> within 24 hours.
              </p>
              <button
                className="xp-button primary"
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', service: 'Editorial Portrait', date: '', message: '' });
                }}
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold', color: '#444' }}>To:</span>
                <div style={{ flex: 1, backgroundColor: '#ffffff', border: '1px solid #7f9db9', padding: '2px 8px' }}>
                  Fox Photography &lt;fox@foxportfolio.com&gt;
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold', color: '#444' }}>From:</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name (e.g. Elena Rostova)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ flex: 1, minWidth: '160px', border: '1px solid #7f9db9', padding: '3px 8px', fontSize: '11px' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ flex: 1, minWidth: '180px', border: '1px solid #7f9db9', padding: '3px 8px', fontSize: '11px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold', color: '#444' }}>Type:</span>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{ flex: 1, minWidth: '160px', border: '1px solid #7f9db9', padding: '2px 6px', fontSize: '11px' }}
                >
                  <option value="Editorial Portrait">Editorial & Personal Portraiture</option>
                  <option value="Architectural / Commercial">Architectural & Commercial Spaces</option>
                  <option value="Analog 35mm Celebration">Analog 35mm & Film Celebration</option>
                  <option value="Fine Art Darkroom Print">Custom Fine Art Darkroom Print</option>
                  <option value="General Collaboration">General Creative Collaboration</option>
                </select>

                <span style={{ fontWeight: 'bold', color: '#444' }}>Timeline / Date:</span>
                <input
                  type="text"
                  name="date"
                  placeholder="Approx. Target Date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{ width: '130px', border: '1px solid #7f9db9', padding: '3px 8px', fontSize: '11px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '60px', textAlign: 'right', fontWeight: 'bold', color: '#444' }}>Subject:</span>
                <input
                  type="text"
                  readOnly
                  value={`[Photography Booking] ${formData.service} from ${formData.name || 'Client'}`}
                  style={{ flex: 1, backgroundColor: '#f0ede0', border: '1px solid #aca899', padding: '2px 8px', fontSize: '11px', color: '#333' }}
                />
              </div>

              <div style={{ marginTop: '4px' }}>
                <textarea
                  name="message"
                  placeholder="Tell me about your project, vision, locations, and any specific questions..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    fontFamily: 'Tahoma, sans-serif',
                    fontSize: '11px',
                    padding: '8px',
                    border: '1px solid #7f9db9',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="xp-button primary"
                  disabled={status === 'sending'}
                  style={{ padding: '6px 18px' }}
                >
                  <Send size={12} color="#0054e3" />
                  <span>{status === 'sending' ? 'Connecting to SMTP...' : 'Dispatch Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
