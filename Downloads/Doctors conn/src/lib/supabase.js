import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'medic_appointments_db';

export const getStoredAppointments = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading appointments from storage:', err);
    return [];
  }
};

export const saveAppointmentToStorage = (appointment) => {
  try {
    const existing = getStoredAppointments();
    const updated = [appointment, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving appointment:', err);
    return [];
  }
};

export const cancelAppointmentInStorage = (appointmentId) => {
  try {
    const existing = getStoredAppointments();
    const updated = existing.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error cancelling appointment:', err);
    return [];
  }
};

// SQL setup script helper for Supabase console
export const SUPABASE_SQL_SETUP = `
-- Run this SQL in your Supabase SQL Editor:
create table public.appointments (
  id text primary key,
  doctor_id text,
  doctor_name text,
  doctor_specialty text,
  consultation_type text,
  patient_name text,
  contact_number text,
  date_formatted text,
  day_formatted text,
  time_slot text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);
`;
