'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AdminGuard from '@/components/AdminGuard';
import { 
  Tags, 
  Layers, 
  Package, 
  Users, 
  ShoppingCart, 
  LogOut, 
  Apple, 
  Home 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const menuItems = [
    { name: 'Thương hiệu', path: '/admin/brands', icon: <Tags size={20} /> },
    { name: 'Danh mục', path: '/admin/categories', icon: <Layers size={20} /> },
    { name: 'Sản phẩm', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Người dùng', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Đơn hàng', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
  ];

  return (
    <AdminGuard>
      <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
        
        {/* SIDEBAR - THANH MENU BÊN TRÁI ĐƯỢC NÂNG CẤP */}
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-10 shrink-0">
          
          {/* Logo Area */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-blue-600/20">
              <Apple className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">E-Store <span className="text-blue-500">Admin</span></span>
          </div>

          {/* Navigation Area */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Quản lý hệ thống</p>

            {menuItems.map((item) => {
              // Kiểm tra xem URL hiện tại có khớp với path của menu không để đổi màu
              const isActive = pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions (Footer Sidebar) */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            <Link
              href="/"
              className="flex items-center px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200 text-slate-400 group"
            >
              <Home size={20} className="mr-3 group-hover:text-blue-400 transition-colors" />
              <span className="font-medium">Trang mua sắm</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 text-slate-400 group"
            >
              <LogOut size={20} className="mr-3 group-hover:text-red-500 transition-colors" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT - NỘI DUNG BÊN PHẢI */}
        <main className="flex-1 overflow-y-auto bg-slate-100/50">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </AdminGuard>
  );
}