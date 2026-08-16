import React, { useState, useEffect } from 'react';
import MobileFrame from './components/MobileFrame';
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import BrowseSpecialtiesScreen from './components/BrowseSpecialtiesScreen';
import DoctorsListScreen from './components/DoctorsListScreen';
import BookingScreen from './components/BookingScreen';
import AppointmentDetailScreen from './components/AppointmentDetailScreen';
import MyVisitsScreen from './components/MyVisitsScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import { getStoredUser, signOutUser, supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  // Screen state navigation: 'splash' -> 'onboarding' -> 'auth' -> 'main'
  const [currentStage, setCurrentStage] = useState('splash');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  // Main app tab state: 'home', 'visits', 'doctors', 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // User state initialized from persistent storage
  const [user, setUser] = useState(() => getStoredUser() || {
    fullName: 'Zunaira Mughal',
    email: 'zunaira@gmail.com'
  });

  // Active overlay screens
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [selectedAppointmentDetail, setSelectedAppointmentDetail] = useState(null);
  const [isBrowseSpecialtiesOpen, setIsBrowseSpecialtiesOpen] = useState(false);
  const [isDoctorsListOpen, setIsDoctorsListOpen] = useState(false);
  const [selectedSpecialtyIdFilter, setSelectedSpecialtyIdFilter] = useState(null);

  useEffect(() => {
    // Check if user session exists in Supabase
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const loadedUser = {
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            provider: 'supabase'
          };
          setUser(loadedUser);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            provider: 'supabase'
          });
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // Splash finished -> check if user is already logged in
  const handleSplashFinish = () => {
    const existingUser = getStoredUser();
    if (existingUser) {
      setUser(existingUser);
      setCurrentStage('main');
    } else {
      setCurrentStage('onboarding');
    }
  };

  // Onboarding -> Auth
  const handleStartAuth = (mode) => {
    setAuthMode(mode);
    setCurrentStage('auth');
  };

  // Auth Success -> Main App
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setCurrentStage('main');
  };

  // Sign out handler
  const handleLogout = async () => {
    await signOutUser();
    setUser({ fullName: 'Guest Patient', email: '' });
    setCurrentStage('onboarding');
  };

  // Booking confirmed -> Open detail screen matching frame 54s
  const handleBookingSuccess = (newAppointment) => {
    setSelectedDoctorForBooking(null);
    setSelectedAppointmentDetail(newAppointment);
  };

  return (
    <MobileFrame>
      {/* 1. Splash Screen */}
      {currentStage === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}

      {/* 2. Onboarding Welcome Screen */}
      {currentStage === 'onboarding' && (
        <OnboardingScreen
          onSignIn={() => handleStartAuth('login')}
          onCreateAccount={() => handleStartAuth('register')}
        />
      )}

      {/* 3. Login / Auth Screen */}
      {currentStage === 'auth' && (
        <AuthScreen
          isRegister={authMode === 'register'}
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setCurrentStage('onboarding')}
        />
      )}

      {/* 4. Main Application View */}
      {currentStage === 'main' && (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Active Tab Screen */}
          {activeTab === 'home' && (
            <HomeScreen
              user={user}
              onSelectDoctor={(doc) => setSelectedDoctorForBooking(doc)}
              onViewAllSpecialties={() => setIsBrowseSpecialtiesOpen(true)}
              onViewAllDoctors={() => setIsDoctorsListOpen(true)}
            />
          )}

          {activeTab === 'visits' && (
            <MyVisitsScreen
              onSelectAppointment={(apt) => setSelectedAppointmentDetail(apt)}
              onBookNew={() => setIsDoctorsListOpen(true)}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorsListScreen
              onBack={() => setActiveTab('home')}
              onSelectDoctor={(doc) => setSelectedDoctorForBooking(doc)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              user={user}
              onLogout={handleLogout}
            />
          )}

          {/* Bottom Navigation Bar */}
          <BottomNav activeTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />

          {/* Overlays / Stacked Screens */}

          {/* Browse Specialties Screen */}
          {isBrowseSpecialtiesOpen && (
            <BrowseSpecialtiesScreen
              onBack={() => setIsBrowseSpecialtiesOpen(false)}
              onSelectSpecialty={(spec) => {
                setIsBrowseSpecialtiesOpen(false);
                setSelectedSpecialtyIdFilter(spec.id);
                setIsDoctorsListOpen(true);
              }}
            />
          )}

          {/* Doctors List Stacked Screen */}
          {isDoctorsListOpen && (
            <DoctorsListScreen
              onBack={() => setIsDoctorsListOpen(false)}
              onSelectDoctor={(doc) => {
                setIsDoctorsListOpen(false);
                setSelectedDoctorForBooking(doc);
              }}
              initialSpecialtyId={selectedSpecialtyIdFilter}
            />
          )}

          {/* Doctor Booking Screen */}
          {selectedDoctorForBooking && (
            <BookingScreen
              doctor={selectedDoctorForBooking}
              user={user}
              onBack={() => setSelectedDoctorForBooking(null)}
              onBookingSuccess={handleBookingSuccess}
            />
          )}

          {/* Appointment Detail Screen */}
          {selectedAppointmentDetail && (
            <AppointmentDetailScreen
              appointment={selectedAppointmentDetail}
              onBack={() => setSelectedAppointmentDetail(null)}
            />
          )}
        </div>
      )}
    </MobileFrame>
  );
}
