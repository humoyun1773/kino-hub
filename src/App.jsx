import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import RandomMovieModal from './components/RandomMovieModal';
import ApiKeyModal from './components/ApiKeyModal';
import AuthPage from './components/AuthPage';
import { GENRES, INITIAL_MOVIES } from './data/moviesData';
import { Flame, Sparkles, Film } from 'lucide-react';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kinohub_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [selectedGenre, setSelectedGenre] = useState('Barchasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  
  // TMDB API Key stored in LocalStorage
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('kinohub_tmdb_key') || '';
  });

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('kinohub_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kinohub_current_user');
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

  // If NOT logged in, show real Login / Sign Up Page
  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenRandom={() => setIsRandomOpen(true)}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasApiKey={Boolean(apiKey)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Hero Showcase (shown when no search) */}
      {!searchTerm && (
        <HeroBanner
          featuredMovies={featuredMovies}
          onSelectMovie={setSelectedMovie}
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
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: active ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'rgba(255, 255, 255, 0.06)',
                    color: active ? '#ffffff' : '#cbd5e1',
                    boxShadow: active ? '0 4px 16px rgba(225, 29, 72, 0.45)' : 'none',
                    transform: active ? 'scale(1.05)' : 'scale(1)'
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
          <div className="animate-fade-in" style={{
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
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#05070a',
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
