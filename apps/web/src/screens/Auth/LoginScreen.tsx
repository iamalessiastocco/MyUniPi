import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import unipiLogo from "../../assets/images/unipi-logo.png";
import { apiService } from '../../services/api';
import { authHelper } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Chiama l'API di login
      const response = await apiService.login(email, password);
      
      // Salva il token e i dati utente usando il context
      login(response.data.token, response.data.user);
      
      // Log per debug
      console.log('Login successful!', response.data);
      
      // Reindirizza alla dashboard
      navigate('/dashboard');
      
    } catch (err: any) {
      // Gestione errori migliorata
      let errorMessage = 'Errore di connessione al server';
      
      if (err.response?.data) {
        errorMessage = err.response.data.message || 
                      err.response.data.errors?.email?.[0] || 
                      errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
      // Log dell'errore completo per debug
      console.error('Login error:', err.response?.data || err.message);
      
    } finally {
      setLoading(false);
    }
  };

  // Funzione per gestire il submit con Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && email && password) {
      handleLogin();
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
        <div className="login-form" onKeyPress={handleKeyPress}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome.cognome@studenti.unipi.it"
              disabled={loading}
              autoComplete="email"
              className={error ? 'error' : ''}
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
              autoComplete="current-password"
              className={error ? 'error' : ''}
            />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <button 
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="login-button"
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </button>
        </div>

        {/* Footer Assistenza */}
        <div className="assistance-footer">
          <p>Problemi di accesso? <a href="#" className="assistance-link">Contatta l'assistenza</a></p>
        </div>

        {/* Footer Diritti Riservati */}
        <div className="copyright-footer">
          <p>© {new Date().getFullYear()} Università di Pisa - Tutti i diritti riservati</p>
        </div>

      </div>
    </div>
  );
};