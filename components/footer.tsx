import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Apple } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-slate-800 rounded-md flex items-center justify-center">
                <Apple size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">E-Store</span>
            </Link>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
              Đại lý ủy quyền chính thức của Apple tại Việt Nam. Chúng tôi cam kết mang đến những sản phẩm công nghệ đỉnh cao cùng dịch vụ chăm sóc khách hàng đạt chuẩn quốc tế.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Cột 2: Sản phẩm */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sản Phẩm</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#products" className="hover:text-white transition-colors">iPhone</Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-white transition-colors">iPad</Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-white transition-colors">Mac</Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-white transition-colors">Apple Watch</Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-white transition-colors">Phụ kiện</Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Về công ty */}
          <div>
            <h3 className="text-white font-semibold mb-4">Về Chúng Tôi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Giới thiệu E-Store</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Hệ thống cửa hàng</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Tin tức công nghệ</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Liên hệ</Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Hỗ trợ */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ Trợ Khách Hàng</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Chính sách bảo hành</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Chính sách đổi trả</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Hướng dẫn mua trả góp</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Tra cứu đơn hàng</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Bảo mật thông tin</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Phần bản quyền cuối trang */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {currentYear} E-Store. Hệ thống được phát triển bởi Minh Trực. Tất cả các quyền được bảo lưu.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
            <Link href="#" className="hover:text-white transition-colors">Quyền riêng tư</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}