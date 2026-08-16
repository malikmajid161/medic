import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, Stethoscope, Building, Award, DollarSign, Upload, Sparkles } from 'lucide-react';
import { signInUser, signUpUser, isSupabaseConfigured, MOCK_ACCOUNTS } from '../lib/supabase';

export default function AuthScreen({ isRegister = false, onAuthSuccess, onBack }) {
  const [mode, setMode] = useState(isRegister ? 'register' : 'login');
  const [role, setRole] = useState('patient'); // 'patient' or 'doctor'

  // Common Fields
  const [email, setEmail] = useState('dr.ahmed@medic.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Dr. Ahmed Ali');

  // Doctor Specific Fields
  const [specialty, setSpecialty] = useState('Cardiologist (Heart)');
  const [hospital, setHospital] = useState('Shaukat Khanum Hospital, Lahore');
  const [experience, setExperience] = useState('10 years of Experience');
  const [fee, setFee] = useState('Rs. 2,500');
  const [imagePreview, setImagePreview] = useState('/assets/doc_real_2.jpg');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Photo File Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickDemoSelect = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setFullName(acc.fullName);
    if (acc.role === 'doctor') {
      setRole('doctor');
      setSpecialty(acc.specialty || 'Cardiologist');
      setHospital(acc.hospital || 'Shaukat Khanum Hospital');
      setImagePreview(acc.image || '/assets/doc_real_2.jpg');
    } else {
      setRole('patient');
    }
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

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

        const doctorNameFormatted = role === 'doctor' && !fullName.toLowerCase().startsWith('dr.')
          ? `Dr. ${fullName}`
          : fullName;

        const extraData = {
          fullName: doctorNameFormatted,
          role,
          specialty,
          hospital,
          experience,
          fee,
          image: imagePreview
        };

        const userObj = await signUpUser(email, password, extraData);
        setSuccessMsg(`${role === 'doctor' ? 'Doctor Account' : 'Patient Account'} created! Redirecting...`);
        
        setTimeout(() => {
          setLoading(false);
          onAuthSuccess(userObj);
        }, 800);
      } else {
        const userObj = await signInUser(email, password);
        setSuccessMsg(`Signed in as ${userObj.fullName}!`);
        
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

        <div className="doctor-animation-wrapper">
          <div className="pulse-circle"></div>
          <div className="pulse-circle delay-1"></div>
          <div className="doctor-icon-container">
            <Stethoscope size={48} color="#0b5d71" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">
          {mode === 'login' ? 'Welcome Back' : role === 'doctor' ? 'Doctor Registration' : 'Patient Registration'}
        </h2>
        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Sign in to manage appointments & doctor requests'
            : 'Fill in your credentials to create your account'}
        </p>

        {mode === 'login' && (
          <div className="login-role-cards">
            <button 
              type="button"
              className={`role-card ${role === 'patient' ? 'active' : ''}`}
              onClick={() => {
                setRole('patient');
                handleQuickDemoSelect(MOCK_ACCOUNTS.find(a => a.role === 'patient'));
              }}
            >
              <div className={`role-icon-box ${role === 'patient' ? 'active-icon' : ''}`}>
                <User size={24} />
              </div>
              <div className="role-card-text">
                <span className="role-title">Patient Login</span>
                <span className="role-desc">Book & track visits</span>
              </div>
            </button>

            <button 
              type="button"
              className={`role-card ${role === 'doctor' ? 'active' : ''}`}
              onClick={() => {
                setRole('doctor');
                handleQuickDemoSelect(MOCK_ACCOUNTS.find(a => a.role === 'doctor'));
              }}
            >
              <div className={`role-icon-box ${role === 'doctor' ? 'active-icon' : ''}`}>
                <Stethoscope size={24} />
              </div>
              <div className="role-card-text">
                <span className="role-title">Doctor Portal</span>
                <span className="role-desc">Manage your practice</span>
              </div>
            </button>
          </div>
        )}

        {/* Role Toggle Selector for Registration */}
        {mode === 'register' && (
          <div className="role-selector-bar">
            <button
              type="button"
              className={`role-tab ${role === 'patient' ? 'active' : ''}`}
              onClick={() => {
                setRole('patient');
                setFullName('Zunaira Mughal');
                setEmail('patient@medic.com');
              }}
            >
              <User size={16} />
              <span>Patient</span>
            </button>

            <button
              type="button"
              className={`role-tab ${role === 'doctor' ? 'active' : ''}`}
              onClick={() => {
                setRole('doctor');
                setFullName('Dr. Ahmed Ali');
                setEmail('dr.ahmed@medic.com');
              }}
            >
              <Stethoscope size={16} />
              <span>Doctor</span>
            </button>
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
            <>
              {/* Doctor Avatar Upload Preview */}
              {role === 'doctor' && (
                <div className="doctor-photo-uploader">
                  <img src={imagePreview} alt="Doctor Preview" className="uploaded-doc-preview" />
                  <label htmlFor="photo-upload" className="upload-btn">
                    <Upload size={14} />
                    <span>Upload Profile Photo</span>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              )}

              <div className="input-group">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder={role === 'doctor' ? 'Doctor Full Name (e.g. Dr. Ahmed Ali)' : 'Full Name'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Additional Doctor Fields */}
              {role === 'doctor' && (
                <>
                  <div className="input-group">
                    <Stethoscope size={18} className="input-icon" />
                    <select
                      className="form-input select-input"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                    >
                      <option value="Cardiologist (Heart)">Cardiologist (Heart Specialist)</option>
                      <option value="Dermatologist (Skin)">Dermatologist (Skin Specialist)</option>
                      <option value="Neurologist (Brain & Nerves)">Neurologist (Brain & Nerves)</option>
                      <option value="Pediatrician (Child)">Pediatrician (Child Specialist)</option>
                      <option value="Gastroenterologist (Stomach)">Gastroenterologist (Stomach)</option>
                      <option value="General Physician">General Physician</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <Building size={18} className="input-icon" />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Hospital / Clinic Name"
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-row-flex">
                    <div className="input-group flex-1">
                      <Award size={18} className="input-icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Experience (e.g. 10 yrs)"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                    <div className="input-group flex-1">
                      <DollarSign size={18} className="input-icon" />
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Fee (e.g. Rs. 2,500)"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
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
            ) : role === 'doctor' ? (
              'Register as Doctor'
            ) : (
              'Register as Patient'
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
          padding: 30px 20px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .doctor-animation-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }

        .doctor-icon-container {
          position: relative;
          width: 80px;
          height: 80px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(11, 93, 113, 0.15);
          z-index: 2;
        }

        .pulse-circle {
          position: absolute;
          width: 80px;
          height: 80px;
          background: #0b5d71;
          border-radius: 50%;
          opacity: 0.2;
          animation: pulse 2s infinite ease-out;
        }

        .pulse-circle.delay-1 {
          animation-delay: 1s;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .back-btn {
          position: absolute;
          top: 16px;
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


        .auth-card {
          flex: 1;
          background: #ffffff;
          border-top-left-radius: 28px;
          border-top-right-radius: 28px;
          padding: 24px 24px 40px;
          box-shadow: 0 -10px 30px rgba(11, 93, 113, 0.06);
          display: flex;
          flex-direction: column;
        }

        .auth-title {
          font-size: 22px;
          font-weight: 800;
          color: #0b5d71;
          margin-bottom: 4px;
        }

        .auth-subtitle {
          font-size: 12.5px;
          color: #64748b;
          margin-bottom: 14px;
        }

        .login-role-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .role-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .role-card:active {
          transform: scale(0.96);
        }

        .role-card.active {
          border-color: #0b5d71;
          background: #f0f7f9;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.12);
        }

        .role-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          transition: all 0.2s;
        }

        .role-icon-box.active-icon {
          background: #0b5d71;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(11, 93, 113, 0.3);
        }

        .role-card-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .role-card .role-title {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }

        .role-card .role-desc {
          font-size: 11px;
          color: #64748b;
        }

        .role-selector-bar {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 14px;
          margin-bottom: 16px;
        }

        .role-tab {
          flex: 1;
          height: 42px;
          border: none;
          background: transparent;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-tab.active {
          background: #0b5d71;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(11, 93, 113, 0.2);
        }

        .doctor-photo-uploader {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #f8fafc;
          padding: 12px;
          border-radius: 14px;
          border: 1px dashed #cbd5e1;
          margin-bottom: 12px;
        }

        .uploaded-doc-preview {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0b5d71;
        }

        .upload-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: #0b5d71;
          background: #ffffff;
          border: 1px solid #0b5d71;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        .live-db-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #047857;
          background: #d1fae5;
          padding: 4px 10px;
          border-radius: 12px;
          margin-bottom: 14px;
          align-self: flex-start;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 12.5px;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .error-alert { background: #ffe4e6; color: #be123c; }
        .success-alert { background: #dcfce7; color: #15803d; }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-row-flex {
          display: flex;
          gap: 10px;
        }

        .flex-1 { flex: 1; }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #64748b;
        }

        .form-input {
          width: 100%;
          height: 48px;
          padding: 0 40px 0 44px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 13.5px;
          color: #0f172a;
          outline: none;
          background: #ffffff;
        }

        .select-input {
          cursor: pointer;
          appearance: none;
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
          height: 48px;
          background: #0b5d71;
          color: #ffffff;
          font-weight: 700;
          font-size: 14.5px;
          border: none;
          border-radius: 12px;
          margin-top: 8px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.2);
        }

        .auth-footer-toggle {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
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
