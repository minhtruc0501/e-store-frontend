import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
     
      {/* <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <Link href="/" className="block p-3 rounded hover:bg-slate-800 transition">
            Quay về trang chủ
        </Link>
        <nav className="flex-1 p-4 space-y-2">
            <nav className="flex-1 p-4 space-y-2">
        <Link href="/admin/brands" className="block p-3 rounded hover:bg-slate-800 transition">
            Quản lý Thương hiệu
        </Link>
        <Link href="/admin/categories" className="block p-3 rounded hover:bg-slate-800 transition">
            Quản lý Danh mục
        </Link>
        <Link href="/admin/products" className="block p-3 rounded hover:bg-slate-800 transition">
            Quản lý Sản phẩm
        </Link>
        <Link href="/admin/users" className="block p-3 rounded hover:bg-slate-800 transition">
            Quản lý Người dùng
        </Link>
        <Link href="/admin/orders" className="block p-3 rounded hover:bg-slate-800 transition">
            Quản lý Đơn hàng
        </Link>
        </nav>
        </nav>
      </aside> */}

      {/* Main Content - Nội dung thay đổi ở bên phải */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}