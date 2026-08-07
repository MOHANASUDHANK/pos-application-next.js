export default function FilterButton(){
    return(
        <div className="filter-button-container">
            <button className="filter-button" onClick={()=>console.log("filter clicked")}>
                Filter
            </button>
        </div>
    )
}