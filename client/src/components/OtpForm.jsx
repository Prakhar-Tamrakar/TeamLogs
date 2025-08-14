import React, { useState, useRef } from "react";
import { KeyRound, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function OtpForm({ email ,onSubmit }) {
  // State to store 6-digit OTP (each index = 1 input box)
  const [otp, setOtp] = useState(Array(6).fill(""));

  // State for error messages
  const [error, setError] = useState("");

  // Loading state for button spinner
  const [isLoading, setIsLoading] = useState(false);

  // Refs to store input elements for programmatic focus
  const inputsRef = useRef([]);

  /**
   * Handles individual OTP input changes
   * - Allows only digits
   * - Moves focus to next box when a digit is entered
   */
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value; // Update OTP value at current index
    setOtp(newOtp);

    // Move focus to next box if digit entered
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    // Clear error when user starts typing again
    if (error) setError("");
  };

  /**
   * Handles keyboard navigation
   * - If Backspace is pressed on an empty box, move focus to previous box
   */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /**
   * Handles form submission
   * - Joins OTP array into a string before sending
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onSubmit(otp.join("")); // Send OTP as string
    } catch (error) {
      toast.error(error);
    }
  };

  /**
   * Handles pasting OTP from clipboard
   * - Distributes pasted digits across all input boxes
   * - Works even if pasted into the middle box
   */
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    // Only allow digits in pasted data
    if (!/^\d+$/.test(pasteData)) return;

    const pasteArray = pasteData.split("").slice(0, 6); // Take only first 6 digits
    const newOtp = [...otp];

    // Fill each box with corresponding digit
    pasteArray.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });

    setOtp(newOtp);

    // Focus the last filled input
    const lastIndex = pasteArray.length - 1;
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
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

          {/* OTP Input Boxes */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <div key={index} className="relative">
                
                {/* Icon on the first input */}
                {index === 0 && (
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-gray-400">
                    <KeyRound className="h-5 w-5" />
                  </div>
                )}

                {/* Single OTP input */}
                <input
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1" // One character per box
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste} // Paste handler
                  className={`w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    error ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 flex items-center justify-center">
              {error}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            // Spinner while loading
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
