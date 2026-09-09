import React, { useState, useEffect } from 'react';
import { X, Star, Calendar, Clock, Film, User, Tag, Server, ShieldCheck, AlertCircle } from 'lucide-react';
import { getStreamServers, fetchMovieDetailsApi } from '../services/tmdbApi';

export default function MovieModal({
  movie,
  onClose,
  allMovies,
  onSelectMovie
}) {
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const servers = getStreamServers(movie.id);
  const currentServer = servers[activeServerIndex] || servers[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Fetch detailed cast and director for this movie
  useEffect(() => {
    let isMounted = true;
    setLoadingDetails(true);
    fetchMovieDetailsApi(movie.id)
      .then((data) => {
        if (isMounted && data) {
          setMovieDetails(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setLoadingDetails(false);
      });
    return () => { isMounted = false; };
  }, [movie.id]);

  const displayMovie = movieDetails || movie;
  const similarMovies = displayMovie.similar?.length > 0 ? displayMovie.similar : 
    allMovies.filter((m) => m.id !== movie.id).slice(0, 4);

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(0, 0, 0, 0.92)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}
    onClick={onClose}
    >
      <div className="modal-box animate-scale-up" style={{
        background: '#0a0e1a',
        borderRadius: '24px',
        border: '1px solid rgba(225, 29, 72, 0.3)',
        width: '100%',
        maxWidth: '960px',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.98), 0 0 35px rgba(225, 29, 72, 0.2)'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 30,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          title="Yopish (Esc)"
        >
          <X size={20} />
        </button>

        {/* Server Switcher Bar on Top of Video */}
        <div style={{
          padding: '14px 20px',
          background: '#070a12',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={16} color="#f43f5e" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
              Kino Pleyer Serverlari:
            </span>
          </div>

          {/* Server buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {servers.map((srv, idx) => {
              const active = activeServerIndex === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveServerIndex(idx)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: active ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: active ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? '0 0 12px rgba(225, 29, 72, 0.5)' : 'none'
                  }}
                >
                  {srv.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real Movie Stream Player Frame (ZERO YOUTUBE!) */}
        <div className="modal-video-wrap" style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          backgroundColor: '#000',
          overflow: 'hidden'
        }}>
          <iframe
            key={currentServer.url}
            src={currentServer.url}
            title={displayMovie.title}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
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
        </div>

        {/* Server notice note */}
        <div style={{
          background: 'rgba(244, 63, 94, 0.08)',
          borderBottom: '1px solid rgba(244, 63, 94, 0.15)',
          padding: '8px 20px',
          fontSize: '12px',
          color: '#fb7185',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={14} />
          <span>Agar birinchi server yuklanmasa, yuqoridagi <strong>Server 2</strong> yoki <strong>Server 3</strong> ga oʻting.</span>
        </div>

        {/* Movie Meta Content */}
        <div style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <div className="badge-rating">
                  <Star size={13} fill="#facc15" color="#facc15" />
                  <span>{displayMovie.rating}</span>
                </div>
                <span style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> {displayMovie.year}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {displayMovie.duration}
                </span>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={12} /> HD Toʻliq Film
                </div>
              </div>

              <h2 className="modal-title" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {displayMovie.title}
              </h2>
              {displayMovie.originalTitle && displayMovie.originalTitle !== displayMovie.title && (
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '12px' }}>
                  Asl nomi: {displayMovie.originalTitle}
                </p>
              )}
            </div>
          </div>

          {/* Genres */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '14px 0 20px 0' }}>
            {displayMovie.genres?.map((g) => (
              <span key={g} style={{
                fontSize: '11px',
                padding: '4px 12px',
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

          {/* Overview */}
          <div style={{ marginBottom: '22px' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px' }}>
              Qisqacha mazmuni
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.65 }}>
              {displayMovie.overview}
            </p>
          </div>

          {/* Cast & Crew */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            {displayMovie.director && (
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                  <Film size={13} /> Rejissyor
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>
                  {displayMovie.director}
                </div>
              </div>
            )}

            {displayMovie.cast?.length > 0 && (
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '11px', marginBottom: '4px' }}>
                  <User size={13} /> Bosh rollarda
                </div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>
                  {displayMovie.cast.join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div>
              <h4 style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
                Oʻxshash filmlar
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
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
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80';
                      }}
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
