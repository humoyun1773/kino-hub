import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, Clock, Sparkles, Flame, Users, Film, Tv, ShieldCheck, ChevronRight } from 'lucide-react';

export default function HeroBanner({
  featuredMovies,
  onSelectMovie,
  onOpenRandom
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;
  const movie = featuredMovies[currentIndex];

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
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
        <div style={{
          background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.85) 0%, rgba(10, 14, 26, 0.95) 100%)',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '40px',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(225, 29, 72, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Background Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${movie.backdrop})`,
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Column: Catchy Text & Action */}
            <div>
              {/* Highlight Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.8px',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 20px rgba(225, 29, 72, 0.6)'
                }}>
                  <Flame size={15} color="#fff" />
                  <span>{movie.tag || 'TOP PREMYERA'}</span>
                </div>

                <div className="badge-rating">
                  <Star size={14} fill="#facc15" color="#facc15" />
                  <span>{movie.rating} IMDb</span>
                </div>

                <div style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={14} /> 4K Ultra HD
                </div>
              </div>

              {/* Movie Title */}
              <h1 style={{
                fontSize: 'clamp(32px, 4.2vw, 54px)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '16px',
                letterSpacing: '-1px',
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.9)'
              }}>
                {movie.title}
              </h1>

              {/* Quick Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#94a3b8', fontSize: '14px', marginBottom: '18px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={15} /> {movie.year}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={15} /> {movie.duration}</span>
                <span>•</span>
                <span style={{ color: '#fb7185', fontWeight: 600 }}>{movie.genres?.join(', ')}</span>
              </div>

              {/* Synopsis */}
              <p style={{
                fontSize: '15px',
                color: '#cbd5e1',
                lineHeight: 1.65,
                marginBottom: '28px',
                maxWidth: '560px'
              }}>
                {movie.overview}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <button
                  onClick={() => onSelectMovie(movie)}
                  className="btn-primary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '15px',
                    borderRadius: '12px',
                    boxShadow: '0 0 25px rgba(225, 29, 72, 0.6)'
                  }}
                >
                  <Play size={20} fill="#ffffff" />
                  <span>Treylerni tomosha qilish</span>
                </button>

                <button
                  onClick={onOpenRandom}
                  className="btn-secondary"
                  style={{
                    padding: '14px 22px',
                    fontSize: '15px',
                    borderRadius: '12px'
                  }}
                >
                  <Sparkles size={18} color="#fb7185" />
                  <span>Menga film tanlab ber</span>
                </button>
              </div>

              {/* Live viewers indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                <span style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  boxShadow: '0 0 10px #22c55e'
                }} />
                <span><strong>1,840 kishi</strong> hozir ushbu filmni koʻrmoqda</span>
              </div>
            </div>

            {/* Right Column: 3D Cinema Showcase Card with Live Previews */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
              {/* Main Visual Poster Card */}
              <div
                onClick={() => onSelectMovie(movie)}
                className="movie-card animate-scale-up"
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
                />

                {/* Center Play Button Overlay */}
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
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e11d48, #be123c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(225, 29, 72, 0.85)',
                    transform: 'scale(1)',
                    transition: 'transform 0.25s ease'
                  }}>
                    <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
                  </div>
                  <span style={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '13px',
                    marginTop: '12px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
                  }}>
                    Rasmiy Treyler (HD)
                  </span>
                </div>

                {/* Bottom Banner Inside Card */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '10px 14px',
                  background: 'rgba(6, 8, 13, 0.85)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{movie.title}</span>
                  <span style={{ fontSize: '12px', color: '#facc15', fontWeight: 700 }}>⭐ {movie.rating}</span>
                </div>
              </div>

              {/* Interactive Thumbnail Carousel */}
              <div style={{
                display: 'flex',
                gap: '12px',
                width: '100%',
                maxWidth: '380px',
                justifyContent: 'space-between'
              }}>
                {featuredMovies.map((m, idx) => {
                  const isSelected = currentIndex === idx;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        flex: 1,
                        aspectRatio: '16/10',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: isSelected ? '2px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected ? '0 0 15px rgba(225, 29, 72, 0.6)' : 'none',
                        transition: 'all 0.25s ease',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      <img
                        src={m.backdrop || m.poster}
                        alt={m.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

      {/* Catchy Live Ticker under Hero */}
      <div style={{
        background: 'rgba(225, 29, 72, 0.08)',
        borderTop: '1px solid rgba(225, 29, 72, 0.2)',
        borderBottom: '1px solid rgba(225, 29, 72, 0.2)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        color: '#f43f5e',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.3px',
        flexWrap: 'wrap',
        marginTop: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Flame size={16} /> <span>TOP 5 KINOLAR:</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', color: '#e2e8f0', fontWeight: 500, flexWrap: 'wrap' }}>
          <span>#1 Dune: Part Two (8.8)</span>
          <span>•</span>
          <span>#2 Inception (8.8)</span>
          <span>•</span>
          <span>#3 Interstellar (8.7)</span>
          <span>•</span>
          <span>#4 The Dark Knight (9.0)</span>
          <span>•</span>
          <span>#5 Oppenheimer (8.9)</span>
        </div>
      </div>
    </section>
  );
}
