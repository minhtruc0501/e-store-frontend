// 'use client'
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Apple, ArrowRight, ShieldAlert } from 'lucide-react';
// import Link from 'next/link';

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
//   // Thêm state để quản lý việc chọn quyền Admin
//   const [isAdmin, setIsAdmin] = useState(false); 
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     const payload = {
//       UserName: formData.userName, 
//       Email: formData.email,      
//       Password: formData.password,
//       Role: isAdmin ? "Admin" : "User" 
//     };

//     try {
//       const res = await fetch('https://qlbh-thaiminhtruc.onrender.com/api/Auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       if (res.ok) {
//         alert(`Đăng ký tài khoản ${isAdmin ? 'ADMIN' : 'USER'} thành công!`);
//         router.push('/login');
//       } else {
//         const errorData = await res.json(); 
//         console.log("Chi tiết lỗi từ Server:", errorData);
        
//         if (errorData.errors) {
//           const firstError = Object.values(errorData.errors)[0] as string[];
//           setError(firstError[0]);
//         } else {
//           setError('Đăng ký thất bại. Kiểm tra định dạng Email hoặc độ mạnh mật khẩu.');
//         }
//       }
//     } catch (err) {
//       setError('Lỗi kết nối máy chủ.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
//         <div className="flex flex-col items-center mb-8">
//           <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
//             <Apple className="text-white" size={24} />
//           </div>
//           <h1 className="text-2xl font-bold text-slate-900 font-sans">Tạo ID cho E-Store</h1>
//           <p className="text-slate-500 text-sm mt-2 text-center">Một tài khoản duy nhất để mua sắm và quản lý đơn hàng của bạn.</p>
//         </div>

//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Họ và Tên</label>
//             <input 
//               type="text" required placeholder="Nguyễn Văn A"
//               className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//               value={formData.userName} onChange={(e) => setFormData({...formData, userName: e.target.value})}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Email</label>
//             <input 
//               type="email" required placeholder="name@example.com"
//               className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//               value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Mật khẩu</label>
//             <input 
//               type="password" required placeholder="Ít nhất 6 ký tự"
//               className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//               value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
//             />
//           </div>

//           {/* GIAO DIỆN CHỌN QUYỀN ADMIN (CHỈ DÙNG CHO TEST) */}
//           <div className="flex items-center bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2">
//             <input 
//               type="checkbox" 
//               id="adminCheck"
//               className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
//               checked={isAdmin}
//               onChange={(e) => setIsAdmin(e.target.checked)}
//             />
//             <label htmlFor="adminCheck" className="ml-3 flex items-center text-sm font-medium text-slate-700 cursor-pointer select-none">
//               <ShieldAlert size={16} className="text-amber-500 mr-2" />
//               Đăng ký làm Quản trị viên (Admin)
//             </label>
//           </div>

//           {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

//           <Button 
//             disabled={isLoading}
//             type="submit" 
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold text-lg shadow-lg shadow-blue-100 transition-all active:scale-95 mt-4"
//           >
//             {isLoading ? "Đang xử lý..." : "Tiếp tục"}
//             <ArrowRight size={20} className="ml-2" />
//           </Button>
//         </form>

//         <div className="mt-8 pt-6 border-t border-slate-100 text-center">
//           <p className="text-slate-600 text-sm">
//             Bạn đã có tài khoản?{' '}
//             <Link href="/login" className="text-blue-600 font-semibold hover:underline">
//               Đăng nhập ngay
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
import { Apple, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
  // Thêm state để quản lý việc chọn quyền Admin
  const [isAdmin, setIsAdmin] = useState(false); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const payload = {
      UserName: formData.userName, 
      Email: formData.email,      
      Password: formData.password,
      Role: isAdmin ? "Admin" : "User" 
    };

    try {
      const res = await fetch('https://qlbh-thaiminhtruc.onrender.com/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Đăng ký tài khoản ${isAdmin ? 'ADMIN' : 'USER'} thành công!`);
        router.push('/login');
      } else {
        // ĐÃ SỬA: Đọc response dạng text trước để tránh lỗi sập web khi C# không trả về JSON
        const errorText = await res.text(); 
        console.log("Chi tiết lỗi từ Server:", errorText);
        
        try {
          // Thử phân tích nếu nó là JSON (ví dụ C# báo lỗi Validation)
          const errorData = JSON.parse(errorText);
          if (errorData.errors) {
            const firstError = Object.values(errorData.errors)[0] as string[];
            setError(firstError[0]);
          } else {
            setError('Đăng ký thất bại. Kiểm tra định dạng Email hoặc độ mạnh mật khẩu.');
          }
        } catch (parseErr) {
          // Nếu C# trả về chữ bình thường, in thẳng chữ đó ra màn hình
          setError(`Lỗi: ${errorText}`);
        }
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
            <Apple className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-sans">Tạo ID cho E-Store</h1>
          <p className="text-slate-500 text-sm mt-2 text-center">Một tài khoản duy nhất để mua sắm và quản lý đơn hàng của bạn.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Họ và Tên</label>
            <input 
              type="text" required placeholder="Nguyễn Văn A"
              className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.userName} onChange={(e) => setFormData({...formData, userName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Email</label>
            <input 
              type="email" required placeholder="name@example.com"
              className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">Mật khẩu</label>
            <input 
              type="password" required placeholder="Ít nhất 6 ký tự"
              className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* GIAO DIỆN CHỌN QUYỀN ADMIN (CHỈ DÙNG CHO TEST) */}
          <div className="flex items-center bg-slate-50 p-3 rounded-xl border border-slate-200 mt-2">
            <input 
              type="checkbox" 
              id="adminCheck"
              className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="adminCheck" className="ml-3 flex items-center text-sm font-medium text-slate-700 cursor-pointer select-none">
              <ShieldAlert size={16} className="text-amber-500 mr-2" />
              Đăng ký làm Quản trị viên (Admin)
            </label>
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

          <Button 
            disabled={isLoading}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-bold text-lg shadow-lg shadow-blue-100 transition-all active:scale-95 mt-4"
          >
            {isLoading ? "Đang xử lý..." : "Tiếp tục"}
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600 text-sm">
            Bạn đã có tài khoản?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}