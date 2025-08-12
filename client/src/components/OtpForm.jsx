import React, { useState, useRef } from "react";
import { KeyRound, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function OtpForm({ onSubmit }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next box if a digit is entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    if (error) setError("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  try {
    onSubmit(otp.join("")); // pass as string
  } catch (error) {
    toast.error(error);
  }
};


  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Label */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Enter OTP
          </label>
          {/* OTP Boxes */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <div key={index} className="relative">
                {index === 0 && (
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-400">
                    <KeyRound className="h-5 w-5" />
                  </div>
                )}
                <input
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    error ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-red-600 flex items-center justify-center">{error}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Verify OTP
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
