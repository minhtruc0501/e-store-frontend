'use client'
import { useState, useEffect } from 'react';

const API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/Categories';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', slug: '' });

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa danh mục này?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  const handleAddClick = () => {
    setFormData({ id: 0, name: '', slug: '' });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (category: any) => {
    setFormData({ id: category.id, name: category.name, slug: category.slug || '' });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${formData.id}` : API_URL;

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: formData.id, name: formData.name, slug: formData.slug })
    });
    setShowForm(false);
    fetchCategories(); 
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Danh mục</h1>
        <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Thêm Danh mục
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">Tên Danh mục</label>
            <input required type="text" className="w-full border p-2 rounded" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">Slug (Đường dẫn)</label>
            <input type="text" className="w-full border p-2 rounded" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} />
          </div>
          <div className="space-x-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Lưu</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Hủy</button>
          </div>
        </form>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Tên Danh mục</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any) => (
            <tr key={category.id} className="border-b hover:bg-gray-50">
              <td className="p-3">#{category.id}</td>
              <td className="p-3 font-medium">{category.name}</td>
              <td className="p-3 text-gray-500">{category.slug}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => handleEditClick(category)} className="text-blue-600 border border-blue-600 px-3 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(category.id)} className="text-red-600 border border-red-600 px-3 py-1 rounded">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}