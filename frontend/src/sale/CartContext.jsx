
////////////get by id //////////////

// import React, { createContext, useState, useContext } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//     const [cart, setCart] = useState([]);

//     const addItem = (item) => {
//         setCart(prevCart => {
//             const index = prevCart.findIndex(cartItem => cartItem.id === item.id);
//             if (index >= 0) {
//                 // Item already in cart, update quantity
//                 const newQuantity = prevCart[index].quantity + item.quantity;
//                 if (newQuantity > item.qty) {
//                     toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
//                         position: "top-center",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                     });
//                     return prevCart;
//                 } else {
//                     const updatedCart = [...prevCart];
//                     updatedCart[index].quantity = newQuantity;
//                     return updatedCart;
//                 }
//             } else {
//                 // Item not in cart, add new item
//                 if (item.quantity > item.qty) {
//                     toast.error('ផលិតផលចំនួនក្នុងស្តុកបានអស់ហើយ !', {
//                         position: "top-center",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                     });
//                     return prevCart;
//                 } else {
//                     return [...prevCart, item];
//                 }
//             }
//         });
//     };

//     const removeItem = (item) => {
//         setCart(cart.filter(cartItem => cartItem.id !== item.id));
//     };
//     const updateQuantity = (itemId, quantity) => {
//         setCart(prevCart => {
//             if (quantity <= 0) {
//                 return prevCart.filter(item => item.id !== itemId);
//             }
//             return prevCart.map(item =>
//                 item.id === itemId ? { ...item, quantity } : item
//             );
//         });
//     };

//     return (
//         <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity }}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// export function useCart() {
//     return useContext(CartContext);
// }




////////////get by name //////////////

import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addItem = (item) => {
        setCart(prevCart => {
            const index = prevCart.findIndex(cartItem => cartItem.name === item.name);
            if (index >= 0) {
                // Item already in cart, update quantity
                const newQuantity = prevCart[index].quantity + item.quantity;
                if (newQuantity > item.qty) {
                    toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return prevCart;
                } else {
                    const updatedCart = [...prevCart];
                    updatedCart[index].quantity = newQuantity;
                    return updatedCart;
                }
            } else {
                // Item not in cart, add new item
                if (item.quantity > item.qty) {
                    toast.error('ផលិតផលចំនួនក្នុងស្តុកបានអស់ហើយ !', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return prevCart;
                } else {
                    return [...prevCart, item];
                }
            }
        });
    };

    const removeItem = (item) => {
        setCart(cart.filter(cartItem => cartItem.name !== item.name));
    };

    const updateQuantity = (itemName, quantity) => {
        setCart(prevCart => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.name !== itemName);
            }
            return prevCart.map(item =>
                item.name === itemName ? { ...item, quantity } : item
            );
        });
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
