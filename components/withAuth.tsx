'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component: any, allowedRole: string) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        router.push('/login');
        return;
      }

      const user = JSON.parse(userStr);
      if (user.role !== allowedRole) {
        alert('Bạn không có quyền truy cập khu vực này!');
        router.push('/');
      }
    }, [router]);

    return <Component {...props} />;
  };
}