import { CartItem } from "../redux/slices/cartSlice";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? (JSON.parse(data) as CartItem[]) : [];
  
  const totalPrice = items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

  return {
    items,
    totalPrice,
  };
};
