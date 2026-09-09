import React, { useState, useEffect } from 'react';
import { Play, Heart, Star, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner({
  featuredMovies,
  onSelectMovie,
  watchlist,
  onToggleWatchlist
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;
  const movie = featuredMovies[currentIndex];
  const isSaved = watchlist.some((m) => m.id === movie.id);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '480px',
      height: '62vh',
      maxHeight: '620px',
      overflow: 'hidden',
      borderRadius: '0 0 24px 24px',
      background: '#0a0e1a'
    }}>
      {/* Background Backdrop */}
      <img
        src={movie.backdrop}
        alt={movie.title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 25%',
          transition: 'all 0.7s ease-in-out',
          filter: 'brightness(0.6)'
        }}
      />

      {/* Dark Vignette Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, #080a10 0%, rgba(8, 10, 16, 0.85) 45%, rgba(8, 10, 16, 0.2) 80%, rgba(8, 10, 16, 0.9) 100%), linear-gradient(to top, #080a10 0%, transparent 60%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        height: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: '50px',
        zIndex: 10
      }}>
        {/* Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span style={{
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '4px 10px',
            borderRadius: '6px'
          }}>
            Ommabop Tavsiya
          </span>
          <div className="badge-rating">
            <Star size={14} fill="#facc15" color="#facc15" />
            <span>{movie.rating}</span>
          </div>
          <span style={{ color: '#cbd5e1', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={14} /> {movie.year}
          </span>
          <span style={{ color: '#cbd5e1', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} /> {movie.duration}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(28px, 4.5vw, 48px)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          marginBottom: '12px',
          maxWidth: '800px',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}>
          {movie.title}
        </h1>

        {/* Genres */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {movie.genres.map((g) => (
            <span key={g} style={{
              fontSize: '12px',
              padding: '3px 10px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#e2e8f0'
            }}>
              {g}
            </span>
          ))}
        </div>

        {/* Overview */}
        <p className="line-clamp-3" style={{
          fontSize: '15px',
          color: '#cbd5e1',
          maxWidth: '640px',
          marginBottom: '26px',
          lineHeight: 1.6
        }}>
          {movie.overview}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onSelectMovie(movie)}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '15px' }}
          >
            <Play size={18} fill="#ffffff" />
            <span>Treylerni tomosha qilish</span>
          </button>

          <button
            onClick={() => onToggleWatchlist(movie)}
            className="btn-secondary"
            style={{ padding: '12px 20px', fontSize: '15px' }}
          >
            <Heart size={18} color={isSaved ? '#f43f5e' : '#fff'} fill={isSaved ? '#f43f5e' : 'none'} />
            <span>{isSaved ? "Watchlistda saqlangan" : "Watchlistga qo'shish"}</span>
          </button>
        </div>

        {/* Carousel controls */}
        {featuredMovies.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {featuredMovies.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    width: currentIndex === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentIndex === i ? '#e11d48' : 'rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
