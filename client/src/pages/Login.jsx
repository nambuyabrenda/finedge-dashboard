import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: 'demo@finedge.com',
    password: 'password123',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          role: 'analyst',
          createdAt: new Date().toISOString()
        }));
      } else {
        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ 
          name: 'Demo User', 
          email: formData.email, 
          role: 'analyst' 
        }));
      }
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        width: '100%',
        maxWidth: '460px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        animation: 'slideUp 0.5s ease'
      }}>
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <TrendingUp size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
            {isSignUp ? 'Start your free 14-day trial' : 'Sign in to your FinEdge account'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#FEF2F2',
            color: '#DC2626',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            border: '1px solid #FECACA'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Full Name</label>
              <div style={inputWrapperStyle}>
                <User size={18} color="#9CA3AF" style={iconStyle} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={inputStyle}
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputWrapperStyle}>
              <Mail size={18} color="#9CA3AF" style={iconStyle} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: isSignUp ? '1.25rem' : '1.5rem' }}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <Lock size={18} color="#9CA3AF" style={iconStyle} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={inputStyle}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={inputWrapperStyle}>
                <Lock size={18} color="#9CA3AF" style={iconStyle} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={inputStyle}
                  required={isSignUp}
                />
              </div>
            </div>
          )}

          {!isSignUp && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#3B82F6' }} />
                <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Remember me</span>
              </label>
              <button style={{ background: "none", border: "none", fontSize: '0.875rem', color: '#3B82F6', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading ? '#93C5FD' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>

          {isSignUp && (
            <p style={{
              textAlign: 'center',
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: '#9CA3AF'
            }}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          )}
        </form>

        {/* Toggle Sign In/Up */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #E5E7EB'
        }}>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#3B82F6',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {isSignUp ? 'Sign In' : 'Start Free Trial'}
            </button>
          </p>
        </div>

        {/* Social Proof */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
            🔒 Secure • ⚡ Real-time • 📊 Analytics
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 500,
  color: '#374151',
  fontSize: '0.9rem'
};

const inputWrapperStyle = {
  position: 'relative',
  width: '100%'
};

const iconStyle = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem 0.75rem 2.5rem',
  border: '1px solid #E5E7EB',
  borderRadius: '10px',
  fontSize: '0.95rem',
  transition: 'border-color 0.2s ease',
  outline: 'none',
  fontFamily: 'inherit'
};

export default Login;
