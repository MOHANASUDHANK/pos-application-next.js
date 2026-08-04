"use client"
export default function SelectFilter({label,value,options,onChange}){
    return(
        <div className="select-filter">
            <label className="filter-label">{label}</label>
            <div className="select-container">
                <select className="select-box"
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                >
                    {options.map((option,ind)=>(
                        <option key={ind} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
        </div>
        </div>
    )
}
