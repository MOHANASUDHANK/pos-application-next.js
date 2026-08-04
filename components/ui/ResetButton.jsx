export default function  ResetButton(){
    return(
        <div className="reset-button-container">
            <button className="reset-button" onClick={()=>console.log("reset clicked")}>
                Reset
            </button>
        </div>
    )
}