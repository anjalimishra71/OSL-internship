"use client";

const ProductCard = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-3 gap-6 py-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-6"
        >
          <h3 className="text-2xl font-semibold">
            {product.name}
          </h3>

          <p className="mt-2">
            ${product.price}
          </p>

          <button
            className="mt-3 border px-3 py-2"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;