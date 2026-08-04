"use client"

import { useState } from "react";
import SelectFilter from "./SelectFilter";
import DateFilter from "./DateFilter";
import FilterButton from "./FilterButton";
import ResetButton from "./ResetButton";

const options = ["a", "b", "C"];
export default function InventoryFilterPanel({ onFilter, onReset }) {
    const [category, setCategory] = useState(options[0]);
    const [itemName, setItemName] = useState(options[0]);
    const [status, setStatus] = useState(options[0]);
    const [dateFrom, setDateFrom] = useState(new Date().toISOString().split("T")[0]);
    const [dateTo, setDateTo] = useState(new Date().toISOString().split("T")[0]);
    console.log(new Date().toISOString())
    return (
        <div className="filter-panel card">
            <SelectFilter
                label="Category"
                value={category}
                options={options}
                onChange={(value) => { setCategory(value); console.log(value) }}
            />
            <SelectFilter
                label="Item Name"
                value={itemName}
                options={options}
                onChange={(value) => { setItemName(value); console.log(value) }}
            />
            <SelectFilter
                label="Status"
                value={status}
                options={options}
                onChange={(value) => { setStatus(value); console.log(value) }}
            />
            <DateFilter
                label="Date From"
                value={dateFrom}
                onChange={(value) => { setDateFrom(value); console.log(value) }}
            />
            <DateFilter
                label="Date To"
                value={dateTo}
                onChange={(value) => { setDateTo(value); console.log(value) }}
            />
            <div className="filter-reset-buttons">
                <FilterButton />
                <ResetButton />
            </div>


        </div>
    )
}