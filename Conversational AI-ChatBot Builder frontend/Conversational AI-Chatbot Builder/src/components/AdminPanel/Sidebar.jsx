// components/AdminPanel/Sidebar.jsx
export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="space-y-2">
        {["Dashboard", "Interactions","Tickets", "Configure ChatBot", "Provide Product List", "Manage Options", "Add Staff/Team", "Manage Staff/Team", "Notifications", ].map(item => (
          <button key={item} className="block w-full text-left hover:bg-gray-800 px-2 py-1 rounded">
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}