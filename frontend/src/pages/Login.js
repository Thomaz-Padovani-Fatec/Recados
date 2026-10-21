// Arquivo: src/pages/Login.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro,  setErro]  = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // evita recarregar a página
    setErro('');
    setCarregando(true);

    try {
      const { data } = await api.post('/login', {
        email,
        password: senha, // o Laravel espera 'password', não 'senha'
      });

      // Salva o token no navegador — persiste mesmo após recarregar
      localStorage.setItem('token', data.token);

      // Redireciona para a página de recados após login bem-sucedido
      navigate('/recados');

    } catch (err) {
      if (err.response?.status === 401) {
        setErro('E-mail ou senha incorretos.');
      } else {
        setErro('Erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '0 1rem' }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        {erro && (
          <p style={{ color: 'red', marginBottom: '1rem' }}>{erro}</p>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            style={{ width: '100%', padding: '8px', fontSize: 14 }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Senha</label><br />
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="••••••"
            style={{ width: '100%', padding: '8px', fontSize: 14 }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={carregando}
          style={{ padding: '10px 24px', fontSize: 14, cursor: 'pointer' }}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Não tem conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}

export default Login;
