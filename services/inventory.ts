import {createItem, updateItem} from "@/repositries/inventory";

export async function add(input:any){
  return createItem({
    ...input,
    price:Number(input.price),
    stock:Number(input.stock),
    sold:0,
    purchased:0,
    last_updated:new Date()
  })
}

export async function update(id: number, input: any) {
  return updateItem(id, {
    name: input.name,
    description: input.description,
    category: input.category,
    price: Number(input.price),
    unit: input.unit,
    stock: Number(input.stock),
    supplier: input.supplier,
    image: input.image,
    last_updated: new Date(),
  });
}