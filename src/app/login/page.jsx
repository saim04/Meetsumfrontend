"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        displayName,
        password,
        img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      })
    );
    alert("Login successful!");
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="flex flex-col items-center mb-4">
          {/* <img
            src=""
            alt="Profile"
            className="w-24 h-24 rounded-full bg-gray-300"
          /> */}
          <h2 className="text-2xl font-semibold mt-2">Login</h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
