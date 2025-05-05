import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
    const {user} = useAuth();
//   const [user, setUser] = useState({
//     name: "Shahin Alam",
//     email: "shahin@example.com",
//     joined: "2024-02-15",
//   });

  useEffect(() => {
    // You can fetch real user data here from an API
    // Example: axios.get("/api/user/profile")
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">Profile Information</h2>
      <div className="space-y-3">
        <div>
          <p className="text-gray-600 font-medium">Full Name</p>
          <p className="text-[#1F2937]">{user?.displayName}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Email</p>
          <p className="text-[#1F2937]">{user?.email}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Joined Date</p>
          {/* <p className="text-[#1F2937]">{user?.joined}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
