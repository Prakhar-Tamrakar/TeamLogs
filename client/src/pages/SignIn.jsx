import React, { useContext, useState } from "react";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordCheck from "../components/PasswordCheck";
import OtpForm from "../components/OtpForm";

import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

import ThemeSwitcher from "../components/ThemeSwitcher";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [signinWithOtp, setSigninWithOtp] = useState(false);

  const handleShowEmailForm = () => {
    setValidEmail(false);
  };
  const handleShowOtpForm = () => {
    setSigninWithOtp(true);
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signin-verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    setValidEmail(true);
  };

  const handleOtpVerification = async (e, otp) => {
    e.preventDefault();
    try {

      const res = await fetch("/api/auth/signin-Verify-Otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      dispatch(signInSuccess(data.rest));
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center  p-4">
      {/* Theme toggle button */}
      <ThemeSwitcher className="absolute top-4 right-4"/>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <form
            onSubmit={handleEmailCheck}
            className={`${validEmail ? "hidden" : ""} ${
              signinWithOtp ? "hidden" : ""
            } space-y-6`}
          >
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
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

            {/* switch to signup */}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                First time here?{" "}
                <Link to="/signup">
                  <button className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                    Create an account
                  </button>
                </Link>
              </p>
            </div>
            {/* -------------------------------------------- */}
          </form>
          {validEmail && !signinWithOtp && (
            <PasswordCheck
              email={email}
              validEmailChange={handleShowEmailForm}
              signinWithOtp={handleShowOtpForm}
            />
          )}
          {signinWithOtp && (
            <OtpForm email={email} onSubmit={handleOtpVerification} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
