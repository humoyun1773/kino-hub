import React from 'react';
import { Film, Search, Heart, Dices, KeyRound, X } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenRandom,
  onOpenWatchlist,
  watchlistCount,
  onOpenApiKey,
  hasApiKey
}) {
  return (
    <header className="glass-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => { setSearchTerm(''); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #e11d48, #be123c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(225, 29, 72, 0.5)'
        }}>
          <Film size={22} color="#ffffff" />
        </div>
        <div>
          <span className="gradient-title" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            KinoHub
          </span>
          <span style={{ fontSize: '10px', display: 'block', color: '#94a3b8', marginTop: '-4px', fontWeight: 600 }}>
            KINO VA SERIALLAR
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        flex: 1,
        maxWidth: '500px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Film nomi, rejissyor yoki aktyorlarni qidiring..."
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '10px 40px 10px 42px',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s, background 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(244, 63, 94, 0.6)';
            e.target.style.background = 'rgba(255, 255, 255, 0.09)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.target.style.background = 'rgba(255, 255, 255, 0.06)';
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Random Movie Button */}
        <button
          onClick={onOpenRandom}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px' }}
          title="Kechqurun nima ko'rishni bilmayotganlar uchun tasodifiy film"
        >
          <Dices size={17} color="#fb7185" />
          <span>Tasodifiy film</span>
        </button>

        {/* Watchlist Button */}
        <button
          onClick={onOpenWatchlist}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '13px', position: 'relative' }}
          title="Saqlangan filmlar"
        >
          <Heart size={17} color={watchlistCount > 0 ? '#f43f5e' : '#cbd5e1'} fill={watchlistCount > 0 ? '#f43f5e' : 'none'} />
          <span>Watchlist</span>
          {watchlistCount > 0 && (
            <span style={{
              background: '#e11d48',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '9999px',
              marginLeft: '4px'
            }}>
              {watchlistCount}
            </span>
          )}
        </button>

        {/* API Settings Button */}
        <button
          onClick={onOpenApiKey}
          className="btn-secondary"
          style={{
            padding: '8px 12px',
            fontSize: '13px',
            border: hasApiKey ? '1px solid rgba(34, 197, 94, 0.4)' : undefined
          }}
          title={hasApiKey ? 'TMDB API ulangan' : 'TMDB API sozlamalari'}
        >
          <KeyRound size={16} color={hasApiKey ? '#4ade80' : '#94a3b8'} />
          {hasApiKey && (
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
          )}
        </button>
      </div>
    </header>
  );
}
