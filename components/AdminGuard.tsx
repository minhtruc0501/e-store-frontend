'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Đảm bảo chỉ chạy code này trên trình duyệt
    if (typeof window === 'undefined') return;

    const userStr = localStorage.getItem('user');
    
    // 1. Chưa đăng nhập -> Đá ra trang login
    if (!userStr) {
      alert('Vui lòng đăng nhập tài khoản Admin!');
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      // 2. Đã đăng nhập nhưng không phải Admin -> Đá về trang chủ
      if (user.role === 'Admin') {
        setIsAuthorized(true); // Cấp phép qua cổng
      } else {
        alert('Tài khoản của bạn không có quyền truy cập khu vực Quản trị!');
        router.push('/'); 
      }
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/login');
    }
  }, [router, pathname]);

  // Trong lúc chờ kiểm tra (khoảng 0.1s), hiển thị màn hình Loading cho chuyên nghiệp
  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 z-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Đang kiểm tra quyền an ninh...</p>
      </div>
    );
  }

  // Nếu là Admin, cho phép render giao diện bên trong
  return <>{children}</>;
}