import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Benvenuto, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
        <p>ID Utente: {user?.id}</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📚 I miei esami</h3>
          <p>Gestisci le tue iscrizioni agli appelli</p>
        </div>
        
        <div className="dashboard-card">
          <h3>🕐 Orario lezioni</h3>
          <p>Consulta il tuo orario settimanale</p>
        </div>
        
        <div className="dashboard-card">
          <h3>🎓 Badge digitale</h3>
          <p>Il tuo badge universitario</p>
        </div>
        
        <div className="dashboard-card">
          <h3>💬 Forum</h3>
          <p>Condividi esperienze con altri studenti</p>
        </div>
      </div>
    </div>
  );
};