// components/AdminPanel/FileUpload.jsx
export default function FileUpload({ onUpload }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Upload Excel File</h3>
      <div className="flex items-center space-x-2">
        <input type="file" accept=".xlsx,.xls" className="border p-2 rounded w-full" />
        <button className="bg-gray-200 px-3 py-2 rounded">Use Sample Data</button>
        <button className="bg-red-200 px-3 py-2 rounded">Reset</button>
        <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={onUpload}>Upload to Server</button>
      </div>
    </div>
  );
}