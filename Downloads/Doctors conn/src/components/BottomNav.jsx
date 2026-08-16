import React from 'react';
import { Home, Calendar, Users, User } from 'lucide-react';

export default function BottomNav({ activeTab, onChangeTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'visits', label: 'My Visits', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: Users },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="bottom-nav-bar">
      {tabs.map((tab) => {
        const IconComp = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab-item ${isActive ? 'active' : ''}`}
            onClick={() => onChangeTab(tab.id)}
          >
            <div className={`nav-icon-box ${isActive ? 'active-box' : ''}`}>
              <IconComp size={20} color={isActive ? '#0b5d71' : '#94a3b8'} className="tab-icon" />
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}

      <style>{`
        .bottom-nav-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 68px;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          box-shadow: 0 -4px 20px rgba(11, 93, 113, 0.08);
          z-index: 50;
        }

        .nav-tab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          background: none;
          border: none;
          cursor: pointer;
          flex: 1;
          height: 100%;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-tab-item:active {
          transform: scale(0.92);
        }

        .nav-icon-box {
          width: 40px;
          height: 28px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .active-box {
          background: #e6f3f7;
          transform: translateY(-2px) scale(1.08);
        }

        .tab-icon {
          transition: transform 0.2s;
        }

        .nav-tab-item.active .tab-icon {
          transform: scale(1.1);
        }

        .nav-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          transition: color 0.2s;
        }

        .nav-tab-item.active .nav-label {
          color: #0b5d71;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
}
