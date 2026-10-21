// Arquivo: src/pages/Recados.js
// Versão completa com listagem, criação e exclusão

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RecadoForm from '../components/RecadoForm';
import RecadoItem from '../components/RecadoItem';

function Recados() {
  const [recados, setRecados]       = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro]             = useState('');

  const navigate = useNavigate();

  // Busca os recados ao montar o componente ([] = só uma vez)
  useEffect(() => {
    async function buscar() {
      try {
        const { data } = await api.get('/recados');
        setRecados(data);
      } catch (err) {
        if (err.response?.status === 401) {
          // Token inválido ou expirado → volta pro login
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setErro('Erro ao carregar os recados.');
        }
      } finally {
        setCarregando(false);
      }
    }

    buscar();
  }, [navigate]);

  // Criar novo recado
  async function handleCriar(campos) {
    try {
      const { data } = await api.post('/recados', campos);
      setRecados(prev => [data, ...prev]);
    } catch (err) {
      setErro('Erro ao salvar o recado.');
    }
  }

  // Excluir recado
  async function handleExcluir(id) {
    if (!window.confirm('Excluir este recado?')) return;
    try {
      await api.delete(`/recados/${id}`);
      setRecados(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setErro('Erro ao excluir o recado.');
    }
  }

  // Editar recado
  async function handleEditar(id, campos) {
    try {
      await api.put(`/recados/${id}`, campos);
      setRecados(prev => prev.map(r => r.id === id ? { ...r, ...campos } : r));
    } catch (err) {
      setErro('Erro ao editar o recado.');
    }
  }

  function logout() {
    // Remove o token do navegador e volta pro login
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (carregando) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Meus Recados</h1>
        <button onClick={logout}>Sair</button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <RecadoForm onCriar={handleCriar} />

      {recados.length === 0 ? (
        <p style={{ color: '#888' }}>Nenhum recado ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {recados.map(r => (
            <RecadoItem
              key={r.id}
              recado={r}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recados;
