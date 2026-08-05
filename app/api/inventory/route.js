
import {findAll} from "@/repositries/inventory"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await findAll();

    const mappedItems = items.map((item) => ({
      ...item,
      price: item.price ? Number(item.price) : 0,
      lastUpdated: item.last_updated ? new Date(item.last_updated).toLocaleDateString() : "",
      status: item.stock > 10 ? "In Stock" : item.stock > 0 ? "Low Stock" : "Out of Stock",
    }));

    return NextResponse.json(mappedItems);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory data" },
      { status: 500 }
    );
  }
}



