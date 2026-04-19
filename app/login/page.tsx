// 'use client'
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Apple } from 'lucide-react';
// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(''); // Xóa lỗi cũ
    
//     try {
//       const res = await fetch('https://qlbh-thaiminhtruc.onrender.com/api/Auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('token', data.token);
        
//         // Nếu email có chứa chữ "admin" hoặc userId = 5 thì cấp quyền Admin
//         const isUserAdmin = data.userId === 5 || email.toLowerCase().includes('admin');
//         const assignedRole = isUserAdmin ? 'Admin' : 'User';

//         const userObj = {
//           userId: data.userId,
//           userName: data.userName,
//           role: assignedRole
//         };
//         localStorage.setItem('user', JSON.stringify(userObj));

//         alert(`Đăng nhập thành công với quyền: ${assignedRole.toUpperCase()}`);
        
//         // 3. Tải lại trang để Navbar cập nhật quyền
//         window.location.href = '/'; 
//       } else {
//         setError('Email hoặc mật khẩu không chính xác');
//       }
//     } catch (err) {
//       console.error("Lỗi login:", err);
//       setError('Lỗi kết nối máy chủ');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50">
//       <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
//             <Apple className="text-white" size={24} />
//           </div>
//           <h1 className="text-2xl font-bold text-slate-900">Đăng nhập E-Store</h1>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
//             <input 
//               type="email" required 
//               className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
//               value={email} onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
//             <input 
//               type="password" required 
//               className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
//               value={password} onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold transition-all">
//             Đăng Nhập
//           </Button>
//         </form>

//         <div className="mt-8 pt-6 border-t border-slate-100 text-center">
//           <p className="text-slate-600 text-sm">
//             Bạn chưa có tài khoản?{' '}
//             <Link href="/register" className="text-blue-600 font-semibold hover:underline">
//               Tạo tài khoản mới
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ
    
    try {
      const res = await fetch('https://qlbh-thaiminhtruc.onrender.com/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      // ĐÃ SỬA: Di chuyển await res.json() vào bên trong if (res.ok)
      if (res.ok) {
        const data = await res.json();
        
        localStorage.setItem('token', data.token);
        
        // Nếu email có chứa chữ "admin" hoặc userId = 5 thì cấp quyền Admin
        const isUserAdmin = data.userId === 5 || email.toLowerCase().includes('admin');
        const assignedRole = isUserAdmin ? 'Admin' : 'User';

        const userObj = {
          userId: data.userId,
          userName: data.userName,
          role: assignedRole
        };
        localStorage.setItem('user', JSON.stringify(userObj));

        alert(`Đăng nhập thành công với quyền: ${assignedRole.toUpperCase()}`);
        
        // Tải lại trang để Navbar cập nhật quyền
        window.location.href = '/'; 
      } else {
        // ĐÃ SỬA: Nếu đăng nhập thất bại, C# trả về chuỗi text "Sai email...", ta dùng res.text() để đọc
        const errorText = await res.text();
        setError(errorText || 'Email hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      console.error("Lỗi login:", err);
      setError('Lỗi kết nối máy chủ');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
            <Apple className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Đăng nhập E-Store</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" required 
              className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input 
              type="password" required 
              className="w-full border p-3 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold transition-all">
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600 text-sm">
            Bạn chưa có tài khoản?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Tạo tài khoản mới
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}