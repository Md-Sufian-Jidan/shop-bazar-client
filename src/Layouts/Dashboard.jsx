import { Outlet, NavLink } from "react-router-dom";
import { FaUser, FaBox, FaHeart, FaShoppingCart } from "react-icons/fa";

const DashboardLayout = () => {
  const navItems = [
    { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
    { to: "/dashboard/orders", label: "Orders", icon: <FaBox /> },
    { to: "/dashboard/wishlist", label: "Wishlist", icon: <FaHeart /> },
    { to: "/dashboard/cartItems", label: "Cart Items", icon: <FaShoppingCart /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r p-4 shadow-md">
        <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md transition text-sm font-medium ${
                  isActive ? "bg-[#F97316] text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
