import Image from "next/image"
export default function InventoryTable({items}){
    return(<div>
        <table>
            <thead>
            <tr>
                <th></th>
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
                    <tr>
                        <td>
                            <Image
                            src={item.image}
                            alt=""
                            width={40}
                            height={40}
                            />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.unit}</td>
                        <td>{item.purchased}</td>
                        <td>{item.sold}</td>
                        <td>{item.stock}</td>
                        <td>{item.status}</td>
                        <td>{item.lastUpdated}</td>
                    </tr>
                   ))}
            </tbody>
        </table>
    </div>)
}