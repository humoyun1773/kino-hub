import React, { useState } from 'react';
import { Film, Search, Dices, KeyRound, X, LogOut, User } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenRandom,
  onOpenApiKey,
  hasApiKey,
  currentUser,
  onLogout
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="glass-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '14px 28px',
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
          gap: '12px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div className="animate-float" style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #e11d48, #be123c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(225, 29, 72, 0.55)'
        }}>
          <Film size={22} color="#ffffff" />
        </div>
        <div>
          <span className="gradient-title" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            KinoHub
          </span>
          <span style={{ fontSize: '10px', display: 'block', color: '#94a3b8', marginTop: '-3px', fontWeight: 600 }}>
            KINO VA SERIALLAR
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        flex: 1,
        maxWidth: '520px',
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
            padding: '11px 40px 11px 42px',
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

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Random Movie Button */}
        <button
          onClick={onOpenRandom}
          className="btn-secondary"
          style={{ padding: '9px 18px', fontSize: '13px' }}
          title="Kechqurun nima ko'rishni bilmayotganlar uchun tasodifiy film"
        >
          <Dices size={17} color="#fb7185" />
          <span>Tasodifiy film</span>
        </button>

        {/* API Settings Button */}
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
          {hasApiKey && (
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
          )}
        </button>

        {/* User Profile & Logout */}
        {currentUser && (
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px 6px 6px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f43f5e, #be123c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff'
              }}>
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>
                {currentUser.name || 'Foydalanuvchi'}
              </span>
            </div>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div
                className="animate-scale-up"
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '180px',
                  background: '#0e131f',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '6px',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.7)',
                  zIndex: 50
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Ulangan hisob</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentUser.email}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#f87171',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  <LogOut size={16} /> Chiqish (Logout)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
