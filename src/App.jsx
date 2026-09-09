import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import RandomMovieModal from './components/RandomMovieModal';
import ApiKeyModal from './components/ApiKeyModal';
import AuthPage from './components/AuthPage';
import { INITIAL_MOVIES } from './data/moviesData';
import { Film, Flame, Star, Sparkles, Layers, SlidersHorizontal } from 'lucide-react';

export default function App() {
  // Authentication
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kinohub_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [movies] = useState(INITIAL_MOVIES);
  const [selectedGenre, setSelectedGenre] = useState('Barchasi');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'trending', 'top-rated', 'new'
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'year'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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

  // Genre selection also resets quick filter to all
  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setActiveFilter('all');
    setSearchTerm('');
  };

  // Quick filter selection
  const handleSelectFilter = (filterId) => {
    setActiveFilter(filterId);
    setSelectedGenre('Barchasi');
    setSearchTerm('');
  };

  // Filter and Sort Movies
  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];

    // 1. Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        m.overview?.toLowerCase().includes(q) ||
        m.director?.toLowerCase().includes(q) ||
        m.cast?.some((c) => c.toLowerCase().includes(q))
      );
    } else {
      // 2. Genre filter
      if (selectedGenre !== 'Barchasi') {
        result = result.filter((m) => m.genres?.includes(selectedGenre));
      }

      // 3. Quick filter
      if (activeFilter === 'trending') {
        result = result.filter((m) => m.featured || m.rating >= 8.7);
      } else if (activeFilter === 'top-rated') {
        result = result.filter((m) => m.rating >= 8.5);
      } else if (activeFilter === 'new') {
        result = result.filter((m) => m.year >= 2024);
      }
    }

    // 4. Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [movies, selectedGenre, activeFilter, searchTerm, sortBy]);

  const featuredMovies = useMemo(() => {
    return movies.filter((m) => m.featured);
  }, [movies]);

  // If not logged in, show Auth Screen
  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Get current catalog section title
  const getCatalogTitle = () => {
    if (searchTerm) return `"${searchTerm}" boʻyicha qidiruv natijalari`;
    if (selectedGenre !== 'Barchasi') return `${selectedGenre} Filmlari`;
    if (activeFilter === 'trending') return '🔥 Trenddagi Ommabop Filmlar';
    if (activeFilter === 'top-rated') return '⭐ Eng Yuqori Reytingli Filmlar (IMDb 8.5+)';
    if (activeFilter === 'new') return '🕒 2024 Yilgi Yangi Premyeralar';
    return 'Barcha Kinolar Katalogi';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06080d' }}>
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        selectedGenre={selectedGenre}
        onSelectGenre={handleSelectGenre}
        activeFilter={activeFilter}
        onSelectFilter={handleSelectFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        movies={movies}
        onOpenRandom={() => setIsRandomOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Right Panel */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenRandom={() => setIsRandomOpen(true)}
          onOpenApiKey={() => setIsApiKeyOpen(true)}
          hasApiKey={Boolean(apiKey)}
          currentUser={currentUser}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Hero Showcase (only shown when on all/home without search) */}
        {!searchTerm && selectedGenre === 'Barchasi' && activeFilter === 'all' && (
          <HeroBanner
            featuredMovies={featuredMovies}
            onSelectMovie={setSelectedMovie}
            onOpenRandom={() => setIsRandomOpen(true)}
          />
        )}

        {/* Catalog Main View */}
        <main style={{
          padding: '28px 32px 80px 32px',
          maxWidth: '1440px',
          width: '100%',
          flex: 1
        }}>
          {/* Catalog Header Info & Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '26px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
                  {getCatalogTitle()}
                </h2>
                <span style={{
                  background: 'rgba(225, 29, 72, 0.15)',
                  border: '1px solid rgba(225, 29, 72, 0.3)',
                  color: '#fb7185',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '9999px'
                }}>
                  {filteredAndSortedMovies.length} ta film
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                Chapdagi sidebar orqali janrlar va filtrlarni tezkor boshqaring
              </p>
            </div>

            {/* Quick Sort Pill buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <SlidersHorizontal size={14} /> Saralash:
              </span>
              <button
                onClick={() => setSortBy('rating')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: sortBy === 'rating' ? '#e11d48' : 'rgba(255, 255, 255, 0.06)',
                  color: sortBy === 'rating' ? '#fff' : '#cbd5e1',
                  transition: 'all 0.2s'
                }}
              >
                Reyting boʻyicha
              </button>
              <button
                onClick={() => setSortBy('year')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: sortBy === 'year' ? '#e11d48' : 'rgba(255, 255, 255, 0.06)',
                  color: sortBy === 'year' ? '#fff' : '#cbd5e1',
                  transition: 'all 0.2s'
                }}
              >
                Yil boʻyicha
              </button>
            </div>
          </div>

          {/* Movies Grid */}
          {filteredAndSortedMovies.length === 0 ? (
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
                Sidebar orqali "Barchasi"ni tanlang yoki qidiruv soʻzini tozalang.
              </p>
              <button
                onClick={() => { setSelectedGenre('Barchasi'); setActiveFilter('all'); setSearchTerm(''); }}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '14px' }}
              >
                Barcha filmlarni ochish
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '22px'
            }}>
              {filteredAndSortedMovies.map((movie) => (
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
          background: '#070a12',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          color: '#64748b',
          fontSize: '13px'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: '#e2e8f0' }}>KinoHub</span> — Zamonaviy kino va seriallar platformasi
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
            <span>Sidebar Katalog</span>
            <span>•</span>
            <span>TMDB API</span>
            <span>•</span>
            <span>© 2026</span>
          </div>
        </footer>
      </div>

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
