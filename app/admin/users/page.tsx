'use client'
import { useState, useEffect } from 'react';

const API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/User';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa tài khoản người dùng này?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Quản lý Người dùng</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Tên đăng nhập</th>
            <th className="p-3">Email</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.userId} className="border-b hover:bg-gray-50">
              <td className="p-3">#{user.userId}</td>
              <td className="p-3 font-medium">{user.userName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <button onClick={() => handleDelete(user.userId)} className="text-red-600 border border-red-600 px-3 py-1 rounded">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}