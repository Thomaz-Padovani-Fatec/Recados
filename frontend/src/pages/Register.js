import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [nome,  setNome]  = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro,  setErro]  = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const { data } = await api.post('/register', {
        name:     nome,
        email,
        password: senha,
      });

      localStorage.setItem('token', data.token);
      navigate('/recados');

    } catch (err) {
      if (err.response?.status === 422) {
        const erros = err.response.data.errors;
        const primeira = Object.values(erros)[0][0];
        setErro(primeira);
      } else {
        setErro('Erro ao conectar com o servidor.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '0 1rem' }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label>Nome</label><br />
          <input type="text" value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Seu nome"
            style={{ width: '100%', padding: 8 }} required />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail</label><br />
          <input type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            style={{ width: '100%', padding: 8 }} required />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Senha</label><br />
          <input type="password" value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            style={{ width: '100%', padding: 8 }} required />
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p>Já tem conta? <Link to="/login">Entrar</Link></p>
    </div>
  );
}

export default Register;