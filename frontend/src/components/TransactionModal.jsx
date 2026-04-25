import React, { useState } from 'react';
import { bankApi } from '../api/bankApi';
import { X } from 'lucide-react';
import './TransactionModal.css';

const TransactionModal = ({ type, onClose, accountNumber, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError('Enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (type === 'credit') {
        await bankApi.credit(accountNumber, amount);
      } else {
        await bankApi.debit(accountNumber, amount);
      }
      onSuccess(); // Refresh dashboard data
      onClose(); // Close modal
    } catch (err) {
      setError(err.response?.data || 'Transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <button className="close-btn" onClick={onClose}><X size={24}/></button>
        <h2 className="text-gradient mb-4">
          {type === 'credit' ? 'Deposit Funds' : 'Withdraw Funds'}
        </h2>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label>Amount (₹)</label>
            <input 
              type="number" 
              step="0.01" 
              className="glass-input amount-input" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required 
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            className={`btn ${type === 'credit' ? 'btn-success' : 'btn-danger'} w-100`}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Confirm ${type === 'credit' ? 'Deposit' : 'Withdrawal'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
