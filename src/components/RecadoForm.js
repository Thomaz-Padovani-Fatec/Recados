import { useState } from 'react';

function RecadoForm({ onCriar }) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim() || !texto.trim()) return;

    setSalvando(true);

    await onCriar({ titulo, texto });

    setTitulo('');
    setTexto('');
    setSalvando(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '2rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '12px',
        padding: '1.25rem'
      }}
    >
      <h2 style={{ margin: 0, fontSize: '1rem' }}>Novo recado</h2>
      <input
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título"
        style={{ padding: '8px', fontSize: 14 }}
        required
      />
      <textarea
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Texto do recado..."
        rows={3}
        style={{ padding: '8px', fontSize: 14, resize: 'vertical' }}
        required
      />
      <button type="submit" disabled={salvando} style={{ alignSelf: 'flex-start', padding: '8px 20px' }}>
        {salvando ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
}

export default RecadoForm;