import React from 'react';

const Calendar = ({ theme }) => {
  const t = theme === 'dark';
  const events = [
    { date: 'Jan 15', title: 'Salary Deposit', type: 'income' },
    { date: 'Jan 14', title: 'Rent Due', type: 'expense' },
    { date: 'Jan 20', title: 'Client Meeting', type: 'meeting' },
    { date: 'Jan 25', title: 'Tax Filing Deadline', type: 'deadline' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', marginBottom: '2rem' }}>
        📅 Financial Calendar
      </h1>
      <div style={{
        backgroundColor: t ? '#1F2937' : '#FFFFFF',
        padding: '2rem', borderRadius: '16px',
        border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '3rem', margin: 0, color: t ? '#F9FAFB' : '#111827' }}>
          🗓️
        </p>
        <p style={{ color: '#6B7280', marginTop: '1rem' }}>
          Interactive calendar coming soon!
        </p>
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3 style={{ color: t ? '#F9FAFB' : '#111827', marginBottom: '1rem' }}>Upcoming Events</h3>
          {events.map((event, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.75rem', borderRadius: '8px',
              backgroundColor: t ? '#374151' : '#F9FAFB',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                padding: '0.25rem 0.75rem', borderRadius: '6px',
                fontSize: '0.85rem', fontWeight: 600,
                backgroundColor: event.type === 'income' ? '#D1FAE5' : event.type === 'expense' ? '#FEE2E2' : '#DBEAFE',
                color: event.type === 'income' ? '#059669' : event.type === 'expense' ? '#DC2626' : '#3B82F6'
              }}>{event.date}</span>
              <span style={{ color: t ? '#F9FAFB' : '#111827' }}>{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
