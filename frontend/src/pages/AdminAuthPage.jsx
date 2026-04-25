import React, { useState } from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import './Admin.css';

const AdminAuthPage = ({ onAdminLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded simple admin check for MVP
    if (password === 'admin123') {
      onAdminLogin(true);
    } else {
      setError('Invalid Administrator Credentials');
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
            <label>Master Password</label>
            <input 
              type="password" 
              className="glass-input admin-input" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-danger w-100">
            <Lock size={20} /> Authorize
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuthPage;
