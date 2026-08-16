import React from 'react';
import { ArrowLeft, ChevronRight, Wind, Activity, Thermometer, Bug, Droplet, ShieldAlert, Heart } from 'lucide-react';
import { SPECIALTIES } from '../data/doctorsData';

const iconMap = {
  Wind,
  Activity,
  Thermometer,
  Bug,
  Droplet,
  ShieldAlert,
  Heart
};

export default function BrowseSpecialtiesScreen({ onBack, onSelectSpecialty }) {
  return (
    <div className="specialties-screen animate-slide-up">
      {/* Header Bar matching video design */}
      <div className="specialties-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} color="#ffffff" />
        </button>
        <h2 className="header-title">Browse by Specialty</h2>
      </div>

      <div className="specialties-list">
        {SPECIALTIES.map((spec) => {
          const IconComp = iconMap[spec.iconName] || Activity;
          return (
            <div
              key={spec.id}
              className="specialty-item-card"
              onClick={() => onSelectSpecialty(spec)}
            >
              <div className="specialty-icon-box">
                <IconComp size={24} color="#0b5d71" />
              </div>
              <div className="specialty-info">
                <h4 className="specialty-title">{spec.title}</h4>
                <p className="specialty-subtitle">{spec.subtitle}</p>
              </div>
              <ChevronRight size={18} color="#94a3b8" className="chevron-icon" />
            </div>
          );
        })}
      </div>

      <style>{`
        .specialties-screen {
          position: absolute;
          inset: 0;
          background: #f5f9fc;
          display: flex;
          flex-direction: column;
          z-index: 100;
          overflow-y: auto;
          padding-bottom: 80px;
        }

        .specialties-header {
          position: sticky;
          top: 0;
          background: #0b5d71;
          color: #ffffff;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.15);
          z-index: 10;
        }

        .back-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .header-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
        }

        .specialties-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .specialty-item-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 10px rgba(11, 93, 113, 0.03);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .specialty-item-card:active {
          transform: scale(0.98);
          background: #f8fafc;
        }

        .specialty-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #e6f3f7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .specialty-info {
          flex: 1;
        }

        .specialty-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .specialty-subtitle {
          font-size: 12px;
          color: #64748b;
        }

        .chevron-icon {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
