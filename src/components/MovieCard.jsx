import React from 'react';
import { Star, Play } from 'lucide-react';

export default function MovieCard({
  movie,
  onSelect
}) {
  return (
    <div
      className="movie-card animate-scale-up"
      onClick={() => onSelect(movie)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Poster */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2/3',
        overflow: 'hidden',
        backgroundColor: '#131929'
      }}>
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          <div className="badge-rating" style={{ fontSize: '11px', padding: '3px 8px' }}>
            <Star size={11} fill="#facc15" color="#facc15" />
            <span>{movie.rating}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(6, 8, 13, 0.92) 0%, rgba(6, 8, 13, 0.3) 50%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        >
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(225, 29, 72, 0.7)'
          }}>
            <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: '3px' }} />
          </div>
          <span style={{ marginTop: '8px', fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
            KOʻRISH
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="movie-card-info" style={{
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{movie.year}</span>
            <span style={{ fontSize: '11px', color: '#475569' }}>•</span>
            <span style={{
              fontSize: '10px',
              color: '#fb7185',
              background: 'rgba(244, 63, 94, 0.1)',
              padding: '1px 6px',
              borderRadius: '4px',
              fontWeight: 600
            }}>
              {movie.genres?.[0] || 'Film'}
            </span>
          </div>

          <h3 className="movie-card-title line-clamp-2" style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.3
          }}>
            {movie.title}
          </h3>
        </div>

        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>{movie.duration || '2s'}</span>
          <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 700 }}>Treyler →</span>
        </div>
      </div>
    </div>
  );
}
