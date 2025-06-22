import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          email="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
