import React from 'react';
import { Search, Dices, KeyRound, X, Sidebar, Film } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenRandom,
  onOpenApiKey,
  hasApiKey,
  currentUser,
  isSidebarOpen,
  onToggleSidebar
}) {
  return (
    <header className="glass-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Left: Dedicated Sidebar Toggle Button & Brand (shown only when sidebar is closed) */}
      {!isSidebarOpen && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              color: '#e2e8f0',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Katalog panelini ochish"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(225, 29, 72, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(225, 29, 72, 0.5)';
              e.currentTarget.style.color = '#f43f5e';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = '#e2e8f0';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Sidebar size={20} />
          </button>

          <div
            onClick={() => setSearchTerm('')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(225, 29, 72, 0.5)'
            }}>
              <Film size={18} color="#ffffff" />
            </div>
            <span className="gradient-title" style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              KinoHub
            </span>
          </div>
        </div>
      )}

      {/* Center Search Bar */}
      <div style={{
        flex: 1,
        maxWidth: '560px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Film yoki seriallarni qidirish..."
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '10px 40px 10px 42px',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(244, 63, 94, 0.65)';
            e.target.style.background = 'rgba(255, 255, 255, 0.09)';
            e.target.style.boxShadow = '0 0 15px rgba(225, 29, 72, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.target.style.background = 'rgba(255, 255, 255, 0.06)';
            e.target.style.boxShadow = 'none';
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

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onOpenRandom}
          className="btn-secondary"
          style={{ padding: '9px 16px', fontSize: '13px' }}
          title="Tasodifiy film tanlash"
        >
          <Dices size={16} color="#fb7185" />
          <span>Tasodifiy</span>
        </button>

        <button
          onClick={onOpenApiKey}
          className="btn-secondary"
          style={{
            padding: '9px 12px',
            fontSize: '13px',
            border: hasApiKey ? '1px solid rgba(34, 197, 94, 0.4)' : undefined
          }}
          title={hasApiKey ? 'TMDB API ulangan' : 'TMDB API sozlamalari'}
        >
          <KeyRound size={16} color={hasApiKey ? '#4ade80' : '#94a3b8'} />
        </button>
      </div>
    </header>
  );
}
