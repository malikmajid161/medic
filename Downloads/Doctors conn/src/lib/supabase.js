import { createClient } from '@supabase/supabase-js';
import { DOCTORS as INITIAL_DOCTORS } from '../data/doctorsData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage fallback keys
const LOCAL_STORAGE_KEY = 'medic_appointments_db';
const USER_STORAGE_KEY = 'medic_auth_user';
const DOCTORS_STORAGE_KEY = 'medic_registered_doctors';

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

// Doctors list management
export const getStoredDoctors = () => {
  try {
    const customDocs = localStorage.getItem(DOCTORS_STORAGE_KEY);
    const parsedCustom = customDocs ? JSON.parse(customDocs) : [];
    return [...parsedCustom, ...INITIAL_DOCTORS];
  } catch (err) {
    return INITIAL_DOCTORS;
  }
};

export const saveNewDoctorProfile = (doctorObj) => {
  try {
    const customDocs = localStorage.getItem(DOCTORS_STORAGE_KEY);
    const parsedCustom = customDocs ? JSON.parse(customDocs) : [];
    const index = parsedCustom.findIndex(d => d.id === doctorObj.id || d.email === doctorObj.email);
    
    let updated;
    if (index >= 0) {
      updated = [...parsedCustom];
      updated[index] = { ...updated[index], ...doctorObj };
    } else {
      updated = [doctorObj, ...parsedCustom];
    }
    
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving doctor profile:', err);
    return [];
  }
};

// Appointments management
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

export const updateAppointmentStatusInStorage = (appointmentId, newStatus) => {
  try {
    const existing = getStoredAppointments();
    const updated = existing.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error updating appointment status:', err);
    return [];
  }
};

export const cancelAppointmentInStorage = (appointmentId) => {
  return updateAppointmentStatusInStorage(appointmentId, 'Cancelled');
};

// Real Authentication Functions
export const signUpUser = async (email, password, extraData = {}) => {
  const isDoctor = extraData.role === 'doctor';
  
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: extraData.fullName,
          role: extraData.role || 'patient',
          specialty: extraData.specialty || '',
          hospital: extraData.hospital || '',
          fee: extraData.fee || 'Rs. 2,000',
          image: extraData.image || '/assets/doc_real_2.jpg'
        }
      }
    });

    if (error) throw error;
    
    const userObj = {
      id: data.user?.id || `usr_${Date.now()}`,
      email: data.user?.email || email,
      fullName: extraData.fullName || email.split('@')[0],
      role: extraData.role || 'patient',
      specialty: extraData.specialty || 'General Physician',
      hospital: extraData.hospital || 'Medic Care Hospital',
      experience: extraData.experience || '5 years of Experience',
      fee: extraData.fee || 'Rs. 2,000',
      image: extraData.image || '/assets/doc_real_2.jpg',
      hours: extraData.hours || 'Mon-Fri: 9am-5pm',
      provider: 'supabase'
    };

    saveStoredUser(userObj);
    if (isDoctor) saveNewDoctorProfile(userObj);
    return userObj;
  }

  // Fallback local storage registration
  const fallbackUser = {
    id: `usr_${Date.now()}`,
    email,
    fullName: extraData.fullName || (isDoctor ? 'Dr. Ahmed Ali' : 'Zunaira Mughal'),
    role: extraData.role || 'patient',
    specialty: extraData.specialty || 'General Practitioner',
    hospital: extraData.hospital || 'Medic City Hospital',
    experience: extraData.experience || '6 years of Experience',
    fee: extraData.fee || 'Rs. 2,000',
    image: extraData.image || '/assets/doc_real_2.jpg',
    hours: extraData.hours || 'Mon-Fri: 9am-5pm',
    rating: 4.9,
    reviewsCount: 12,
    provider: 'local'
  };

  saveStoredUser(fallbackUser);
  if (isDoctor) saveNewDoctorProfile(fallbackUser);
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
      role: data.user?.user_metadata?.role || (email.toLowerCase().includes('dr') ? 'doctor' : 'patient'),
      specialty: data.user?.user_metadata?.specialty || 'Consultant Specialist',
      hospital: data.user?.user_metadata?.hospital || 'Medic Hospital',
      fee: data.user?.user_metadata?.fee || 'Rs. 2,500',
      image: data.user?.user_metadata?.image || '/assets/doc_real_2.jpg',
      provider: 'supabase'
    };
    saveStoredUser(userObj);
    return userObj;
  }

  // Fallback demo sign in
  const isDoctorEmail = email.toLowerCase().includes('dr') || email.toLowerCase().includes('doctor');
  const fallbackUser = {
    id: `usr_demo_${Date.now()}`,
    email,
    fullName: isDoctorEmail ? 'Dr. Ahmed Ali' : 'Zunaira Mughal',
    role: isDoctorEmail ? 'doctor' : 'patient',
    specialty: isDoctorEmail ? 'Cardiologist' : '',
    hospital: isDoctorEmail ? 'Shaukat Khanum Hospital, Lahore' : '',
    experience: '12 years of Experience',
    fee: 'Rs. 2,500',
    image: isDoctorEmail ? '/assets/doc_real_2.jpg' : '',
    hours: 'Mon-Fri: 9am-5pm',
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
