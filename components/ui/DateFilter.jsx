"use client"

export default function DateFilter({label,value,onChange}){
    return(
        <div className="date-filter">
            <label className="filter-label">{label}</label>
            <div className="date-container">
                <input className="date-box"
                type="date"
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                />
            </div>
        </div>
    )
}