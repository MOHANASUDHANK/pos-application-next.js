"use client"
import { useRouter } from 'next/navigation';
import ExportButton from "./ExportButton"
import InventoryTable from "./InventoryTable"
import Pagination from "./Pagination"

export default function InventoryTablePanel({ items, totalItems, totalPages, currentPage, onPageChange, onLimitChange, limit, onExport }:{
    items:any,
    totalItems:number,
    totalPages:number,
    currentPage:number,
    onPageChange:Function,
    onLimitChange:Function,
    limit:number,
    onExport:Function
}) {
    const router = useRouter();

    console.log(items);

    function t() {
        console.log("boom");

    }
    return (
        <div className="tabel-panel card ">
            <div className="table-toolbar">
                <div className="table-info">
                    <h3>Inventory List</h3>
                    <p>Total {totalItems} items found</p>
                </div>
                <div className="table-toolbar-buttons">
                    <button className="add-button"
                        onClick={() => router.push("/inventory/add")}
                    >Add Item</button>
                    <button className="request-button">Request Item</button>
                    <ExportButton
                        onExport={onExport}
                    />
                </div>
            </div>
            <InventoryTable
                items={items}
            />
            <Pagination
                totalItems={totalItems}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
                onLimitChange={onLimitChange}
                limit={limit}
            />
        </div>
    )
}