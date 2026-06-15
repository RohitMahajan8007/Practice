import { useAuth } from "../Hooks/useAuth.jsx";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";

const Login = () => {

 
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        try {
            await handleLogin(formData);

            console.log("User Login Successfully...");
            navigate("/products");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#181A20] rounded-3xl p-8 border border-zinc-800 shadow-lg">
                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C430] ${errors.email ? 'border-red-500' : 'border-zinc-700'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full bg-transparent border-b py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F4C430] ${errors.password ? 'border-red-500' : 'border-zinc-700'}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#F4C430] text-black font-semibold py-3 rounded-xl transition hover:opacity-90"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#F4C430] hover:underline"
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