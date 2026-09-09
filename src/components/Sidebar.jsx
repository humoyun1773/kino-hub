import React from 'react';
import { 
  Film, 
  Home, 
  Flame, 
  Star, 
  Clock, 
  Dices, 
  Swords, 
  Rocket, 
  Drama, 
  Laugh, 
  Smile, 
  Ghost, 
  Layers, 
  LogOut, 
  X,
  Sparkles,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { GENRES } from '../data/moviesData';

const GENRE_ICONS = {
  'Barchasi': Layers,
  'Jangari': Swords,
  'Fantastika': Rocket,
  'Drama': Drama,
  'Komediya': Laugh,
  'Multfilm': Smile,
  'Dahshat': Ghost,
};

export default function Sidebar({
  selectedGenre,
  onSelectGenre,
  activeFilter,
  onSelectFilter,
  sortBy,
  onSortChange,
  movies,
  onOpenRandom,
  isOpen,
  onClose,
  currentUser,
  onLogout
}) {
  const genreCounts = React.useMemo(() => {
    const counts = { 'Barchasi': movies.length };
    GENRES.forEach((g) => {
      if (g !== 'Barchasi') {
        counts[g] = movies.filter((m) => m.genres?.includes(g)).length;
      }
    });
    return counts;
  }, [movies]);

  const quickFilters = [
    { id: 'all', label: 'Barcha filmlar', icon: Home },
    { id: 'trending', label: 'Trenddagi premyeralar', icon: Flame, badge: 'Xit' },
    { id: 'top-rated', label: 'Top Reyting (8.5+)', icon: Star, badge: '8.5+' },
    { id: 'new', label: '2024 Yilgi yangiliklar', icon: Clock, badge: '2024' },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 45,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease'
        }}
        className="sidebar-backdrop"
      />

      {/* Sidebar Element */}
      <aside
        style={{
          width: isOpen ? '270px' : '0px',
          minWidth: isOpen ? '270px' : '0px',
          maxWidth: '270px',
          background: '#080c16',
          borderRight: isOpen ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 48,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          whiteSpace: 'nowrap',
          flexShrink: 0
        }}
        className={`collapsible-sidebar ${isOpen ? 'is-open' : 'is-closed'}`}
      >
        <div style={{ width: '270px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Sidebar Top Header with Close Button */}
          <div style={{
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #e11d48, #be123c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(225, 29, 72, 0.5)'
              }}>
                <Film size={18} color="#fff" />
              </div>
              <div>
                <span className="gradient-title" style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                  KinoHub
                </span>
                <span style={{ fontSize: '10px', display: 'block', color: '#64748b', marginTop: '-3px', fontWeight: 600 }}>
                  KINO PLATFORMASI
                </span>
              </div>
            </div>

            {/* Close / Collapse button */}
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Katalogni yopish"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(225, 29, 72, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Navigation Scrollable Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px'
          }}>
            {/* Section 1: Asosiy Menyular */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '0 10px 8px 10px'
              }}>
                Asosiy menyu
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {quickFilters.map((f) => {
                  const Icon = f.icon;
                  const isActive = activeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        onSelectFilter(f.id);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        background: isActive ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.2), rgba(225, 29, 72, 0.08))' : 'transparent',
                        color: isActive ? '#f43f5e' : '#cbd5e1',
                        borderLeft: isActive ? '3px solid #e11d48' : '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={17} color={isActive ? '#f43f5e' : '#94a3b8'} />
                        <span>{f.label}</span>
                      </div>
                      {f.badge && (
                        <span style={{
                          fontSize: '10px',
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          background: isActive ? '#e11d48' : 'rgba(255, 255, 255, 0.08)',
                          color: '#fff',
                          fontWeight: 700
                        }}>
                          {f.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Janrlar Katalogi */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '0 10px 8px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Janrlar</span>
                <span style={{ fontSize: '10px', color: '#475569' }}>{GENRES.length} ta</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {GENRES.map((genre) => {
                  const Icon = GENRE_ICONS[genre] || Layers;
                  const isSelected = selectedGenre === genre;
                  const count = genreCounts[genre] || 0;
                  return (
                    <button
                      key={genre}
                      onClick={() => {
                        onSelectGenre(genre);
                        if (window.innerWidth < 1024) onClose();
                      }}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        fontWeight: isSelected ? 700 : 500,
                        transition: 'all 0.2s ease',
                        background: isSelected ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'transparent',
                        color: isSelected ? '#ffffff' : '#cbd5e1',
                        boxShadow: isSelected ? '0 4px 14px rgba(225, 29, 72, 0.4)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={16} color={isSelected ? '#fff' : '#94a3b8'} />
                        <span>{genre}</span>
                      </div>
                      <span style={{
                        fontSize: '11px',
                        color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#64748b',
                        fontWeight: 600
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Saralash */}
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '0 10px 8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <SlidersHorizontal size={13} />
                <span>Saralash tartibi</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                padding: '0 4px'
              }}>
                <button
                  onClick={() => onSortChange('rating')}
                  style={{
                    padding: '7px 8px',
                    borderRadius: '8px',
                    border: sortBy === 'rating' ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: sortBy === 'rating' ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: sortBy === 'rating' ? '#f43f5e' : '#94a3b8',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ⭐ Reyting
                </button>
                <button
                  onClick={() => onSortChange('year')}
                  style={{
                    padding: '7px 8px',
                    borderRadius: '8px',
                    border: sortBy === 'year' ? '1px solid #e11d48' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: sortBy === 'year' ? 'rgba(225, 29, 72, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: sortBy === 'year' ? '#f43f5e' : '#94a3b8',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📅 Yil
                </button>
              </div>
            </div>

            {/* Quick Random Movie */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.15) 0%, rgba(190, 18, 60, 0.05) 100%)',
              border: '1px solid rgba(225, 29, 72, 0.3)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#fb7185', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                <Dices size={16} /> Tasodifiy film
              </div>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '10px' }}>
                Kechqurun koʻrish uchun mos film
              </p>
              <button
                onClick={onOpenRandom}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '12px',
                  borderRadius: '8px'
                }}
              >
                <Sparkles size={14} /> Film tanlash
              </button>
            </div>
          </div>

          {/* User Profile Footer */}
          {currentUser && (
            <div style={{
              padding: '16px 18px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: '#060912',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f43f5e, #be123c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#fff',
                  boxShadow: '0 0 10px rgba(225, 29, 72, 0.5)'
                }}>
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <div style={{ maxWidth: '120px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentUser.name || 'Foydalanuvchi'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>
                    VIP Aʼzo
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                title="Chiqish (Logout)"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
