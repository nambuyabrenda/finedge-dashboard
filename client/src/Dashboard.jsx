import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  TrendingUp, TrendingDown, DollarSign, Activity,
  PieChart, BarChart3, Wallet, Target, Bell,
  Calendar, Download, Filter, Plus, Search,
  Sun, Moon, LogOut, ChevronDown, Menu,
  CreditCard, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme === 'light' ? '#F9FAFB' : '#111827',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '0',
        backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
        borderRight: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100
      }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={22} color="white" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme === 'light' ? '#111827' : '#F9FAFB' }}>
                FinEdge
              </h2>
              <span style={{ fontSize: '0.7rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>
                PRO
              </span>
            </div>
          </div>

          <nav>
            {[
              { icon: <BarChart3 size={20} />, label: 'Dashboard', id: 'overview', active: true },
              { icon: <Wallet size={20} />, label: 'Portfolio', id: 'portfolio' },
              { icon: <CreditCard size={20} />, label: 'Transactions', id: 'transactions' },
              { icon: <Target size={20} />, label: 'Goals', id: 'goals' },
              { icon: <Calendar size={20} />, label: 'Calendar', id: 'calendar' },
              { icon: <PieChart size={20} />, label: 'Reports', id: 'reports' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  width: '100%',
                  border: 'none',
                  borderRadius: '10px',
                  background: activeTab === item.id 
                    ? theme === 'light' ? '#EEF2FF' : '#374151'
                    : 'transparent',
                  color: activeTab === item.id 
                    ? '#3B82F6' 
                    : theme === 'light' ? '#6B7280' : '#9CA3AF',
                  cursor: 'pointer',
                  fontWeight: activeTab === item.id ? 600 : 400,
                  marginBottom: '0.25rem',
                  transition: 'all 0.2s ease'
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
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '260px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Header */}
        <header style={{
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
          borderBottom: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme === 'light' ? '#6B7280' : '#9CA3AF'
            }}>
              <Menu size={24} />
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: theme === 'light' ? '#F9FAFB' : '#374151',
              borderRadius: '10px',
              border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#4B5563'}`
            }}>
              <Search size={16} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search transactions..."
                style={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  color: theme === 'light' ? '#111827' : '#F9FAFB',
                  width: '200px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleTheme} style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#4B5563'}`,
              background: theme === 'light' ? '#FFFFFF' : '#374151',
              cursor: 'pointer',
              color: theme === 'light' ? '#6B7280' : '#F9FAFB'
            }}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#4B5563'}`,
              background: theme === 'light' ? '#FFFFFF' : '#374151',
              cursor: 'pointer',
              position: 'relative',
              color: theme === 'light' ? '#6B7280' : '#F9FAFB'
            }}>
              <Bell size={18} />
              {notifications > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '20px',
                  height: '20px',
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '0.7rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}>
                  {notifications}
                </span>
              )}
            </button>

            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: '#EF4444',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={{ padding: '2rem' }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: theme === 'light' ? '#111827' : '#F9FAFB',
              marginBottom: '0.5rem'
            }}>
              Welcome back, Demo User! 👋
            </h1>
            <p style={{ color: '#6B7280' }}>
              Here's your financial overview for today
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { title: 'Total Revenue', value: '$124,500', change: '+12.5%', icon: <TrendingUp />, color: '#10B981', bgColor: '#D1FAE5' },
              { title: 'Total Expenses', value: '$87,200', change: '-5.2%', icon: <TrendingDown />, color: '#EF4444', bgColor: '#FEE2E2' },
              { title: 'Net Profit', value: '$37,300', change: '+8.1%', icon: <DollarSign />, color: '#3B82F6', bgColor: '#DBEAFE' },
              { title: 'Investments', value: '$45,000', change: '+15.3%', icon: <Activity />, color: '#8B5CF6', bgColor: '#EDE9FE' },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
                padding: '1.5rem',
                borderRadius: '16px',
                border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color
                  }}>
                    {stat.icon}
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: stat.change.startsWith('+') ? '#D1FAE5' : '#FEE2E2',
                    color: stat.change.startsWith('+') ? '#059669' : '#DC2626'
                  }}>
                    {stat.change}
                  </span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: theme === 'light' ? '#111827' : '#F9FAFB', marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                  {stat.title}
                </div>
              </div>
            ))}
          </div>

          {/* Transactions Table */}
          <div style={{
            backgroundColor: theme === 'light' ? '#FFFFFF' : '#1F2937',
            padding: '1.5rem',
            borderRadius: '16px',
            border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: theme === 'light' ? '#111827' : '#F9FAFB' }}>
                Recent Transactions
              </h2>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#4B5563'}`,
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#6B7280',
                  cursor: 'pointer',
                  fontWeight: 500
                }}>
                  <Filter size={16} />
                  Filter
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#3B82F6',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500
                }}>
                  <Download size={16} />
                  Export
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#10B981',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500
                }}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}` }}>
                  <th style={thStyle}>Transaction</th>
                  <th style={thStyle}>Category</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Amount</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Date</th>
                  <th style={{ ...thStyle, textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { desc: 'Salary Deposit', cat: 'Income', amount: '+$5,000', color: '#10B981', date: 'Jan 15, 2024', status: 'Completed', icon: <ArrowUpRight size={16} /> },
                  { desc: 'Office Rent', cat: 'Expense', amount: '-$2,000', color: '#EF4444', date: 'Jan 14, 2024', status: 'Completed', icon: <ArrowDownRight size={16} /> },
                  { desc: 'Internet Bill', cat: 'Utilities', amount: '-$299', color: '#EF4444', date: 'Jan 13, 2024', status: 'Pending', icon: <ArrowDownRight size={16} /> },
                  { desc: 'Freelance Project', cat: 'Income', amount: '+$1,500', color: '#10B981', date: 'Jan 12, 2024', status: 'Completed', icon: <ArrowUpRight size={16} /> },
                  { desc: 'Marketing Ads', cat: 'Marketing', amount: '-$750', color: '#EF4444', date: 'Jan 11, 2024', status: 'Failed', icon: <ArrowDownRight size={16} /> },
                ].map((t, i) => (
                  <tr key={i} style={{
                    borderBottom: `1px solid ${theme === 'light' ? '#F3F4F6' : '#374151'}`,
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = theme === 'light' ? '#F9FAFB' : '#374151'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: t.amount.startsWith('+') ? '#D1FAE5' : '#FEE2E2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: t.color
                        }}>
                          {t.icon}
                        </div>
                        <span style={{ fontWeight: 500, color: theme === 'light' ? '#111827' : '#F9FAFB' }}>
                          {t.desc}
                        </span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: '#6B7280' }}>{t.cat}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, color: t.color }}>{t.amount}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', color: '#6B7280' }}>{t.date}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: t.status === 'Completed' ? '#D1FAE5' : t.status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                        color: t.status === 'Completed' ? '#059669' : t.status === 'Pending' ? '#D97706' : '#DC2626'
                      }}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '0.75rem',
  textAlign: 'left',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const tdStyle = {
  padding: '1rem 0.75rem',
  fontSize: '0.9rem'
};

export default Dashboard;
