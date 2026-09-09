import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroBanner from './components/HeroBanner';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import RandomMovieModal from './components/RandomMovieModal';
import ApiKeyModal from './components/ApiKeyModal';
import AuthPage from './components/AuthPage';
import { 
  fetchTrendingMovies, 
  fetchPopularMovies, 
  fetchTopRatedMovies, 
  fetchUpcomingMovies, 
  fetchMoviesByGenre, 
  searchMoviesApi 
} from './services/tmdbApi';
import { Film, SlidersHorizontal, Loader2, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kinohub_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Movie lists from live API
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedGenreId, setSelectedGenreId] = useState('all');
  const [selectedGenreName, setSelectedGenreName] = useState('Barchasi');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'trending', 'top-rated', 'new'
  const [sortBy, setSortBy] = useState('rating');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('kinohub_tmdb_key') || '';
  });

  // 1. Initial Load: Fetch Trending & Popular Movies
  const loadInitialData = async () => {
    setLoading(true);
    setError('');
    try {
      const [trending, popular] = await Promise.all([
        fetchTrendingMovies(),
        fetchPopularMovies(1)
      ]);
      setFeaturedMovies(trending);
      setMovies(popular);
    } catch (err) {
      console.error(err);
      setError('Filmlarni API orqali yuklashda muammo yuz berdi. Iltimos qayta urinib koʻring.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [apiKey]);

  // 2. Fetch movies when filter or genre changes
  const loadFilteredMovies = async () => {
    if (searchTerm.trim()) return; // Search handles its own

    setLoading(true);
    setError('');
    try {
      let data = [];
      if (selectedGenreId !== 'all') {
        data = await fetchMoviesByGenre(selectedGenreId);
      } else if (activeFilter === 'trending') {
        data = await fetchTrendingMovies();
      } else if (activeFilter === 'top-rated') {
        data = await fetchTopRatedMovies();
      } else if (activeFilter === 'new') {
        data = await fetchUpcomingMovies();
      } else {
        data = await fetchPopularMovies();
      }
      setMovies(data);
    } catch (err) {
      console.error(err);
      setError('Maʼlumotlarni yuklab boʻlmadi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      loadFilteredMovies();
    }
  }, [selectedGenreId, activeFilter]);

  // 3. Search with Debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      loadFilteredMovies();
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const results = await searchMoviesApi(searchTerm.trim());
        setMovies(results);
      } catch (err) {
        console.error(err);
        setError('Qidiruvda xatolik yuz berdi.');
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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
    loadInitialData();
  };

  const handleSelectGenre = (genreId, genreName) => {
    setSelectedGenreId(genreId);
    setSelectedGenreName(genreName);
    setActiveFilter('all');
    setSearchTerm('');
  };

  const handleSelectFilter = (filterId) => {
    setActiveFilter(filterId);
    setSelectedGenreId('all');
    setSelectedGenreName('Barchasi');
    setSearchTerm('');
  };

  // Sort Movies
  const sortedMovies = useMemo(() => {
    const list = [...movies];
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      list.sort((a, b) => Number(b.year) - Number(a.year));
    }
    return list;
  }, [movies, sortBy]);

  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  const getCatalogTitle = () => {
    if (searchTerm) return `"${searchTerm}" boʻyicha jonli qidiruv`;
    if (selectedGenreId !== 'all') return `${selectedGenreName} filmlari (Jonli API)`;
    if (activeFilter === 'trending') return '🔥 Trenddagi Premyeralar (TMDB)';
    if (activeFilter === 'top-rated') return '⭐ Eng Yuqori Reytingli Filmlar';
    if (activeFilter === 'new') return '🕒 Yangi Premyeralar';
    return 'Jonli Kinolar Katalogi (TMDB API)';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06080d' }}>
      {/* 1. Left Sidebar */}
      <Sidebar
        selectedGenreId={selectedGenreId}
        onSelectGenre={handleSelectGenre}
        activeFilter={activeFilter}
        onSelectFilter={handleSelectFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onOpenRandom={() => setIsRandomOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Right Container */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease'
      }}>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenRandom={() => setIsRandomOpen(true)}
          onOpenApiKey={() => setIsApiKeyOpen(true)}
          hasApiKey={Boolean(apiKey)}
          currentUser={currentUser}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Hero Showcase (shown on Home without active search) */}
        {!searchTerm && selectedGenreId === 'all' && activeFilter === 'all' && featuredMovies.length > 0 && (
          <HeroBanner
            featuredMovies={featuredMovies}
            onSelectMovie={setSelectedMovie}
            onOpenRandom={() => setIsRandomOpen(true)}
          />
        )}

        {/* Catalog Content Area */}
        <main className="catalog-main" style={{
          padding: '28px 32px 80px 32px',
          maxWidth: '1440px',
          width: '100%',
          flex: 1
        }}>
          {/* Header Controls */}
          <div className="catalog-header-wrap" style={{
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
                  {sortedMovies.length} ta film
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                Barcha maʼlumotlar toʻgʻridan-toʻgʻri real TMDB API orqali kelmoqda
              </p>
            </div>

            {/* Sort Controls */}
            <div className="catalog-sort-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                Reyting
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
                Yil
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              gap: '12px'
            }}>
              <Loader2 size={36} color="#f43f5e" className="spin-animation" />
              <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>
                Filmlar API dan yuklanmoqda...
              </span>
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '16px',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#f87171'
            }}>
              <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '14px' }}>{error}</p>
              <button
                onClick={loadFilteredMovies}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                <RefreshCw size={15} /> Qayta yuklash
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && sortedMovies.length === 0 && (
            <div className="animate-fade-in" style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <Film size={48} color="#475569" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>
                Film topilmadi
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                Qidiruv soʻzini oʻzgartirib koʻring yoki boshqa janrni tanlang.
              </p>
              <button
                onClick={() => { setSelectedGenreId('all'); setSelectedGenreName('Barchasi'); setSearchTerm(''); }}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '14px' }}
              >
                Barcha filmlarni koʻrsatish
              </button>
            </div>
          )}

          {/* Real Live Grid of Movies */}
          {!loading && !error && sortedMovies.length > 0 && (
            <div className="catalog-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '22px'
            }}>
              {sortedMovies.map((movie) => (
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
        <footer className="footer-container" style={{
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
            <span style={{ fontWeight: 700, color: '#e2e8f0' }}>KinoHub</span> — 100% TMDB API & Jonli Kino Serverlari
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
            <span>Live Stream Servers</span>
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
          movies={movies.length > 0 ? movies : featuredMovies}
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
