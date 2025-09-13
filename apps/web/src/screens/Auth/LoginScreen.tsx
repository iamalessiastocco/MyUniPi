import React, { useState } from 'react';
import './LoginScreen.css';
import unipiLogo from "../../assets/images/unipi-logo.png";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt:', { email, password });
    } catch (err) {
      setError('Credenziali non valide. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      
      {/* Header con Logo */}
      <div className="header">
        <img 
          src={unipiLogo}
          alt="Università di Pisa" 
          className="unipi-logo"
        />
      </div>

      {/* Contenuto Principale */}
      <div className="content-wrapper">
        
        {/* Titolo MyUniPi */}
        <div className="app-title">
          <h2>MyUniPi</h2>
        </div>

        {/* Form di Login */}
        <div className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome.cognome@studenti.unipi.it"
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="La tua password"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="login-button"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </div>

        {/* Footer Assistenza */}
        <div className="assistance-footer">
          <p>Problemi di accesso? <a href="#">Contatta l'assistenza</a></p>
        </div>

        {/* Footer Diritti Riservati */}
        <div className="copyright-footer">
          <p>© {new Date().getFullYear()} Università di Pisa - Tutti i diritti riservati</p>
        </div>

      </div>
    </div>
  );
};