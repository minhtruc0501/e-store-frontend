'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft, Plus, Minus, ShoppingBag, CreditCard, Banknote } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  
  // THÊM STATE: Quản lý phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState('COD'); 
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartWithMinQty = savedCart.map((item: any) => ({
        ...item,
        quantity: item.quantity > 0 ? item.quantity : 1
    }));
    setCartItems(cartWithMinQty);
  }, []);

  const updateCartAndLocalStorage = (updatedCart: any[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQuantityChange = (indexToUpdate: number, delta: number) => {
    const updatedCart = cartItems.map((item, index) => {
      if (index === indexToUpdate) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    updateCartAndLocalStorage(updatedCart);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    if(!confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) return;
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    updateCartAndLocalStorage(updatedCart);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 0 ? 0 : 0; 
  const tax = subtotal * 0.1; 
  const totalAmount = subtotal + shippingFee + tax;

  const handleCheckout = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert("Bạn cần đăng nhập để thanh toán!");
      router.push('/login');
      return;
    }

    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    setIsProcessing(true);
    const user = JSON.parse(userStr);

    const payload = {
      userId: user.userId,
      orderDate: new Date().toISOString(),
      address: address,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod, // ĐÃ THÊM: Gửi phương thức thanh toán xuống Backend
      status: 'Chờ xác nhận', // ĐÃ THÊM: Trạng thái mặc định khi mới đặt hàng
      orderDetails: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://qlbh-thaiminhtruc.onrender.com/api/Orders/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Đặt hàng thành công! Cảm ơn bạn.");
        localStorage.removeItem('cart'); 
        updateCartAndLocalStorage([]); 
        router.push('/'); 
      } else {
        const errText = await res.text();
        console.error("Lỗi đặt hàng:", errText);
        alert(`Thanh toán thất bại: ${res.status}. Vui lòng kiểm tra Console F12.`);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <ShoppingBag size={64} className="text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Giỏ hàng của bạn đang trống</h2>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Giỏ hàng của bạn</h1>
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm transition-all hover:shadow">
              <ArrowLeft size={18} className="mr-2" /> Tiếp tục mua sắm
            </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center py-6 border-b border-slate-100 last:border-0 gap-4 sm:gap-6">
                <div 
                  className="bg-white border border-slate-200 rounded-2xl p-2 flex items-center justify-center overflow-hidden shrink-0 shadow-sm"
                  style={{ minWidth: '100px', maxWidth: '100px', height: '100px' }}
                >
                  <img src={item.image || '/placeholder.jpg'} alt="img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{item.productName}</h3>
                  <p className="text-blue-600 font-semibold">{item.price.toLocaleString('vi-VN')} ₫</p>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden shadow-inner">
                      <button onClick={() => handleQuantityChange(index, -1)} className="text-slate-500 hover:bg-slate-200 p-2 sm:p-3 transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="text-sm font-bold text-slate-800 w-8 sm:w-10 text-center select-none">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(index, 1)} className="text-slate-500 hover:bg-slate-200 p-2 sm:p-3 transition-colors">
                        <Plus size={16} />
                      </button>
                  </div>
                  <button onClick={() => handleRemoveItem(index)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-full transition-colors" title="Xóa">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/3 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Tổng quan đơn hàng</h2>
            
            <div className="space-y-4 mb-6 border-b border-slate-100 pb-6">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí giao hàng:</span>
                <span className="text-green-500 font-medium">Miễn phí</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Thuế (10%):</span>
                <span>{tax.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-5 border-t border-slate-100">
                <span>Tổng cộng:</span>
                <span className="text-red-500">{totalAmount.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2.5">Địa chỉ giao hàng chi tiết</label>
              <textarea 
                rows={3} required placeholder="Ví dụ: Số 2 Phố Lê Duẩn, Quận 1..."
                className="w-full border border-slate-200 p-4 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-inner"
                value={address} onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* GIAO DIỆN CHỌN PHƯƠNG THỨC THANH TOÁN */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2.5">Phương thức thanh toán</label>
              <div className="space-y-3">
                <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                  <Banknote className={`mr-3 ${paymentMethod === 'COD' ? 'text-blue-600' : 'text-slate-400'}`} size={20} />
                  <span className={`font-medium ${paymentMethod === 'COD' ? 'text-blue-700' : 'text-slate-600'}`}>Thanh toán khi nhận hàng (COD)</span>
                </label>
                
                <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'BANK' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input type="radio" name="payment" value="BANK" checked={paymentMethod === 'BANK'} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                  <CreditCard className={`mr-3 ${paymentMethod === 'BANK' ? 'text-blue-600' : 'text-slate-400'}`} size={20} />
                  <span className={`font-medium ${paymentMethod === 'BANK' ? 'text-blue-700' : 'text-slate-600'}`}>Chuyển khoản ngân hàng</span>
                </label>
              </div>
            </div>

            <Button 
              onClick={handleCheckout} disabled={isProcessing}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {isProcessing ? "Đang xử lý..." : "Tiến hành Thanh toán"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}