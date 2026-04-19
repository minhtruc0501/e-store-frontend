'use client'
import { useState, useEffect } from 'react';
import withAuth from '@/components/withAuth';

const API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/Product';
const BRAND_API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/Brand';
const CATEGORY_API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/Categories';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(''); 
  
  const [formData, setFormData] = useState({ 
    productId: 0, productName: '', price: 0, priceSale: 0, image: '', 
    brandId: '', categoryId: '', content: '', userId: 1
  });

  const fetchData = async () => {
    try {
      const [resProducts, resBrands, resCategories] = await Promise.all([
        fetch(API_URL), fetch(BRAND_API_URL), fetch(CATEGORY_API_URL)
      ]);
      setProducts(await resProducts.json());
      setBrands(await resBrands.json());
      setCategories(await resCategories.json());
    } catch (error) { 
      console.error(error); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleAddClick = () => {
    setFormData({ 
      productId: 0, productName: '', price: 0, priceSale: 0, image: '', 
      brandId: '', categoryId: '', content: '', userId: 1
    });
    setImagePreview('');
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (product: any) => {
    setFormData({ 
      productId: product.productId, 
      productName: product.productName,
      price: product.price,
      priceSale: product.priceSale || 0,
      image: product.image || '',
      brandId: product.brandId || '',
      categoryId: product.categoryId || '',
      content: product.content || '',
      userId: product.userId || 1
    });
    setImagePreview(product.image || '');
    setIsEditing(true);
    setShowForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const imagePath = `/images/products/${file.name}`;
      setFormData({ ...formData, image: imagePath });
    }
  };

  // ĐÃ SỬA LẠI HÀM NÀY: Khai báo payload TRƯỚC, gọi fetch SAU
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL}/${formData.productId}` : API_URL;
    const token = localStorage.getItem('token');

    // 1. TẠO GÓI HÀNG (PAYLOAD) TRƯỚC TIÊN
    const payload = { 
      productId: formData.productId, 
      productName: formData.productName,
      price: Number(formData.price),
      priceSale: Number(formData.priceSale || 0),
      image: formData.image || "",
      content: formData.content || "",
      brandId: formData.brandId ? Number(formData.brandId) : 1, 
      categoryId: formData.categoryId ? Number(formData.categoryId) : 1,
      userId: 1 
    };

    // Bổ sung ngày tháng nếu là THÊM MỚI (POST)
    if (!isEditing) {
      Object.assign(payload, {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    // 2. GỬI GÓI HÀNG ĐI
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Bỏ token vào đúng chỗ này
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Lỗi từ ASP.NET:", errorText);
        alert(`Lỗi lưu dữ liệu: ${response.status}\nĐã in chi tiết lỗi vào Console (F12).`);
        return; 
      }
      
      setShowForm(false);
      fetchData(); 
    } catch (err) {
      console.error("Lỗi kết nối mạng hoặc CORS:", err);
    }
  };

  if (isLoading) return <div>Đang tải hệ thống...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Sản phẩm</h1>
        <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Thêm Sản phẩm
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block mb-1 text-sm font-medium">Tên Sản phẩm</label>
              <input required type="text" className="w-full border p-2 rounded" value={formData.productName} onChange={(e) => setFormData({...formData, productName: e.target.value})} />
            </div>
            <div className="w-32">
              <label className="block mb-1 text-sm font-medium">Giá bán</label>
              <input required type="number" className="w-full border p-2 rounded" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
            </div>
            
            <div className="flex-1 min-w-[250px]">
              <label className="block mb-1 text-sm font-medium">Hình ảnh sản phẩm</label>
              <div className="flex items-center gap-3 border p-2 rounded bg-white">
                <div className="w-12 h-12 bg-slate-100 border rounded flex items-center justify-center overflow-hidden shrink-0">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-slate-400 text-center">No Image</span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <input 
                    type="file" accept="image/*" onChange={handleFileChange}
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 cursor-pointer"
                  />
                  {formData.image && <p className="mt-1 text-[11px] text-green-600 truncate">Lưu thành: {formData.image}</p>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block mb-1 text-sm font-medium">Danh mục</label>
              <select required className="w-full border p-2 rounded bg-white" value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}>
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block mb-1 text-sm font-medium">Thương hiệu</label>
              <select required className="w-full border p-2 rounded bg-white" value={formData.brandId} onChange={(e) => setFormData({...formData, brandId: e.target.value})}>
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map((b: any) => (
                  <option key={b.brandId} value={b.brandId}>{b.brandName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm font-medium">Mô tả chi tiết</label>
            <textarea rows={3} className="w-full border p-2 rounded" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
          </div>

          <div className="space-x-2 flex justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Hủy</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Lưu Sản Phẩm</button>
          </div>
        </form>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Ảnh</th>
            <th className="p-3">Tên Sản phẩm</th>
            <th className="p-3">Danh mục</th>
            <th className="p-3">Thương hiệu</th>
            <th className="p-3">Giá</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.productId} className="border-b hover:bg-gray-50">
              <td className="p-3">#{product.productId}</td>
              <td className="p-3">
                {product.image && <img src={product.image} alt="img" className="w-10 h-10 object-cover rounded border bg-white" />}
              </td>
              <td className="p-3 font-medium">{product.productName}</td>
              <td className="p-3 text-sm text-gray-500">{product.category?.name || 'N/A'}</td>
              <td className="p-3 text-sm text-gray-500">{product.brand?.brandName || 'N/A'}</td>
              <td className="p-3 text-red-500 font-medium">{product.price?.toLocaleString()} đ</td>
              <td className="p-3 space-x-2">
                <button onClick={() => handleEditClick(product)} className="text-blue-600 border border-blue-600 px-3 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(product.productId)} className="text-red-600 border border-red-600 px-3 py-1 rounded">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// LƯU Ý CHO BẠN: 
// Vì chúng ta đã có file `AdminGuard` canh cửa ở ngoài `app/admin/layout.tsx` rồi, 
// nên nếu code chạy lỗi liên quan đến file withAuth, bạn có thể tự tin xóa dòng này 
// và chỉ cần export default ProductManagement; nhé!
export default withAuth(ProductManagement, 'Admin');