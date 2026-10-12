"use client";

import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import CardSidebar from "./CardSidebar";

const ShoppingCart = ({ data }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();

      setCartItems(data);
    };

    fetchCart();
  }, []);

  const handleAddToCart = async (product) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const updatedCart = await response.json();

    setCartItems(updatedCart);
  };

 const handleRemoveFromCart = async (productId) => {
  const response = await fetch("/api/cart", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const updatedCart = await response.json();

  setCartItems(updatedCart);
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
        <CardSidebar cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
      </div>

    </div>
  );
};

export default ShoppingCart;