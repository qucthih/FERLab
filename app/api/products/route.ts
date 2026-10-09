import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();

  let filtered = products;

  if (q) {
    const qLower = q.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(qLower) ||
        product.description.toLowerCase().includes(qLower)
    );
  }

  if (category) {
    const catLower = category.toLowerCase();
    filtered = filtered.filter(
      (product) => product.category.toLowerCase() === catLower
    );
  }

  return NextResponse.json(filtered, { status: 200 });
}
