import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, CreditCard, Globe, Download, LogOut } from 'lucide-react';

const Settings = ({ theme }) => {
  const t = theme === 'dark';
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', icon: <User size={18} />, label: 'Profile' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'security', icon: <Shield size={18} />, label: 'Security' },
    { id: 'billing', icon: <CreditCard size={18} />, label: 'Billing' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', marginBottom: '2rem' }}>
        ⚙️ Settings
      </h1>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ width: '200px' }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', width: '100%', border: 'none',
                borderRadius: '8px', marginBottom: '0.25rem',
                background: activeSection === section.id ? (t ? '#374151' : '#EEF2FF') : 'transparent',
                color: activeSection === section.id ? '#3B82F6' : (t ? '#9CA3AF' : '#6B7280'),
                cursor: 'pointer', fontWeight: activeSection === section.id ? 600 : 400,
                fontFamily: 'inherit', fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, backgroundColor: t ? '#1F2937' : '#FFFFFF', padding: '2rem', borderRadius: '16px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
          {activeSection === 'profile' && (
            <div>
              <h2 style={{ color: t ? '#F9FAFB' : '#111827', marginBottom: '1.5rem' }}>Profile Settings</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: t ? '#F9FAFB' : '#111827', fontWeight: 500 }}>Full Name</label>
                  <input type="text" defaultValue="Demo User" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}`, background: t ? '#374151' : '#F9FAFB', color: t ? '#F9FAFB' : '#111827', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: t ? '#F9FAFB' : '#111827', fontWeight: 500 }}>Email</label>
                  <input type="email" defaultValue="demo@finedge.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}`, background: t ? '#374151' : '#F9FAFB', color: t ? '#F9FAFB' : '#111827', fontFamily: 'inherit' }} />
                </div>
                <button style={{ padding: '0.75rem 1.5rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', marginTop: '1rem' }}>
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeSection === 'billing' && (
            <div>
              <h2 style={{ color: t ? '#F9FAFB' : '#111827', marginBottom: '1rem' }}>Billing & Plans</h2>
              <div style={{ padding: '1rem', background: t ? '#374151' : '#EEF2FF', borderRadius: '8px', marginBottom: '1rem' }}>
                <p style={{ color: '#3B82F6', fontWeight: 600, margin: 0 }}>Current Plan: Professional</p>
                <p style={{ color: '#6B7280', margin: '0.5rem 0 0 0' }}>$79/month - Next billing: Feb 1, 2024</p>
              </div>
              <button style={{ padding: '0.75rem 1.5rem', background: '#10B981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>
                Upgrade Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
