import React, { useState, useEffect } from 'react';
import { X, Dices, Play, Star, RefreshCw } from 'lucide-react';

export default function RandomMovieModal({
  movies,
  onClose,
  onSelectMovie
}) {
  const [selectedMovie, setSelectedMovie] = useState(() => {
    return movies[Math.floor(Math.random() * movies.length)];
  });
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleShuffle = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelectedMovie(movies[Math.floor(Math.random() * movies.length)]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 85);
  };

  if (!selectedMovie) return null;

  return (
    <div className="animate-fade-in" style={{
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
      <div className="modal-box animate-scale-up" style={{
        background: '#0e131f',
        borderRadius: '24px',
        border: '1px solid rgba(244, 63, 94, 0.3)',
        width: '100%',
        maxWidth: '560px',
        padding: '30px',
        position: 'relative',
        boxShadow: '0 0 40px rgba(225, 29, 72, 0.25)',
        textAlign: 'center'
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
          <X size={22} />
        </button>

        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #e11d48, #be123c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 0 20px rgba(225, 29, 72, 0.5)'
        }}>
          <Dices size={28} color="#fff" />
        </div>

        <h3 className="modal-title" style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
          Tasodifiy Film Tanlovi
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '22px' }}>
          Kechqurun nima koʻrishni bilmayapsizmi? Algoritmimiz sizga eng mos durdona film tanlab beradi!
        </p>

        {/* Selected Movie Display */}
        <div style={{
          display: 'flex',
          gap: '16px',
          textAlign: 'left',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '14px',
          marginBottom: '22px',
          alignItems: 'center',
          transition: 'all 0.2s ease'
        }}>
          <img
            src={selectedMovie.poster}
            alt={selectedMovie.title}
            style={{
              width: '84px',
              aspectRatio: '2/3',
              borderRadius: '10px',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ color: '#facc15', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#facc15" color="#facc15" /> {selectedMovie.rating}
              </span>
              <span style={{ color: '#64748b', fontSize: '12px' }}>• {selectedMovie.year}</span>
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              {selectedMovie.title}
            </h4>
            <p className="line-clamp-2" style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
              {selectedMovie.overview}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleShuffle}
            disabled={isSpinning}
            className="btn-secondary"
            style={{ padding: '12px 18px', fontSize: '13px' }}
          >
            <RefreshCw size={15} className={isSpinning ? "spin-animation" : ""} />
            <span>Boshqa film tanlash</span>
          </button>

          <button
            onClick={() => {
              onSelectMovie(selectedMovie);
              onClose();
            }}
            className="btn-primary"
            style={{ padding: '12px 22px', fontSize: '13px' }}
          >
            <Play size={15} fill="#fff" />
            <span>Koʻrish va Treyler</span>
          </button>
        </div>
      </div>
    </div>
  );
}
