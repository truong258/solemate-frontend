import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useContext(AuthContext);

//   if (!isAuthenticated) {
//     // Nếu chưa đăng nhập, chuyển hướng về trang login
//     return <Navigate to="/login" replace />;
//   }

//   // Nếu đã đăng nhập thì render component con
//   return children;
// }

// export default ProtectedRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập thì render component con
  return children;
}

export default ProtectedRoute;

