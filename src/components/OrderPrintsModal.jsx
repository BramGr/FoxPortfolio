import React, { useState } from 'react';
import { Printer, Check, ChevronRight, ChevronLeft, Package } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * OrderPrintsModal Component
 * Windows XP "Photo Printing Wizard" step-by-step assistant for ordering prints.
 */
export default function OrderPrintsModal({ photo, onClose, onOpenContact }) {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState('11x14');
  const [paper, setPaper] = useState('rag');
  const [quantity, setQuantity] = useState(1);

  const priceMap = {
    '8x10': 65,
    '11x14': 120,
    '16x20': 210,
    '24x36': 390
  };

  const handleNext = () => {
    sounds.playClick();
    if (step < 3) {
      setStep(step + 1);
    } else {
      sounds.playStartup();
      alert(`Print Order Request for "${photo?.title || 'Selected Photo'}" (${size}, ${paper.toUpperCase()}, Qty: ${quantity}) has been forwarded to the booking queue! Total: $${(priceMap[size] || 120) * quantity}`);
      onClose();
    }
  };

  const handleBack = () => {
    sounds.playClick();
    if (step > 1) setStep(step - 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ece9d8' }}>
      {/* Wizard Header */}
      <div
        style={{
          height: '60px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #aca899',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#002e7a' }}>Photo Printing Wizard</div>
          <div style={{ fontSize: '11px', color: '#555' }}>
            {step === 1 && 'Confirm image and print specifications'}
            {step === 2 && 'Select archival paper grade & quantity'}
            {step === 3 && 'Order summary & dispatch to darkroom'}
          </div>
        </div>
        <Printer size={28} color="#0054e3" />
      </div>

      {/* Wizard Step Content */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', fontSize: '11px' }}>
        {step === 1 && (
          <div style={{ display: 'flex', gap: '16px' }}>
            {photo && (
              <img
                src={photo.thumbnail || photo.url}
                alt={photo.title}
                style={{ width: '130px', height: '110px', objectFit: 'cover', border: '1px solid #707070' }}
              />
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><b>Selected Artwork:</b> {photo?.title || 'Mountain Dawn'}</div>
              <div><b>Native Dimensions:</b> {photo?.dimensions || '6000 x 4000'}</div>
              <div><b>Recommended Print Dimensions:</b></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="size" value="8x10" checked={size === '8x10'} onChange={() => setSize('8x10')} />
                  <span>8" × 10" Archival Print — <b>$65</b></span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="size" value="11x14" checked={size === '11x14'} onChange={() => setSize('11x14')} />
                  <span>11" × 14" Collector Medium — <b>$120</b> (Most Popular)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="size" value="16x20" checked={size === '16x20'} onChange={() => setSize('16x20')} />
                  <span>16" × 20" Gallery Exhibition Size — <b>$210</b></span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="size" value="24x36" checked={size === '24x36'} onChange={() => setSize('24x36')} />
                  <span>24" × 36" Large Format Statement — <b>$390</b></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <b>Choose Museum-Grade Substrate:</b>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', cursor: 'pointer', background: '#fff', padding: '6px', border: '1px solid #7f9db9' }}>
                <input type="radio" name="paper" value="rag" checked={paper === 'rag'} onChange={() => setPaper('rag')} />
                <div>
                  <b>Hahnemühle Photo Rag 308gsm (100% Cotton)</b>
                  <div style={{ color: '#555', fontSize: '10px' }}>Deep velvety blacks, warm chalky tone, zero glare. Best for black & white and portraits.</div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', cursor: 'pointer', background: '#fff', padding: '6px', border: '1px solid #7f9db9' }}>
                <input type="radio" name="paper" value="pearl" checked={paper === 'pearl'} onChange={() => setPaper('pearl')} />
                <div>
                  <b>Ilford Galerie Smooth Pearl 310gsm</b>
                  <div style={{ color: '#555', fontSize: '10px' }}>Subtle satin sheen, extreme sharpness, vibrant landscape color saturation.</div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', cursor: 'pointer', background: '#fff', padding: '6px', border: '1px solid #7f9db9' }}>
                <input type="radio" name="paper" value="metallic" checked={paper === 'metallic'} onChange={() => setPaper('metallic')} />
                <div>
                  <b>Kodak Professional Endura Metallic</b>
                  <div style={{ color: '#555', fontSize: '10px' }}>Pearlescent finish with iridescent three-dimensional depth. Ideal for neon and street photos.</div>
                </div>
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <span><b>Number of Copies:</b></span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ padding: '2px 8px', border: '1px solid #7f9db9' }}
              >
                <option value={1}>1 copy</option>
                <option value={2}>2 copies</option>
                <option value={3}>3 copies</option>
                <option value={5}>5 copies</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#fff', border: '1px solid #7f9db9', padding: '12px' }}>
              <b style={{ color: '#002e7a', fontSize: '12px' }}>Order Confirmation Summary</b>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><b>Artwork:</b> {photo?.title}</div>
                <div><b>Print Dimensions:</b> {size}</div>
                <div><b>Paper Type:</b> {paper === 'rag' ? 'Hahnemühle Photo Rag' : paper === 'pearl' ? 'Ilford Galerie Pearl' : 'Kodak Endura Metallic'}</div>
                <div><b>Quantity:</b> {quantity}</div>
                <div><b>Hand Signed & Numbered:</b> Included by Artist</div>
                <div><b>Certificate of Authenticity:</b> Included</div>
                <div style={{ borderTop: '1px solid #aca899', paddingTop: '6px', marginTop: '6px', fontWeight: 'bold', fontSize: '12px', color: '#2e7d32' }}>
                  Total Estimated Investment: ${(priceMap[size] || 120) * quantity} USD
                </div>
              </div>
            </div>

            <p style={{ margin: 0, color: '#555' }}>
              Clicking <b>Finish</b> will log your print requisition and notify the artist. You may also contact directly for custom framing and international crating.
            </p>
          </div>
        )}
      </div>

      {/* Wizard Footer Controls */}
      <div style={{ height: '40px', backgroundColor: '#ece9d8', borderTop: '1px solid #aca899', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 12px', gap: '6px' }}>
        <button
          className="xp-button"
          disabled={step === 1}
          onClick={handleBack}
          style={{ opacity: step === 1 ? 0.5 : 1 }}
        >
          &lt; Back
        </button>

        <button className="xp-button primary" onClick={handleNext}>
          {step === 3 ? 'Finish' : 'Next >'}
        </button>

        <button className="xp-button" onClick={onClose} style={{ marginLeft: '6px' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
