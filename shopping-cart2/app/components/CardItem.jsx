"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const CardItem = ({ data, onAddToCart }) => {
      const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full h-screen">

      {/* Categories */}
      <div className="flex flex-row justify-between">
        {data.map((dataItem) => {
          const isSelected = selectedCategory?.id === dataItem.id;

          return (
            <h2
              key={dataItem.id}
              className={`text-xl cursor-pointer pb-4 ${
                isSelected
                  ? "font-bold border-b-4 border-black"
                  : ""
              }`}
              onClick={() => handleCategoryClick(dataItem)}
            >
              {dataItem.name} ({dataItem.products.length})
            </h2>
          );
        })}
      </div>

      {/* Products */}
      {selectedCategory && (
        <ProductCard products={selectedCategory.products} onAddToCart={onAddToCart}/>
      )}

    </div>
  );
};

export default CardItem;