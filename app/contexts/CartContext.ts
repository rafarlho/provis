import { createContext, useContext } from "react";
import type { CartItem } from "~/types/CartItemModel";

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void
    isInCart: (item: CartItem) => number
    changeQuantity: (item: CartItem, newQantity: number) => void
}

export const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    isInCart: () => 0,
    changeQuantity: ()=> {}
})

export const useCart = () => useContext(CartContext)