
import { findAll, count } from "@/repositries/inventory"
import { add } from "@/services/inventory"
import { NextResponse } from "next/server";

export async function GET(request:Request) {
  try {

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("limit")) || 10;

    const [items, totalItems] = await Promise.all([findAll(page, pageSize), count()]);

    const mappedItems = items.map((item) => ({
      ...item,
      price: item.price ? Number(item.price) : 0,
      lastUpdated: item.last_updated ? new Date(item.last_updated).toLocaleDateString() : "",
      status: item.stock > 10 ? "In Stock" : item.stock > 0 ? "Low Stock" : "Out of Stock",
    }));

    return NextResponse.json({
      items: mappedItems,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 }
    );
  }
}

export async function POST(request:Request) {
  try {
    const body = await request.json();
    const item = await add(body);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}