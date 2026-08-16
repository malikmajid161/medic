import React from 'react';
import AnimatedBackgroundClip from './AnimatedBackgroundClip';

export default function OnboardingScreen({ onSignIn, onCreateAccount }) {
  const doctorAvatars = [
    { img: '/assets/doc_real_1.jpg', label: 'Pediatrician' },
    { img: '/assets/doc_real_2.jpg', label: 'Cardiologist' },
    { img: '/assets/doc_real_3.jpg', label: 'Dermatologist' },
    { img: '/assets/doc_real_4.jpg', label: 'Neurologist' },
  ];

  return (
    <div className="onboarding-screen animate-fade-in">
      {/* Background Animated Motion Clip */}
      <AnimatedBackgroundClip variant="onboarding" />

      <div className="onboarding-visual">
        <div className="orbit-container">
          <div className="orbit-ring orbit-ring-1"></div>
          <div className="orbit-ring orbit-ring-2"></div>
          
          <div className="center-medic-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="medic-center-icon">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              <path d="M12 7v6M9 10h6" stroke="#0b5d71" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="orbiting-nodes">
            {doctorAvatars.map((doc, idx) => (
              <div key={idx} className={`orbit-node node-${idx}`}>
                <img src={doc.img} alt={doc.label} className="node-avatar" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="onboarding-body">
        <h2 className="welcome-title">Welcome to Medic</h2>
        <p className="welcome-desc">
          Your trusted healthcare companion — find doctors, book visits, and stay on top of your care.
        </p>

        <div className="onboarding-actions">
          <button className="btn-primary" onClick={onSignIn}>
            Sign In
          </button>
          <button className="btn-outline" onClick={onCreateAccount}>
            Create Account
          </button>
        </div>
      </div>

      <style>{`
        .onboarding-screen {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #cbe5ef 0%, #eef7fc 45%, #ffffff 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 24px 40px;
          z-index: 10;
          overflow: hidden;
        }

        .onboarding-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 5;
        }

        .orbit-container {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px dashed rgba(11, 93, 113, 0.25);
        }

        .orbit-ring-1 {
          width: 175px;
          height: 175px;
        }

        .orbit-ring-2 {
          width: 240px;
          height: 240px;
        }

        .center-medic-badge {
          width: 84px;
          height: 84px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(11, 93, 113, 0.22);
          z-index: 5;
          border: 3px solid #ffffff;
          animation: pulseHeart 3s infinite ease-in-out;
        }

        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .medic-center-icon {
          width: 48px;
          height: 48px;
          color: #0b5d71;
        }

        .orbiting-nodes {
          position: absolute;
          inset: 0;
          animation: orbitRotate 22s linear infinite;
        }

        .orbit-node {
          position: absolute;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          border: 2.5px solid #ffffff;
          overflow: hidden;
          animation: counterRotate 22s linear infinite;
        }

        .node-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .node-0 { top: 0; left: calc(50% - 26px); }
        .node-1 { top: calc(50% - 26px); right: -6px; }
        .node-2 { bottom: 0; left: calc(50% - 26px); }
        .node-3 { top: calc(50% - 26px); left: -6px; }

        .onboarding-body {
          text-align: center;
          position: relative;
          z-index: 5;
        }

        .welcome-title {
          font-size: 26px;
          font-weight: 800;
          color: #0b5d71;
          margin-bottom: 12px;
        }

        .welcome-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: #64748b;
          margin-bottom: 32px;
          padding: 0 8px;
        }

        .onboarding-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-primary {
          width: 100%;
          height: 52px;
          background: #0b5d71;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(11, 93, 113, 0.25);
        }

        .btn-primary:active {
          transform: scale(0.98);
          background: #074757;
        }

        .btn-outline {
          width: 100%;
          height: 52px;
          background: #ffffff;
          color: #0b5d71;
          font-weight: 700;
          font-size: 15px;
          border: 1.5px solid #0b5d71;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline:active {
          transform: scale(0.98);
          background: #f0f7f9;
        }
      `}</style>
    </div>
  );
}
