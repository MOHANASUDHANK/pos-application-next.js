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

export async function findAll(){
   return db.inventory_table.findMany();
}

export async function findById(id:number|string) {
  const parsedId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(parsedId)) {
      return null;
    }
    return db.inventory_table.findUnique({ where: { id: parsedId } });
}