// import React, { useState, createContext, useContext } from 'react';

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   const login = (username, password) => {
//     setUser({ username });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


// import React, { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   const login = (username, password) => {
//     if (username === 'abc' && password === '12345') {
//       setUser({ username });
//       setError(null);
//     } else {
//       setError('Tên đăng nhập hoặc mật khẩu không đúng!');
//       setUser(null);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setError(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Đăng nhập thất bại');
        setUser(null);
        return null;
      }

      setUser(data.user);
      setError(null);
      return data; // trả về dữ liệu để component Login xử lý tiếp
    } catch (err) {
      setError('Lỗi kết nối tới server');
      setUser(null);
      return null;
    }
  };

    const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
