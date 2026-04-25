import React, { useState } from 'react';
import { bankApi } from '../api/bankApi';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import './TransactionModal.css';

const TransactionModal = ({ isOpen, onClose, type, accountNo, onComplete }) => {
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

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
        await bankApi.deposit(accountNo, parseFloat(amount));
      } else if (type === 'debit') {
        await bankApi.withdraw(accountNo, parseFloat(amount));
      } else if (type === 'transfer') {
        await bankApi.transfer(accountNo, parseInt(toAccount), parseFloat(amount));
      }
      onComplete();
      onClose();
      setAmount('');
      setToAccount('');
    } catch (err) {
      setError(err.response?.data || 'Transaction failed.');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (type === 'credit') return 'Make a Deposit';
    if (type === 'transfer') return 'Send Money';
    return 'Make a Withdrawal';
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <button className="close-btn" onClick={onClose}><X size={24}/></button>
        <h2 className="text-gradient mb-4">{getTitle()}</h2>
        
        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          {type === 'transfer' && (
            <div className="input-group">
              <label>Recipient Account Number</label>
              <input 
                type="number" 
                className="glass-input" 
                placeholder="Enter account number"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                required 
              />
            </div>
          )}
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
