"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react" // Icon đại diện cho Brand

export default function BrandsSection() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://qlbh-thaiminhtruc.onrender.com/api/Brand')
      .then(res => res.json())
      .then(data => { setBrands(data); setIsLoading(false); })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, []);

  return (
    <section id="brands" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Thương Hiệu Nổi Bật</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Khám phá các sản phẩm đến từ những thương hiệu hàng đầu thế giới mà chúng tôi đang phân phối.
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">Đang tải thương hiệu...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand: any, index: number) => (
              <motion.div
                key={brand.brandId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-semibold">{brand.brandName}</h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}