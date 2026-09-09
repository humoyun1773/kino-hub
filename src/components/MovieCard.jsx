import React from 'react';
import { Star, Heart, Play } from 'lucide-react';

export default function MovieCard({
  movie,
  onSelect,
  isSaved,
  onToggleWatchlist
}) {
  return (
    <div
      className="movie-card"
      onClick={() => onSelect(movie)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Poster wrapper */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2/3',
        overflow: 'hidden',
        backgroundColor: '#161d2d'
      }}>
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <div className="badge-rating" style={{ pointerEvents: 'auto' }}>
            <Star size={12} fill="#facc15" color="#facc15" />
            <span>{movie.rating}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(movie);
            }}
            style={{
              pointerEvents: 'auto',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, background 0.2s ease'
            }}
            title={isSaved ? "Watchlistdan o'chirish" : "Watchlistga qo'shish"}
          >
            <Heart
              size={16}
              color={isSaved ? '#f43f5e' : '#fff'}
              fill={isSaved ? '#f43f5e' : 'none'}
            />
          </button>
        </div>

        {/* Hover overlay play button */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8, 10, 16, 0.9) 0%, transparent 60%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        >
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(225, 29, 72, 0.6)',
            transform: 'scale(0.95)',
            transition: 'transform 0.2s ease'
          }}>
            <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: '3px' }} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{movie.year}</span>
            <span style={{ fontSize: '12px', color: '#475569' }}>•</span>
            <span style={{
              fontSize: '11px',
              color: '#fb7185',
              background: 'rgba(244, 63, 94, 0.1)',
              padding: '2px 8px',
              borderRadius: '6px',
              fontWeight: 600
            }}>
              {movie.genres?.[0] || 'Film'}
            </span>
          </div>

          <h3 className="line-clamp-2" style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.3
          }}>
            {movie.title}
          </h3>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>{movie.duration || '2s'}</span>
          <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600 }}>Treyler ▶</span>
        </div>
      </div>
    </div>
  );
}
