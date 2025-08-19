import React, { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from 'react-redux';
import { signInFailure , signInStart, signInSuccess } from "../redux/user/userSlice";

const PasswordCheck = ({ email, validEmailChange, signinWithOtp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [password, setPassword] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false); // loading state for OTP

  const handlePasswordCheck = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
   try {
     const res = await fetch("api/auth/signin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      toast.error("invalid credential");
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data.rest));
    navigate("/");
    
   } catch (error) {
      dispatch(signInFailure(error.message))
   }
  };

  const handleSigninWithOtp = async () => {
    try {
      setIsOtpLoading(true);
      const otpRes = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();

      if (otpData.success) {
        toast.success(otpData.message);
        signinWithOtp();
      } else {
        toast.error(otpData.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handlePasswordCheck}>
        <div className="relative inset-0 flex items-center py-1 font-semibold text-gray-300 gap-2">
          <button
            type="button"
            className="bg-blue-500 p-1 rounded-full"
            onClick={validEmailChange}
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          Back
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>

      {/* OTP Sign-in Link */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSigninWithOtp}
          disabled={isOtpLoading}
          className="font-medium text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {isOtpLoading ? (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          Use a one-time code instead
        </button>
      </div>
    </div>
  );
};

export default PasswordCheck;
