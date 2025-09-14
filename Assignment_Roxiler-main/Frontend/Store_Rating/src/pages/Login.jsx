import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useSignInWithEmailAndPassword from "../hooks/useSignInWithEmailAndPassword"
import { useSelector } from "react-redux";
import { useRef } from 'react';
import { useEffect } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const isLoggedIn = useSelector(store => store.user.isLoggedIn)
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);
    let refEmail = useRef();
    let refPassword = useRef();
    const login = useSignInWithEmailAndPassword();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(refEmail, refPassword, navigate);

    };
    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                ref={refEmail}
                                required
                                className="mt-1 w-full text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Email..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                ref={refPassword}

                                required
                                className="mt-1 w-full text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Password..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition duration-200"
                        >
                            Login
                        </button>
                    </form>
                    <h3 className="text-black text-center text-sm sm:text-base">
                        New? <Link to="/register" className="text-purple-500 hover:underline">Register here</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Login;
