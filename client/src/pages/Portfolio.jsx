import React from 'react';
import { Plus } from 'lucide-react';

const Portfolio = ({ theme }) => {
  const assets = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 175.50, change: '+2.3%', value: '$8,775', color: '#10B981' },
    { symbol: 'GOOGL', name: 'Alphabet', shares: 20, price: 140.25, change: '-1.2%', value: '$2,805', color: '#EF4444' },
    { symbol: 'BTC', name: 'Bitcoin', shares: 0.5, price: 43200, change: '+5.7%', value: '$21,600', color: '#10B981' },
    { symbol: 'VTI', name: 'Vanguard ETF', shares: 100, price: 242.80, change: '+0.8%', value: '$24,280', color: '#10B981' },
  ];

  const t = theme === 'dark';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: '0 0 0.5rem 0' }}>
            💼 Portfolio
          </h1>
          <p style={{ color: '#6B7280', margin: 0 }}>Track your investments and asset allocation</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', background: '#3B82F6', color: 'white',
          border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: '0.9rem'
        }}>
          <Plus size={18} /> Add Asset
        </button>
      </div>

      {/* Portfolio Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Value', value: '$57,460', color: '#3B82F6' },
          { label: 'Day Change', value: '+$1,245', color: '#10B981' },
          { label: 'Total Return', value: '+15.3%', color: '#10B981' },
          { label: 'Assets', value: '12', color: '#8B5CF6' },
        ].map((item, i) => (
          <div key={i} style={{
            backgroundColor: t ? '#1F2937' : '#FFFFFF',
            padding: '1.5rem', borderRadius: '16px',
            border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
            borderLeft: `4px solid ${item.color}`
          }}>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>{item.label}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Assets Table */}
      <div style={{
        backgroundColor: t ? '#1F2937' : '#FFFFFF',
        padding: '1.5rem', borderRadius: '16px',
        border: `1px solid ${t ? '#374151' : '#E5E7EB'}`
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: t ? '#F9FAFB' : '#111827', margin: '0 0 1.5rem 0' }}>
          Your Assets
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
              <th style={th}>Asset</th>
              <th style={th}>Shares</th>
              <th style={th}>Price</th>
              <th style={th}>Change</th>
              <th style={{ ...th, textAlign: 'right' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t ? '#374151' : '#F3F4F6'}` }}>
                <td style={td}>
                  <div>
                    <p style={{ fontWeight: 600, color: t ? '#F9FAFB' : '#111827', margin: 0 }}>{a.symbol}</p>
                    <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '0.25rem 0 0 0' }}>{a.name}</p>
                  </div>
                </td>
                <td style={td}>{a.shares}</td>
                <td style={td}>${a.price}</td>
                <td style={{ ...td, color: a.color, fontWeight: 600 }}>{a.change}</td>
                <td style={{ ...td, textAlign: 'right', fontWeight: 600, color: t ? '#F9FAFB' : '#111827' }}>{a.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const th = { padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' };
const td = { padding: '1rem 0.75rem', fontSize: '0.9rem', color: '#6B7280' };

export default Portfolio;
