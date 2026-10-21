import React, { useState, useEffect } from 'react';

export default function EventosHoje() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarEventos() {
      const url = 'https://nookipedia.com';
      const apiKey = import.meta.env.VITE_NOOKIPEDIA_KEY;
      //const apiKey = process.env.REACT_APP_NOOKIPEDIA_KEY;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-API-KEY': apiKey,
            'Accept-Version': '1.7.0'
          }
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const dados = await response.json();
        
        const hoje = new Date().toISOString().split('T')[0];
        
        const eventosDeHoje = dados.filter(evento => {
          return hoje >= evento.start_date && hoje <= evento.end_date;
        });

        setEventos(eventosDeHoje);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarEventos();
  }, []);

  if (carregando) return <p>Carregando eventos de hoje...</p>;
  if (erro) return <p style={{ color: 'red' }}>Ocorreu um erro: {erro}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>📅 Eventos de Hoje no Animal Crossing</h2>
      {eventos.length === 0 ? (
        <p>Nenhum evento especial agendado para hoje!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {eventos.map((evento, index) => (
            <li 
              key={index} 
              style={{ 
                background: '#f0fdf4', 
                border: '1px solid #bbf7d0', 
                borderRadius: '8px', 
                padding: '15px', 
                marginBottom: '10px' 
              }}
            >
              <h3 style={{ margin: '0 0 5px 0', color: '#166534' }}>{evento.event}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                ℹ️ {evento.type} | Fica ativo até: {evento.end_date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
