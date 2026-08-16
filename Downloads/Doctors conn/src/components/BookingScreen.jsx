import React, { useState } from 'react';
import { ArrowLeft, Video, Building, Calendar, Check, Clock } from 'lucide-react';
import { TIME_SLOTS } from '../data/doctorsData';
import { saveAppointmentToStorage, supabase, isSupabaseConfigured } from '../lib/supabase';

export default function BookingScreen({ doctor, user, onBack, onBookingSuccess }) {
  const [consultationType, setConsultationType] = useState('In-person'); // 'In-person' or 'Video'
  const [patientName, setPatientName] = useState(user?.fullName || 'Zunaira Mughal');
  const [contactNumber, setContactNumber] = useState('03010123456');
  const [selectedDate, setSelectedDate] = useState('2026-08-14'); // Friday, 14/08/2026
  const [selectedSlot, setSelectedSlot] = useState('9:30 AM');
  const [submitting, setSubmitting] = useState(false);

  // Format date to "Friday, 14/08/2026"
  const getFormattedDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[d.getDay()] || 'Friday';
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthNum = String(d.getMonth() + 1).padStart(2, '0');
      const yearNum = d.getFullYear();
      return `${dayName}, ${dayNum}/${monthNum}/${yearNum}`;
    } catch (e) {
      return 'Friday, 14/08/2026';
    }
  };

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
      dateFormatted: '14/08/2026',
      dayFormatted: 'Friday',
      timeSlot: selectedSlot.replace(' AM', '').replace(' PM', ''), // e.g. 09:30
      fullTimeSlot: selectedSlot,
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
        <h2 className="header-title">{doctor.name}</h2>
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
          <label className="section-label">Your name</label>
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
          <label className="section-label">Contact number</label>
          <input
            type="tel"
            className="styled-input"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your number"
            required
          />
        </div>

        {/* Appointment Date */}
        <div className="form-section">
          <label className="section-label">Appointment date</label>
          <div className="date-picker-box">
            <Calendar size={18} color="#64748b" />
            <input
              type="text"
              readOnly
              className="date-input"
              value={getFormattedDate(selectedDate)}
            />
          </div>
        </div>

        {/* Available Slots Grid matching video frame 48s */}
        <div className="form-section">
          <label className="section-label">Available slots</label>
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
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm Appointment Button */}
        <button type="submit" className="confirm-btn" disabled={submitting || !selectedSlot}>
          <Calendar size={18} color="#ffffff" />
          <span>{submitting ? 'Confirming...' : 'Confirm Appointment'}</span>
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
        }

        .header-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
        }

        .booking-form-body {
          padding: 20px 20px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-label {
          font-size: 13.5px;
          font-weight: 700;
          color: #334155;
        }

        .type-toggle-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .type-btn {
          height: 52px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .type-btn.active {
          background: #0b5d71;
          color: #ffffff;
          border-color: #0b5d71;
          box-shadow: 0 4px 12px rgba(11, 93, 113, 0.2);
        }

        .styled-input {
          height: 50px;
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

        .date-picker-box {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 50px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
        }

        .date-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: #0f172a;
          font-weight: 600;
          width: 100%;
        }

        .slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .slot-chip {
          height: 38px;
          border-radius: 10px;
          border: 1px solid #f1f5f9;
          background: #f8fafc;
          color: #475569;
          font-weight: 600;
          font-size: 12.5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .slot-chip.selected {
          background: #0b5d71;
          color: #ffffff;
          border-color: #0b5d71;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(11, 93, 113, 0.25);
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
          transition: background 0.2s;
        }

        .confirm-btn:active {
          background: #074757;
        }
      `}</style>
    </div>
  );
}
