// "use client"
// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { UserCircle } from "lucide-react"

// export default function UsersSection() {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://qlbh-thaiminhtruc.onrender.com/api/User')
//       .then(res => res.json())
//       .then(data => { setUsers(data); setIsLoading(false); })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <section id="users" className="py-20 bg-white border-t border-slate-100">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Cộng Đồng Thành Viên</h2>
//             <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//               Gia nhập cùng hàng ngàn khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi.
//             </p>
//           </motion.div>
//         </div>

//         {isLoading ? ( <div className="text-center">Đang tải dữ liệu...</div> ) : (
//           <div className="flex flex-wrap justify-center gap-4">
//             {users.map((user: any, index: number) => (
//               <motion.div
//                 key={user.userId}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 className="bg-slate-50 border border-slate-200 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm"
//               >
//                 <UserCircle className="text-violet-500 w-6 h-6" />
//                 <div>
//                   <p className="font-semibold text-slate-800">{user.userName}</p>
//                   <p className="text-xs text-slate-500">{user.email}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserCircle } from "lucide-react"

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://qlbh-thaiminhtruc.onrender.com/api/User')
      .then(res => res.json())
      .then(data => { setUsers(data); setIsLoading(false); })
      .catch(err => console.error(err));
  }, []);

  // THÊM DÒNG NÀY: Cắt mảng để chỉ lấy 6 thành viên đầu tiên
  const displayUsers = users.slice(0, 6);

  return (
    <section id="users" className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cộng Đồng Thành Viên</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Gia nhập cùng hàng ngàn khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi.
            </p>
          </motion.div>
        </div>

        {isLoading ? ( <div className="text-center">Đang tải dữ liệu...</div> ) : (
          <div className="flex flex-wrap justify-center gap-4">
            
            {/* ĐÃ SỬA: Đổi users.map thành displayUsers.map */}
            {displayUsers.map((user: any, index: number) => (
              <motion.div
                key={user.userId}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-slate-50 border border-slate-200 rounded-full px-6 py-3 flex items-center gap-3 shadow-sm"
              >
                <UserCircle className="text-violet-500 w-6 h-6" />
                <div>
                  <p className="font-semibold text-slate-800">{user.userName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </motion.div>
            ))}

          </div>
        )}
      </div>
    </section>
  )
}