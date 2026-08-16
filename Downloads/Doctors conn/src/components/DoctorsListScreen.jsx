import React, { useState } from 'react';
import { ArrowLeft, Search, Star, ChevronRight, MapPin, Clock } from 'lucide-react';
import { DOCTORS } from '../data/doctorsData';

export default function DoctorsListScreen({ onBack, onSelectDoctor, initialSpecialtyId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecFilter, setSelectedSpecFilter] = useState(initialSpecialtyId || 'all');

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpec = selectedSpecFilter === 'all' || doc.specialtyId === selectedSpecFilter;

    return matchesSearch && matchesSpec;
  });

  return (
    <div className="doctors-list-screen animate-fade-in">
      {/* Header matching frame 36s */}
      <div className="doctors-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} color="#ffffff" />
        </button>
        <h2 className="header-title">All Specialists</h2>
        <div className="header-search-icon">
          <Search size={18} color="#ffffff" />
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="filter-sticky-bar">
        <div className="search-input-box">
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors by name or hospital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Doctors List */}
      <div className="doctors-cards-list">
        {filteredDoctors.length === 0 ? (
          <div className="no-results">
            <p>No specialists found matching your search.</p>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="doctor-full-card"
              onClick={() => onSelectDoctor(doc)}
            >
              <div className="doc-card-top-row">
                <img src={doc.image} alt={doc.name} className="doc-avatar-img" />
                <div className="doc-main-info">
                  <h3 className="doc-name-heading">{doc.name}</h3>
                  <p className="doc-spec-sub">{doc.specialty}</p>
                  <p className="doc-exp-text">{doc.experience}</p>
                  <div className="doc-rating-row">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span className="rating-score">{doc.rating}</span>
                  </div>
                </div>
                <ChevronRight size={20} color="#94a3b8" className="doc-chevron" />
              </div>

              <div className="doc-card-divider"></div>

              <div className="doc-card-footer">
                <div className="footer-info-row">
                  <MapPin size={13} color="#64748b" />
                  <span>{doc.hospital}</span>
                </div>
                <div className="footer-info-row">
                  <Clock size={13} color="#64748b" />
                  <span>{doc.hours}</span>
                </div>
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
          padding-bottom: 80px;
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
        }

        .header-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
        }

        .header-search-icon {
          display: flex;
          align-items: center;
        }

        .filter-sticky-bar {
          padding: 12px 16px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
        }

        .search-input-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          padding: 10px 14px;
          border-radius: 10px;
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 13.5px;
          color: #0f172a;
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
          box-shadow: 0 2px 12px rgba(11, 93, 113, 0.04);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .doctor-full-card:active {
          transform: scale(0.98);
        }

        .doc-card-top-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .doc-avatar-img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e2e8f0;
        }

        .doc-main-info {
          flex: 1;
        }

        .doc-name-heading {
          font-size: 16px;
          font-weight: 800;
          color: #0b5d71;
          margin-bottom: 2px;
        }

        .doc-spec-sub {
          font-size: 12.5px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 2px;
        }

        .doc-exp-text {
          font-size: 11px;
          color: #94a3b8;
          margin-bottom: 4px;
        }

        .doc-rating-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-score {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
        }

        .doc-chevron {
          margin-left: auto;
        }

        .doc-card-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 12px 0 10px;
        }

        .doc-card-footer {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-info-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: #64748b;
        }

        .no-results {
          text-align: center;
          padding: 40px 20px;
          color: #94a3b8;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
