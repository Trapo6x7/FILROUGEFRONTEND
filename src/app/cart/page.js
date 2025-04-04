'use client'
import React from 'react';
import { useCart } from '@/src/context/CartContext';  // Assure-toi que le chemin d'importation est correct

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  console.log(cartItems);

  return (
    <div className="bg-[#ffe47b] min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#333333]">Votre Panier</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Partie gauche: Détails des articles */}
            <div className="w-full sm:w-1/2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-[#333333] p-4 rounded-md mb-4"
                >
                  <div>
                    <h2 className="font-bold text-lg text-[#f9f6f1]">{item.bookDetails.title}</h2>
                    <p className="text-sm text-[#f9f6f1]">Prix: {item.price}€</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-[#f9f6f1] text-[#333333] px-3 py-1 rounded-md"
                    >
                      -
                    </button>
                    <span className="text-[#f9f6f1]">{item.quantity}</span>
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
            </div>

            {/* Partie droite: Récapitulatif du prix */}
            <div className="w-full sm:w-1/2 p-6 bg-[#333333] rounded-md text-[#f9f6f1]">
              <div className="text-lg font-bold">Résumé</div>
              <div className="mt-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.bookDetails.title} ({item.quantity}x)</span>
                    <span>{item.price * item.quantity}€</span>
                  </div>
                ))}
                <div className="flex justify-between mt-4 font-bold text-lg">
                  <span>Total</span>
                  <span>{totalPrice}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-[#333333]">
          Votre panier est vide. Ajoutez des livres pour commencer !
        </p>
      )}
    </div>
  );
};

export default CartPage;
