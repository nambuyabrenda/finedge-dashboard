import React from 'react';
import { Target, Plus } from 'lucide-react';

const Goals = ({ theme }) => {
  const t = theme === 'dark';
  const goals = [
    { name: 'Emergency Fund', target: '$10,000', current: '$7,500', progress: 75, color: '#3B82F6' },
    { name: 'New Office', target: '$50,000', current: '$35,000', progress: 70, color: '#10B981' },
    { name: 'Marketing Budget', target: '$5,000', current: '$2,000', progress: 40, color: '#F59E0B' },
    { name: 'Retirement', target: '$100,000', current: '$45,000', progress: 45, color: '#8B5CF6' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: 0 }}>
            🎯 Financial Goals
          </h1>
          <p style={{ color: '#6B7280', margin: '0.5rem 0 0 0' }}>Track your progress towards financial freedom</p>
        </div>
        <button style={btnStyle}><Plus size={18} /> New Goal</button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {goals.map((goal, i) => (
          <div key={i} style={{
            backgroundColor: t ? '#1F2937' : '#FFFFFF',
            padding: '1.5rem', borderRadius: '16px',
            border: `1px solid ${t ? '#374151' : '#E5E7EB'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target size={24} color={goal.color} />
                <h3 style={{ margin: 0, color: t ? '#F9FAFB' : '#111827' }}>{goal.name}</h3>
              </div>
              <span style={{ fontWeight: 600, color: goal.color }}>{goal.progress}%</span>
            </div>
            <div style={{
              width: '100%', height: '8px', backgroundColor: t ? '#374151' : '#E5E7EB',
              borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem'
            }}>
              <div style={{
                width: `${goal.progress}%`, height: '100%',
                backgroundColor: goal.color, borderRadius: '4px',
                transition: 'width 1s ease'
              }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280', fontSize: '0.9rem' }}>
              <span>{goal.current}</span>
              <span>Target: {goal.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const btnStyle = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '0.75rem 1.5rem', background: '#3B82F6', color: 'white',
  border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
  fontFamily: 'inherit', fontSize: '0.9rem'
};

export default Goals;
