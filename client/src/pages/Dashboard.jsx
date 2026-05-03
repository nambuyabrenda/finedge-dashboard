import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/App.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [count, setCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ 
      padding: '2rem', 
      minHeight: '100vh',
      backgroundColor: 'var(--bg-secondary)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Financial Dashboard 🚀
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Current theme: <strong>{theme}</strong>
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={toggleTheme}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          
          <button 
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { title: 'Total Revenue', value: '$124,500', color: '#10B981' },
          { title: 'Total Expenses', value: '$87,200', color: '#EF4444' },
          { title: 'Net Profit', value: '$37,300', color: '#3B82F6' },
          { title: 'Investments', value: '23', color: '#8B5CF6' },
        ].map((metric, i) => (
          <div 
            key={i}
            className="card fade-in"
            style={{
              borderLeft: `4px solid ${metric.color}`,
              animationDelay: `${i * 0.1}s`
            }}
          >
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-secondary)',
              marginBottom: '0.75rem',
              fontWeight: 500
            }}>
              {metric.title}
            </div>
            <div style={{ 
              fontSize: '1.75rem', 
              fontWeight: 700, 
              color: 'var(--text-primary)'
            }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Theme Demo Section */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Theme System Working! ✅
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          This card changes colors based on the selected theme.
          Try clicking the Dark Mode button above!
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', flex: 1 }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Background</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>var(--bg-secondary)</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', flex: 1 }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Tertiary</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>var(--bg-tertiary)</p>
          </div>
        </div>
      </div>

      {/* Click counter to verify reactivity */}
      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
          React is working! Click count: {count}
        </p>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Click Me!
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
