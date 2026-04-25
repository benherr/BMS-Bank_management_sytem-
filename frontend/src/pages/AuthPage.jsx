import React, { useState } from 'react';
import { bankApi } from '../api/bankApi';
import { UserPlus, LogIn, Activity } from 'lucide-react';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login State
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  // Register State
  const [regData, setRegData] = useState({
    customername: '', customeremailid: '', aadharnumber: '', pannumber: '',
    mobilenumber: '', customeraddress: '', gender: '', dateofbirth: '',
    customerage: '', amount: ''
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await bankApi.login(email, pin);
      onLogin(user);
    } catch (err) {
      setError(err.response?.data || 'Invalid email or PIN');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Convert number fields
      const payload = {
        ...regData,
        aadharnumber: parseInt(regData.aadharnumber),
        mobilenumber: parseInt(regData.mobilenumber),
        customerage: parseInt(regData.customerage),
        amount: parseFloat(regData.amount)
      };
      const user = await bankApi.register(payload);
      alert(`Registration Successful! Your Account Number is: ${user.accountnumber} and default PIN is 1234. Please login.`);
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Check inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <Activity size={48} className="text-gradient" />
        <h1 className="text-gradient">Nexus Banking</h1>
        <p>The future of digital finance.</p>
      </div>

      <div className="glass-panel auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Register</button>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" className="glass-input" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label>4-Digit PIN</label>
              <input type="password" maxLength="4" className="glass-input" required value={pin} onChange={(e) => setPin(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <LogIn size={20} /> {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form reg-form">
            <div className="input-row">
              <div className="input-group"><label>Full Name</label><input type="text" name="customername" className="glass-input" required onChange={handleRegChange}/></div>
              <div className="input-group"><label>Email</label><input type="email" name="customeremailid" className="glass-input" required onChange={handleRegChange}/></div>
            </div>
            <div className="input-row">
              <div className="input-group"><label>Aadhar Number</label><input type="number" name="aadharnumber" className="glass-input" required onChange={handleRegChange}/></div>
              <div className="input-group"><label>PAN Number</label><input type="text" name="pannumber" className="glass-input" required onChange={handleRegChange}/></div>
            </div>
            <div className="input-row">
              <div className="input-group"><label>Mobile Number</label><input type="number" name="mobilenumber" className="glass-input" required onChange={handleRegChange}/></div>
              <div className="input-group"><label>Date of Birth</label><input type="date" name="dateofbirth" className="glass-input" required onChange={handleRegChange}/></div>
            </div>
            <div className="input-row">
              <div className="input-group"><label>Gender</label><input type="text" name="gender" className="glass-input" required onChange={handleRegChange}/></div>
              <div className="input-group"><label>Age</label><input type="number" name="customerage" className="glass-input" required onChange={handleRegChange}/></div>
            </div>
            <div className="input-group"><label>Address</label><input type="text" name="customeraddress" className="glass-input" required onChange={handleRegChange}/></div>
            <div className="input-group"><label>Initial Deposit (Amount)</label><input type="number" step="0.01" name="amount" className="glass-input" required onChange={handleRegChange}/></div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <UserPlus size={20} /> {loading ? 'Processing...' : 'Open Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
