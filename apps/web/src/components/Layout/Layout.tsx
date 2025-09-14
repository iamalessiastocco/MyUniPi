import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1>MyUniPi Dashboard</h1>
          <div className="user-menu">
            <span>Ciao, {user?.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};