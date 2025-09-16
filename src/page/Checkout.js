import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'cod',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Xác nhận đơn hàng thành công!");
    try {
      const res = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          address: formData.address,
          phone: formData.phone,
          payment_method: formData.paymentMethod,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Đơn hàng đã được xác nhận!');
        navigate('/profile'); // hoặc chuyển đến trang cảm ơn
      } else {
        alert('❌ Lỗi khi xác nhận đơn hàng: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Có lỗi xảy ra, vui lòng thử lại.');
    }
    navigate('/profile');
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thanh Toán</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Họ tên</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Địa chỉ giao hàng</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Phương thức thanh toán</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="cod">Thanh toán khi nhận hàng</option>
            <option value="card">Thẻ tín dụng / thẻ ghi nợ</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Xác nhận đơn hàng
        </button>
      </form>
    </div>
  );
}

export default Checkout;
