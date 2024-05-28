// Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log("Logging in with", { username, password });
    onClose(); // Cerrar el modal al iniciar sesión
  };

  return (
    <div className="login-modal">
      <div className="login-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Iniciar sesion</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Nombre</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='btn-login'>Iniciar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
