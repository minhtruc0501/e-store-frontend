"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Apple, ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"
// Nếu bạn chưa cài lucide-react thì hãy cài nhé: npm install lucide-react

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-slate-50 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* CỘT TRÁI: NỘI DUNG TEXT */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 text-white mb-6">
                <Apple size={16} className="mr-2" />
                <span className="text-sm font-medium tracking-wide">Đại lý ủy quyền chính thức</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-slate-900 tracking-tight">
                iPhone 15 Pro Max
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-800">
                  Titan tự nhiên.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                Thiết kế từ titanium đẳng cấp hàng không vũ trụ. Chip A17 Pro định hình lại sức mạnh. Camera linh hoạt nhất từ trước đến nay. Đặt trước ngay hôm nay.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg rounded-full shadow-xl transition-all"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span>Mua Ngay</span>
                  <ArrowRight
                    size={20}
                    className={`ml-2 transition-transform duration-300 ${isHovered ? "translate-x-2" : ""}`}
                  />
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-full">
                  Tìm hiểu thêm
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-slate-600 text-sm font-medium">
                <div className="flex items-center">
                  <ShieldCheck size={18} className="mr-2 text-green-600" />
                  <span>Bảo hành chính hãng 12 tháng</span>
                </div>
                <div className="flex items-center">
                  <Zap size={18} className="mr-2 text-yellow-500" />
                  <span>Giao hàng hỏa tốc 2H</span>
                </div>
              </div>
              
            </motion.div>
          </div>
          
          {/* CỘT PHẢI: HÌNH ẢNH SẢN PHẨM */}
          <div className="md:w-1/2 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              {/* Bạn có thể thay đổi link ảnh dưới đây thành link ảnh iPhone không nền (PNG) của bạn */}
              <img 
                src="https://www.apple.com/v/iphone-15-pro/c/images/overview/closer-look/all_colors__eppfcocn9mky_large.jpg" 
                alt="iPhone 15 Pro Max Titanium" 
                className="w-full max-w-[500px] h-auto drop-shadow-2xl rounded-3xl"
              />
              
              {/* Nhãn giá nổi bật (Floating price tag) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
              >
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Giá từ</p>
                <p className="text-2xl font-bold text-slate-900">34.990.000 ₫</p>
              </motion.div>

            </motion.div>
            
            {/* Hiệu ứng nền mờ (Glow effect) phía sau ảnh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-slate-200/50 rounded-full blur-[100px] -z-10"></div>
          </div>
          
        </div>
      </div>
    </section>
  )
}