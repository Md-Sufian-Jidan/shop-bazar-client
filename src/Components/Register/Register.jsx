import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [firebaseError, setFirebaseError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useAuth();

    const onSubmit = async ({ name, email, password }) => {
        setLoading(true);
        setFirebaseError(null);
        try {
            const result = await createUser(email, password);
            await updateUserProfile(result.user, { displayName: name });
            navigate("/");
        } catch (err) {
            setFirebaseError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
            <motion.div
                className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-6">
                    Create your <span className="text-[#F97316]">ShobBazaar</span> account
                </h2>

                {firebaseError && (
                    <div className="text-red-500 text-sm mb-4">{firebaseError}</div>
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