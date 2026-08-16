import React, { useState } from 'react';
import { User, Mail, ShieldCheck, Database, LogOut, ChevronRight, Moon, Settings, Camera, Upload, Stethoscope, Building, Award, DollarSign, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured, saveStoredUser, saveNewDoctorProfile } from '../lib/supabase';

export default function ProfileScreen({ user, onLogout }) {
  const isDoctor = user?.role === 'doctor';
  const [profileImage, setProfileImage] = useState(user?.image || '');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [specialty, setSpecialty] = useState(user?.specialty || 'Cardiologist');
  const [hospital, setHospital] = useState(user?.hospital || 'Medic Care Hospital');
  const [fee, setFee] = useState(user?.fee || 'Rs. 2,500');
  const [isEditing, setIsEditing] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  // File Upload Handler for Profile Picture
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setProfileImage(base64Data);
        
        const updatedUser = { ...user, image: base64Data };
        saveStoredUser(updatedUser);
        if (isDoctor) saveNewDoctorProfile(updatedUser);

        setSavedAlert(true);
        setTimeout(() => setSavedAlert(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      fullName,
      specialty,
      hospital,
      fee,
      image: profileImage
    };

    saveStoredUser(updatedUser);
    if (isDoctor) saveNewDoctorProfile(updatedUser);

    setIsEditing(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  return (
    <div className="profile-screen animate-fade-in">
      <div className="profile-header">
        <h2 className="header-title">My Profile</h2>
      </div>

      {savedAlert && (
        <div className="saved-alert-banner">
          <CheckCircle2 size={16} />
          <span>Profile & photo updated successfully!</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar-uploader-wrapper">
          {profileImage ? (
            <img src={profileImage} alt={fullName} className="profile-avatar-img" />
          ) : (
            <div className="profile-avatar-fallback">
              {fullName?.charAt(0) || 'U'}
            </div>
          )}

          <label htmlFor="profile-pic-input" className="camera-overlay-badge" title="Upload new photo">
            <Camera size={14} color="#ffffff" />
            <input
              id="profile-pic-input"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div className="profile-details">
          <h3 className="profile-name">{fullName || 'Zunaira Mughal'}</h3>
          <p className="profile-email">{user?.email || 'zunaira@gmail.com'}</p>
          <div className={`patient-tag ${isDoctor ? 'doctor-verified' : ''}`}>
            <ShieldCheck size={13} />
            <span>{isDoctor ? 'Verified Doctor' : 'Verified Patient'}</span>
          </div>
        </div>
      </div>

      {/* Quick Edit Doctor Info / Profile */}
      <div className="menu-card">
        <div className="menu-card-header">
          <h4 className="card-section-title">
            {isDoctor ? 'Doctor Profile Details' : 'Account Details'}
          </h4>
          <button className="edit-toggle-btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="edit-profile-form">
            <div className="edit-input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="edit-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {isDoctor && (
              <>
                <div className="edit-input-group">
                  <label className="input-label">Specialty</label>
                  <input
                    type="text"
                    className="edit-input"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    required
                  />
                </div>

                <div className="edit-input-group">
                  <label className="input-label">Hospital / Clinic</label>
                  <input
                    type="text"
                    className="edit-input"
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    required
                  />
                </div>

                <div className="edit-input-group">
                  <label className="input-label">Consultation Fee</label>
                  <input
                    type="text"
                    className="edit-input"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="save-profile-btn">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="profile-info-rows">
            {isDoctor && (
              <>
                <div className="info-row">
                  <Stethoscope size={16} color="#0b5d71" />
                  <span className="row-label">Specialty:</span>
                  <span className="row-val">{specialty}</span>
                </div>
                <div className="info-row">
                  <Building size={16} color="#0b5d71" />
                  <span className="row-label">Hospital:</span>
                  <span className="row-val">{hospital}</span>
                </div>
                <div className="info-row">
                  <DollarSign size={16} color="#0b5d71" />
                  <span className="row-label">Fee:</span>
                  <span className="row-val">{fee}</span>
                </div>
              </>
            )}
            <div className="info-row">
              <Mail size={16} color="#0b5d71" />
              <span className="row-label">Email:</span>
              <span className="row-val">{user?.email || 'N/A'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Supabase Connection Status Card */}
      <div className="db-status-card">
        <Database size={20} color={isSupabaseConfigured ? '#10b981' : '#f59e0b'} />
        <div>
          <h4 className="db-title">
            {isSupabaseConfigured ? 'Supabase Backend Active' : 'Local Storage Mode'}
          </h4>
          <p className="db-desc">
            {isSupabaseConfigured
              ? 'Real-time database active for user accounts and doctor profiles.'
              : 'Add VITE_SUPABASE_URL to .env to enable cloud sync.'}
          </p>
        </div>
      </div>

      {/* Logout Action */}
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

        .profile-header { margin-bottom: 16px; }
        .header-title { font-size: 22px; font-weight: 800; color: #0b5d71; }

        .saved-alert-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #dcfce7;
          color: #15803d;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 14px;
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

        .avatar-uploader-wrapper {
          position: relative;
          width: 64px;
          height: 64px;
        }

        .profile-avatar-img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0b5d71;
        }

        .profile-avatar-fallback {
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
        }

        .camera-overlay-badge {
          position: absolute;
          bottom: 0;
          right: -2px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0b5d71;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .profile-name { font-size: 18px; font-weight: 800; color: #0f172a; }
        .profile-email { font-size: 13px; color: #64748b; margin-bottom: 6px; }

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

        .doctor-verified {
          background: #dbeafe;
          color: #1e40af;
        }

        .menu-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.04);
          margin-bottom: 16px;
        }

        .menu-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .card-section-title {
          font-size: 14.5px;
          font-weight: 800;
          color: #0f172a;
        }

        .edit-toggle-btn {
          background: none;
          border: none;
          font-size: 12.5px;
          font-weight: 700;
          color: #0b5d71;
          cursor: pointer;
        }

        .profile-info-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .row-label { font-weight: 600; color: #64748b; }
        .row-val { font-weight: 700; color: #0f172a; margin-left: auto; }

        .edit-profile-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .edit-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-label {
          font-size: 11.5px;
          font-weight: 700;
          color: #64748b;
        }

        .edit-input {
          height: 42px;
          padding: 0 12px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 13.5px;
          outline: none;
        }

        .save-profile-btn {
          height: 42px;
          background: #0b5d71;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          margin-top: 6px;
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

        .db-title { font-size: 13.5px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .db-desc { font-size: 11.5px; color: #64748b; line-height: 1.4; }

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
        }
      `}</style>
    </div>
  );
}
