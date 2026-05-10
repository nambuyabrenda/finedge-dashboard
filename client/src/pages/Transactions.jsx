import React, { useState } from 'react';
import { Search, Filter, Download, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Transactions = ({ theme }) => {
  const [search, setSearch] = useState('');
  const t = theme === 'dark';

  const transactions = [
    { desc: 'Salary Deposit', cat: 'Income', amount: '+$5,000', color: '#10B981', date: 'Jan 15, 2024', status: 'Completed' },
    { desc: 'Office Rent', cat: 'Expense', amount: '-$2,000', color: '#EF4444', date: 'Jan 14, 2024', status: 'Completed' },
    { desc: 'Internet Bill', cat: 'Utilities', amount: '-$299', color: '#EF4444', date: 'Jan 13, 2024', status: 'Pending' },
    { desc: 'Freelance Project', cat: 'Income', amount: '+$1,500', color: '#10B981', date: 'Jan 12, 2024', status: 'Completed' },
    { desc: 'Marketing Ads', cat: 'Marketing', amount: '-$750', color: '#EF4444', date: 'Jan 11, 2024', status: 'Failed' },
    { desc: 'Stock Dividend', cat: 'Investment', amount: '+$320', color: '#10B981', date: 'Jan 10, 2024', status: 'Completed' },
    { desc: 'Software License', cat: 'Software', amount: '-$99', color: '#EF4444', date: 'Jan 9, 2024', status: 'Completed' },
    { desc: 'Consulting Fee', cat: 'Income', amount: '+$2,200', color: '#10B981', date: 'Jan 8, 2024', status: 'Pending' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: '0 0 0.5rem 0' }}>
            💳 Transactions
          </h1>
          <p style={{ color: '#6B7280', margin: 0 }}>View and manage all your financial transactions</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', background: '#3B82F6', color: 'white',
          border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: '0.9rem'
        }}>
          <Plus size={18} /> Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: t ? '#1F2937' : '#FFFFFF',
          borderRadius: '10px',
          border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
          flex: 1, maxWidth: '300px'
        }}>
          <Search size={16} color="#9CA3AF" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none', background: 'none', outline: 'none',
              color: t ? '#F9FAFB' : '#111827', width: '100%', fontFamily: 'inherit'
            }}
          />
        </div>
        <select style={{
          padding: '0.5rem 1rem', borderRadius: '10px',
          border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
          backgroundColor: t ? '#1F2937' : '#FFFFFF',
          color: t ? '#F9FAFB' : '#111827', fontFamily: 'inherit', cursor: 'pointer'
        }}>
          <option>All Types</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <select style={{
          padding: '0.5rem 1rem', borderRadius: '10px',
          border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
          backgroundColor: t ? '#1F2937' : '#FFFFFF',
          color: t ? '#F9FAFB' : '#111827', fontFamily: 'inherit', cursor: 'pointer'
        }}>
          <option>All Categories</option>
          <option>Income</option>
          <option>Expense</option>
          <option>Utilities</option>
          <option>Marketing</option>
        </select>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1rem', borderRadius: '10px',
          border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
          backgroundColor: t ? '#1F2937' : '#FFFFFF',
          color: '#6B7280', cursor: 'pointer', fontFamily: 'inherit'
        }}>
          <Filter size={16} /> More Filters
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 1rem', borderRadius: '10px',
          background: '#10B981', color: 'white', border: 'none',
          cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit', marginLeft: 'auto'
        }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Transactions Table */}
      <div style={{
        backgroundColor: t ? '#1F2937' : '#FFFFFF',
        padding: '1.5rem', borderRadius: '16px',
        border: `1px solid ${t ? '#374151' : '#E5E7EB'}`
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
              <th style={th}>Transaction</th>
              <th style={th}>Category</th>
              <th style={{ ...th, textAlign: 'right' }}>Amount</th>
              <th style={{ ...th, textAlign: 'right' }}>Date</th>
              <th style={{ ...th, textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.filter(tx => 
              tx.desc.toLowerCase().includes(search.toLowerCase()) ||
              tx.cat.toLowerCase().includes(search.toLowerCase())
            ).map((tx, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t ? '#374151' : '#F3F4F6'}` }}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      backgroundColor: tx.amount.startsWith('+') ? '#D1FAE5' : '#FEE2E2',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: tx.color
                    }}>
                      {tx.amount.startsWith('+') ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                    <span style={{ fontWeight: 500, color: t ? '#F9FAFB' : '#111827' }}>{tx.desc}</span>
                  </div>
                </td>
                <td style={{ ...tdStyle, color: '#6B7280' }}>{tx.cat}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, color: tx.color }}>{tx.amount}</td>
                <td style={{ ...tdStyle, textAlign: 'right', color: '#6B7280' }}>{tx.date}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '20px',
                    fontSize: '0.75rem', fontWeight: 600,
                    backgroundColor: tx.status === 'Completed' ? '#D1FAE5' : tx.status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                    color: tx.status === 'Completed' ? '#059669' : tx.status === 'Pending' ? '#D97706' : '#DC2626'
                  }}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const th = { padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' };
const tdStyle = { padding: '1rem 0.75rem', fontSize: '0.9rem' };

export default Transactions;
