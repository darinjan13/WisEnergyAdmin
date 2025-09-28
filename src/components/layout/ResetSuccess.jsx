import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // using lucide-react for the check icon

function ResetSuccess() {
  const navigate = useNavigate();

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
      <div className="relative z-30 w-[95%] max-w-[420px] rounded-2xl bg-white shadow-xl border border-gray-200 px-8 py-10 flex flex-col items-center">
        {/* Success icon */}
        <CheckCircle className="w-16 h-16 text-[#24924B] mb-4" />

        {/* Success message */}
        <h2 className="text-lg font-medium text-center mb-6 text-gray-800">
          Your password has been <br /> successfully reset!
        </h2>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/")}
          className="w-full h-11 rounded-md bg-[#215C38] text-white font-semibold hover:bg-[#1a4a2d] transition-colors text-[16px]"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetSuccess;
