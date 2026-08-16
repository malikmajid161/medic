import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Star, ChevronRight, MapPin, Clock, Calendar, CheckCircle2, Filter } from 'lucide-react';
import { SPECIALTIES } from '../data/doctorsData';
import { getStoredDoctors } from '../lib/supabase';

export default function DoctorsListScreen({ onBack, onSelectDoctor, initialSpecialtyId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecFilter, setSelectedSpecFilter] = useState(initialSpecialtyId || 'all');
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    setDoctorsList(getStoredDoctors());
  }, []);

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpec = selectedSpecFilter === 'all' || doc.specialtyId === selectedSpecFilter;

    return matchesSearch && matchesSpec;
  });

  return (
    <div className="doctors-list-screen animate-fade-in">
      {/* Top Sticky Header */}
      <div className="doctors-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} color="#ffffff" />
        </button>
        <h2 className="header-title">Find Specialist Doctor</h2>
        <div className="header-badge-count">{filteredDoctors.length} Available</div>
      </div>

      {/* Filter / Search Bar */}
      <div className="filter-sticky-bar">
        <div className="search-input-box">
          <Search size={16} color="#0b5d71" />
          <input
            type="text"
            className="search-input"
            placeholder="Search doctor, hospital, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>

        {/* Filter Category Chips */}
        <div className="spec-filter-scroll">
          <button
            className={`filter-chip ${selectedSpecFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSpecFilter('all')}
          >
            All Doctors
          </button>
          {SPECIALTIES.map((spec) => (
            <button
              key={spec.id}
              className={`filter-chip ${selectedSpecFilter === spec.id ? 'active' : ''}`}
              onClick={() => setSelectedSpecFilter(spec.id)}
            >
              {spec.title}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div className="doctors-cards-list">
        {filteredDoctors.length === 0 ? (
          <div className="no-results-card">
            <Filter size={32} color="#94a3b8" />
            <p className="no-results-title">No specialists found</p>
            <p className="no-results-sub">Try searching with a different specialty or doctor name.</p>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="doctor-full-card animate-slide-up"
              onClick={() => onSelectDoctor(doc)}
            >
              <div className="doc-card-top-row">
                <div className="doc-avatar-container">
                  <img src={doc.image} alt={doc.name} className="doc-avatar-img" />
                  <span className="online-indicator-dot" title="Available for booking"></span>
                </div>

                <div className="doc-main-info">
                  <div className="doc-name-flex">
                    <h3 className="doc-name-heading">{doc.name}</h3>
                    <div className="doc-rating-badge">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{doc.rating || 4.9}</span>
                    </div>
                  </div>

                  <p className="doc-spec-sub">{doc.specialty}</p>
                  <p className="doc-exp-text">✨ {doc.experience || '8 years experience'}</p>
                </div>
              </div>

              <div className="doc-card-divider"></div>

              <div className="doc-card-footer">
                <div className="footer-meta-column">
                  <div className="footer-info-row">
                    <MapPin size={13} color="#0b5d71" />
                    <span>{doc.hospital}</span>
                  </div>
                  <div className="footer-info-row">
                    <Clock size={13} color="#0b5d71" />
                    <span>{doc.hours || 'Mon-Fri: 9am-5pm'}</span>
                  </div>
                </div>

                <button
                  className="card-book-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDoctor(doc);
                  }}
                >
                  Book Visit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .doctors-list-screen {
          position: absolute;
          inset: 0;
          background: #f5f9fc;
          display: flex;
          flex-direction: column;
          z-index: 30;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 90px;
        }

        .doctors-header {
          position: sticky;
          top: 0;
          background: #0b5d71;
          color: #ffffff;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.15);
          z-index: 10;
        }

        .back-btn {
          background: none;
          border: none;
          cursor: pointer;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .back-btn:active {
          background: rgba(255, 255, 255, 0.2);
        }

        .header-title {
          font-size: 16.5px;
          font-weight: 700;
          color: #ffffff;
        }

        .header-badge-count {
          font-size: 11px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .filter-sticky-bar {
          padding: 12px 16px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: sticky;
          top: 60px;
          z-index: 9;
        }

        .search-input-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 13.5px;
          color: #0f172a;
        }

        .clear-search-btn {
          background: none;
          border: none;
          font-size: 18px;
          color: #94a3b8;
          cursor: pointer;
          padding: 0 4px;
        }

        .spec-filter-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 2px;
        }

        .filter-chip {
          flex: 0 0 auto;
          height: 32px;
          padding: 0 14px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-chip.active {
          background: #0b5d71;
          color: #ffffff;
          border-color: #0b5d71;
          box-shadow: 0 2px 8px rgba(11, 93, 113, 0.2);
        }

        .doctors-cards-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .doctor-full-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.04);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .doctor-full-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(11, 93, 113, 0.08);
        }

        .doc-card-top-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .doc-avatar-container {
          position: relative;
          width: 62px;
          height: 62px;
        }

        .doc-avatar-img {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0b5d71;
        }

        .online-indicator-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #ffffff;
          box-shadow: 0 0 6px #10b981;
        }

        .doc-main-info {
          flex: 1;
        }

        .doc-name-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }

        .doc-name-heading {
          font-size: 15.5px;
          font-weight: 800;
          color: #0f172a;
        }

        .doc-rating-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #fef3c7;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11.5px;
          font-weight: 800;
        }

        .doc-spec-sub {
          font-size: 12.5px;
          font-weight: 700;
          color: #0b5d71;
          margin-bottom: 2px;
        }

        .doc-exp-text {
          font-size: 11.5px;
          color: #64748b;
        }

        .doc-card-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 12px 0 10px;
        }

        .doc-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .footer-meta-column {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .footer-info-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: #64748b;
          font-weight: 500;
        }

        .card-book-action-btn {
          background: #0b5d71;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(11, 93, 113, 0.2);
        }

        .no-results-card {
          text-align: center;
          padding: 40px 20px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .no-results-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          margin: 10px 0 4px;
        }

        .no-results-sub {
          font-size: 12px;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
