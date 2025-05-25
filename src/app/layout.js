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
                  <h2 className="h2ortos">Ortos</h2>
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

        <footer>
          <div className='rodape'>
            <Link href="/ortos">
            <div className="logo">
                <img src="/logoortos.png" width="50" height="50" alt="Logo" />
                <div className="logo-text">
                  <h2 className="h2ortos">Ortos</h2>
                  <h3>Odontologia Especializada</h3>
                </div>
            </div>
            </Link>

            <div className="icones">
              <div className="zap">
              <Link href="https://api.whatsapp.com/send?phone=5583999640954&text=" target="_blank" rel="noopener noreferrer">
                <img src='/zapicon.png' width="20" height="20" alt="zap"></img>
              </Link>
            </div>
            <div className="insta">
              <Link href="https://www.instagram.com/ortosodontologia/" target="_blank" rel="noopener noreferrer">
                <img src='/instaicon.png' width="20" height="20" alt="insta"></img>
              </Link>
            </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
