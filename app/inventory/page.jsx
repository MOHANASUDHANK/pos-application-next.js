"use client"
import InventoryFilterPanel from "@/components/ui/InventoryFilterPanel";
import InventoryTablePanel from "@/components/ui/InventoryTablePanel";
export default function Inventory(){

    const inventoryData =JSON.parse( localStorage.getItem('InventoryData'));
    console.log(inventoryData);
    let items=inventoryData;
    
    const handleFilter =(filters)=>{
        console.log(filters)
    }
    const handleReset =()=>{
        console.log("reset clicked")
    }
    return(<div>
        <InventoryFilterPanel onFilter={handleFilter} onReset={handleReset}/>
        <InventoryTablePanel items={items}/>
    </div>)
}