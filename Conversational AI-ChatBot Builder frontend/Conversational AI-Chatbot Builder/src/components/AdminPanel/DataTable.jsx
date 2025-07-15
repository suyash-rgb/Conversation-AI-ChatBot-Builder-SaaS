// components/DataTable.jsx
export default function DataTable({ data }) {
  return (
    <table className="min-w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          {["User Name", "Email Id", "Contact Number", "Device Sticker No.", "Product Name", "AMC Starting Date", "AMC Ending Date", "Issues"].map(col => (
            <th key={col} className="border px-4 py-2 text-left">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((val, i) => (
              <td key={i} className="border px-4 py-2">{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}