import ExportButton from "./ExportButton"
import InventoryTable from "./InventoryTable"

export default function InventoryTablePanel({items}) {
    console.log(items);
    
    function t() {
        console.log("boom");

    }
    return (
        <div className="tabel-panel card ">
            <div className="table-toolbar">
                <div className="table-info">
                    <h3>Inventory List</h3>
                    <p>Total 0 items found</p>
                </div>
                <div className="table-toolbar-buttons">
                    <button className="add-button">Add Item</button>
                    <button className="request-button">Request Item</button>
                    <ExportButton 
                    onClick={t} 
                    />
                </div>
            </div>
            <InventoryTable
            items={items}
            />
            
        </div>
    )
}