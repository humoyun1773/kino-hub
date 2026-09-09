import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, Clock, Sparkles, Flame, ShieldCheck } from 'lucide-react';

export default function HeroBanner({
  featuredMovies,
  onSelectMovie,
  onOpenRandom
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!featuredMovies || featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featuredMovies]);

  if (!featuredMovies || !featuredMovies.length) return null;
  const movie = featuredMovies[currentIndex] || featuredMovies[0];

  return (
    <section className="hero-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient Theater Lighting Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(225, 29, 72, 0.28) 0%, rgba(225, 29, 72, 0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(59, 130, 246, 0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Main Showcase Container */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 24px 10px 24px',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="hero-card" style={{
          background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.85) 0%, rgba(10, 14, 26, 0.95) 100%)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '40px',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(225, 29, 72, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Poster Blur Effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${movie.backdrop || movie.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            pointerEvents: 'none'
          }} />

          {/* Grid Layout: Left Info, Right Visual Card */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Left Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 16px rgba(225, 29, 72, 0.6)'
                }}>
                  <Flame size={14} color="#fff" />
                  <span>{movie.tag || 'TOP PREMYERA'}</span>
                </div>

                <div className="badge-rating">
                  <Star size={13} fill="#facc15" color="#facc15" />
                  <span>{movie.rating} IMDb</span>
                </div>

                <div style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={13} /> 1080p Full HD
                </div>
              </div>

              {/* Title */}
              <h1 className="hero-title" style={{
                fontSize: 'clamp(28px, 4vw, 50px)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                marginBottom: '14px',
                letterSpacing: '-1px',
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)'
              }}>
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="hero-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8', fontSize: '13px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {movie.year}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {movie.duration}</span>
                <span>•</span>
                <span style={{ color: '#fb7185', fontWeight: 600 }}>{movie.genres?.join(', ')}</span>
              </div>

              {/* Overview */}
              <p className="hero-overview" style={{
                fontSize: '14px',
                color: '#cbd5e1',
                lineHeight: 1.6,
                marginBottom: '24px',
                maxWidth: '560px'
              }}>
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div className="hero-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <button
                  onClick={() => onSelectMovie(movie)}
                  className="btn-primary"
                  style={{
                    padding: '13px 24px',
                    fontSize: '14px',
                    borderRadius: '12px',
                    boxShadow: '0 0 25px rgba(225, 29, 72, 0.6)'
                  }}
                >
                  <Play size={18} fill="#ffffff" />
                  <span>Filmni tomosha qilish</span>
                </button>

                <button
                  onClick={onOpenRandom}
                  className="btn-secondary"
                  style={{
                    padding: '13px 20px',
                    fontSize: '14px',
                    borderRadius: '12px'
                  }}
                >
                  <Sparkles size={16} color="#fb7185" />
                  <span>Menga film tanlab ber</span>
                </button>
              </div>

              {/* Viewers indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  boxShadow: '0 0 10px #22c55e'
                }} />
                <span><strong>1,840 kishi</strong> hozir ushbu filmni tomosha qilmoqda</span>
              </div>
            </div>

            {/* Right Column: Visual Poster Card */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}>
              <div
                onClick={() => onSelectMovie(movie)}
                className="movie-card hero-3d-card animate-scale-up"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '380px',
                  aspectRatio: '16/10',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '2px solid rgba(225, 29, 72, 0.4)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 30px rgba(225, 29, 72, 0.35)'
                }}
              >
                <img
                  src={movie.backdrop || movie.poster}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.75)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80';
                  }}
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.75) 100%)'
                }}>
                  <div style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(225, 29, 72, 0.85)'
                  }}>
                    <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
                  </div>
                  <span style={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '12px',
                    marginTop: '10px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    HD Filmni Koʻrish
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '8px 12px',
                  background: 'rgba(6, 8, 13, 0.88)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{movie.title}</span>
                  <span style={{ fontSize: '12px', color: '#facc15', fontWeight: 700 }}>⭐ {movie.rating}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="hero-thumbs-row" style={{
                display: 'flex',
                gap: '10px',
                width: '100%',
                maxWidth: '380px',
                justifyContent: 'space-between'
              }}>
                {featuredMovies.slice(0, 4).map((m, idx) => {
                  const isSelected = currentIndex === idx;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        flex: 1,
                        aspectRatio: '16/10',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: isSelected ? '2px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected ? '0 0 12px rgba(225, 29, 72, 0.6)' : 'none',
                        transition: 'all 0.25s ease',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      <img
                        src={m.backdrop || m.poster}
                        alt={m.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: isSelected ? 'transparent' : 'rgba(0, 0, 0, 0.5)'
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="hero-ticker-wrap" style={{
        background: 'rgba(225, 29, 72, 0.08)',
        borderTop: '1px solid rgba(225, 29, 72, 0.2)',
        borderBottom: '1px solid rgba(225, 29, 72, 0.2)',
        padding: '9px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        color: '#f43f5e',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.3px',
        flexWrap: 'wrap',
        marginTop: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={15} /> <span>TOP TRENDDAGI FILMLAR:</span>
        </div>
        <div style={{ display: 'flex', gap: '14px', color: '#e2e8f0', fontWeight: 500, flexWrap: 'wrap' }}>
          {featuredMovies.slice(0, 5).map((m, i) => (
            <span key={m.id} style={{ cursor: 'pointer' }} onClick={() => onSelectMovie(m)}>
              #{i + 1} {m.title} (⭐ {m.rating})
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
