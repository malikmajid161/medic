import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, User, Plus, CheckCircle2, XCircle, AlertCircle, Phone } from 'lucide-react';
import { getStoredAppointments } from '../lib/supabase';

export default function MyVisitsScreen({ onSelectAppointment, onBookNew }) {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'upcoming', 'history'

  useEffect(() => {
    const saved = getStoredAppointments();
    if (saved.length > 0) {
      setAppointments(saved);
    } else {
      const defaultApt = {
        id: 'apt_demo_1',
        doctorName: 'Dr. Ahmed Ali',
        doctorSpecialty: 'Cardiologist (Heart)',
        consultationType: 'In-person Visit',
        dayFormatted: 'Friday',
        dateFormatted: '14/08/2026',
        timeSlot: '09:30 AM',
        patientName: 'Zunaira Mughal',
        contactNumber: '03010123456',
        status: 'Pending'
      };
      setAppointments([defaultApt]);
    }
  }, []);

  const filteredAppointments = appointments.filter(apt => {
    const statusLower = (apt.status || 'Pending').toLowerCase();
    if (activeTab === 'upcoming') {
      return statusLower === 'pending' || statusLower === 'accepted' || statusLower === 'confirmed';
    }
    if (activeTab === 'history') {
      return statusLower === 'completed' || statusLower === 'cancelled' || statusLower === 'declined';
    }
    return true; // 'all'
  });

  return (
    <div className="visits-screen animate-fade-in">
      {/* Header Title */}
      <div className="visits-header-row">
        <div>
          <h2 className="header-title">Appointment History</h2>
          <p className="header-subtitle">Track your medical bookings & consultation statuses</p>
        </div>
        <button className="new-booking-chip-btn" onClick={onBookNew}>
          <Plus size={15} /> Book Visit
        </button>
      </div>

      {/* 3 Tab Selector Bar */}
      <div className="visits-tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({appointments.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Active / Pending
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {/* Appointments List */}
      <div className="visits-list">
        {filteredAppointments.length === 0 ? (
          <div className="empty-visits-card">
            <Calendar size={48} color="#0b5d71" opacity={0.4} />
            <h4 className="empty-title">No appointments found</h4>
            <p className="empty-sub">You have no scheduled visits in this category.</p>
            <button className="book-first-btn" onClick={onBookNew}>
              <Plus size={16} /> Book New Appointment
            </button>
          </div>
        ) : (
          filteredAppointments.map((apt) => {
            const statusLower = (apt.status || 'Pending').toLowerCase();
            return (
              <div
                key={apt.id}
                className="visit-card animate-slide-up"
                onClick={() => onSelectAppointment(apt)}
              >
                <div className="visit-card-header">
                  <div className="doc-info-block">
                    <h4 className="visit-doc-name">{apt.doctorName}</h4>
                    <p className="visit-spec">{apt.doctorSpecialty}</p>
                  </div>
                  <span className={`status-pill ${statusLower}`}>
                    {statusLower === 'accepted' || statusLower === 'confirmed' ? (
                      <CheckCircle2 size={12} />
                    ) : statusLower === 'declined' || statusLower === 'cancelled' ? (
                      <XCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    <span>{apt.status || 'Pending'}</span>
                  </span>
                </div>

                <div className="visit-card-body">
                  <div className="meta-row">
                    <Calendar size={14} color="#0b5d71" />
                    <span>{apt.dayFormatted || 'Friday'}, {apt.dateFormatted || '14/08/2026'}</span>
                  </div>
                  <div className="meta-row">
                    <Clock size={14} color="#0b5d71" />
                    <span>{apt.timeSlot || '09:30 AM'} — <strong style={{ color: '#0b5d71' }}>{apt.consultationType}</strong></span>
                  </div>
                  <div className="meta-row">
                    <Phone size={14} color="#64748b" />
                    <span>Patient: {apt.patientName} ({apt.contactNumber})</span>
                  </div>
                </div>

                <div className="visit-card-footer">
                  <span className="view-detail-link">View Details & Pass Ticket</span>
                  <ChevronRight size={16} color="#0b5d71" />
                </div>
              </div>
            );
          })
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

        .visits-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .header-title {
          font-size: 20px;
          font-weight: 800;
          color: #0b5d71;
        }

        .header-subtitle {
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }

        .new-booking-chip-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #0b5d71;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(11, 93, 113, 0.2);
        }

        .visits-tabs-bar {
          display: flex;
          background: #e2e8f0;
          padding: 4px;
          border-radius: 14px;
          margin-bottom: 16px;
        }

        .tab-btn {
          flex: 1;
          height: 38px;
          border: none;
          background: transparent;
          border-radius: 10px;
          font-weight: 700;
          font-size: 12.5px;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-btn.active {
          background: #ffffff;
          color: #0b5d71;
          box-shadow: 0 2px 8px rgba(11, 93, 113, 0.08);
        }

        .visits-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .visit-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.04);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .visit-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(11, 93, 113, 0.08);
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
          font-weight: 600;
          color: #0b5d71;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 800;
          text-transform: capitalize;
        }

        .status-pill.pending { background: #fef3c7; color: #92400e; }
        .status-pill.accepted,
        .status-pill.confirmed { background: #dcfce7; color: #15803d; }
        .status-pill.declined,
        .status-pill.cancelled { background: #ffe4e6; color: #be123c; }

        .visit-card-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #334155;
          font-weight: 500;
        }

        .visit-card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }

        .view-detail-link {
          font-size: 12px;
          font-weight: 700;
          color: #0b5d71;
        }

        .empty-visits-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 44px 20px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }

        .empty-title {
          font-size: 15.5px;
          font-weight: 800;
          color: #0f172a;
          margin: 12px 0 4px;
        }

        .empty-sub {
          font-size: 12.5px;
          color: #94a3b8;
          margin-bottom: 18px;
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
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.2);
        }
      `}</style>
    </div>
  );
}
