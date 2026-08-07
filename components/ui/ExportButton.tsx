export default function ExportButton({ onExport }: { onExport: Function }) {
  return (
    <button className="export-button" onClick={() => onExport()}>
      <span>Export to Excel</span>
    </button>
  )
}