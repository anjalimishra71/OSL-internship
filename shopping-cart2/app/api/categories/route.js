import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

    const db = client.db("shopping-cart");

    const categories = await db
      .collection("categories")
      .find({})
      .toArray();

    return Response.json(categories);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}