import React, { useEffect } from 'react';
import { X, Star, Calendar, Clock, Film, User, Tag } from 'lucide-react';

export default function MovieModal({
  movie,
  onClose,
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

  const similarMovies = allMovies
    .filter((m) => m.id !== movie.id && m.genres?.some((g) => movie.genres?.includes(g)))
    .slice(0, 4);

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}
    onClick={onClose}
    >
      <div className="modal-box animate-scale-up" style={{
        background: '#0d121e',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        width: '100%',
        maxWidth: '920px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.95)'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <X size={18} />
        </button>

        {/* Video Frame */}
        <div className="modal-video-wrap" style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          backgroundColor: '#000',
          borderRadius: '24px 24px 0 0',
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

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <div className="badge-rating">
                  <Star size={13} fill="#facc15" color="#facc15" />
                  <span>{movie.rating}</span>
                </div>
                <span style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> {movie.year}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {movie.duration}
                </span>
              </div>

              <h2 className="modal-title" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {movie.title}
              </h2>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>
                  Asl nomi: {movie.originalTitle}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0 18px 0' }}>
            {movie.genres?.map((g) => (
              <span key={g} style={{
                fontSize: '11px',
                padding: '3px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#e2e8f0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Tag size={11} color="#fb7185" />
                {g}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
              Qisqacha mazmuni
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6 }}>
              {movie.overview}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            {movie.director && (
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                  <Film size={13} /> Rejissyor
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>
                  {movie.director}
                </div>
              </div>
            )}

            {movie.cast?.length > 0 && (
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                  <User size={13} /> Bosh rollarda
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>
                  {movie.cast.join(', ')}
                </div>
              </div>
            )}
          </div>

          {similarMovies.length > 0 && (
            <div>
              <h4 style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>
                Oʻxshash filmlar
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                {similarMovies.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectMovie(sim)}
                    className="movie-card"
                    style={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#141a29'
                    }}
                  >
                    <img
                      src={sim.poster}
                      alt={sim.title}
                      style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '6px 8px' }}>
                      <div className="line-clamp-2" style={{ fontSize: '11px', fontWeight: 600, color: '#fff' }}>
                        {sim.title}
                      </div>
                      <div style={{ fontSize: '10px', color: '#facc15', marginTop: '2px' }}>
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
