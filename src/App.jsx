import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import RandomMovieModal from './components/RandomMovieModal';
import WatchlistModal from './components/WatchlistModal';
import ApiKeyModal from './components/ApiKeyModal';
import { GENRES, INITIAL_MOVIES } from './data/moviesData';
import { Flame, Sparkles, Film, Heart } from 'lucide-react';

export default function App() {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [selectedGenre, setSelectedGenre] = useState('Barchasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  
  // Watchlist stored in LocalStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kinohub_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // TMDB API Key stored in LocalStorage
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('kinohub_tmdb_key') || '';
  });

  // Save watchlist changes
  useEffect(() => {
    try {
      localStorage.setItem('kinohub_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  const handleToggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [movie, ...prev];
      }
    });
  };

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearWatchlist = () => {
    setWatchlist([]);
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('kinohub_tmdb_key', key);
  };

  // Filtered movies based on genre and search
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre = selectedGenre === 'Barchasi' || movie.genres?.includes(selectedGenre);
      const matchesSearch = !searchTerm || 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.overview?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast?.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [movies, selectedGenre, searchTerm]);

  const featuredMovies = useMemo(() => {
    return movies.filter((m) => m.featured);
  }, [movies]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenRandom={() => setIsRandomOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Hero Showcase (shown when no search) */}
      {!searchTerm && (
        <HeroBanner
          featuredMovies={featuredMovies}
          onSelectMovie={setSelectedMovie}
          watchlist={watchlist}
          onToggleWatchlist={handleToggleWatchlist}
        />
      )}

      {/* Main Content Area */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '36px 24px 80px 24px',
        width: '100%',
        flex: 1
      }}>
        {/* Section Title & Genre Filters */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={24} color="#f43f5e" />
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>
                {searchTerm ? `"${searchTerm}" boʻyicha natijalar` : 'Kino va Seriallar Katalogi'}
              </h2>
              <span style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: '9999px'
              }}>
                {filteredMovies.length} ta film
              </span>
            </div>

            {/* Quick Random Shortcut */}
            <button
              onClick={() => setIsRandomOpen(true)}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              <Sparkles size={16} color="#fb7185" />
              <span>Kechki film tanlash</span>
            </button>
          </div>

          {/* Genre Filter Pills */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none'
          }}>
            {GENRES.map((g) => {
              const active = selectedGenre === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    background: active ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'rgba(255, 255, 255, 0.06)',
                    color: active ? '#ffffff' : '#cbd5e1',
                    boxShadow: active ? '0 4px 14px rgba(225, 29, 72, 0.4)' : 'none'
                  }}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <Film size={48} color="#475569" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
              Hech qanday film topilmadi
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
              Qidiruv soʻzini oʻzgartirib koʻring yoki boshqa janrni tanlang.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedGenre('Barchasi'); }}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              Barcha filmlarni koʻrsatish
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
                isSaved={watchlist.some((m) => m.id === movie.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#06080d',
        padding: '30px 24px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '13px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <span style={{ fontWeight: 700, color: '#e2e8f0' }}>KinoHub</span> — Oʻzbekiston va jahon kinosi shinavandalari uchun platforma
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <span style={{ color: '#94a3b8' }}>TMDB API & YouTube asosida</span>
            <span style={{ color: '#94a3b8' }}>© 2026 kino-hub</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isSaved={watchlist.some((m) => m.id === selectedMovie.id)}
          onToggleWatchlist={handleToggleWatchlist}
          allMovies={movies}
          onSelectMovie={setSelectedMovie}
        />
      )}

      {isRandomOpen && (
        <RandomMovieModal
          movies={movies}
          onClose={() => setIsRandomOpen(false)}
          onSelectMovie={setSelectedMovie}
        />
      )}

      {isWatchlistOpen && (
        <WatchlistModal
          watchlist={watchlist}
          onClose={() => setIsWatchlistOpen(false)}
          onSelectMovie={setSelectedMovie}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          onClearWatchlist={handleClearWatchlist}
        />
      )}

      {isApiKeyOpen && (
        <ApiKeyModal
          apiKey={apiKey}
          onSaveApiKey={handleSaveApiKey}
          onClose={() => setIsApiKeyOpen(false)}
        />
      )}
    </div>
  );
}
