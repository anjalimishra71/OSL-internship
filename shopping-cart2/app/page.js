import ShoppingCart from "./components/ShoppingCart";
export default async function Home() {
  // const response = await fetch(
  //   "https://my-json-server.typicode.com/prataprohit007/shopping-cart/categories"
  // );

    const response = await fetch("http://localhost:3000/api/categories");

  const data = await response.json();
  return (
    <div className="min-h-screen">
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>
      </div>

      <hr />

      <ShoppingCart data={data} />
    </div>
  );
}