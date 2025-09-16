// import React, { useState } from 'react';

// function UserProfile() {
//   const [profile, setProfile] = useState({
//     name: 'Nguyễn Văn A',
//     email: 'nguyenvana@example.com',
//     phone: '0123456789',
//   });

//   const [orders] = useState([
//     { id: 1, date: '2023-09-01', total: 450000, status: 'Đã giao' },
//     { id: 2, date: '2023-09-10', total: 200000, status: 'Đang xử lý' },
//   ]);

//   const handleChange = e => {
//     setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSave = e => {
//     e.preventDefault();
//     alert("Lưu thông tin cá nhân thành công!");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Hồ Sơ Người Dùng</h1>
//       <form onSubmit={handleSave} className="space-y-4 mb-8">
//         <div>
//           <label className="block mb-1">Họ và tên</label>
//           <input
//             type="text"
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Số điện thoại</label>
//           <input
//             type="tel"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//         >
//           Lưu thông tin
//         </button>
//       </form>

//       <h2 className="text-2xl font-semibold mb-4">Đơn hàng đã đặt</h2>
//       {orders.length === 0 ? (
//         <p>Bạn chưa có đơn hàng nào.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2">Mã đơn hàng</th>
//               <th className="border border-gray-300 p-2">Ngày đặt</th>
//               <th className="border border-gray-300 p-2">Tổng tiền</th>
//               <th className="border border-gray-300 p-2">Trạng thái</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id} className="border border-gray-300">
//                 <td className="p-2 text-center">{order.id}</td>
//                 <td className="p-2 text-center">{order.date}</td>
//                 <td className="p-2 text-center">{order.total.toLocaleString()}₫</td>
//                 <td className="p-2 text-center">{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default UserProfile;

import React from 'react';
import { useAuth } from '../AuthContext';

function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin người dùng</h1>
      <p><strong>Họ tên:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
      >
        Đăng Xuất
      </button>
    </div>
  );
}

export default UserProfile;

