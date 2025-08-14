import React, { useState } from "react";
import { Mail, Lock, ArrowRight,ArrowLeft, User } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordCheck = ({ email , validEmailChange }) => {

  const navigate = useNavigate()

  const [password , setPassword] = useState("");
  console.log(password)

  const handlePasswordCheck = async(e) =>{
    e.preventDefault();
    const res = await fetch("api/auth/signin" , {
      method : "POST",
      headers : {"content-type" : "application/json"},
      body : JSON.stringify({email , password})
    })
    const data = await res.json();
    if(!data.success){
      toast.error("invalid credential");
      return 
    }
    navigate("/");

  }

  return (
    <div>
        <div className="relative inset-0 ">
            <button className="bg-blue-500 p-1 rounded-full mb-3" onClick={validEmailChange}>
                <ArrowLeft className="text-white"/>
            </button>

        </div>
      <form className="space-y-6" onSubmit={handlePasswordCheck}>
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

              onChange={(e)=>(setPassword(e.target.value))}
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

        <div className="mt-6 text-center">
          <button className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
            Use a one-time code instead
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordCheck;
