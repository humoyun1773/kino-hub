import React, { useEffect } from 'react';
import { X, Star, Heart, Calendar, Clock, Film, User, Tag } from 'lucide-react';

export default function MovieModal({
  movie,
  onClose,
  isSaved,
  onToggleWatchlist,
  allMovies,
  onSelectMovie
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  // Similar movies based on genre
  const similarMovies = allMovies
    .filter((m) => m.id !== movie.id && m.genres?.some((g) => movie.genres?.includes(g)))
    .slice(0, 4);

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
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Video / Backdrop */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          backgroundColor: '#000',
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden'
        }}>
          {movie.trailerId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerId}?autoplay=1&rel=0`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          ) : (
            <img
              src={movie.backdrop || movie.poster}
              alt={movie.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </div>

        {/* Details Content */}
        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <div className="badge-rating">
                  <Star size={14} fill="#facc15" color="#facc15" />
                  <span>{movie.rating}</span>
                </div>
                <span style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {movie.year}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {movie.duration}
                </span>
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {movie.title}
              </h2>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
                  Asl nomi: {movie.originalTitle}
                </p>
              )}
            </div>

            {/* Watchlist toggle */}
            <button
              onClick={() => onToggleWatchlist(movie)}
              className={isSaved ? "btn-secondary" : "btn-primary"}
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              <Heart size={16} color={isSaved ? '#f43f5e' : '#fff'} fill={isSaved ? '#f43f5e' : 'none'} />
              <span>{isSaved ? "Watchlistda saqlangan" : "Watchlistga saqlash"}</span>
            </button>
          </div>

          {/* Genres */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '14px 0 20px 0' }}>
            {movie.genres?.map((g) => (
              <span key={g} style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#e2e8f0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Tag size={12} color="#fb7185" />
                {g}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
              Qisqacha mazmuni
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: 1.65 }}>
              {movie.overview}
            </p>
          </div>

          {/* Cast & Crew */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {movie.director && (
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>
                  <Film size={14} /> Rejissyor
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>
                  {movie.director}
                </div>
              </div>
            )}

            {movie.cast?.length > 0 && (
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>
                  <User size={14} /> Bosh rollarda
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>
                  {movie.cast.join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {similarMovies.length > 0 && (
            <div>
              <h4 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
                Oʻxshash filmlar
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                {similarMovies.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectMovie(sim)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#161c2b',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <img
                      src={sim.poster}
                      alt={sim.title}
                      style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '8px' }}>
                      <div className="line-clamp-2" style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                        {sim.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#facc15', marginTop: '3px' }}>
                        ⭐ {sim.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
