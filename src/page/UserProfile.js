import React, { useEffect } from 'react'; // Thêm useEffect
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sử dụng useEffect để theo dõi sự thay đổi của user
  useEffect(() => {
    // Nếu user không còn tồn tại, điều hướng về trang chủ
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]); // user và navigate là dependencies của useEffect

  const handleLogout = async  () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/cart`, { method: 'DELETE' });
      logout();
    }
    catch(err){
      console.error('Lỗi khi xóa cart:', err);
      logout();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin người dùng</h1>
      {/* Kiểm tra user trước khi hiển thị để tránh lỗi */}
      {user && (
        <>
          <p><strong>Họ tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
      >
        Đăng Xuất
      </button>
    </div>
  );
}

export default UserProfile;

