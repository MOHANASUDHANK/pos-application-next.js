"use client"
import { useState, useEffect, ChangeEvent, FormEvent, DragEvent } from "react";
import Image from "next/image"
import { useRouter, useParams } from "next/navigation";

interface InventoryFormData {
    name: string;
    description: string;
    category: string;
    price: number;
    unit: string;
    stock: number;
    supplier: string;
    image: string;
}

export default function EditItem() {

    const router = useRouter();
    const params = useParams();
    const itemId = params.id;

    const [formData, setFormData] = useState<InventoryFormData>({
        name: "",
        description: "",
        category: "",
        price: 0,
        unit: "",
        stock: 0,
        image: "",
        supplier: "",
    })
    const [previewImage, setPreviewImage] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [statusValue, setStatusValue] = useState<string>("Out Of Stock");

    useEffect(() => {
        if (!itemId) return;

        fetch(`/api/inventory/${itemId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Item not found");
                return res.json();
            })
            .then((data) => {
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    category: data.category || "",
                    price: data.price || 0,
                    unit: data.unit || "",
                    stock: data.stock || 0,
                    supplier: data.supplier || "",
                    image: data.image || "",
                });
                if (data.image) {
                    setPreviewImage(data.image);
                }
            })
            .catch((error) => {
                console.error("Error fetching item:", error);
                alert("Failed to load item data.");
                router.push("/inventory");
            });
    }, [itemId, router]);

    useEffect(() => {
        const stockQty = formData.stock;

        if (stockQty > 10) {
            setStatusValue("In Stock");
        } else if (stockQty > 0 && stockQty <= 10) {
            setStatusValue("Low Stock");
        } else {
            setStatusValue("Out Of Stock");
        }
    }, [formData.stock])

    const processFile = (file: File) => {
        if (file.size > 2 * 1024 * 1024) {
            alert("File size exceeds 2MB max limit.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setPreviewImage(reader.result);
                setFormData((prev) => ({ ...prev, image: reader.result as string }));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: (type === "number") ? Number(value) : value
        }))
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/inventory/${itemId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Item updated successfully!")
                router.push("/inventory");
                router.refresh();
            } else {
                alert("Failed to update inventory item.");
            }

        } catch (error) {
            console.error("Error updating item:", error);
        }
    }

    // if (loading) {
    //     return (
    //         <div className="inventory-form-container card">
    //             <div className="form-header">
    //                 <h2>Edit Inventory</h2>
    //                 <p>Loading item data...</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="inventory-form-container card">
            <div className="form-header">
                <h2>Edit Inventory</h2>
                <p>Update the details of this inventory item</p>
            </div>
            <form onSubmit={handleSubmit} className="inventory-form">
                <div className="form-group">
                    <label >Item Code</label>
                    <input
                        type="text"
                        name="itemCode"
                        value={`ITEM-${itemId}`}
                        disabled
                        className="input-disabled"
                    />
                    <span className="input-hint">Auto-generated</span>
                </div>
                <div className="form-group">
                    <label>
                        Item Name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                    />
                </div>
                <div className="form-group">
                    <label>Item Image</label>
                    <div
                        className={`dropzone-wrapper ${isDragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageChange}
                            hidden
                        />
                        <label htmlFor="image-upload" className="dropzone-label">
                            {previewImage ? (
                                <div className="dropzone-preview">
                                    <Image
                                        src={previewImage}
                                        alt="Uploaded preview"
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "cover", borderRadius: "8px" }}
                                    />
                                    <span>Click to change image</span>
                                </div>
                            ) : (
                                <>
                                    <p className="dropzone-title">Click to upload or drag and drop</p>
                                    <span className="dropzone-sub">PNG, JPG or WEBP (Max. 2MB)</span>
                                </>
                            )}
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Item Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Item Description"
                    />
                </div>
                <div className="form-group">
                    <label>
                        Category <span className="required">*</span>
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Main Course">Main Course</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        Price <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.50"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        min={0}
                    />
                </div>
                <div className="form-group">
                    <label>
                        Unit <span className="required">*</span>
                    </label>
                    <select name="unit" value={formData.unit} onChange={handleChange}>
                        <option value="Piece">Piece</option>
                        <option value="Box">Box</option>
                        <option value="Kg">Kg</option>
                        <option value="Litre">Litre</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>
                        In Stock <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        name="stock"
                        required
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        value={statusValue}
                        disabled
                        className="input-disabled"
                    />
                    <span className="input-hint">
                        Status is auto-populated based on In Stock quantity.
                    </span>
                </div>
                <div className="form-group">
                    <label>Supplier</label>
                    <select
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                    >
                        <option value="Bean &amp; Brew Supplies">Bean &amp; Brew Supplies</option>
                        <option value="Global Foods Distributors">
                            Global Foods Distributors
                        </option>
                        <option value="Local Dairy Co.">Local Dairy Co.</option>
                    </select>
                </div>
                <div className="form-actions span-full">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn-submit" >
                        Update
                    </button>
                </div>
            </form >
        </div >
    )
}
