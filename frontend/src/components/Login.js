import React, { useState } from 'react';
import { login } from '../services/auth';

// Componenti UI (stesso stile del gestionale)
const Card = ({ title, children, style = {} }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    ...style
  }}>
    {title && <h3 style={{ margin: '0 0 15px', fontSize: '1rem', fontWeight: '600', color: '#2d3748' }}>{title}</h3>}
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = 'text', placeholder, style = {} }) => (
  <div style={{ marginBottom: '15px', ...style }}>
    {label && <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568' }}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '0.9rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s'
      }}
    />
  </div>
);

const Button = ({ children, onClick, variant = 'primary', size = 'md', style = {}, disabled = false }) => {
  const variants = {
    primary: { bg: '#4299e1', color: 'white' },
    success: { bg: '#48bb78', color: 'white' },
    danger: { bg: '#f56565', color: 'white' },
    secondary: { bg: '#e2e8f0', color: '#4a5568' }
  };
  const sizes = { sm: '8px 12px', md: '10px 16px', lg: '12px 24px' };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      style={{
        padding: sizes[size],
        background: disabled ? '#cbd5e0' : variants[variant].bg,
        color: variants[variant].color,
        border: 'none',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: '500',
        fontSize: size === 'sm' ? '0.8rem' : '0.9rem',
        transition: 'all 0.2s',
        width: '100%',
        ...style
      }}
    >
      {children}
    </button>
  );
};

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      onLoginSuccess(data);
    } catch (err) {
      setError(err.message || 'Errore nel login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', margin: 0, color: 'white', letterSpacing: '-0.5px' }}>📒 Gestionale</h1>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', margin: '5px 0 0' }}>Studio Professionale</p>
        </div>

        <Card>
          <h2 style={{ margin: '0 0 20px', fontSize: '1.3rem', fontWeight: '600', color: '#2d3748', textAlign: 'center' }}>Accedi</h2>
          
          {error && (
            <div style={{
              background: '#fff5f5',
              border: '1px solid #fc8181',
              color: '#c53030',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '15px',
              fontSize: '0.85rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="Inserisci username"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Inserisci password"
              required
            />
            
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading}
              style={{ marginTop: '10px' }}
            >
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

