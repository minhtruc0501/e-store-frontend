'use client'
import { useState, useEffect } from 'react';

const API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/Brand';

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State quản lý Form Thêm/Sửa
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ brandId: 0, brandName: '' });

  // Lấy dữ liệu
  const fetchBrands = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBrands(data);
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchBrands(); }, []);

  // Xử lý XÓA
  const handleDelete = async (id: number) => {
    if (!confirm("Xóa thương hiệu này?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchBrands();
  };

  // Mở form THÊM
  const handleAddClick = () => {
    setFormData({ brandId: 0, brandName: '' });
    setIsEditing(false);
    setShowForm(true);
  };

  // Mở form SỬA
  const handleEditClick = (brand: any) => {
    setFormData({ brandId: brand.brandId, brandName: brand.brandName });
    setIsEditing(true);
    setShowForm(true);
  };

  // Xử lý LƯU (vừa dùng cho Thêm, vừa dùng cho Sửa)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${formData.brandId}` : API_URL;

    // Phải map đúng tên field backend cần
    const payload = { 
      brandId: formData.brandId, 
      brandName: formData.brandName 
    };

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    setShowForm(false);
    fetchBrands(); // Tải lại bảng
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Thương hiệu</h1>
        <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Thêm Thương Hiệu
        </button>
      </div>

      {/* HIỂN THỊ FORM NẾU showForm = true */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">Tên Thương Hiệu</label>
            <input 
              required
              type="text" 
              className="w-full border p-2 rounded"
              value={formData.brandName}
              onChange={(e) => setFormData({...formData, brandName: e.target.value})}
            />
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
            <th className="p-3">Tên Thương Hiệu</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand: any) => (
            <tr key={brand.brandId} className="border-b hover:bg-gray-50">
              <td className="p-3">#{brand.brandId}</td>
              <td className="p-3">{brand.brandName}</td>
              <td className="p-3 space-x-2">
                <button onClick={() => handleEditClick(brand)} className="text-blue-600 border border-blue-600 px-3 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(brand.brandId)} className="text-red-600 border border-red-600 px-3 py-1 rounded">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}