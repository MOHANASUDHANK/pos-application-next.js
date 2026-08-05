"use client"
import {useState,useEffect} from "react"
import InventoryFilterPanel from "@/components/ui/InventoryFilterPanel";
import InventoryTablePanel from "@/components/ui/InventoryTablePanel";
export default  function Inventory() {
    const [items,setItems] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/api/inventory")
        .then((res)=>res.json())
        .then((data)=>setItems(data))
    },[])
    // const inventoryData = fetch("http://localhost:3000/api/inventory").then((res) => res.json());
    // console.log(inventoryData);
    

    const handleFilter = (filters) => {
        console.log(filters)
    }
    const handleReset = () => {
        console.log("reset clicked")
    }
    return (<div>
        <InventoryFilterPanel onFilter={handleFilter} onReset={handleReset} />
        <InventoryTablePanel items={items} />
    </div>)
}