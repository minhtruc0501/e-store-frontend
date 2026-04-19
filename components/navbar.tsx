"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Apple, User, LogOut, Settings, ShoppingCart } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)

  // Kiểm tra trạng thái đăng nhập & số lượng giỏ hàng khi component mount
  useEffect(() => {
    // 1. Lấy thông tin user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Lỗi đọc dữ liệu user", e);
      }
    }

    // 2. Lấy số lượng giỏ hàng
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // Tính tổng số lượng các item trong giỏ
        const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);
        setCartCount(totalItems);
      } catch (e) {
        console.error("Lỗi đọc giỏ hàng", e);
      }
    };

    updateCartCount();

    // Lắng nghe sự kiện thay đổi localStorage (khi thêm vào giỏ hàng ở tab/trang khác)
    window.addEventListener('storage', updateCartCount);
    
    // Custom event để bắt sự kiện thêm giỏ hàng ngay trong cùng một trang
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // Về trang chủ sau khi đăng xuất
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center">
            <Apple size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            E-Store
          </span>
        </Link>

        {/* Desktop Navigation - Menu chính */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#brands" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Thương hiệu</Link>
          <Link href="#categories" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Danh Mục</Link>
          <Link href="#products" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Sản phẩm</Link>
          
          {/* Chỉ Admin mới thấy link Trang quản lý ở menu chính */}
          {user?.role === 'Admin' && (
            <Link href="/admin/products" className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-700">
              <Settings size={14} className="mr-1" /> Quản lý
            </Link>
          )}
        </div>

        {/* Right Side: Auth & Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* ICON GIỎ HÀNG */}
          <Link href="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors mr-2">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 bg-slate-50 p-1 pr-4 rounded-full border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <User size={16} />
              </div>
              <span className="text-sm font-semibold text-slate-700">{user.userName}</span>
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Đăng xuất"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 font-medium">Đăng nhập</Button>
              </Link>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6">
                Mua sắm ngay
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="text-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-6 px-4 space-y-4 shadow-xl">
          <Link href="#brands" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-700">Thương hiệu</Link>
          <Link href="#categories" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-700">Danh Mục</Link>
          <Link href="#products" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-700">Sản phẩm</Link>
          
          {user?.role === 'Admin' && (
            <Link href="/admin/products" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-blue-600 border-t pt-2">
              Trang quản trị
            </Link>
          )}

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <Button onClick={handleLogout} variant="destructive" className="w-full rounded-xl py-6">
                Đăng xuất ({user.userName})
              </Button>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-slate-900 text-white rounded-xl py-6">Đăng nhập</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}