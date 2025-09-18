import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
        if (!res.ok) throw new Error("Lỗi khi fetch sản phẩm");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Đang tải...</p>;
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Sản phẩm không tồn tại.</h2>
        <Link to="/" className="text-blue-500 hover:underline">Quay lại Trang chủ</Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      console.log("product",product);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: product.id, quantity: 1, price: product.price, product_name: product.name}),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm vào giỏ");
      // const msg = await res.text();
      alert("Thêm vào giỏ hảng thành công"); // "Thêm vào giỏ hàng thành công"
    } catch (error) {
      console.error(error);
      alert("Có lỗi khi thêm vào giỏ hàng!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-green-600 mb-4">${product.price}</p>
          <p className="mb-2"><strong>Danh mục:</strong> {product.category || "Chưa có"}</p>
          <p className="mb-2"><strong>Tồn kho:</strong> {product.stock > 0 ? `${product.stock} cái` : 'Hết hàng'}</p>
          <p className="mb-4"><strong>Mô tả:</strong> {product.description}</p>

          {product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Thêm vào giỏ hàng
            </button>
          ) : (
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Hết hàng
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:underline">← Quay lại Trang chủ</Link>
      </div>
    </div>
  );
};

export default ProductDetails;

