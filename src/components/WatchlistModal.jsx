import React from 'react';
import { X, Heart, Trash2, Play, Star } from 'lucide-react';

export default function WatchlistModal({
  watchlist,
  onClose,
  onSelectMovie,
  onRemoveFromWatchlist,
  onClearWatchlist
}) {
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
        maxWidth: '680px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={20} color="#f43f5e" fill="#f43f5e" />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
              Sevimli Filmlaringiz ({watchlist.length})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {watchlist.length > 0 && (
              <button
                onClick={onClearWatchlist}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Trash2 size={14} /> Tozalash
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* List Content */}
        <div style={{
          padding: '20px 24px',
          overflowY: 'auto',
          flex: 1
        }}>
          {watchlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
              <Heart size={48} color="#334155" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                Hozircha sevimli filmlar yoʻq
              </h4>
              <p style={{ fontSize: '13px' }}>
                Kino kartalaridagi yurakcha belgisini bosib, keyinroq koʻrish uchun saqlab qoʻyishingiz mumkin.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {watchlist.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <div
                    onClick={() => {
                      onSelectMovie(m);
                      onClose();
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', flex: 1 }}
                  >
                    <img
                      src={m.poster}
                      alt={m.title}
                      style={{ width: '48px', aspectRatio: '2/3', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                        {m.title}
                      </h5>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
                        <span style={{ color: '#facc15', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Star size={12} fill="#facc15" color="#facc15" /> {m.rating}
                        </span>
                        <span>• {m.year}</span>
                        <span>• {m.genres?.[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
                        onSelectMovie(m);
                        onClose();
                      }}
                      className="btn-primary"
                      style={{ padding: '8px 14px', fontSize: '13px' }}
                    >
                      <Play size={14} fill="#fff" />
                      <span>Koʻrish</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWatchlist(m.id)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="O'chirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
