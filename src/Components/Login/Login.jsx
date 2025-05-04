import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [firebaseError, setFirebaseError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn, googleSignIn } = useAuth();

    const onSubmit = async ({ email, password }) => {
        setLoading(true);
        setFirebaseError(null);
        try {
            await signIn(email, password);
            navigate("/");
        } catch (err) {
            setFirebaseError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await googleSignIn();
            navigate("/");
        } catch (err) {
            setFirebaseError(err.message);
        }
    };

    return (
        <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 mb-5">
            <motion.div
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-6">
                    Welcome back to <span className="text-[#F97316]">ShobBazaar</span>
                </h2>

                {firebaseError && (
                    <div className="text-red-500 text-sm mb-4">{firebaseError}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Min 6 characters" },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 bg-[#1D4ED8] text-white rounded-md font-semibold hover:bg-blue-800 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </motion.button>
                </form>

                {/* Google Signup */}
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignup}
                        className="w-full py-2 flex items-center justify-center gap-2 bg-[#10B981] text-white font-semibold rounded-md hover:bg-emerald-600 transition"
                    >
                        <FaGoogle />
                        Sign up with Google
                    </button>
                </div>

                {/* Link to Register */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#F97316] hover:underline">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;