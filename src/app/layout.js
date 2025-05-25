'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="pt">
      <body>
        <header>
          <div className="header">
            <Link href="/ortos" onClick={() => setMenuOpen(false)}>
              <div className="logo">
                <img src="/logoortos.png" width="50" height="50" alt="Logo" />
                <div className="logo-text">
                  <h2 className="h2header">Ortos</h2>
                  <h3>Odontologia Especializada</h3>
                </div>
              </div>
            </Link>

            <div className="hamburguer" onClick={() => setMenuOpen(!menuOpen)}>
              &#9776;
            </div>

            <div className={`menu ${menuOpen ? 'open' : ''}`}>
              <Link href="/ortos#procedimentos" onClick={() => setMenuOpen(false)}>
                <h5>Procedimentos</h5>
              </Link>
              <Link href="/ortos#localizacao" onClick={() => setMenuOpen(false)}>
                <h5>Localização</h5>
              </Link>
              <h5>Sobre</h5>
              <h5>Dúvidas</h5>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
