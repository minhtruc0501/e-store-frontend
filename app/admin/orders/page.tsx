'use client'
import { useState, useEffect } from 'react';

const API_URL = 'https://qlbh-thaiminhtruc.onrender.com/api/Orders';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setOrders(data);
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa/Hủy đơn hàng này?")) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchOrders();
  };

  // HÀM MỚI: Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      // Tìm order cũ để lấy data gửi kèm (Vì lệnh PUT thường yêu cầu gửi nguyên object)
      const targetOrder = orders.find((o: any) => o.orderId === orderId) as any;
      if(!targetOrder) return;

      const payload = { ...targetOrder, status: newStatus }; // Gắn status mới vào

      const res = await fetch(`${API_URL}/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if(res.ok) {
        alert("Đã cập nhật trạng thái đơn hàng!");
        fetchOrders(); // Tải lại danh sách
      } else {
        console.error("Lỗi cập nhật trạng thái:", await res.text());
        alert("Backend chưa hỗ trợ trường Status. Vui lòng thêm cột OrderStatus vào bảng Orders trong C#!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Helper để tô màu chữ cho từng trạng thái
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Đã xác nhận': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Đang giao': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Hoàn thành': return 'text-green-600 bg-green-50 border-green-200';
      case 'Đã hủy': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200'; // Chờ xác nhận
    }
  };

  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      <h1 className="text-2xl font-bold mb-6">Quản lý Đơn hàng</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Mã Đơn</th>
            <th className="p-3">Ngày đặt</th>
            <th className="p-3">Địa chỉ giao</th>
            <th className="p-3">Tổng tiền</th>
            <th className="p-3 text-center">Trạng thái</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => {
            const currentStatus = order.status || 'Chờ xác nhận';
            return (
              <tr key={order.orderId} className="border-b hover:bg-gray-50">
                <td className="p-3 font-bold text-blue-600">#{order.orderId}</td>
                <td className="p-3">{new Date(order.orderDate).toLocaleString('vi-VN')}</td>
                <td className="p-3">
                  <p className="line-clamp-2 max-w-xs">{order.address}</p>
                </td>
                <td className="p-3 font-medium text-red-500">
                  {order.totalAmount?.toLocaleString('vi-VN')} đ
                </td>
                
                {/* CỘT TRẠNG THÁI MỚI */}
                <td className="p-3 text-center">
                  <select 
                    value={currentStatus}
                    onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border outline-none cursor-pointer ${getStatusColor(currentStatus)}`}
                  >
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>

                <td className="p-3 space-x-2">
                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    Chi tiết
                  </button>
                  <button 
                    onClick={() => handleDelete(order.orderId)} 
                    className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    Hủy/Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* CỬA SỔ MODAL: CHI TIẾT ĐƠN HÀNG */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                Chi tiết đơn hàng #{selectedOrder.orderId}
                <span className={`ml-4 px-3 py-1 text-sm rounded-full font-medium border ${getStatusColor(selectedOrder.status || 'Chờ xác nhận')}`}>
                  {selectedOrder.status || 'Chờ xác nhận'}
                </span>
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-red-500 font-bold text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="mb-8 grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div><span className="text-slate-500 block mb-1">Ngày đặt:</span><span className="font-medium text-slate-900">{new Date(selectedOrder.orderDate).toLocaleString('vi-VN')}</span></div>
                <div><span className="text-slate-500 block mb-1">Tổng tiền:</span><span className="font-bold text-red-500 text-base">{selectedOrder.totalAmount?.toLocaleString('vi-VN')} ₫</span></div>
                <div><span className="text-slate-500 block mb-1">Thanh toán:</span><span className="font-medium text-slate-900">{selectedOrder.paymentMethod === 'BANK' ? 'Chuyển khoản' : 'Thanh toán COD'}</span></div>
                <div className="col-span-2"><span className="text-slate-500 block mb-1">Địa chỉ giao hàng:</span><span className="font-medium text-slate-900">{selectedOrder.address}</span></div>
              </div>

              <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-blue-600 w-1 h-5 rounded-full mr-2"></span>
                Sản phẩm đã mua
              </h3>
              
              {selectedOrder.orderDetails && selectedOrder.orderDetails.length > 0 ? (
                <ul className="space-y-3">
                  {selectedOrder.orderDetails.map((detail: any, idx: number) => (
                    <li key={idx} className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                      
                      <div className="flex items-center gap-4">
                        <div 
                          className="bg-slate-50 border border-slate-200 rounded-lg p-1 flex justify-center items-center overflow-hidden shrink-0"
                          style={{ minWidth: '60px', maxWidth: '60px', height: '60px' }}
                        >
                            <img src={detail.productImage || '/placeholder.jpg'} alt="img" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-base">{detail.productName || `Mã SP: #${detail.productId}`}</span>
                          <span className="text-sm text-slate-500 mt-1">Đơn giá: {detail.unitPrice?.toLocaleString('vi-VN')} ₫</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <span className="text-slate-400 text-sm mr-2 hidden sm:inline">Số lượng:</span>
                        <span className="font-bold text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full text-lg border border-blue-100">
                          {detail.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 dashed">
                  <p className="text-slate-500 italic">Không tìm thấy chi tiết sản phẩm.</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 flex justify-end bg-white">
              <button onClick={() => setSelectedOrder(null)} className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}