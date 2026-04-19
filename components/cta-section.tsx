"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="relative px-6 py-16 md:p-16">
            {/* Background Pattern - Tạo hiệu ứng ánh sáng mờ ảo (glow) phong cách Apple */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-slate-400 rounded-full blur-[120px]"></div>
              <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-slate-500 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                  Sở hữu siêu phẩm công nghệ ngay hôm nay.
                </h2>
                <p className="text-slate-300 text-lg max-w-xl">
                  Ưu đãi độc quyền giảm đến 2.000.000 ₫ khi tham gia Thu cũ đổi mới. Hỗ trợ trả góp 0% qua thẻ tín dụng nhanh chóng.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-full font-medium transition-colors flex items-center">
                  <ShoppingBag size={20} className="mr-2" />
                  Mua Ngay
                </Button>
                
                <Button variant="outline" className="border-slate-500 text-white bg-transparent hover:bg-white hover:text-slate-900 px-8 py-6 text-lg rounded-full font-medium transition-colors flex items-center">
                  <span>Tìm Cửa Hàng</span>
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}