import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("shopping-cart");

    const cartItems = await db
      .collection("cart")
      .find({})
      .toArray();

    return Response.json(cartItems);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const client = await clientPromise;

    const db = client.db("shopping-cart");

    const product = await request.json();

    const existingProduct = await db
      .collection("cart")
      .findOne({ id: product.id });

    if (existingProduct) {
      await db.collection("cart").updateOne(
        { id: product.id },
        {
          $inc: {
            quantity: 1,
          },
        }
      );
    } else {
      await db.collection("cart").insertOne({
        ...product,
        quantity: 1,
      });
    }

    const cartItems = await db
      .collection("cart")
      .find({})
      .toArray();

    return Response.json(cartItems);
  } catch (error) {
    return Response.json(
      { error: "Failed to add product to cart" },
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  try {
    const client = await clientPromise;
    const db = client.db("shopping-cart");

    const { productId } = await request.json();

    const existingProduct = await db
      .collection("cart")
      .findOne({ id: productId });

    if (!existingProduct) {
      return Response.json(
        { error: "Product not found in cart" },
        { status: 404 }
      );
    }

    if (existingProduct.quantity > 1) {
      await db.collection("cart").updateOne(
        { id: productId },
        {
          $inc: {
            quantity: -1,
          },
        }
      );
    } else {
      await db.collection("cart").deleteOne({
        id: productId,
      });
    }

    const cartItems = await db
      .collection("cart")
      .find({})
      .toArray();

    return Response.json(cartItems);
  } catch (error) {
    return Response.json(
      { error: "Failed to remove product from cart" },
      { status: 500 }
    );
  }
}