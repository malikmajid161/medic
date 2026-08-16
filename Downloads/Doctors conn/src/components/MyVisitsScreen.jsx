import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, User, Plus } from 'lucide-react';
import { getStoredAppointments } from '../lib/supabase';

export default function MyVisitsScreen({ onSelectAppointment, onBookNew }) {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const saved = getStoredAppointments();
    if (saved.length > 0) {
      setAppointments(saved);
    } else {
      const defaultApt = {
        id: 'apt_demo_1',
        doctorName: 'Dr. Ahmed Ali',
        doctorSpecialty: 'Cardiologist',
        consultationType: 'In-person Visit',
        dayFormatted: 'Friday',
        dateFormatted: '14/08/2026',
        timeSlot: '09:30',
        patientName: 'Zunaira Mughal',
        contactNumber: '03010123456',
        status: 'Pending'
      };
      setAppointments([defaultApt]);
    }
  }, []);

  const filtered = appointments.filter(apt => {
    if (activeTab === 'upcoming') return apt.status !== 'Completed' && apt.status !== 'Cancelled';
    return apt.status === 'Completed' || apt.status === 'Cancelled';
  });

  return (
    <div className="visits-screen animate-fade-in">
      <div className="visits-header">
        <h2 className="header-title">My Visits</h2>
      </div>

      {/* Tabs: Upcoming vs Past */}
      <div className="visits-tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Visits ({appointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled').length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past History
        </button>
      </div>

      <div className="visits-list">
        {filtered.length === 0 ? (
          <div className="empty-visits">
            <Calendar size={48} color="#cbd5e1" />
            <p className="empty-title">No visits found</p>
            <p className="empty-sub">You have no {activeTab} appointments scheduled.</p>
            <button className="book-first-btn" onClick={onBookNew}>
              <Plus size={16} /> Book Appointment
            </button>
          </div>
        ) : (
          filtered.map((apt) => (
            <div
              key={apt.id}
              className="visit-card"
              onClick={() => onSelectAppointment(apt)}
            >
              <div className="visit-card-header">
                <div>
                  <h4 className="visit-doc-name">{apt.doctorName}</h4>
                  <p className="visit-spec">{apt.doctorSpecialty}</p>
                </div>
                <span className={`status-pill ${apt.status?.toLowerCase() || 'pending'}`}>
                  {apt.status || 'Pending'}
                </span>
              </div>

              <div className="visit-card-body">
                <div className="meta-item">
                  <Calendar size={14} color="#0b5d71" />
                  <span>{apt.dayFormatted}, {apt.dateFormatted}</span>
                </div>
                <div className="meta-item">
                  <Clock size={14} color="#0b5d71" />
                  <span>{apt.timeSlot} ({apt.consultationType})</span>
                </div>
              </div>

              <div className="visit-card-footer">
                <span className="view-detail-link">View Details</span>
                <ChevronRight size={16} color="#0b5d71" />
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .visits-screen {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 18px 100px;
          background: #f5f9fc;
        }

        .visits-header {
          margin-bottom: 16px;
        }

        .header-title {
          font-size: 22px;
          font-weight: 800;
          color: #0b5d71;
        }

        .visits-tabs-bar {
          display: flex;
          background: #e2e8f0;
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .tab-btn {
          flex: 1;
          height: 38px;
          border: none;
          background: transparent;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #0b5d71;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .visits-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .visit-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.04);
          cursor: pointer;
          transition: transform 0.2s;
        }

        .visit-card:active {
          transform: scale(0.98);
        }

        .visit-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .visit-doc-name {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
        }

        .visit-spec {
          font-size: 12px;
          color: #64748b;
        }

        .status-pill {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .status-pill.pending { background: #fef3c7; color: #92400e; }
        .status-pill.confirmed { background: #dcfce7; color: #166534; }
        .status-pill.cancelled { background: #ffe4e6; color: #be123c; }

        .visit-card-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 10px;
          background: #f8fafc;
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #334155;
          font-weight: 600;
        }

        .visit-card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }

        .view-detail-link {
          font-size: 12.5px;
          font-weight: 700;
          color: #0b5d71;
        }

        .empty-visits {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 20px;
          text-align: center;
        }

        .empty-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin: 12px 0 4px;
        }

        .empty-sub {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .book-first-btn {
          height: 44px;
          padding: 0 20px;
          background: #0b5d71;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13.5px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
