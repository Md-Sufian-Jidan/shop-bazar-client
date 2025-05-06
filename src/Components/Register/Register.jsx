import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from 'react-toastify';
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic()
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);
        if (data.password.length < 6) {
            return toast.error('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(data.password)) {
            return toast.error('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(data.password)) {
            return toast.error('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(data.password)) {
            return toast.error('Password must contain at least one number');
        }

        try {
            createUser(data.email, data.password)
                .then(() => {
                    updateUserProfile(data.name)
                        .then(async () => {
                            const res = await axiosPublic.post("/user-data", data)
                            if (res.data) {
                                const { token } = res.data;
                                localStorage.setItem("shobbazaar_token", token);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate(from, { replace: true });
                            }
                        })
                })
        } catch (error) {
            const msg = error.response?.data?.message || "Registration failed";
            console.log(error);
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 mb-5">
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-6">
                    Create your <span className="text-[#F97316]">ShobBazaar</span> account
                </h2>

                {serverError && (
                    <div className="text-red-500 text-sm mb-4">{serverError}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#10B981] focus:ring-2"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#10B981] focus:ring-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#10B981] focus:ring-2"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2.5 text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Register Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 bg-[#1D4ED8] text-white font-semibold rounded-md hover:bg-blue-800 transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </motion.button>
                </form>

                {/* Link to Login */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#F97316] hover:underline">
                        Login here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;