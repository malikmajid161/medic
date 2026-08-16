import React, { useState, useEffect } from 'react';
import { Search, Bell, Star, ArrowRight, Activity, Wind, Thermometer, Bug, Droplet, ShieldAlert, Heart, Calendar, Clock, Check, X, User, CheckCircle2, ShieldCheck, Stethoscope } from 'lucide-react';
import { SPECIALTIES, WELLNESS_INSIGHT } from '../data/doctorsData';
import { getStoredDoctors, getStoredAppointments, updateAppointmentStatusInStorage } from '../lib/supabase';

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
  const isDoctor = user?.role === 'doctor';
  const [doctorsList, setDoctorsList] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load dynamic doctors list
    const docs = getStoredDoctors();
    setDoctorsList(docs);

    // Load appointments
    const apts = getStoredAppointments();
    setAppointments(apts);
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = updateAppointmentStatusInStorage(id, newStatus);
    setAppointments(updated);
  };

  // Filter appointments for Doctor view
  const pendingRequests = appointments.filter(a => a.status === 'Pending');
  const acceptedVisits = appointments.filter(a => a.status === 'Accepted' || a.status === 'Confirmed');

  return (
    <div className="home-screen animate-fade-in">
      {/* Top Header Bar */}
      <div className="home-header">
        <div className="user-greeting">
          <div className="avatar-circle">
            {user?.image ? (
              <img src={user.image} alt={user.fullName} className="header-avatar-img" />
            ) : (
              <span className="avatar-text">{user?.fullName?.charAt(0) || 'D'}</span>
            )}
          </div>
          <div>
            <div className="greeting-role-tag">
              <span className={`role-badge ${isDoctor ? 'doc-badge' : 'pat-badge'}`}>
                {isDoctor ? 'Doctor Portal' : 'Patient Portal'}
              </span>
            </div>
            <h3 className="greeting-name">{user?.fullName || 'Zunaira Mughal'}</h3>
          </div>
        </div>
        <button className="icon-badge-btn" onClick={onViewAllDoctors}>
          <Bell size={20} color="#0b5d71" />
          {pendingRequests.length > 0 && <span className="dot-badge"></span>}
        </button>
      </div>

      {/* --------------------------------------------------- */}
      {/* DOCTOR DASHBOARD VIEW */}
      {/* --------------------------------------------------- */}
      {isDoctor ? (
        <div className="doctor-portal-view">
          {/* Doctor Info Card */}
          <div className="doctor-info-hero">
            <div className="hero-doc-flex">
              <img src={user?.image || '/assets/doc_real_2.jpg'} alt={user?.fullName} className="hero-doc-img" />
              <div>
                <h3 className="hero-doc-name">{user?.fullName}</h3>
                <p className="hero-doc-spec">{user?.specialty || 'Cardiologist'} • {user?.experience || '10 yrs exp'}</p>
                <p className="hero-doc-hosp">{user?.hospital || 'Medic Hospital'}</p>
              </div>
            </div>

            <div className="doc-stats-grid">
              <div className="stat-card">
                <span className="stat-num">{appointments.length}</span>
                <span className="stat-label">Total Requests</span>
              </div>
              <div className="stat-card gold">
                <span className="stat-num">{pendingRequests.length}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-card green">
                <span className="stat-num">{acceptedVisits.length}</span>
                <span className="stat-label">Accepted</span>
              </div>
            </div>
          </div>

          {/* Incoming Appointment Requests Section */}
          <div className="section-container">
            <div className="section-header">
              <div>
                <h3 className="section-title">Patient Appointment Requests</h3>
                <p className="section-subtitle">Review and accept incoming consultation requests</p>
              </div>
            </div>

            {appointments.length === 0 ? (
              <div className="empty-requests-card">
                <Calendar size={36} color="#94a3b8" />
                <p className="empty-title">No pending requests</p>
                <p className="empty-sub">Patient bookings will appear here instantly.</p>
              </div>
            ) : (
              <div className="requests-list-flex">
                {appointments.map((apt) => (
                  <div key={apt.id} className="request-card-item">
                    <div className="request-card-top">
                      <div className="patient-avatar-box">
                        <User size={20} color="#0b5d71" />
                      </div>
                      <div className="patient-info">
                        <h4 className="patient-name">{apt.patientName || 'Zunaira Mughal'}</h4>
                        <p className="patient-contact">📞 {apt.contactNumber || '03010123456'}</p>
                      </div>
                      <span className={`status-pill ${apt.status?.toLowerCase()}`}>
                        {apt.status || 'Pending'}
                      </span>
                    </div>

                    <div className="request-details-bar">
                      <div className="req-meta">
                        <Calendar size={13} color="#0b5d71" />
                        <span>{apt.dayFormatted}, {apt.dateFormatted}</span>
                      </div>
                      <div className="req-meta">
                        <Clock size={13} color="#0b5d71" />
                        <span>{apt.timeSlot} ({apt.consultationType})</span>
                      </div>
                    </div>

                    {/* Accept / Decline Action Controls */}
                    {apt.status === 'Pending' ? (
                      <div className="request-actions-row">
                        <button
                          className="btn-accept"
                          onClick={() => handleUpdateStatus(apt.id, 'Accepted')}
                        >
                          <Check size={16} /> Accept Request
                        </button>
                        <button
                          className="btn-decline"
                          onClick={() => handleUpdateStatus(apt.id, 'Declined')}
                        >
                          <X size={16} /> Decline
                        </button>
                      </div>
                    ) : (
                      <div className="status-updated-confirmed">
                        <CheckCircle2 size={16} color="#166534" />
                        <span>Appointment Status Updated: <strong>{apt.status}</strong></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* --------------------------------------------------- */
        /* PATIENT DASHBOARD VIEW */
        /* --------------------------------------------------- */
        <div className="patient-portal-view">
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
                <h3 className="section-title">Available Doctors</h3>
                <p className="section-subtitle">Ready to consult today</p>
              </div>
              <button className="view-all-btn" onClick={onViewAllDoctors}>
                View All
              </button>
            </div>

            <div className="doctors-horizontal-scroll">
              {doctorsList.map((doc) => (
                <div key={doc.id} className="available-doctor-card">
                  <img src={doc.image} alt={doc.name} className="doctor-card-img" />
                  <div className="doc-card-body">
                    <h4 className="doc-card-name">{doc.name}</h4>
                    <p className="doc-card-spec">{doc.specialty}</p>
                    <div className="doc-card-meta">
                      <span className="hours-tag">{doc.hours || 'Mon-Fri: 9am-5pm'}</span>
                    </div>
                    <div className="doc-card-rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span className="rating-num">{doc.rating || 4.9}</span>
                      <span className="exp-text">• {doc.experience?.split(' ')[0] || 8} yrs exp</span>
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
        </div>
      )}

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
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0b5d71, #0284c7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          box-shadow: 0 4px 10px rgba(11, 93, 113, 0.2);
          overflow: hidden;
        }

        .header-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .greeting-role-tag {
          margin-bottom: 2px;
        }

        .role-badge {
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .doc-badge { background: #dbeafe; color: #1e40af; }
        .pat-badge { background: #e6f3f7; color: #0b5d71; }

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

        /* Doctor Info Hero Card */
        .doctor-info-hero {
          background: linear-gradient(135deg, #0b5d71 0%, #0369a1 100%);
          border-radius: 20px;
          padding: 18px;
          color: #ffffff;
          margin-bottom: 22px;
          box-shadow: 0 8px 24px rgba(11, 93, 113, 0.25);
        }

        .hero-doc-flex {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .hero-doc-img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid #ffffff;
        }

        .hero-doc-name {
          font-size: 17px;
          font-weight: 800;
        }

        .hero-doc-spec {
          font-size: 12px;
          opacity: 0.9;
        }

        .hero-doc-hosp {
          font-size: 11px;
          opacity: 0.75;
        }

        .doc-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .stat-card.gold { background: rgba(245, 158, 11, 0.25); }
        .stat-card.green { background: rgba(16, 185, 129, 0.25); }

        .stat-num {
          font-size: 18px;
          font-weight: 800;
        }

        .stat-label {
          font-size: 10px;
          opacity: 0.85;
          margin-top: 2px;
        }

        /* Requests List */
        .requests-list-flex {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .request-card-item {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(11, 93, 113, 0.05);
        }

        .request-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .patient-avatar-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e6f3f7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .patient-info {
          flex: 1;
        }

        .patient-name {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .patient-contact {
          font-size: 11.5px;
          color: #64748b;
        }

        .status-pill {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .status-pill.pending { background: #fef3c7; color: #92400e; }
        .status-pill.accepted { background: #dcfce7; color: #166534; }
        .status-pill.declined { background: #ffe4e6; color: #be123c; }

        .request-details-bar {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: #f8fafc;
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 14px;
        }

        .req-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #334155;
          font-weight: 600;
        }

        .request-actions-row {
          display: flex;
          gap: 10px;
        }

        .btn-accept {
          flex: 1;
          height: 40px;
          background: #0b5d71;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }

        .btn-decline {
          height: 40px;
          padding: 0 16px;
          background: #ffffff;
          color: #be123c;
          border: 1px solid #fecdd3;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
        }

        .status-updated-confirmed {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: #166534;
          background: #dcfce7;
          padding: 8px 12px;
          border-radius: 8px;
        }

        .empty-requests-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .empty-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          margin: 10px 0 2px;
        }

        .empty-sub {
          font-size: 12px;
          color: #94a3b8;
        }

        /* Patient styles */
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

        .search-placeholder { font-size: 13.5px; color: #94a3b8; }
        .section-container { margin-bottom: 22px; }
        .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 12px; }
        .section-title { font-size: 16px; font-weight: 800; color: #0f172a; }
        .section-subtitle { font-size: 11.5px; color: #64748b; margin-top: 1px; }
        .view-all-btn { background: none; border: none; font-size: 12.5px; font-weight: 700; color: #0b5d71; cursor: pointer; }
        .specialty-horizontal-scroll { display: flex; gap: 12px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 6px; }
        .specialty-chip-card { flex: 0 0 auto; display: flex; align-items: center; gap: 10px; background: #ffffff; padding: 10px 16px; border-radius: 30px; border: 1px solid #e2e8f0; cursor: pointer; }
        .spec-icon-wrapper { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .spec-card-title { font-size: 13px; font-weight: 700; color: #0f172a; white-space: nowrap; }
        .doctors-horizontal-scroll { display: flex; gap: 14px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 8px; }
        .available-doctor-card { flex: 0 0 240px; background: #ffffff; border-radius: 18px; padding: 14px; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(11, 93, 113, 0.05); display: flex; flex-direction: column; }
        .doctor-card-img { width: 100%; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; }
        .doc-card-name { font-size: 15px; font-weight: 800; color: #0f172a; }
        .doc-card-spec { font-size: 12px; color: #64748b; margin-bottom: 6px; }
        .hours-tag { display: inline-block; font-size: 10.5px; color: #0b5d71; background: #e6f3f7; padding: 3px 8px; border-radius: 6px; font-weight: 600; margin-bottom: 8px; }
        .doc-card-rating { display: flex; align-items: center; gap: 4px; margin-bottom: 12px; }
        .rating-num { font-size: 12.5px; font-weight: 800; color: #0f172a; }
        .exp-text { font-size: 11px; color: #64748b; }
        .book-now-btn { width: 100%; height: 38px; background: #0b5d71; color: #ffffff; border: none; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; margin-top: auto; }
        .wellness-insight-card { background: #ffffff; border-radius: 18px; padding: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(11, 93, 113, 0.05); }
        .wellness-badge-row { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
        .wellness-badge-title { font-size: 10px; font-weight: 800; letter-spacing: 0.5px; color: #854d0e; }
        .insight-content-flex { display: flex; gap: 12px; align-items: flex-start; }
        .insight-icon-box { width: 44px; height: 44px; border-radius: 12px; background: #e6f3f7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .insight-title { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .insight-desc { font-size: 12px; color: #64748b; line-height: 1.45; }
      `}</style>
    </div>
  );
}
