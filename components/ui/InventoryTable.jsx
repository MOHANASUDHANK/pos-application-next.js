import Image from "next/image"

function getStatusClass(status){
    switch(status){
        case "In Stock":
            return "greenBadge";
        case "Low Stock":
            return "orangBadge";
        case "Out of Stock":
            return "redBadge"
    }
}

export default function InventoryTable({items}){
    return(<div className="tableWrapper">
        <table className="table">
            <thead>
            <tr>
                <th className="imageCol"></th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Purchased</th>
                <th>Sold</th>
                <th>In Stock</th>
                <th>Status</th>
                <th>Last Updated</th>
            </tr>
            </thead>
            <tbody>
                   {items.map((item,id)=>(
                    <tr key={item.id}>
                        <td>
                            <Image
                            src={item.image}
                            alt=""
                            width={40}
                            height={40}
                            className="item-image"
                            />
                        </td>
                        <td className="item-name">{item.name}</td>
                        <td className="item-category">{item.category}</td>
                        <td className="item-price">{item.price}</td>
                        <td className="item-unit">{item.unit}</td>
                        <td className="item-purchased">{item.purchased}</td>
                        <td className="item-sold">{item.sold}</td>
                        <td className="item-stock">{item.stock}</td>
                        <td className={`item-status ${getStatusClass(item.status)}`}>{item.status}</td>
                        <td className="lastUpdated">{item.lastUpdated}</td>
                    </tr>
                   ))}
            </tbody>
        </table>
    </div>)
}