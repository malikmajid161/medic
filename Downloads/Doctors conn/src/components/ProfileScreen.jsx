import React from 'react';
import { User, Mail, ShieldCheck, Database, LogOut, ChevronRight, Moon, Settings } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function ProfileScreen({ user, onLogout }) {
  return (
    <div className="profile-screen animate-fade-in">
      <div className="profile-header">
        <h2 className="header-title">My Profile</h2>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.fullName?.charAt(0) || 'Z'}
        </div>
        <div className="profile-details">
          <h3 className="profile-name">{user?.fullName || 'Zunaira Mughal'}</h3>
          <p className="profile-email">{user?.email || 'zunaira@gmail.com'}</p>
          <div className="patient-tag">
            <ShieldCheck size={13} color="#0b5d71" />
            <span>Verified Patient</span>
          </div>
        </div>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="db-status-card">
        <Database size={20} color={isSupabaseConfigured ? '#10b981' : '#f59e0b'} />
        <div>
          <h4 className="db-title">
            {isSupabaseConfigured ? 'Supabase Backend Connected' : 'Local Storage Mode'}
          </h4>
          <p className="db-desc">
            {isSupabaseConfigured
              ? 'Appointments and profile synced live with Supabase database.'
              : 'Add your VITE_SUPABASE_URL to .env to connect live backend.'}
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="menu-card">
        <div className="menu-item">
          <User size={18} color="#0b5d71" />
          <span className="menu-text">Personal Details</span>
          <ChevronRight size={16} color="#94a3b8" />
        </div>

        <div className="menu-item">
          <Settings size={18} color="#0b5d71" />
          <span className="menu-text">Account Preferences</span>
          <ChevronRight size={16} color="#94a3b8" />
        </div>

        <div className="menu-item">
          <Moon size={18} color="#0b5d71" />
          <span className="menu-text">Dark Mode</span>
          <span className="badge-pill">System</span>
        </div>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>

      <style>{`
        .profile-screen {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 18px 100px;
          background: #f5f9fc;
        }

        .profile-header {
          margin-bottom: 16px;
        }

        .header-title {
          font-size: 22px;
          font-weight: 800;
          color: #0b5d71;
        }

        .profile-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.04);
          margin-bottom: 16px;
        }

        .profile-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0b5d71, #0284c7);
          color: #ffffff;
          font-size: 26px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.2);
        }

        .profile-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        .profile-email {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .patient-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #e6f3f7;
          color: #0b5d71;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 12px;
        }

        .db-status-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 16px;
        }

        .db-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .db-desc {
          font-size: 11.5px;
          color: #64748b;
          line-height: 1.4;
        }

        .menu-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.04);
          margin-bottom: 20px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .menu-text {
          flex: 1;
          margin-left: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .badge-pill {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 8px;
        }

        .logout-btn {
          width: 100%;
          height: 48px;
          background: #ffe4e6;
          color: #be123c;
          border: none;
          border-radius: 14px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .logout-btn:active {
          background: #fecdd3;
        }
      `}</style>
    </div>
  );
}
