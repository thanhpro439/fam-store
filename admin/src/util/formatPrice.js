// Hàm định dạng số thành chuỗi với dấu chấm phân tách hàng nghìn
export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
