export default function ExportButton({onClick}){
 return (
    <button className="export-button" onClick={onClick}>
      <span>Export to Excel</span>
    </button>
 )
}