// // import React, { useState } from 'react';

// // function Login() {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //     name: '',
// //   });

// //   const handleChange = e => {
// //     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleSubmit = e => {
// //     e.preventDefault();
// //     if (isLogin) {
// //       alert(`Đăng nhập với email: ${formData.email}`);
// //     } else {
// //       alert(`Đăng ký tài khoản: ${formData.name}`);
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-6 border rounded mt-12">
// //       <h1 className="text-3xl font-bold mb-6 text-center">
// //         {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
// //       </h1>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {!isLogin && (
// //           <div>
// //             <label className="block mb-1">Họ và tên</label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               required={!isLogin}
// //               className="w-full border rounded px-3 py-2"
// //             />
// //           </div>
// //         )}
// //         <div>
// //           <label className="block mb-1">Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //             className="w-full border rounded px-3 py-2"
// //           />
// //         </div>
// //         <div>
// //           <label className="block mb-1">Mật khẩu</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //             className="w-full border rounded px-3 py-2"
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
// //         >
// //           {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
// //         </button>
// //       </form>
// //       <div className="mt-4 text-center">
// //         <button
// //           className="text-blue-600 hover:underline"
// //           onClick={() => setIsLogin(!isLogin)}
// //         >
// //           {isLogin ? 'Bạn chưa có tài khoản? Đăng ký' : 'Bạn đã có tài khoản? Đăng nhập'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// import React, { useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);
//     navigate('/'); // hoặc chuyển về trang trước đó
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Đăng Nhập</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Tên đăng nhập"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           required
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="password"
//           placeholder="Mật khẩu"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           className="w-full border rounded px-3 py-2"
//         />
//         <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
//           Đăng Nhập
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, error } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);
//     if (username === 'abc' && password === '12345') {
//       navigate('/checkout');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Đăng Nhập</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Tên đăng nhập"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Mật khẩu"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         {error && <p className="text-red-600">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//         >
//           Đăng Nhập
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
    // if (email === 'abc' && password === '12345') {
    //   navigate('/checkout');
    // }

    try {
      const res = await login(email, password); // login trả về response JSON
      if (res && res.message === "Đăng nhập thành công") {
        navigate("/checkout");
      } else {
        alert("Sai email hoặc mật khẩu");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Đăng Nhập</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
        >
          Đăng Nhập
        </button>
      </form>

      <p className="mt-4 text-center">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </div>
  );
}

export default Login;
