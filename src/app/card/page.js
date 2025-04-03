'use client';

import React from 'react';
import { useCart } from '@/src/context/CartContext';

function CartPage() {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="bg-[#ffe47b] min-h-screen p-10">
            <h1 className="text-4xl font-bold mb-6 text-[#333333]">Votre Panier</h1>
            {cartItems.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-[#333333] p-4 rounded-md"
                        >
                            <div>
                                <h2 className="font-bold text-lg">{item.name}</h2>
                                <p className="text-sm">Prix: {item.price}€</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="bg-[#f9f6f1] text-[#333333] px-3 py-1 rounded-md"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="bg-[#f9f6f1] text-[#333333] px-3 py-1 rounded-md"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-[#f9f6f1] px-3 py-1 rounded-md"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                    <div className="text-[#333333] text-right font-bold text-lg">
                        Total: {totalPrice}€
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg text-[#333333]">
                    Votre panier est vide. Ajoutez des livres pour commencer !
                </p>
            )}
        </div>
    );
}

export default CartPage;
