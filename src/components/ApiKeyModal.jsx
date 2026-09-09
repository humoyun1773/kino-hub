import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ApiKeyModal({
  apiKey,
  onSaveApiKey,
  onClose
}) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    setStatusMsg('Kalit saqlandi!');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={onClose}
    >
      <div style={{
        background: '#0e131f',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '100%',
        maxWidth: '520px',
        padding: '28px',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <KeyRound size={22} color="#22c55e" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
              TMDB API Sozlamalari
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Jonli kinolar va seriallar maʼlumotlari
            </span>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '16px' }}>
          KinoHub hozirda toʻliq boyitilgan tayyor kinolar katalogi bilan ishlamoqda. Agar real vaqtda TMDB bazasidagi millionlab filmlarni qidirishni istasangiz, bepul TMDB API kalitingizni kiriting:
        </p>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
            TMDB API Read Access Token yoki API Key (v3):
          </label>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Masalan: 3fd2b99b7a6..."
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '10px',
          padding: '10px 14px',
          fontSize: '12px',
          color: '#93c5fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <span>Bepul API kalit olish:</span>
          <a
            href="https://www.themoviedb.org/settings/api"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa', fontWeight: 600 }}
          >
            themoviedb.org <ExternalLink size={12} />
          </a>
        </div>

        {statusMsg && (
          <div style={{ color: '#22c55e', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <CheckCircle2 size={16} /> {statusMsg}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '10px 18px', fontSize: '13px' }}
          >
            Bekor qilish
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '13px' }}
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
