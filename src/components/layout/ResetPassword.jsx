import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("New password:", newPassword);
    // Call API to reset password here

    setError("");
    navigate("/login"); // redirect to login after success
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/adminloginbg.png')", // background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Brand top-left */}
      <div className="absolute z-30 top-8 left-8 flex items-center gap-3">
        <img src="/wisenergylogo.png" alt="WisEnergy" className="h-12 w-12" />
        <span className="text-3xl font-bold text-[#24924B] leading-tight">
          WisEnergy
        </span>
      </div>

      {/* Center card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-30 w-[95%] max-w-[420px] rounded-2xl bg-white shadow-xl border border-gray-200 px-8 py-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
        <p className="mb-6 text-center text-gray-600 text-[15px]">
          Please enter your new password
        </p>

        {error && (
          <div className="mb-4 text-center text-red-600 text-sm">{error}</div>
        )}

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium text-gray-700">
            New Password:
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full h-11 rounded-md border border-gray-300 bg-gray-100 px-4 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24924B]/30"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm mb-1 font-medium text-gray-700">
            Confirm Password:
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-11 rounded-md border border-gray-300 bg-gray-100 px-4 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24924B]/30"
          />
        </div>

        {/* Reset Button */}
        <button
          href="/reset-success" type="submit"
          className="w-full h-11 rounded-md bg-[#215C38] text-white font-semibold hover:bg-[#1a4a2d] transition-colors text-[16px]"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
