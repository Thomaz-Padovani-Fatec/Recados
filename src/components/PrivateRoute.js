// Componente que protege rotas — redireciona para /login
// se não houver token salvo no localStorage.
//
// Uso no App.js:
//   <Route path="/recados" element={
//     <PrivateRoute>
//       <Recados />
//     </PrivateRoute>
//   } />

import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Se não tem token → redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tem token → renderiza o componente filho normalmente
  return children;
}

export default PrivateRoute;
