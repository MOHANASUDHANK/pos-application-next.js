import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = parseInt(id, 10);
    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const item = await db.inventory_table.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const mappedItem = {
      ...item,
      price: item.price ? Number(item.price) : 0,
      lastUpdated: item.last_updated ? new Date(item.last_updated).toLocaleDateString() : "",
      status: item.stock > 10 ? "In Stock" : item.stock > 0 ? "Low Stock" : "Out of Stock",
    };

    return NextResponse.json(mappedItem);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory item" },
      { status: 500 }
    );
  }
}
