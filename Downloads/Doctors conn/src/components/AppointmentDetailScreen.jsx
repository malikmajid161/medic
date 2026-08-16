import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, User, Phone, Briefcase, PlusCircle, XCircle } from 'lucide-react';
import { cancelAppointmentInStorage, supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AppointmentDetailScreen({ appointment, onBack, onCancelled }) {
  const [apt, setApt] = useState(appointment);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    setCancelling(true);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('appointments')
          .update({ status: 'Cancelled' })
          .eq('id', apt.id);
      } catch (err) {
        console.warn('Supabase update error:', err);
      }
    }

    cancelAppointmentInStorage(apt.id);
    
    setTimeout(() => {
      setApt({ ...apt, status: 'Cancelled' });
      setCancelling(false);
      if (onCancelled) onCancelled(apt.id);
    }, 400);
  };

  return (
    <div className="detail-screen animate-slide-up">
      {/* Header Bar matching frame 54s */}
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} color="#ffffff" />
        </button>
        <h2 className="header-title">Appointment Detail</h2>
      </div>

      <div className="detail-content-body">
        {/* Top Doctor Summary Card */}
        <div className="doctor-status-card">
          <div className="doc-icon-badge">
            <Briefcase size={26} color="#0b5d71" />
          </div>
          <h3 className="card-doctor-name">{apt.doctorName || 'Dr. Ahmed Ali'}</h3>
          
          <div className={`status-pill ${apt.status?.toLowerCase() || 'pending'}`}>
            <Clock size={13} />
            <span>{apt.status || 'Pending'}</span>
          </div>
        </div>

        {/* Detailed Rows Card */}
        <div className="details-list-card">
          <div className="detail-row">
            <div className="row-left">
              <PlusCircle size={18} color="#0b5d71" />
              <span className="row-label">Speciality</span>
            </div>
            <span className="row-value">{apt.doctorSpecialty || 'Cardiologist'}</span>
          </div>

          <div className="detail-row">
            <div className="row-left">
              <Briefcase size={18} color="#0b5d71" />
              <span className="row-label">Type</span>
            </div>
            <span className="row-value">{apt.consultationType || 'In-person Visit'}</span>
          </div>

          <div className="detail-row">
            <div className="row-left">
              <Calendar size={18} color="#0b5d71" />
              <span className="row-label">Day</span>
            </div>
            <span className="row-value">{apt.dayFormatted || 'Friday'}</span>
          </div>

          <div className="detail-row">
            <div className="row-left">
              <Calendar size={18} color="#0b5d71" />
              <span className="row-label">Date</span>
            </div>
            <span className="row-value">{apt.dateFormatted || '14/08/2026'}</span>
          </div>

          <div className="detail-row">
            <div className="row-left">
              <Clock size={18} color="#0b5d71" />
              <span className="row-label">Time slot</span>
            </div>
            <span className="row-value">{apt.timeSlot || '09:30'}</span>
          </div>

          <div className="detail-row">
            <div className="row-left">
              <User size={18} color="#0b5d71" />
              <span className="row-label">Full name</span>
            </div>
            <span className="row-value">{apt.patientName || 'Zunaira Mughal'}</span>
          </div>

          <div className="detail-row">
            <div className="row-left">
              <Phone size={18} color="#0b5d71" />
              <span className="row-label">Contact number</span>
            </div>
            <span className="row-value">{apt.contactNumber || '03010123456'}</span>
          </div>
        </div>

        {/* Cancel Appointment Button matching frame 54s */}
        {apt.status !== 'Cancelled' ? (
          <button className="cancel-apt-btn" onClick={handleCancel} disabled={cancelling}>
            <XCircle size={18} color="#be123c" />
            <span>{cancelling ? 'Cancelling...' : 'Cancel Appointment'}</span>
          </button>
        ) : (
          <div className="cancelled-banner">
            Appointment Cancelled
          </div>
        )}
      </div>

      <style>{`
        .detail-screen {
          position: absolute;
          inset: 0;
          background: #f5f9fc;
          display: flex;
          flex-direction: column;
          z-index: 40;
          overflow-y: auto;
        }

        .detail-header {
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
        }

        .header-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
        }

        .detail-content-body {
          padding: 20px 18px 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .doctor-status-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.04);
        }

        .doc-icon-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #e6f3f7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .card-doctor-name {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .status-pill.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-pill.confirmed {
          background: #dcfce7;
          color: #166534;
        }

        .status-pill.cancelled {
          background: #ffe4e6;
          color: #be123c;
        }

        .details-list-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 16px 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.04);
          display: flex;
          flex-direction: column;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .row-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .row-label {
          font-size: 13px;
          color: #64748b;
        }

        .row-value {
          font-size: 13.5px;
          font-weight: 700;
          color: #0f172a;
        }

        .cancel-apt-btn {
          height: 50px;
          background: #ffffff;
          color: #be123c;
          border: 1.5px solid #fecdd3;
          border-radius: 14px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.2s ease;
        }

        .cancel-apt-btn:active {
          background: #ffe4e6;
        }

        .cancelled-banner {
          height: 50px;
          background: #f1f5f9;
          color: #64748b;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
