import React from 'react';
import { Download } from 'lucide-react';

const Reports = ({ theme }) => {
  const t = theme === 'dark';
  const reports = [
    { name: 'Monthly Income Statement', desc: 'Summary of all income sources', icon: '📊' },
    { name: 'Expense Analysis', desc: 'Detailed expense breakdown', icon: '📉' },
    { name: 'Portfolio Performance', desc: 'Investment returns and analysis', icon: '📈' },
    { name: 'Tax Summary', desc: 'Yearly tax report', icon: '🧾' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: 0 }}>
            📄 Reports
          </h1>
          <p style={{ color: '#6B7280', margin: '0.5rem 0 0 0' }}>Generate and download financial reports</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {reports.map((report, i) => (
          <div key={i} style={{
            backgroundColor: t ? '#1F2937' : '#FFFFFF',
            padding: '1.5rem', borderRadius: '16px',
            border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
            cursor: 'pointer', transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span style={{ fontSize: '2rem' }}>{report.icon}</span>
            <h3 style={{ margin: '1rem 0 0.5rem 0', color: t ? '#F9FAFB' : '#111827' }}>{report.name}</h3>
            <p style={{ color: '#6B7280', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{report.desc}</p>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', background: '#3B82F6', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500,
              fontFamily: 'inherit'
            }}>
              <Download size={16} /> Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
