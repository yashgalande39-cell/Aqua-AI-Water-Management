import React, { useState } from 'react';
import { Wrench, AlertCircle, CheckCircle, Clock, User, Phone, MapPin } from 'lucide-react';

function MaintenanceView() {
  const [tickets, setTickets] = useState([
    { id: 'TK-842', type: 'Predictive', issue: 'Pressure Flux - Main Riser', priority: 'High', status: 'Active', tech: 'John Doe', time: '15m ago' },
    { id: 'TK-840', type: 'Leak', issue: 'Secondary Valve Leak', priority: 'Medium', status: 'Pending', tech: 'Unassigned', time: '2h ago' },
    { id: 'TK-835', type: 'Maintenance', issue: 'Filter Replacement', priority: 'Low', status: 'Resolved', tech: 'Mike Ross', time: '1 day ago' },
  ]);

  const addTicket = () => {
    const newId = `TK-${Math.floor(Math.random() * 1000)}`;
    setTickets([{ 
      id: newId, 
      type: 'User Reported', 
      issue: 'New Service Request', 
      priority: 'Medium', 
      status: 'Pending', 
      tech: 'Unassigned', 
      time: 'Just now' 
    }, ...tickets]);
  };

  return (
    <div className="view-container">
      <h2 className="mb-4">Predictive Maintenance Queue</h2>
      
      <div className="grid-cols-4 mb-5">
        <div className="card text-center">
          <div style={{ color: 'var(--red-alert)', marginBottom: '0.5rem' }}><AlertCircle size={32} className="mx-auto" /></div>
          <h3>2 Critical</h3>
          <p>AI Predicted Failures</p>
        </div>
        <div className="card text-center">
          <div style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}><Clock size={32} className="mx-auto" /></div>
          <h3>{tickets.filter(t => t.status === 'Pending').length} Pending</h3>
          <p>Scheduled Tasks</p>
        </div>
        <div style={{ gridColumn: 'span 2' }} className="card flex-center bg-primary">
          <div className="text-center">
            <h3 className="text-primary">System Health Index: 98.2%</h3>
            <p>Predictive engine suggests next inspection in 14 days.</p>
          </div>
        </div>
      </div>

      <div className="grid-cols-3">
        <div className="col-span-2" style={{ gridColumn: 'span 2' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Active Service Tickets</div>
              <button className="tab active" onClick={addTicket}>+ New Ticket</button>
            </div>
            <div className="ticket-list">
              {tickets.map(ticket => (
                <div key={ticket.id} className="card mb-3" style={{ background: 'rgba(255,255,255,0.02)', borderLeft: `4px solid ${ticket.priority === 'High' ? 'var(--red-alert)' : ticket.priority === 'Medium' ? 'var(--orange-warn)' : 'var(--primary-blue)'}` }}>
                  <div className="flex-between">
                    <div>
                      <span className={`ticket-badge ${ticket.status === 'Active' ? 'ticket-active' : ticket.status === 'Pending' ? 'ticket-pending' : 'ticket-resolved'}`}>
                        {ticket.status}
                      </span>
                      <span style={{ marginLeft: '1rem', fontWeight: 'bold' }}>{ticket.id}</span>
                      <span style={{ marginLeft: '1rem', color: 'var(--slate)' }}>{ticket.type}</span>
                    </div>
                    <div style={{ color: 'var(--slate)', fontSize: '0.8rem' }}>{ticket.time}</div>
                  </div>
                  <div className="mt-3">
                    <h4>{ticket.issue}</h4>
                    <div className="flex gap-4 mt-2" style={{ color: 'var(--slate)', fontSize: '0.9rem' }}>
                      <div className="flex-center gap-1"><User size={14} /> {ticket.tech}</div>
                      <div className="flex-center gap-1"><MapPin size={14} /> Zone B-12</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title"><CheckCircle size={20} /> Technician Status</div>
          </div>
          <div className="tech-list">
            {[
              { name: 'John Doe', status: 'On Site', task: 'TK-842' },
              { name: 'Mike Ross', status: 'Available', task: 'None' },
              { name: 'Sarah Connor', status: 'Offline', task: 'None' },
            ].map(tech => (
              <div key={tech.name} className="flex-between mb-4 pb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: '500' }}>{tech.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--slate)' }}>Assigned: {tech.task}</div>
                </div>
                <div className={tech.status === 'On Site' ? 'text-primary' : tech.status === 'Available' ? 'text-success' : 'text-danger'}>
                  {tech.status}
                </div>
              </div>
            ))}
          </div>
          <button className="tab w-100 mt-4" style={{ width: '100%' }} onClick={() => alert('Accessing personnel directory...')}>View All Personnel</button>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceView;
