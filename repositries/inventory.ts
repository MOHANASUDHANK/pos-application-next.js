import { db } from "@/lib/db";

// export const userRepository = {
//   async findAll() {
//     return db.inventory_table.findMany();
//   },
//   async findById(id: number | string) {
//     const parsedId = typeof id === "string" ? parseInt(id, 10) : id;
//     if (isNaN(parsedId)) {
//       return null;
//     }
//     return db.inventory_table.findUnique({ where: { id: parsedId } });
//   },
// };

// export const inventoryRepository = userRepository;

export async function findAll(page: number, pageSize: number) {
  return db.inventory_table.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize
  });
}

export async function count() {
  return db.inventory_table.count();
}

export async function findById(id: number | string) {
  const parsedId = typeof id === "string" ? parseInt(id, 10) : id;
  if (isNaN(parsedId)) {
    return null;
  }
  return db.inventory_table.findUnique({ where: { id: parsedId } });
}

export async function createItem(input:any){
  return db.inventory_table.create({data:input})
}

export async function updateItem(id: number, input: any) {
  return db.inventory_table.update({
    where: { id },
    data: input,
  });
}