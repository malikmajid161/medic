import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { signInUser, signUpUser, isSupabaseConfigured } from '../lib/supabase';

export default function AuthScreen({ isRegister = false, onAuthSuccess, onBack }) {
  const [mode, setMode] = useState(isRegister ? 'register' : 'login');
  const [email, setEmail] = useState('zunaira@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [fullName, setFullName] = useState('Zunaira Mughal');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Basic Validation
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'register') {
        if (!fullName.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }

        const userObj = await signUpUser(email, password, fullName);
        setSuccessMsg('Account created successfully! Logging you in...');
        
        setTimeout(() => {
          setLoading(false);
          onAuthSuccess(userObj);
        }, 800);
      } else {
        const userObj = await signInUser(email, password);
        setSuccessMsg('Signed in successfully!');
        
        setTimeout(() => {
          setLoading(false);
          onAuthSuccess(userObj);
        }, 600);
      }
    } catch (err) {
      console.error('Authentication Error:', err);
      setLoading(false);
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    }
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

        {isSupabaseConfigured && (
          <div className="live-db-badge">
            <span className="live-dot"></span> Real Supabase Auth Enabled
          </div>
        )}

        {errorMsg && (
          <div className="auth-alert error-alert">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert success-alert">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

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
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              className="form-input"
              placeholder="Email Address"
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
              placeholder="Password (min 6 chars)"
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
            {loading ? (
              <span className="spinner-text">Processing...</span>
            ) : mode === 'login' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer-toggle">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
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
          -webkit-overflow-scrolling: touch;
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
          height: 160px;
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
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .live-db-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: #047857;
          background: #d1fae5;
          padding: 4px 10px;
          border-radius: 12px;
          margin-bottom: 16px;
          align-self: flex-start;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .error-alert {
          background: #ffe4e6;
          color: #be123c;
          border: 1px solid #fecdd3;
        }

        .success-alert {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
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

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn:active:not(:disabled) {
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
