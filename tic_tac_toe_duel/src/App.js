import React from 'react';
import './App.css';
import TicTacToeDuel from './TicTacToeDuel';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span style={{fontWeight:500, fontSize:"1rem", color:"#fff"}}>TicTacToe Duel</span>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          {/* Render the main game container here */}
          <TicTacToeDuel />
        </div>
      </main>
    </div>
  );
}

export default App;