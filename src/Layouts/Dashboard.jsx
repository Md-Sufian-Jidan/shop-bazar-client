import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaBox, FaHeart, FaShoppingCart } from "react-icons/fa";

const defaultProfileImage = "https://i.ibb.co/4pDNDk1/avatar.png";

const fakeUser = {
  name: "Rahim Uddin",
  email: "rahim@example.com",
  joined: "2023-07-15",
  photo: "" // If no photo, use default
};

const fakeOrders = [
  {
    id: "ORD12345",
    date: "2024-04-20",
    items: 3,
    status: "Delivered",
    total: 3200,
  },
  {
    id: "ORD12346",
    date: "2024-04-10",
    items: 2,
    status: "Pending",
    total: 1800,
  },
];

const fakeWishlist = [
  {
    id: 1,
    name: "Samsung Galaxy A14",
    price: 22000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Men's Panjabi",
    price: 1500,
    image: "https://via.placeholder.com/150",
  },
];

const fakeCart = [
  {
    id: 1,
    name: "Fresh Atta 2kg",
    price: 130,
    quantity: 2,
  },
  {
    id: 2,
    name: "Panasonic Rice Cooker",
    price: 3500,
    quantity: 1,
  },
];

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState(fakeUser);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleProfileUpdate = async () => {
    let uploadedUrl = user.photo;
    if (newPhoto) {
      uploadedUrl = await handlePhotoUpload(newPhoto);
    }
    setUser({
      ...user,
      name: newName,
      photo: uploadedUrl,
    });
    setEditMode(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "orders", label: "Orders", icon: <FaBox /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "cart", label: "Cart Items", icon: <FaShoppingCart /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1F2937] mb-6">My Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="flex md:flex-col gap-4 w-full md:w-1/4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm
                  ${tab === t.id
                    ? "bg-[#F97316] text-white"
                    : "bg-white text-[#1F2937] border border-gray-200"}
                `}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            className="flex-1 bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {tab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                <img
                  src={user.photo || defaultProfileImage}
                  alt="User"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                {editMode ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="border p-2 rounded w-full"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setNewPhoto(e.target.files[0]);
                        setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                    {previewUrl && <img src={previewUrl} className="w-24 h-24 rounded-full" alt="Preview" />}
                    <button
                      className="bg-[#10B981] text-white px-4 py-2 rounded"
                      onClick={handleProfileUpdate}
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {user.joined}</p>
                    <button
                      className="mt-4 text-sm text-[#1D4ED8] underline"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            )}

            {tab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                <ul className="space-y-4">
                  {fakeOrders.map((order) => (
                    <li key={order.id} className="border p-4 rounded-md shadow">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Items:</strong> {order.items}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                      <p><strong>Total:</strong> ৳{order.total}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {fakeWishlist.map((item) => (
                    <div key={item.id} className="border rounded-md p-4 shadow">
                      <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-[#F97316] font-bold">৳{item.price}</p>
                      <button className="text-sm text-red-500 mt-2">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "cart" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <ul className="space-y-4">
                  {fakeCart.map((item) => (
                    <li key={item.id} className="border p-4 rounded-md shadow flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#10B981]">৳{item.price * item.quantity}</p>
                        <button className="text-sm text-red-500">Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-right font-bold mt-4">Total: ৳{fakeCart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;