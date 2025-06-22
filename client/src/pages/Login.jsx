import React from "react";
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded shadow-md">
         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </div>
    </div>
  );
};

export default Login;