import React, { useState, useEffect } from 'react';
import { bankApi } from '../api/bankApi';
import TransactionModal from '../components/TransactionModal';
import { LogOut, RefreshCw, PlusCircle, MinusCircle, Wallet, History } from 'lucide-react';
import './DashboardPage.css';

const DashboardPage = ({ user, onLogout }) => {
  const [balance, setBalance] = useState(0);
  const [statement, setStatement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // 'credit' or 'debit'

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const balStr = await bankApi.getBalance(user.accountnumber);
      setBalance(parseFloat(balStr.replace('Current Balance: ', '')));
      
      const st = await bankApi.getStatement(user.accountnumber);
      setStatement(st.reverse()); // Latest first
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <nav className="glass-panel top-nav">
        <div className="nav-brand">
          <Wallet className="text-gradient" size={32} />
          <span className="text-gradient font-bold">Nexus</span>
        </div>
        <div className="nav-user">
          <span>Welcome back, {user.customername.split(' ')[0]}!</span>
          <button onClick={onLogout} className="btn-icon"><LogOut size={20}/></button>
        </div>
      </nav>

      <div className="dashboard-grid">
        {/* Balance Card */}
        <div className="glass-panel balance-card">
          <div className="balance-header">
            <h3>Total Balance</h3>
            <button onClick={fetchDashboardData} className="btn-icon">
              <RefreshCw size={20} className={loading ? "spinning" : ""} />
            </button>
          </div>
          <h1 className="balance-amount text-gradient">
            ${balance.toFixed(2)}
          </h1>
          <p className="account-number">Account: ****{String(user.accountnumber).slice(-4)}</p>

          <div className="action-buttons">
            <button className="btn btn-success" onClick={() => setModalType('credit')}>
              <PlusCircle size={20} /> Deposit
            </button>
            <button className="btn btn-danger" onClick={() => setModalType('debit')}>
              <MinusCircle size={20} /> Withdraw
            </button>
          </div>
        </div>

        {/* User Details */}
        <div className="glass-panel details-card">
          <h3><UserIcon size={20}/> Account Details</h3>
          <div className="detail-row"><span>Email</span> <strong>{user.customeremailid}</strong></div>
          <div className="detail-row"><span>Mobile</span> <strong>+91 {user.mobilenumber}</strong></div>
          <div className="detail-row"><span>Address</span> <strong>{user.customeraddress}</strong></div>
          <div className="detail-row"><span>Aadhar</span> <strong>**** **** {String(user.aadharnumber).slice(-4)}</strong></div>
        </div>

        {/* Statement Table */}
        <div className="glass-panel statement-card">
          <h3><History size={20}/> Recent Transactions</h3>
          <div className="table-responsive">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {statement.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted">No transactions yet.</td></tr>
                ) : (
                  statement.map(tx => (
                    <tr key={tx.transactionId}>
                      <td>{new Date(tx.transactiondate_time).toLocaleString()}</td>
                      <td>
                        <span className={`tx-badge ${tx.transactiontype.toLowerCase()}`}>
                          {tx.transactiontype}
                        </span>
                      </td>
                      <td className={tx.transactiontype === 'Credit' ? 'text-success' : 'text-danger'}>
                        {tx.transactiontype === 'Credit' ? '+' : '-'}${tx.transactionAmount.toFixed(2)}
                      </td>
                      <td>${tx.total_Balance.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalType && (
        <TransactionModal 
          type={modalType} 
          onClose={() => setModalType(null)} 
          accountNumber={user.accountnumber}
          onSuccess={fetchDashboardData}
        />
      )}
    </div>
  );
};

// Helper for icon
const UserIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

export default DashboardPage;
