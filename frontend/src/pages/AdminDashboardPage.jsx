import React, { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';
import { LogOut, Users, Activity, ShieldCheck, Database } from 'lucide-react';
import './Admin.css';

const AdminDashboardPage = ({ onAdminLogout }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('customers'); // 'customers' or 'transactions'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custList, txList] = await Promise.all([
          adminApi.getAllCustomers(),
          adminApi.getAllTransactions()
        ]);
        setCustomers(custList);
        setTransactions(txList.reverse()); // latest first
      } catch (err) {
        console.error("Admin fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalBankBalance = customers.reduce((sum, c) => sum + (c.amount || 0), 0);
  const totalTxVolume = transactions.reduce((sum, t) => sum + (t.transactionamount || 0), 0);

  return (
    <div className="admin-dashboard">
      <nav className="glass-panel top-nav admin-nav">
        <div className="nav-brand text-danger">
          <ShieldCheck size={32} />
          <span className="font-bold">Nexus Overwatch</span>
        </div>
        <div className="nav-user">
          <span className="text-muted">System Administrator</span>
          <button onClick={onAdminLogout} className="btn-icon"><LogOut size={20}/></button>
        </div>
      </nav>

      {/* Global Metrics */}
      <div className="admin-metrics-grid">
        <div className="glass-panel metric-card">
          <div className="metric-icon users-icon"><Users size={24}/></div>
          <div className="metric-data">
            <p>Total Customers</p>
            <h3>{customers.length}</h3>
          </div>
        </div>
        <div className="glass-panel metric-card">
          <div className="metric-icon vault-icon"><Database size={24}/></div>
          <div className="metric-data">
            <p>Total Bank Assets</p>
            <h3>₹{totalBankBalance.toFixed(2)}</h3>
          </div>
        </div>
        <div className="glass-panel metric-card">
          <div className="metric-icon tx-icon"><Activity size={24}/></div>
          <div className="metric-data">
            <p>Global Tx Volume</p>
            <h3>₹{totalTxVolume.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      <div className="glass-panel admin-main-panel">
        <div className="admin-tabs">
          <button className={`admin-tab ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>Customer Directory</button>
          <button className={`admin-tab ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>Global Ledger</button>
        </div>

        {loading ? (
          <p className="text-center p-4 text-muted">Syncing with database...</p>
        ) : activeTab === 'customers' ? (
          <div className="table-responsive">
            <table className="glass-table admin-table">
              <thead>
                <tr>
                  <th>Account No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.customerid}>
                    <td className="font-mono">{c.accountnumber}</td>
                    <td><strong>{c.customername}</strong></td>
                    <td>{c.customeremailid}</td>
                    <td>{c.mobilenumber}</td>
                    <td className="text-success font-bold">₹{(c.amount || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="glass-table admin-table">
              <thead>
                <tr>
                  <th>Tx ID</th>
                  <th>Date & Time</th>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.transactionid}>
                    <td className="text-muted">#{tx.transactionid}</td>
                    <td>{tx.transactiondate} {tx.transactiontime}</td>
                    <td className="font-mono">{tx.accountnumber}</td>
                    <td><span className={`tx-badge ${tx.transactiontype ? tx.transactiontype.toLowerCase() : ''}`}>{tx.transactiontype}</span></td>
                    <td className={tx.transactiontype === 'Credit' ? 'text-success' : 'text-danger'}>
                      ₹{(tx.transactionamount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
