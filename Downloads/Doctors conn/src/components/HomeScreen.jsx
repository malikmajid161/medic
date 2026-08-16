import React from 'react';
import { Search, Bell, Star, ArrowRight, Activity, Wind, Thermometer, Bug, Droplet, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { SPECIALTIES, DOCTORS, WELLNESS_INSIGHT } from '../data/doctorsData';

const iconMap = {
  Wind,
  Activity,
  Thermometer,
  Bug,
  Droplet,
  ShieldAlert,
  Heart
};

export default function HomeScreen({ user, onSelectDoctor, onViewAllSpecialties, onViewAllDoctors }) {
  return (
    <div className="home-screen animate-fade-in">
      {/* Top Header Bar */}
      <div className="home-header">
        <div className="user-greeting">
          <div className="avatar-circle">
            <span className="avatar-text">{user?.fullName?.charAt(0) || 'Z'}</span>
          </div>
          <div>
            <span className="greeting-sub">Welcome back 👋</span>
            <h3 className="greeting-name">{user?.fullName || 'Zunaira Mughal'}</h3>
          </div>
        </div>
        <button className="icon-badge-btn" onClick={onViewAllDoctors}>
          <Bell size={20} color="#0b5d71" />
          <span className="dot-badge"></span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="search-bar-wrapper" onClick={onViewAllDoctors}>
        <Search size={18} color="#94a3b8" />
        <span className="search-placeholder">Search doctor, specialty, hospital...</span>
      </div>

      {/* Browse by Specialty Section */}
      <div className="section-container">
        <div className="section-header">
          <div>
            <h3 className="section-title">Browse by Specialty</h3>
            <p className="section-subtitle">Find care for your condition</p>
          </div>
          <button className="view-all-btn" onClick={onViewAllSpecialties}>
            View All
          </button>
        </div>

        <div className="specialty-horizontal-scroll">
          {SPECIALTIES.map((spec) => {
            const IconComp = iconMap[spec.iconName] || Activity;
            return (
              <div
                key={spec.id}
                className="specialty-chip-card"
                onClick={() => onViewAllSpecialties(spec.id)}
              >
                <div className="spec-icon-wrapper" style={{ backgroundColor: `${spec.color}15`, color: spec.color }}>
                  <IconComp size={22} />
                </div>
                <span className="spec-card-title">{spec.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Now Section */}
      <div className="section-container">
        <div className="section-header">
          <div>
            <h3 className="section-title">Available Now</h3>
            <p className="section-subtitle">Ready to consult today</p>
          </div>
          <button className="view-all-btn" onClick={onViewAllDoctors}>
            View All
          </button>
        </div>

        <div className="doctors-horizontal-scroll">
          {DOCTORS.slice(0, 4).map((doc) => (
            <div key={doc.id} className="available-doctor-card">
              <img src={doc.image} alt={doc.name} className="doctor-card-img" />
              <div className="doc-card-body">
                <h4 className="doc-card-name">{doc.name}</h4>
                <p className="doc-card-spec">{doc.specialty}</p>
                <div className="doc-card-meta">
                  <span className="hours-tag">{doc.hours}</span>
                </div>
                <div className="doc-card-rating">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span className="rating-num">{doc.rating}</span>
                  <span className="exp-text">• {doc.experience.split(' ')[0]} yrs exp</span>
                </div>
                <button
                  className="book-now-btn"
                  onClick={() => onSelectDoctor(doc)}
                >
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Wellness Insight Card */}
      <div className="section-container">
        <div className="wellness-insight-card">
          <div className="wellness-badge-row">
            <span className="insight-gold-dot">💡</span>
            <span className="wellness-badge-title">{WELLNESS_INSIGHT.badge}</span>
          </div>
          <div className="insight-content-flex">
            <div className="insight-icon-box">
              <Droplet size={24} color="#0b5d71" />
            </div>
            <div>
              <h4 className="insight-title">{WELLNESS_INSIGHT.title}</h4>
              <p className="insight-desc">{WELLNESS_INSIGHT.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="section-container">
        <div className="section-header">
          <div>
            <h3 className="section-title">Recommended For You</h3>
            <p className="section-subtitle">Personalised picks based on your needs</p>
          </div>
          <button className="view-all-btn" onClick={onViewAllDoctors}>
            View All
          </button>
        </div>

        <div className="recommended-grid">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="rec-doctor-card"
              onClick={() => onSelectDoctor(doc)}
            >
              <img src={doc.image} alt={doc.name} className="rec-doc-img" />
              <h4 className="rec-doc-name">{doc.name}</h4>
              <p className="rec-doc-spec">{doc.specialty}</p>
              <div className="rec-doc-rating">
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                <span className="rec-rating-text">{doc.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .home-screen {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 18px 100px;
          background: #f5f9fc;
        }

        .home-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .user-greeting {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0b5d71, #0284c7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          box-shadow: 0 4px 10px rgba(11, 93, 113, 0.2);
        }

        .greeting-sub {
          font-size: 12px;
          color: #64748b;
        }

        .greeting-name {
          font-size: 17px;
          font-weight: 800;
          color: #0b5d71;
        }

        .icon-badge-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .dot-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
        }

        .search-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(11, 93, 113, 0.03);
          cursor: pointer;
          margin-bottom: 22px;
        }

        .search-placeholder {
          font-size: 13.5px;
          color: #94a3b8;
        }

        .section-container {
          margin-bottom: 22px;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
        }

        .section-subtitle {
          font-size: 11.5px;
          color: #64748b;
          margin-top: 1px;
        }

        .view-all-btn {
          background: none;
          border: none;
          font-size: 12.5px;
          font-weight: 700;
          color: #0b5d71;
          cursor: pointer;
        }

        .specialty-horizontal-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 6px;
        }

        .specialty-horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        .specialty-chip-card {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          padding: 10px 16px;
          border-radius: 30px;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .specialty-chip-card:active {
          transform: scale(0.96);
        }

        .spec-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spec-card-title {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
        }

        .doctors-horizontal-scroll {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 8px;
        }

        .doctors-horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        .available-doctor-card {
          flex: 0 0 240px;
          background: #ffffff;
          border-radius: 18px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.05);
          display: flex;
          flex-direction: column;
        }

        .doctor-card-img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .doc-card-name {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .doc-card-spec {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .hours-tag {
          display: inline-block;
          font-size: 10.5px;
          color: #0b5d71;
          background: #e6f3f7;
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .doc-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 12px;
        }

        .rating-num {
          font-size: 12.5px;
          font-weight: 800;
          color: #0f172a;
        }

        .exp-text {
          font-size: 11px;
          color: #64748b;
        }

        .book-now-btn {
          width: 100%;
          height: 38px;
          background: #0b5d71;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          margin-top: auto;
        }

        .wellness-insight-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.05);
        }

        .wellness-badge-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .wellness-badge-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #854d0e;
        }

        .insight-content-flex {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .insight-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #e6f3f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .insight-title {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .insight-desc {
          font-size: 12px;
          color: #64748b;
          line-height: 1.45;
        }

        .recommended-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .rec-doctor-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          text-align: center;
          cursor: pointer;
        }

        .rec-doc-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 8px;
        }

        .rec-doc-name {
          font-size: 13.5px;
          font-weight: 800;
          color: #0f172a;
        }

        .rec-doc-spec {
          font-size: 11px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .rec-doc-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .rec-rating-text {
          font-size: 11px;
          font-weight: 800;
          color: #0f172a;
          margin-left: 4px;
        }
      `}</style>
    </div>
  );
}
