import { useState } from 'react';

function RecadoItem({ recado, onEditar, onExcluir }) {
  const [editando, setEditando] = useState(false);
  const [editTitulo, setEditTitulo] = useState(recado.titulo);
  const [editTexto, setEditTexto] = useState(recado.texto);

  async function handleSalvar() {
    await onEditar(recado.id, { titulo: editTitulo, texto: editTexto });
    setEditando(false);
  }

  function handleCancelar() {
    setEditTitulo(recado.titulo);
    setEditTexto(recado.texto);
    setEditando(false);
  }

  if (editando) {
    return (
      <li style={{ background: '#f1f5f9', borderRadius: 6, padding: '12px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            value={editTitulo}
            onChange={e => setEditTitulo(e.target.value)}
            style={{ padding: '6px', fontSize: 14 }}
          />
          <textarea
            value={editTexto}
            onChange={e => setEditTexto(e.target.value)}
            rows={3}
            style={{ padding: '6px', fontSize: 14, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleSalvar} style={{ padding: '4px 14px' }}>Salvar</button>
            <button onClick={handleCancelar} style={{ padding: '4px 14px' }}>Cancelar</button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li style={{ background: '#f1f5f9', borderRadius: 6, padding: '12px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <strong>{recado.titulo}</strong>
          <p style={{ margin: '4px 0 0', color: '#555' }}>{recado.texto}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 12, flexShrink: 0 }}>
          <button onClick={() => setEditando(true)} style={{ padding: '4px 10px' }}>Editar</button>
          <button
            onClick={() => onExcluir(recado.id)}
            style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}
          >
            Excluir
          </button>
        </div>
      </div>
    </li>
  );
}

export default RecadoItem;