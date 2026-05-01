import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Landmark, History, TrendingUp, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const marketData = [
  { day: 'Mon', price: 1.2 },
  { day: 'Tue', price: 1.5 },
  { day: 'Wed', price: 1.4 },
  { day: 'Thu', price: 1.8 },
  { day: 'Fri', price: 2.1 },
  { day: 'Sat', price: 1.9 },
  { day: 'Sun', price: 2.4 },
];

function EconomyView() {
  const [balance, setBalance] = useState(1240.50);
  const [notif, setNotif] = useState(null);

  const handleTrade = (type, amount) => {
    setNotif(`${type === 'buy' ? 'Buying' : 'Selling'} ${amount} AQW...`);
    setTimeout(() => {
      if (type === 'buy') setBalance(prev => prev + amount);
      else setBalance(prev => prev - amount);
      setNotif(null);
    }, 1500);
  };

  return (
    <div className="view-container">
      {notif && (
        <div style={{ 
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', 
          background: 'var(--primary-blue)', color: 'var(--dark-blue)', padding: '0.5rem 1rem', 
          borderRadius: '20px', zIndex: 1000, fontWeight: 'bold' 
        }}>
          {notif}
        </div>
      )}

      <h2 className="mb-4">Water Credit Marketplace</h2>
      
      <div className="grid-cols-3 mb-5">
        <div className="card wallet-card col-span-1">
          <div className="flex-between mb-4">
            <div className="card-title"><Wallet size={20} /> My AquaWallet</div>
            <div className="text-primary">Verified</div>
          </div>
          <div className="crypto-value mb-1">{balance.toLocaleString()} AQW</div>
          <div style={{ color: 'var(--primary-green)', fontSize: '0.9rem' }}>≈ ${(balance * 0.25).toFixed(2)} USD</div>
          <div className="grid-cols-2 mt-4 gap-2">
            <button className="tab active flex-center gap-2" onClick={() => handleTrade('sell', 10)}><ArrowUpRight size={16} /> Sell 10</button>
            <button className="tab flex-center gap-2" onClick={() => handleTrade('buy', 10)}><ArrowDownLeft size={16} /> Buy 10</button>
          </div>
        </div>

        <div className="card col-span-2">
          <div className="flex-between mb-4">
            <div className="card-title"><TrendingUp size={20} /> AQW Exchange Rate</div>
            <div className="flex gap-2">
              <span className="text-success">+12.4%</span>
              <span style={{ color: 'var(--slate)' }}>24h</span>
            </div>
          </div>
          <div style={{ height: '150px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--mid-blue)', border: '1px solid var(--primary-blue)' }}
                />
                <Line type="monotone" dataKey="price" stroke="var(--primary-blue)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Landmark size={20} /> Active Sell Orders</div>
          </div>
          <div className="market-list">
            {[
              { id: '1', seller: 'Block A, 102', amount: 50, price: '0.24 USD' },
              { id: '2', seller: 'Block C, 405', amount: 120, price: '0.22 USD' },
              { id: '3', seller: 'Commercial B1', amount: 500, price: '0.21 USD' },
            ].map(order => (
              <div key={order.id} className="market-row">
                <div style={{ fontWeight: '500' }}>{order.seller}</div>
                <div className="text-primary">{order.amount} AQW</div>
                <div style={{ color: 'var(--slate)' }}>@{order.price}</div>
                <button className="tab" style={{ padding: '2px 10px', fontSize: '0.8rem' }} onClick={() => handleTrade('buy', order.amount)}>Buy</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><History size={20} /> Transaction History</div>
          </div>
          <div className="market-list">
             {[
              { id: '1', type: 'Sold', amount: '25 AQW', status: 'Success', date: '2h ago' },
              { id: '2', type: 'Redeemed', amount: '100 AQW', status: 'Society Bill', date: 'Yesterday' },
              { id: '3', type: 'Earned', amount: '15 AQW', status: 'Conservation', date: '2 days ago' },
            ].map(tx => (
              <div key={tx.id} className="market-row">
                <div>
                  <div style={{ fontWeight: '500' }}>{tx.type}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--slate)' }}>{tx.date}</div>
                </div>
                <div className={tx.type === 'Earned' ? 'text-success' : 'text-primary'}>
                  {tx.type === 'Earned' ? '+' : '-'}{tx.amount}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>{tx.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EconomyView;
