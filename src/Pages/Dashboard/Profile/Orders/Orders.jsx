import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Orders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h2>
            {orders.length === 0 ? (
                <p className="text-gray-600">You have no orders yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border border-gray-200">
                        <thead className="bg-gray-100 text-sm text-gray-700">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Product</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => (
                                <tr key={order._id} className="border-t text-gray-700">
                                    <td className="p-3">{idx + 1}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <img src={order.image} alt={order.name} className="w-10 h-10 rounded" />
                                            <span>{order.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">{order.quantity}</td>
                                    <td className="p-3">৳ {order.price}</td>
                                    <td className="p-3">
                                        <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                                            {order.status || "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;