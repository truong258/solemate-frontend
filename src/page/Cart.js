// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // import useNavigate

// const initialCart = [
//   { id: 1, name: "Áo Thun", price: 200000, quantity: 2 },
//   { id: 2, name: "Quần Jean", price: 350000, quantity: 1 },
// ];

// function Cart() {
//   const [cartItems, setCartItems] = useState(initialCart);
//   const navigate = useNavigate();  // khai báo navigate

//   const updateQuantity = (id, quantity) => {
//     setCartItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, quantity: quantity < 1 ? 1 : quantity } : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems(items => items.filter(item => item.id !== id));
//   };

//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Giỏ hàng đang trống!");
//       return;
//     }
//     // Chuyển sang trang checkout
//     navigate('/checkout');
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Giỏ Hàng</h1>
//       {cartItems.length === 0 ? (
//         <p>Giỏ hàng của bạn đang trống.</p>
//       ) : (
//         <>
//           <table className="w-full mb-6 border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 p-2 text-left">Sản phẩm</th>
//                 <th className="border border-gray-300 p-2">Giá</th>
//                 <th className="border border-gray-300 p-2">Số lượng</th>
//                 <th className="border border-gray-300 p-2">Thao tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map(item => (
//                 <tr key={item.id} className="border border-gray-300">
//                   <td className="p-2">{item.name}</td>
//                   <td className="p-2 text-center">{item.price.toLocaleString()}₫</td>
//                   <td className="p-2 text-center">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                       className="w-16 text-center border rounded"
//                     />
//                   </td>
//                   <td className="p-2 text-center">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Xóa
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="text-right font-bold text-xl mb-4">
//             Tổng tiền: {totalPrice.toLocaleString()}₫
//           </div>
//           <button
//             onClick={handleCheckout}  // đổi thành hàm handleCheckout
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
//           >
//             Thanh Toán
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cart`)
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error("Lỗi tải giỏ hàng:", err));
  }, []);



  const removeItem = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/${id}`, { method: "DELETE" })
      .then(() => setCartItems(items => items.filter(item => item.id !== id)))
      .catch(err => console.error(err));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Giỏ Hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <table className="w-full mb-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Sản phẩm</th>
                <th className="border border-gray-300 p-2">Giá</th>
                <th className="border border-gray-300 p-2">Số lượng</th>
                <th className="border border-gray-300 p-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id} className="border border-gray-300">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{item.price}₫</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right font-bold text-xl mb-4">
            Tổng tiền: {totalPrice.toLocaleString()}₫
          </div>
          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Thanh Toán
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;

