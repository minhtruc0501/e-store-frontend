export const API_BASE_URL = 'https://qlbh-thaiminhtruc.onrender.com/api';

// Hàm fetch danh sách Brand
export async function getBrands() {
  const response = await fetch(`${API_BASE_URL}/Brand`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Không thể tải dữ liệu Brand');
  }
  return response.json();
}