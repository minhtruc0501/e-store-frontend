"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL"); // State lưu danh mục đang chọn
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lấy cả sản phẩm và danh mục để làm bộ lọc
    Promise.all([
      fetch('https://qlbh-thaiminhtruc.onrender.com/api/Product').then(r => r.json()),
      fetch('https://qlbh-thaiminhtruc.onrender.com/api/Categories').then(r => r.json())
    ]).then(([prodData, catData]) => {
      setProducts(prodData);
      setCategories(catData);
      setIsLoading(false);
    }).catch(err => console.error(err));
  }, []);

  // Lọc sản phẩm dựa theo Tab đang chọn
  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter((p: any) => p.categoryId?.toString() === activeCategory);

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Sản Phẩm Mới Nhất</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cập nhật những mẫu mã mới nhất với mức giá ưu đãi dành riêng cho bạn.
            </p>
          </motion.div>
        </div>

        {/* Thanh Tabs Lọc Danh Mục */}
        {!isLoading && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button 
              variant={activeCategory === "ALL" ? "default" : "outline"}
              onClick={() => setActiveCategory("ALL")}
              className={activeCategory === "ALL" ? "bg-slate-900 text-white rounded-full" : "rounded-full bg-white text-slate-600 border-slate-200"}
            >
              Tất cả
            </Button>
            {categories.map((cat: any) => (
              <Button 
                key={cat.id}
                variant={activeCategory === cat.id.toString() ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id.toString())}
                className={activeCategory === cat.id.toString() ? "bg-slate-900 text-white rounded-full" : "rounded-full bg-white text-slate-600 border-slate-200"}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        )}

        {isLoading ? ( <div className="text-center text-slate-500">Đang tải sản phẩm ...</div> ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any, index: number) => (
              <motion.div
                key={product.productId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col group"
              >
                {/* Gắn Link vào khối hình ảnh để click xem chi tiết */}
                <Link href={`/product/${product.productId}`} className="h-56 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
                  {product.image ? (
                    <img src={product.image} alt={product.productName} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-slate-400">Chưa có ảnh</span>
                  )}
                  {/* Badge hiển thị tên danh mục */}
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                    {product.category?.name || 'Mới'}
                  </div>
                </Link>
                
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/product/${product.productId}`}>
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                      {product.productName}
                    </h3>
                  </Link>
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-blue-600 mb-4">
                      {product.price ? product.price.toLocaleString('vi-VN') : 0} ₫
                    </p>
                    <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white transition-colors flex items-center justify-center gap-2 rounded-xl">
                      <ShoppingCart size={18} /> Mua Ngay
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Xử lý trường hợp danh mục không có sản phẩm */}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">
                Không có sản phẩm nào trong danh mục này.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}