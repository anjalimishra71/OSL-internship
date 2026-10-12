"use client";

import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import CardSidebar from "./CardSidebar";

const ShoppingCart = ({ data }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);


  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...prevItems,
          {
            id: product.id,
            quantity: 1,
          },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };
 
  return (
    <div className="flex">

      <div className="w-[75%] p-6">
        <CardItem
          data={data}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="w-[25%] border-l p-6">

        <CardSidebar cartItems={cartItems} products={data.flatMap((category) => category.products)}
          onRemoveFromCart={handleRemoveFromCart} />
      </div>

    </div>
  );
};

export default ShoppingCart;