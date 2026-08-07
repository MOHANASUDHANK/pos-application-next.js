"use client"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation";
import InventoryFilterPanel from "@/components/ui/InventoryFilterPanel";
import InventoryTablePanel from "@/components/ui/InventoryTablePanel";
import * as XLSX from "xlsx";

export interface InventoryItem{
    id:number;
    name:string;
    category:string;
    price:number;
    unit:string;
    purchased:number;
    sold:number;
    stock:number;
    status:string;
    lastUpdated:string;
}

export default function Inventory() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const [data, setData] = useState<{
        items: InventoryItem[];
        totalItems: number;
        totalPages: number;
    }>({
        items: [],
        totalItems: 0,
        totalPages: 1,
    })

    useEffect(() => {
        fetch(`/api/inventory?page=${currentPage}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error))
    }, [currentPage, limit])
    // const inventoryData = fetch("http://localhost:3000/api/inventory").then((res) => res.json());
    // console.log(inventoryData);

    const handlePageChange = (newPage:number):void => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    }

    const handleLimitChange = (newLimit:number):void => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("limit", newLimit.toString());
        router.push(`?${params.toString()}`);
    }

    const handleExport = ()=>{
        if (!data.items || data.items.length === 0) {
      alert("No data available to export!");
      return;
    }
        const exportData = data.items.map((item) => ({
            Id: item.id,
      "Item Name": item.name,
      Category: item.category,
      Price: item.price,
      Unit: item.unit,
      Purchased: item.purchased,
      Sold: item.sold,
      "In Stock": item.stock,
      Status: item.status,
      "Last Updated": item.lastUpdated,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook,`inventory_Report.xlsx`);
    }


    const handleFilter = (filters:any) => {
        console.log(filters)
    }
    const handleReset = () => {
        console.log("reset clicked")
    }
    return (<div>
        <InventoryFilterPanel onFilter={handleFilter} onReset={handleReset} />
        <InventoryTablePanel
            items={data.items}
            totalItems={data.totalItems}
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            limit={limit}
            onExport={handleExport}
        />
    </div>)
}