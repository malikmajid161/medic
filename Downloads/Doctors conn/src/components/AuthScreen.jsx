import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AuthScreen({ isRegister = false, onAuthSuccess, onBack }) {
  const [mode, setMode] = useState(isRegister ? 'register' : 'login');
  const [email, setEmail] = useState('zunaira@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Zunaira Mughal');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSupabaseConfigured && supabase) {
      try {
        if (mode === 'register') {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } }
          });
          if (error) throw error;
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
        }
      } catch (err) {
        console.warn('Supabase Auth error (falling back to demo mode):', err.message);
      }
    }

    // Success callback with user profile data
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        email: email || 'zunaira@gmail.com',
        fullName: mode === 'register' ? fullName : (email.includes('zunaira') ? 'Zunaira Mughal' : 'User')
      });
    }, 600);
  };

  return (
    <div className="auth-screen animate-slide-up">
      <div className="auth-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} color="#0b5d71" />
        </button>

        <div className="team-banner-wrapper">
          <img src="/assets/medical_team.png" alt="Medical Team" className="team-banner-img" />
        </div>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">{mode === 'login' ? 'Login' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Please enter your email and password to access your account'
            : 'Fill in your details below to create a new patient account'}
        </p>

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <User size={18} className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} color="#94a3b8" /> : <Eye size={18} color="#94a3b8" />}
            </button>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer-toggle">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button type="button" className="link-btn" onClick={() => setMode('register')}>
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button type="button" className="link-btn" onClick={() => setMode('login')}>
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>

      <style>{`
        .auth-screen {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #d8ebf3 0%, #edf7fc 40%, #ffffff 100%);
          display: flex;
          flex-direction: column;
          z-index: 20;
          overflow-y: auto;
        }

        .auth-header {
          position: relative;
          padding: 20px 20px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          z-index: 5;
        }

        .team-banner-wrapper {
          width: 100%;
          max-width: 280px;
          height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }

        .team-banner-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .auth-card {
          flex: 1;
          background: #ffffff;
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
          padding: 30px 24px 40px;
          box-shadow: 0 -10px 30px rgba(11, 93, 113, 0.06);
          display: flex;
          flex-direction: column;
        }

        .auth-title {
          font-size: 24px;
          font-weight: 800;
          color: #0b5d71;
          margin-bottom: 6px;
        }

        .auth-subtitle {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 24px;
          line-height: 1.4;
        }

        .auth-error {
          background: #fef2f2;
          color: #ef4444;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          margin-bottom: 16px;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #64748b;
        }

        .form-input {
          width: 100%;
          height: 52px;
          padding: 0 46px 0 48px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14.5px;
          color: #0f172a;
          outline: none;
          background: #ffffff;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: #0b5d71;
        }

        .eye-toggle {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .submit-btn {
          height: 52px;
          background: #0b5d71;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          margin-top: 10px;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.2);
        }

        .submit-btn:active {
          background: #074757;
        }

        .auth-footer-toggle {
          margin-top: 24px;
          text-align: center;
          font-size: 13.5px;
          color: #64748b;
        }

        .link-btn {
          background: none;
          border: none;
          color: #0b5d71;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
