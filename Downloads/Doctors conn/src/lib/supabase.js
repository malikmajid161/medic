import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage fallback for seamless offline/demo usage
const LOCAL_STORAGE_KEY = 'medic_appointments_db';
const USER_STORAGE_KEY = 'medic_auth_user';

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    return null;
  }
};

export const saveStoredUser = (user) => {
  try {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_STORAGE_KEY);
  } catch (err) {
    console.error('Error saving user:', err);
  }
};

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

// Supabase Real Authentication Functions
export const signUpUser = async (email, password, fullName) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;
    
    const userObj = {
      id: data.user?.id || `usr_${Date.now()}`,
      email: data.user?.email || email,
      fullName: data.user?.user_metadata?.full_name || fullName,
      provider: 'supabase'
    };
    saveStoredUser(userObj);
    return userObj;
  }

  // Fallback demo user if Supabase is offline
  const fallbackUser = {
    id: `usr_${Date.now()}`,
    email,
    fullName: fullName || 'Zunaira Mughal',
    provider: 'local'
  };
  saveStoredUser(fallbackUser);
  return fallbackUser;
};

export const signInUser = async (email, password) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const userObj = {
      id: data.user?.id || `usr_${Date.now()}`,
      email: data.user?.email || email,
      fullName: data.user?.user_metadata?.full_name || email.split('@')[0],
      provider: 'supabase'
    };
    saveStoredUser(userObj);
    return userObj;
  }

  // Fallback demo user
  const fallbackUser = {
    id: `usr_demo`,
    email,
    fullName: email.includes('zunaira') ? 'Zunaira Mughal' : 'Dr. Patient',
    provider: 'local'
  };
  saveStoredUser(fallbackUser);
  return fallbackUser;
};

export const signOutUser = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  }
  saveStoredUser(null);
};

export const SUPABASE_SQL_SETUP = `
-- Run this SQL in your Supabase SQL Editor:
create table public.appointments (
  id text primary key,
  user_id text,
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
