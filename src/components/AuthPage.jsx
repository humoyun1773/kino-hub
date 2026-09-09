import React, { useState } from 'react';
import { Film, LogIn, UserPlus, Lock, Mail, User, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Pre-seed demo user if none exists
  const getUsers = () => {
    try {
      const stored = localStorage.getItem('kinohub_users');
      if (stored) return JSON.parse(stored);
      // default demo user
      const defaultUsers = [
        { email: 'user@kino.uz', password: '123', name: 'Humoyun' }
      ];
      localStorage.setItem('kinohub_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    } catch {
      return [{ email: 'user@kino.uz', password: '123', name: 'Humoyun' }];
    }
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Iltimos, barcha maydonlarni toʻldiring!');
      return;
    }

    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (found) {
      setSuccess('Muvaffaqiyatli kirdingiz! Xush kelibsiz...');
      setTimeout(() => {
        onLoginSuccess(found);
      }, 600);
    } else {
      setError('Email yoki parol notoʻgʻri! Iltimos, qayta tekshiring.');
    }
  };

  const handleRegister = (e) => {
    e?.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Barcha maydonlarni toʻldirish shart!');
      return;
    }

    if (password.length < 3) {
      setError('Parol kamida 3 ta belgidan iborat boʻlishi kerak.');
      return;
    }

    if (password !== confirmPass) {
      setError('Parollar bir-biriga mos kelmadi!');
      return;
    }

    const users = getUsers();
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (alreadyExists) {
      setError('Ushbu email bilan foydalanuvchi allaqachon mavjud!');
      return;
    }

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('kinohub_users', JSON.stringify(updatedUsers));
    setSuccess('Muvaffaqiyatli roʻyxatdan oʻtdingiz!');
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 600);
  };

  const fillDemo = () => {
    setEmail('user@kino.uz');
    setPassword('123');
    setIsLoginTab(true);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#06080d'
    }}>
      {/* Dynamic Cinematic Background with Blurs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520QIq.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3) blur(6px)',
        transform: 'scale(1.05)'
      }} />

      {/* Radiant Glow Lights */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '25%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(225, 29, 72, 0.35) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '20%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Main Glass Card */}
      <div className="glass-card animate-scale-up" style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '460px',
        margin: '20px',
        padding: '36px 32px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(225, 29, 72, 0.25)'
      }}>
        {/* Brand Logo & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="animate-float" style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px auto',
            boxShadow: '0 0 25px rgba(225, 29, 72, 0.6)'
          }}>
            <Film size={30} color="#fff" />
          </div>
          <h1 className="gradient-title" style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            KinoHub
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
            {isLoginTab ? 'Platformaga kirish uchun profilingizga kiring' : 'Yangi profil yarating va filmlarni tomosha qiling'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            type="button"
            onClick={() => { setIsLoginTab(true); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              background: isLoginTab ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'transparent',
              color: isLoginTab ? '#fff' : '#94a3b8',
              boxShadow: isLoginTab ? '0 4px 14px rgba(225, 29, 72, 0.4)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <LogIn size={16} /> Kirish
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginTab(false); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              background: !isLoginTab ? 'linear-gradient(135deg, #e11d48, #be123c)' : 'transparent',
              color: !isLoginTab ? '#fff' : '#94a3b8',
              boxShadow: !isLoginTab ? '0 4px 14px rgba(225, 29, 72, 0.4)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <UserPlus size={16} /> Roʻyxatdan oʻtish
          </button>
        </div>

        {/* Error / Success Feedback */}
        {error && (
          <div className="animate-fade-in" style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '18px',
            color: '#f87171',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="animate-fade-in" style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '18px',
            color: '#4ade80',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
            <span>{success}</span>
          </div>
        )}

        {/* Forms */}
        <form onSubmit={isLoginTab ? handleLogin : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLoginTab && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Ismingiz
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ismingiz"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '12px 14px 12px 42px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#f43f5e'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Elektron pochta (Email)
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '12px 14px 12px 42px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f43f5e'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
              Parol
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '13px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  padding: '12px 14px 12px 42px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f43f5e'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Parolni takrorlang
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Parolni tasdiqlang"
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '12px 14px 12px 42px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#f43f5e'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '13px', fontSize: '15px', marginTop: '6px' }}
          >
            {isLoginTab ? (
              <>
                <LogIn size={18} /> Kirish
              </>
            ) : (
              <>
                <UserPlus size={18} /> Hisob yaratish
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div style={{
          marginTop: '22px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <button
            type="button"
            onClick={fillDemo}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600
            }}
          >
            <Sparkles size={15} color="#38bdf8" />
            <span>Test hisobi bilan kirish (user@kino.uz / 123)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
