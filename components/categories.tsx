"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Layers } from "lucide-react"

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://qlbh-thaiminhtruc.onrender.com/api/Categories')
      .then(res => res.json())
      .then(data => { setCategories(data); setIsLoading(false); })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Danh Mục Sản Phẩm</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tìm kiếm sản phẩm dễ dàng hơn theo các danh mục được phân chia rõ ràng.
            </p>
          </motion.div>
        </div>

        {isLoading ? ( <div className="text-center">Đang tải danh mục...</div> ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category: any, index: number) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer bg-slate-50 p-8"
              >
                <div className="flex items-center gap-4">
                  <Layers className="text-blue-600 w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{category.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">Slug: /{category.slug}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}