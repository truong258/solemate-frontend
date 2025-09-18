import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

 

const AddProduct = () => {

  const [product, setProduct] = useState({

    name: '',

    description: '',

    price: '',
    stock:'',

    category: '',

    image: ''

  });

 

  const navigate = useNavigate();

 

  const handleChange = (e) => {

    setProduct({ ...product, [e.target.name]: e.target.value });

  };

 

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(`/products`, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(product)

      });

      if (!res.ok) throw new Error('Lỗi khi thêm sản phẩm');

      navigate('/'); // quay về trang chủ

    } catch (error) {

      console.error(error);

    }

  };

 

  return (

    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">

      <h2 className="text-2xl font-bold mb-4">Thêm mặt hàng mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Tên sản phẩm" onChange={handleChange} className="w-full p-2 border rounded" required />

        <input name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />

        <input name="price" type="number" placeholder="Giá" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="w-full p-2 border rounded" required />

        <input name="category" placeholder="Thể loại" onChange={handleChange} className="w-full p-2 border rounded" required />

        <input name="image" placeholder="URL hình ảnh" onChange={handleChange} className="w-full p-2 border rounded" />

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Thêm</button>

      </form>

    </div>

  );

};

 

export default AddProduct;