// pages/AdminPanel.jsx
import React, { useState } from 'react';
import Sidebar from "../components/AdminPanel/Sidebar";
import FileUpload from "../components/AdminPanel/FileUpload";
import DataTable from "../components/AdminPanel/DataTable";

export default function AdminPanel() {
  const [data, setData] = useState([]);

  const handleUpload = () => {
    // parse Excel file and update state (using SheetJS or similar)
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <FileUpload onUpload={handleUpload} />
        <DataTable data={data} />
      </main>
    </div>
  );
}