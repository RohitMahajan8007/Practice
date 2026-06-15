import { useAuth } from "../Hooks/useAuth.jsx";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            api: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            setLoading(true);

            await handleLogin(formData);

            console.log("User Login Successfully...");
            navigate("/products");
        } catch (error) {
            setErrors({
                api:
                    error?.response?.data?.message ||
                    "Invalid email or password",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login
                </h2>

                {errors.api && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
                        {errors.api}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                >
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border p-3 rounded-lg outline-none ${errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full border p-3 rounded-lg outline-none ${errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;