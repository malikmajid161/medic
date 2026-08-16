import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function MobileFrame({ children }) {
  const [isFramed, setIsFramed] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      // Automatically detect mobile viewport or touch screens
      if (window.innerWidth <= 768 || window.isNative || window.Capacitor?.isNativePlatform()) {
        setIsMobileDevice(true);
      } else {
        setIsMobileDevice(false);
      }
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // If on actual mobile device or APK build -> return pure full-screen application
  if (isMobileDevice) {
    return (
      <div className="native-mobile-app-container">
        {children}
        <style>{`
          .native-mobile-app-container {
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            position: fixed;
            inset: 0;
            overflow: hidden;
            background: #ffffff;
          }
        `}</style>
      </div>
    );
  }

  // Desktop view with optional Phone Bezel toggle
  return (
    <div className={`app-viewport-wrapper ${isFramed ? 'is-framed-mode' : 'full-screen-mode'}`}>
      {/* Top Device Toggle Bar for Desktop */}
      <div className="view-mode-toggle">
        <span className="toggle-title">Medic Mobile App</span>
        <button
          className="toggle-mode-btn"
          onClick={() => setIsFramed(!isFramed)}
          title="Toggle Mobile Bezel / Full Width"
        >
          {isFramed ? <Monitor size={15} /> : <Smartphone size={15} />}
          <span>{isFramed ? 'Full Width' : 'Phone Frame'}</span>
        </button>
      </div>

      {/* Phone Shell */}
      <div className="phone-device-shell">
        {/* Mockup Status Bar (only shown on desktop framed mode) */}
        {isFramed && (
          <div className="phone-status-bar">
            <span className="status-time">9:41</span>
            <div className="phone-notch">
              <div className="camera-lens"></div>
            </div>
            <div className="status-icons">
              <Signal size={12} />
              <Wifi size={12} />
              <Battery size={13} />
            </div>
          </div>
        )}

        {/* Screen Viewport */}
        <div className="phone-screen-content">
          {children}
        </div>
      </div>

      <style>{`
        .app-viewport-wrapper {
          width: 100vw;
          min-height: 100vh;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
        }

        .view-mode-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 410px;
          margin-bottom: 12px;
          padding: 0 4px;
        }

        .toggle-title {
          font-size: 13px;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.5px;
        }

        .toggle-mode-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #1e293b;
          color: #e2e8f0;
          border: 1px solid #334155;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-mode-btn:hover {
          background: #334155;
        }

        /* Framed Phone View for Desktop */
        .is-framed-mode .phone-device-shell {
          width: 390px;
          height: 820px;
          background: #ffffff;
          border-radius: 46px;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 10px #1e293b;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Full Screen Desktop View */
        .full-screen-mode .phone-device-shell {
          width: 100%;
          max-width: 460px;
          height: 100vh;
          background: #ffffff;
          border-radius: 0;
          box-shadow: none;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .phone-status-bar {
          height: 40px;
          background: #0b5d71;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
          z-index: 100;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .phone-notch {
          width: 100px;
          height: 20px;
          background: #000000;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          margin-top: -12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .camera-lens {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1e293b;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .phone-screen-content {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: #f5f9fc;
        }

        @media (max-width: 768px) {
          .app-viewport-wrapper {
            padding: 0;
            background: #ffffff;
          }
          .view-mode-toggle, .phone-status-bar {
            display: none !important;
          }
          .phone-device-shell {
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
