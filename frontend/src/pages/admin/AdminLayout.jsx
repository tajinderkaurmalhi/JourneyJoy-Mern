import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Call this to refresh dashboard whenever CRUD happens
  const refreshDashboard = () => setRefreshTrigger(prev => prev + 1);

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "Tours", path: "/admin/tours" },
    { label: "Bookings", path: "/admin/bookings" },
    { label: "Contacts", path: "/admin/contacts" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className={`bg-white shadow-md transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="text-xl font-bold">Admin Panel</h2>}
          <button onClick={() => setCollapsed(!collapsed)} className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded">
            {collapsed ? "→" : "←"}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {links.map(link => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 my-1 rounded hover:bg-indigo-100 ${
                      isActive ? "bg-indigo-200 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  {collapsed ? link.label[0] : link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {/* Pass refreshDashboard & refreshTrigger to all nested routes */}
        <Outlet context={{ refreshDashboard, refreshTrigger }} />
      </main>
    </div>
  );
};

export default AdminLayout;
