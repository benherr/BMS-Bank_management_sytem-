import React, { useState } from 'react';
import { adminApi } from '../api/adminApi';
import { Lock, ShieldAlert } from 'lucide-react';
import './Admin.css';

const AdminAuthPage = ({ onAdminLogin }) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.login(email, pin);
      onAdminLogin(true);
    } catch (err) {
      setError(err.response?.data || 'Invalid Administrator Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-wrapper">
      <div className="glass-panel admin-auth-card">
        <div className="admin-header">
          <ShieldAlert size={48} className="text-danger" />
          <h2>Admin Portal</h2>
          <p>Restricted Access Only</p>
        </div>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              className="glass-input admin-input" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              autoFocus
            />
          </div>
          <div className="input-group">
            <label>Admin PIN</label>
            <input 
              type="password" 
              maxLength="4"
              className="glass-input admin-input" 
              required 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            <Lock size={20} /> {loading ? 'Authorizing...' : 'Authorize'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthPage;
