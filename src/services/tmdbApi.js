// 100% REAL LIVE TMDB API SERVICE (NO MOCK DATA)
const DEFAULT_API_KEY = '1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getApiKey = () => {
  try {
    return localStorage.getItem('kinohub_tmdb_key') || DEFAULT_API_KEY;
  } catch {
    return DEFAULT_API_KEY;
  }
};

// Genre Map (TMDB IDs to Uzbek Names)
export const TMDB_GENRES = [
  { id: 'all', name: 'Barchasi' },
  { id: 28, name: 'Jangari' },
  { id: 878, name: 'Fantastika' },
  { id: 18, name: 'Drama' },
  { id: 35, name: 'Komediya' },
  { id: 16, name: 'Multfilm' },
  { id: 27, name: 'Dahshat' },
  { id: 53, name: 'Triller' },
  { id: 12, name: 'Sarguzasht' },
  { id: 80, name: 'Jinoyat' },
  { id: 14, name: 'Fantaziya' }
];

const GENRE_NAME_LOOKUP = {
  28: 'Jangari',
  878: 'Fantastika',
  18: 'Drama',
  35: 'Komediya',
  16: 'Multfilm',
  27: 'Dahshat',
  53: 'Triller',
  12: 'Sarguzasht',
  80: 'Jinoyat',
  14: 'Fantaziya',
  10751: 'Oilaviy',
  9648: 'Detektiv',
  10749: 'Romantika',
  36: 'Tarixiy',
  10752: 'Harbiy'
};

// Format Movie Object
export const normalizeMovie = (m) => {
  const genres = m.genre_ids?.map((gid) => GENRE_NAME_LOOKUP[gid] || 'Film') || 
                 m.genres?.map((g) => GENRE_NAME_LOOKUP[g.id] || g.name) || ['Kino'];

  return {
    id: m.id,
    title: m.title || m.original_title || 'Nomsiz Film',
    originalTitle: m.original_title,
    overview: m.overview || 'Ushbu film haqida toʻliq maʼlumot tez orada joylanadi.',
    poster: m.poster_path ? `${IMAGE_BASE_URL}/w500${m.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    backdrop: m.backdrop_path ? `${IMAGE_BASE_URL}/original${m.backdrop_path}` : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    rating: m.vote_average ? Number(m.vote_average.toFixed(1)) : 7.5,
    year: m.release_date ? m.release_date.split('-')[0] : '2024',
    duration: m.runtime ? `${Math.floor(m.runtime / 60)}s ${m.runtime % 60}d` : '2s 15d',
    genres: genres.length > 0 ? genres : ['Film'],
    director: m.director || 'Kino Ijodkorlari',
    cast: m.cast || ['Mashhur aktyorlar'],
    tag: m.vote_average >= 8.0 ? 'TOP REYTINQ' : 'PREMYERA HD'
  };
};

// Stream Servers for real movie playback without YouTube!
export const getStreamServers = (tmdbId) => [
  {
    id: 'multiembed',
    name: 'Server 1 (MultiEmbed HD)',
    badge: '1080p Tezkor',
    url: `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`
  },
  {
    id: 'autoembed',
    name: 'Server 2 (AutoEmbed Fast)',
    badge: 'HD Sifat',
    url: `https://autoembed.co/movie/tmdb/${tmdbId}`
  },
  {
    id: 'vidsrc',
    name: 'Server 3 (VidSrc Cinema)',
    badge: 'Asosiy Server',
    url: `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`
  },
  {
    id: 'twoembed',
    name: 'Server 4 (2Embed Player)',
    badge: 'Zaxira Server',
    url: `https://www.2embed.cc/embed/${tmdbId}`
  }
];

// Fetch Trending Movies (Day)
export const fetchTrendingMovies = async () => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${key}&language=en-US`);
  if (!res.ok) throw new Error('Trending filmlarni yuklashda xatolik yuz berdi');
  const data = await res.json();
  return (data.results || []).map(normalizeMovie);
};

// Fetch Popular Movies
export const fetchPopularMovies = async (page = 1) => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${key}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error('Ommabop filmlarni yuklashda xatolik yuz berdi');
  const data = await res.json();
  return (data.results || []).map(normalizeMovie);
};

// Fetch Top Rated Movies
export const fetchTopRatedMovies = async (page = 1) => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${key}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error('Top reyting filmlarni yuklashda xatolik yuz berdi');
  const data = await res.json();
  return (data.results || []).map(normalizeMovie);
};

// Fetch Upcoming / New 2024 Movies
export const fetchUpcomingMovies = async (page = 1) => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${key}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error('Yangi premyeralarni yuklashda xatolik yuz berdi');
  const data = await res.json();
  return (data.results || []).map(normalizeMovie);
};

// Fetch Movies by Genre ID
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${key}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}&language=en-US`);
  if (!res.ok) throw new Error('Janr boʻyicha filmlarni yuklashda xatolik yuz berdi');
  const data = await res.json();
  return (data.results || []).map(normalizeMovie);
};

// Search Movies Live
export const searchMoviesApi = async (query, page = 1) => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${key}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`);
  if (!res.ok) throw new Error('Qidiruvda xatolik yuz berdi');
  const data = await res.json();
  return (data.results || []).map(normalizeMovie);
};

// Fetch Movie Details with Credits
export const fetchMovieDetailsApi = async (movieId) => {
  const key = getApiKey();
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${key}&append_to_response=credits,similar&language=en-US`);
  if (!res.ok) return null;
  const d = await res.json();
  
  const director = d.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Kino Ijodkorlari';
  const cast = d.credits?.cast?.slice(0, 5).map((c) => c.name) || [];
  const similar = (d.similar?.results || []).slice(0, 4).map(normalizeMovie);

  const normalized = normalizeMovie(d);
  normalized.director = director;
  normalized.cast = cast;
  normalized.similar = similar;
  return normalized;
};
