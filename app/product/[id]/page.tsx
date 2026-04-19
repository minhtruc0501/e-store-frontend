'use client'
import { useState, useEffect, use } from 'react'; 
import { ShoppingCart, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

// Định nghĩa params là một Promise
export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // BẮT BUỘC: Dùng React.use() để "mở gói" (unwrap) params trong Next.js 15
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Thay params.id bằng productId
    fetch(`https://qlbh-thaiminhtruc.onrender.com/api/Product/${productId}`)
      .then(res => res.json())
      .then(data => { setProduct(data); setIsLoading(false); })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, [productId]); 

  // HÀM XỬ LÝ: THÊM VÀO GIỎ HÀNG
  const handleAddToCart = () => {
    // 1. Lấy giỏ hàng hiện tại từ LocalStorage (nếu chưa có thì tạo mảng rỗng)
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // 2. Kiểm tra xem sản phẩm này đã có trong giỏ chưa
    const existingItemIndex = currentCart.findIndex((item: any) => item.productId === product.productId);

    if (existingItemIndex > -1) {
      // Nếu có rồi thì tăng số lượng
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // Nếu chưa có thì thêm mới vào
      currentCart.push({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    // 3. Lưu lại vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center">Đang tải sản phẩm...</div>;
  if (!product) return <div className="min-h-screen flex justify-center items-center">Không tìm thấy sản phẩm!</div>;

  return (
    
    <div className="bg-slate-50 min-h-screen py-10">
      <Navbar />
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
          <ArrowLeft size={20} className="mr-2" /> Quay lại cửa hàng
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            {/* Cột trái: Hình ảnh */}
            <div className="md:w-1/2 p-8 md:p-12 bg-slate-100 flex justify-center items-center">
              {product.image ? (
                <img src={product.image} alt={product.productName} className="max-w-full h-auto rounded-xl drop-shadow-xl" />
              ) : (
                <div className="w-full h-96 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">Chưa có hình ảnh</div>
              )}
            </div>

            {/* Cột phải: Thông tin */}
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="mb-2 flex items-center space-x-2">
                <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full">{product.brand?.brandName || 'Apple'}</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">{product.category?.name || 'Điện thoại'}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.productName}</h1>
              <p className="text-4xl font-bold text-red-500 mb-6">{product.price?.toLocaleString('vi-VN')} ₫</p>
              
              <div className="prose prose-slate mb-8">
                <p className="text-slate-600 leading-relaxed">
                  {product.content || 'Mô tả sản phẩm đang được cập nhật. Cấu hình mạnh mẽ, thiết kế sang trọng đẳng cấp.'}
                </p>
              </div>

              <div className="space-y-4 mb-8 border-y border-slate-100 py-6">
                <div className="flex items-center text-slate-600">
                  <ShieldCheck className="text-green-500 mr-3" /> Cam kết hàng chính hãng 100%
                </div>
                <div className="flex items-center text-slate-600">
                  <Truck className="text-blue-500 mr-3" /> Miễn phí giao hàng toàn quốc
                </div>
              </div>

              {/* Đã thêm sự kiện onClick={handleAddToCart} vào đây */}
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center"
              >
                <ShoppingCart className="mr-2" /> Thêm vào Giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}