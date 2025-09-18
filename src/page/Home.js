import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  // Fetch products từ backend khi component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        if (!res.ok) throw new Error('Lỗi tải sản phẩm');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setProducts([]); // hoặc show thông báo lỗi
      }
    }
    fetchProducts();
  }, []);

  // Filter products dựa vào search và category
  const filteredProducts = products.filter(product => {
    const matchCategory = categoryFilter === 'All' || product.category === categoryFilter;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">

        <button

          onClick={() => navigate('/add-product')}

          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"

        >

          Thêm mặt hàng

        </button>

      </div>
      {/* Header và bộ lọc tìm kiếm */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/3"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-1/4"
        >
          <option value="All">Tất cả</option>
          <option value="Category1">Category1</option>
          <option value="Category2">Category2</option>
          {/* Thêm các category bạn có */}
        </select>
      </div>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <img
                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
              <p className="text-indigo-600 font-bold text-xl mb-2">${product.price}</p>
              <p className="text-gray-500 uppercase tracking-wide mb-4">{product.category}</p>
              <div className="mt-auto flex justify-between items-center">
                <button
                  onClick={() => {
                    // Bạn có thể thêm logic thêm vào giỏ hàng ở đây
                    navigate('/cart');
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="text-indigo-600 hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-10 flex justify-center space-x-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${currentPage === i + 1
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Home;


