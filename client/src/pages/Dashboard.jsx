import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  TrendingUp, TrendingDown, DollarSign, Activity,
  PieChart, Wallet, Target, Bell,
  Calendar, Download, Filter, Plus, Search,
  Sun, Moon, LogOut, Menu,
  CreditCard, ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import Goals from './Goals';
import CalendarView from './Calendar';
import Reports from './Reports';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const t = theme === 'dark';

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: t ? '#111827' : '#F9FAFB',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    sidebar: {
      width: sidebarOpen ? '260px' : '0px',
      backgroundColor: t ? '#1F2937' : '#FFFFFF',
      borderRight: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100
    },
    mainContent: {
      flex: 1,
      marginLeft: sidebarOpen ? '260px' : '0px',
      transition: 'margin-left 0.3s ease',
      width: '100%'
    },
    header: {
      backgroundColor: t ? '#1F2937' : '#FFFFFF',
      borderBottom: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }
  };

  const navItems = [
    { id: 'overview', icon: <BarChart3 size={20} />, label: 'Overview' },
    { id: 'portfolio', icon: <Wallet size={20} />, label: 'Portfolio' },
    { id: 'transactions', icon: <CreditCard size={20} />, label: 'Transactions' },
    { id: 'goals', icon: <Target size={20} />, label: 'Goals' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { id: 'reports', icon: <PieChart size={20} />, label: 'Reports' },
  ];

  const stats = [
    { title: 'Total Revenue', value: '$124,500', change: '+12.5%', icon: <TrendingUp size={24} />, color: '#10B981', bgColor: '#D1FAE5' },
    { title: 'Total Expenses', value: '$87,200', change: '-5.2%', icon: <TrendingDown size={24} />, color: '#EF4444', bgColor: '#FEE2E2' },
    { title: 'Net Profit', value: '$37,300', change: '+8.1%', icon: <DollarSign size={24} />, color: '#3B82F6', bgColor: '#DBEAFE' },
    { title: 'Investments', value: '$45,000', change: '+15.3%', icon: <Activity size={24} />, color: '#8B5CF6', bgColor: '#EDE9FE' },
  ];

  const transactionData = [
    { desc: 'Salary Deposit', cat: 'Income', amount: '+$5,000', color: '#10B981', date: 'Jan 15, 2024', status: 'Completed', icon: <ArrowUpRight size={16} /> },
    { desc: 'Office Rent', cat: 'Expense', amount: '-$2,000', color: '#EF4444', date: 'Jan 14, 2024', status: 'Completed', icon: <ArrowDownRight size={16} /> },
    { desc: 'Internet Bill', cat: 'Utilities', amount: '-$299', color: '#EF4444', date: 'Jan 13, 2024', status: 'Pending', icon: <ArrowDownRight size={16} /> },
    { desc: 'Freelance Project', cat: 'Income', amount: '+$1,500', color: '#10B981', date: 'Jan 12, 2024', status: 'Completed', icon: <ArrowUpRight size={16} /> },
    { desc: 'Marketing Ads', cat: 'Marketing', amount: '-$750', color: '#EF4444', date: 'Jan 11, 2024', status: 'Failed', icon: <ArrowDownRight size={16} /> },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'portfolio':
        return <Portfolio theme={theme} />;
      case 'transactions':
        return <Transactions theme={theme} />;
      case 'goals':
        return <Goals theme={theme} />;
      case 'calendar':
        return <CalendarView theme={theme} />;
      case 'reports':
        return <Reports theme={theme} />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: '0 0 0.5rem 0' }}>
          Welcome back, Demo User! 👋
        </h1>
        <p style={{ color: '#6B7280', margin: 0 }}>Here's your financial overview for today</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: t ? '#1F2937' : '#FFFFFF',
            padding: '1.5rem', borderRadius: '16px',
            border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
            transition: 'all 0.3s ease', cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: stat.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                {stat.icon}
              </div>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, backgroundColor: stat.change.startsWith('+') ? '#D1FAE5' : '#FEE2E2', color: stat.change.startsWith('+') ? '#059669' : '#DC2626' }}>
                {stat.change}
              </span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', marginBottom: '0.25rem' }}>{stat.value}</div>
            <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div style={{ backgroundColor: t ? '#1F2937' : '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: t ? '#F9FAFB' : '#111827', margin: 0 }}>Recent Transactions</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setActiveTab('transactions')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: `1px solid ${t ? '#374151' : '#E5E7EB'}`, borderRadius: '8px', background: 'transparent', color: '#6B7280', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>
              <Filter size={16} /> Filter
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', background: '#3B82F6', color: 'white', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>
              <Download size={16} /> Export
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', background: '#10B981', color: 'white', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }}>
              <Plus size={16} /> Add New
            </button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
              <th style={thStyle}>Transaction</th>
              <th style={thStyle}>Category</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Date</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((tx, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t ? '#374151' : '#F3F4F6'}` }}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: tx.amount.startsWith('+') ? '#D1FAE5' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tx.color }}>
                      {tx.icon}
                    </div>
                    <span style={{ fontWeight: 500, color: t ? '#F9FAFB' : '#111827' }}>{tx.desc}</span>
                  </div>
                </td>
                <td style={{ ...tdStyle, color: '#6B7280' }}>{tx.cat}</td>
                <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, color: tx.color }}>{tx.amount}</td>
                <td style={{ ...tdStyle, textAlign: 'right', color: '#6B7280' }}>{tx.date}</td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: tx.status === 'Completed' ? '#D1FAE5' : tx.status === 'Pending' ? '#FEF3C7' : '#FEE2E2', color: tx.status === 'Completed' ? '#059669' : tx.status === 'Pending' ? '#D97706' : '#DC2626' }}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={22} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: t ? '#F9FAFB' : '#111827', margin: 0 }}>FinEdge</h2>
              <span style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase' }}>PRO</span>
            </div>
          </div>

          <nav>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem', width: '100%', border: 'none',
                  borderRadius: '10px', marginBottom: '0.25rem',
                  background: activeTab === item.id ? (t ? '#374151' : '#EEF2FF') : 'transparent',
                  color: activeTab === item.id ? '#3B82F6' : (t ? '#9CA3AF' : '#6B7280'),
                  cursor: 'pointer', fontWeight: activeTab === item.id ? 600 : 400,
                  transition: 'all 0.2s ease', fontFamily: 'inherit', fontSize: '0.9rem'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t ? '#9CA3AF' : '#6B7280' }}>
              <Menu size={24} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: t ? '#374151' : '#F9FAFB', borderRadius: '10px', border: `1px solid ${t ? '#4B5563' : '#E5E7EB'}` }}>
              <Search size={16} color="#9CA3AF" />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', background: 'none', outline: 'none', color: t ? '#F9FAFB' : '#111827', width: '200px', fontFamily: 'inherit' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleTheme} style={{ padding: '0.5rem', borderRadius: '8px', border: `1px solid ${t ? '#4B5563' : '#E5E7EB'}`, background: t ? '#374151' : '#FFFFFF', cursor: 'pointer', color: t ? '#F9FAFB' : '#6B7280' }}>
              {t ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button onClick={() => alert(`You have ${notifications} new notifications!`)} style={{ padding: '0.5rem', borderRadius: '8px', position: 'relative', border: `1px solid ${t ? '#4B5563' : '#E5E7EB'}`, background: t ? '#374151' : '#FFFFFF', cursor: 'pointer', color: t ? '#F9FAFB' : '#6B7280' }}>
              <Bell size={18} />
              {notifications > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', background: '#EF4444', color: 'white', fontSize: '0.7rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                  {notifications}
                </span>
              )}
            </button>

            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'inherit' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ padding: '2rem' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const thStyle = { padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' };
const tdStyle = { padding: '1rem 0.75rem', fontSize: '0.9rem' };

export default Dashboard;
