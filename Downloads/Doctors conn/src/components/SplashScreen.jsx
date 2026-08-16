import React, { useEffect } from 'react';
import AnimatedBackgroundClip from './AnimatedBackgroundClip';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      {/* Background Animated Canvas & Floating Icons Clip */}
      <AnimatedBackgroundClip variant="splash" />

      <div className="wave-container">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      <div className="splash-content">
        <div className="splash-logo-circle">
          <div className="inner-logo-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="medic-logo-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              <path d="M12 7v6M9 10h6" stroke="#0b5d71" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1 className="splash-title">Medic</h1>
        <p className="splash-subtitle">Your Trusted Healthcare Companion</p>

        <div className="running-loader-bar">
          <div className="running-fill"></div>
        </div>
      </div>

      <style>{`
        .splash-screen {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #05333e 0%, #0b5d71 50%, #06404e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          overflow: hidden;
          color: #ffffff;
        }

        .wave-container {
          position: absolute;
          width: 320px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .wave {
          position: absolute;
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          border-radius: 50%;
          animation: pulseGlow 3s infinite ease-in-out;
        }

        .wave-1 { width: 140px; height: 140px; animation-delay: 0s; }
        .wave-2 { width: 220px; height: 220px; animation-delay: 0.5s; }
        .wave-3 { width: 300px; height: 300px; animation-delay: 1s; }

        .splash-content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .splash-logo-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
          animation: logoFloat 4s ease-in-out infinite alternate;
        }

        @keyframes logoFloat {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-8px) scale(1.03); }
        }

        .inner-logo-badge {
          width: 72px;
          height: 72px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .medic-logo-icon {
          width: 40px;
          height: 40px;
          color: #0b5d71;
        }

        .splash-title {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .splash-subtitle {
          font-size: 13.5px;
          font-weight: 400;
          opacity: 0.9;
          letter-spacing: 0.2px;
          margin-bottom: 24px;
        }

        .running-loader-bar {
          width: 120px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }

        .running-fill {
          width: 100%;
          height: 100%;
          background: #38bdf8;
          animation: runningFill 2.5s ease-in-out forwards;
        }

        @keyframes runningFill {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
