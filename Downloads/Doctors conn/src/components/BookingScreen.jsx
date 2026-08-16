import React, { useState } from 'react';
import { ArrowLeft, Video, Building, Calendar, Check, Clock } from 'lucide-react';
import { TIME_SLOTS } from '../data/doctorsData';
import { saveAppointmentToStorage, supabase, isSupabaseConfigured } from '../lib/supabase';

export default function BookingScreen({ doctor, user, onBack, onBookingSuccess }) {
  const [consultationType, setConsultationType] = useState('In-person'); // 'In-person' or 'Video'
  const [patientName, setPatientName] = useState(user?.fullName || 'Zunaira Mughal');
  const [contactNumber, setContactNumber] = useState('03010123456');
  
  // Dates choices
  const datesList = [
    { day: 'Fri', dateNum: '14', full: 'Friday, 14/08/2026' },
    { day: 'Sat', dateNum: '15', full: 'Saturday, 15/08/2026' },
    { day: 'Sun', dateNum: '16', full: 'Sunday, 16/08/2026' },
    { day: 'Mon', dateNum: '17', full: 'Monday, 17/08/2026' }
  ];
  const [selectedDateObj, setSelectedDateObj] = useState(datesList[0]);

  const [selectedSlot, setSelectedSlot] = useState('9:30 AM');
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);

    const newAppointment = {
      id: `apt_${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorImage: doctor.image,
      consultationType: consultationType === 'In-person' ? 'In-person Visit' : 'Video Visit',
      patientName,
      contactNumber,
      dateFormatted: selectedDateObj.full.split(', ')[1],
      dayFormatted: selectedDateObj.full.split(', ')[0],
      timeSlot: selectedSlot,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save to Supabase DB if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('appointments').insert([newAppointment]);
      } catch (err) {
        console.warn('Supabase DB save error:', err);
      }
    }

    // Save to localStorage fallback
    saveAppointmentToStorage(newAppointment);

    setTimeout(() => {
      setSubmitting(false);
      onBookingSuccess(newAppointment);
    }, 600);
  };

  return (
    <div className="booking-screen animate-slide-up">
      {/* Top Header matching video frame 48s */}
      <div className="booking-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} color="#ffffff" />
        </button>
        <h2 className="header-title">Book with {doctor.name}</h2>
      </div>

      <form onSubmit={handleConfirm} className="booking-form-body">
        {/* Consultation Type Selector */}
        <div className="form-section">
          <label className="section-label">Consultation type</label>
          <div className="type-toggle-grid">
            <button
              type="button"
              className={`type-btn ${consultationType === 'In-person' ? 'active' : ''}`}
              onClick={() => setConsultationType('In-person')}
            >
              <Building size={18} />
              <span>In-person</span>
            </button>

            <button
              type="button"
              className={`type-btn ${consultationType === 'Video' ? 'active' : ''}`}
              onClick={() => setConsultationType('Video')}
            >
              <Video size={18} />
              <span>Video</span>
            </button>
          </div>
        </div>

        {/* Patient Name */}
        <div className="form-section">
          <label className="section-label">Patient Name</label>
          <input
            type="text"
            className="styled-input"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Contact Number */}
        <div className="form-section">
          <label className="section-label">Contact Number</label>
          <input
            type="tel"
            className="styled-input"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Interactive Date Selector Pills */}
        <div className="form-section">
          <label className="section-label">Select Date ({selectedDateObj.full})</label>
          <div className="dates-pill-row">
            {datesList.map((dItem) => (
              <button
                type="button"
                key={dItem.dateNum}
                className={`date-pill-btn ${selectedDateObj.dateNum === dItem.dateNum ? 'active' : ''}`}
                onClick={() => setSelectedDateObj(dItem)}
              >
                <span className="pill-day">{dItem.day}</span>
                <span className="pill-num">{dItem.dateNum}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Available Slots Grid matching video frame 48s */}
        <div className="form-section">
          <label className="section-label">Available Slots</label>
          <div className="slots-grid">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  className={`slot-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <Clock size={12} className="slot-clock-icon" />
                  <span>{slot}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm Appointment Button */}
        <button type="submit" className="confirm-btn" disabled={submitting || !selectedSlot}>
          <Calendar size={18} color="#ffffff" />
          <span>{submitting ? 'Booking Appointment...' : 'Confirm Appointment'}</span>
        </button>
      </form>

      <style>{`
        .booking-screen {
          position: absolute;
          inset: 0;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          z-index: 40;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .booking-header {
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

        .booking-form-body {
          padding: 20px 20px 40px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-label {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
        }

        .type-toggle-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .type-btn {
          height: 48px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          font-weight: 700;
          font-size: 13.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .type-btn.active {
          background: #0b5d71;
          color: #ffffff;
          border-color: #0b5d71;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.25);
        }

        .type-btn:active {
          transform: scale(0.96);
        }

        .styled-input {
          height: 48px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          outline: none;
          font-size: 14px;
          color: #0f172a;
          background: #ffffff;
          transition: border-color 0.2s;
        }

        .styled-input:focus {
          border-color: #0b5d71;
        }

        .dates-pill-row {
          display: flex;
          gap: 10px;
        }

        .date-pill-btn {
          flex: 1;
          padding: 8px 0;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pill-day { font-size: 11px; font-weight: 600; color: #64748b; }
        .pill-num { font-size: 15px; font-weight: 800; color: #0f172a; }

        .date-pill-btn.active {
          background: #0b5d71;
          border-color: #0b5d71;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.2);
        }

        .date-pill-btn.active .pill-day,
        .date-pill-btn.active .pill-num {
          color: #ffffff;
        }

        .slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .slot-chip {
          height: 42px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-weight: 600;
          font-size: 12.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slot-clock-icon {
          opacity: 0.7;
        }

        .slot-chip.selected {
          background: #0b5d71;
          color: #ffffff;
          border-color: #0b5d71;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.25);
          transform: scale(1.02);
        }

        .slot-chip:active {
          transform: scale(0.95);
        }

        .confirm-btn {
          height: 52px;
          background: #0b5d71;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.25);
          transition: all 0.2s ease;
        }

        .confirm-btn:active {
          transform: scale(0.97);
          background: #074757;
        }
      `}</style>
    </div>
  );
}
