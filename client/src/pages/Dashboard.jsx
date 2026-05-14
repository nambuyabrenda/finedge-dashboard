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
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const t = theme === 'dark';

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 32000, profit: 10000 },
    { month: 'Feb', revenue: 45000, expenses: 33000, profit: 12000 },
    { month: 'Mar', revenue: 40000, expenses: 31000, profit: 9000 },
    { month: 'Apr', revenue: 48000, expenses: 35000, profit: 13000 },
    { month: 'May', revenue: 52000, expenses: 37000, profit: 15000 },
    { month: 'Jun', revenue: 50000, expenses: 36000, profit: 14000 },
  ];

  const categoryData = [
    { name: 'Housing', value: 15000, color: '#3B82F6' },
    { name: 'Food', value: 8000, color: '#10B981' },
    { name: 'Transport', value: 4000, color: '#F59E0B' },
    { name: 'Entertainment', value: 3000, color: '#EF4444' },
    { name: 'Utilities', value: 2500, color: '#8B5CF6' },
    { name: 'Healthcare', value: 2000, color: '#EC4899' },
  ];

  const portfolioData = [
    { month: 'Jan', value: 35000 },
    { month: 'Feb', value: 38000 },
    { month: 'Mar', value: 36000 },
    { month: 'Apr', value: 42000 },
    { month: 'May', value: 45000 },
    { month: 'Jun', value: 45000 },
  ];

  const notificationsList = [
    { id: 1, title: 'Salary Deposited', message: '$5,000 credited to your account', time: '2 hours ago', type: 'success' },
    { id: 2, title: 'Bill Due Soon', message: 'Office rent payment due in 3 days', time: '5 hours ago', type: 'warning' },
    { id: 3, title: 'Goal Achieved!', message: 'You reached 75% of your savings goal', time: '1 day ago', type: 'info' },
  ];

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

  const renderContent = () => {
    switch(activeTab) {
      case 'portfolio': return <Portfolio theme={theme} />;
      case 'transactions': return <Transactions theme={theme} />;
      case 'goals': return <Goals theme={theme} />;
      case 'calendar': return <CalendarView theme={theme} />;
      case 'reports': return <Reports theme={theme} />;
      default: return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="fade-in">
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

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Revenue vs Expenses Chart */}
        <div style={{ backgroundColor: t ? '#1F2937' : '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
          <h3 style={{ color: t ? '#F9FAFB' : '#111827', margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
            📈 Revenue vs Expenses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={t ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: t ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  color: t ? '#F9FAFB' : '#111827'
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Growth */}
        <div style={{ backgroundColor: t ? '#1F2937' : '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
          <h3 style={{ color: t ? '#F9FAFB' : '#111827', margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
            📊 Portfolio Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke={t ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: t ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  color: t ? '#F9FAFB' : '#111827'
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div style={{ backgroundColor: t ? '#1F2937' : '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
          <h3 style={{ color: t ? '#F9FAFB' : '#111827', margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
            🍩 Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: t ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  color: t ? '#F9FAFB' : '#111827'
                }}
              />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Insights */}
        <div style={{ backgroundColor: t ? '#1F2937' : '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
          <h3 style={{ color: t ? '#F9FAFB' : '#111827', margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>
            💡 AI Insights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '📈', text: 'Revenue is up 12.5% - best quarter yet!', color: '#10B981' },
              { icon: '⚠️', text: 'Marketing expenses exceeded budget by 15%', color: '#F59E0B' },
              { icon: '💡', text: 'You could save $2,500 by switching suppliers', color: '#3B82F6' },
              { icon: '🎯', text: '85% of quarterly goals achieved', color: '#8B5CF6' },
            ].map((insight, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem', borderRadius: '10px',
                backgroundColor: t ? '#374151' : '#F9FAFB'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{insight.icon}</span>
                <p style={{ color: t ? '#F9FAFB' : '#111827', margin: 0, fontSize: '0.9rem' }}>{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
                {item.id === 'transactions' && (
                  <span style={{
                    marginLeft: 'auto',
                    background: '#3B82F6',
                    color: 'white',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>5</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t ? '#9CA3AF' : '#6B7280' }}>
              <Menu size={24} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: t ? '#374151' : '#F9FAFB', borderRadius: '10px', border: `1px solid ${t ? '#4B5563' : '#E5E7EB'}` }}>
              <Search size={16} color="#9CA3AF" />
              <input type="text" placeholder="Search transactions, reports..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', background: 'none', outline: 'none', color: t ? '#F9FAFB' : '#111827', width: '250px', fontFamily: 'inherit' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleTheme} style={{ padding: '0.5rem', borderRadius: '8px', border: `1px solid ${t ? '#4B5563' : '#E5E7EB'}`, background: t ? '#374151' : '#FFFFFF', cursor: 'pointer', color: t ? '#F9FAFB' : '#6B7280', position: 'relative' }}>
              {t ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ padding: '0.5rem', borderRadius: '8px', position: 'relative', border: `1px solid ${t ? '#4B5563' : '#E5E7EB'}`, background: t ? '#374151' : '#FFFFFF', cursor: 'pointer', color: t ? '#F9FAFB' : '#6B7280' }}
              >
                <Bell size={18} />
                {notifications > 0 && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px', background: '#EF4444', color: 'white', fontSize: '0.7rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                    {notifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0,
                  marginTop: '0.5rem', width: '320px',
                  backgroundColor: t ? '#1F2937' : '#FFFFFF',
                  borderRadius: '12px',
                  border: `1px solid ${t ? '#374151' : '#E5E7EB'}`,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '1rem', borderBottom: `1px solid ${t ? '#374151' : '#E5E7EB'}` }}>
                    <h4 style={{ margin: 0, color: t ? '#F9FAFB' : '#111827' }}>Notifications</h4>
                  </div>
                  {notificationsList.map((notif) => (
                    <div key={notif.id} style={{
                      padding: '0.75rem 1rem',
                      borderBottom: `1px solid ${t ? '#374151' : '#F3F4F6'}`,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = t ? '#374151' : '#F9FAFB'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600, color: t ? '#F9FAFB' : '#111827', fontSize: '0.9rem' }}>{notif.title}</p>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#6B7280', fontSize: '0.85rem' }}>{notif.message}</p>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{notif.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'inherit' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        <main style={{ padding: '2rem' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
