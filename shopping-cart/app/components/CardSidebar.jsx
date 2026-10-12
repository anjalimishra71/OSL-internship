const CardSidebar = ({ cartItems, products, onRemoveFromCart }) => {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce((total, item) => {
    const product = products.find(
      (product) => product.id === item.id
    );

    return total + product.price * item.quantity;
  }, 0);


  return (
    <div className="w-full">

      {/* Cart heading */}
      <h2 className="text-lg font-normal">
        Cart ({totalItems} items)
      </h2>

      <hr className="my-4" />

      {/* Cart Items */}
      <div>
        {cartItems.length > 0
          ? cartItems.map((item) => {
              const product = products.find(
                (product) => product.id === item.id
              );

              return (
                <div key={item.id} className="mb-3">
                  <div className="flex items-center justify-between gap-2">

                    <span className="text-lg">
                      {product.name}
                    </span>

                    <span className="text-lg whitespace-nowrap">
                      ${product.price}
                    </span>

                    <span className="text-lg">
                      {item.quantity > 1 ? item.quantity : ""}
                    </span>

                    <button
                      className="border rounded px-2 py-0.5 text-lg"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      X
                    </button>

                  </div>
                </div>
              );
            })
          : "Card is empty"}
      </div>

      <hr className="my-5" />

      {/* Total */}
      <div className="flex items-center gap-2 text-lg">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

    </div>
  );
};

export default CardSidebar;