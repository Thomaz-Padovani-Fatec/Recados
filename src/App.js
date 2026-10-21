// Instale as dependências antes:
// npm install

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login   from './pages/Login';
import Recados from './pages/Recados';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz → redireciona para /recados */}
        <Route path="/" element={<Navigate to="/recados" replace />} />

        {/* Rota pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rota protegida — só acessa se tiver token */}
        <Route
          path="/recados"
          element={
            <PrivateRoute>
              <Recados />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
