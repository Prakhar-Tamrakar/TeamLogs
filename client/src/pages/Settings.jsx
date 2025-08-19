import {
  User,
  Mail,
  MapPin,
  Phone,
  Camera,
  Save,
  X,
  Globe,
  FileText,
  Lock,
} from "lucide-react";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  // const { currentUser } = useSelector((state) => state.user);
  // const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || "");

  // console.log(currentUser);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click(); // triggers the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="min-h-screen  py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 flex flex-col items-end">
            <h1 className="text-2xl font-bold text-white">Update Profile</h1>
            <p className="text-blue-100 mt-1">
              Keep your information up to date
            </p>
          </div>

          {/* Profile Picture */}
          <div className="relative -mt-12 ml-6 w-fit bg-white p-1 rounded-full shadow-lg">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
                {/* <img src={avatarUrl} alt="" /> */}
              </div>
              <button
                onClick={handleButtonClick}
                type="button"
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:shadow-xl transition"
              >
                <Camera className="h-4 w-4 text-gray-600" />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </button>
            </div>
            <input type="file" accept="image/*" className="hidden" />
          </div>

          {/* Form */}
          <form className="p-6 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>

                {/* Full Name */}
                <div className="relative w-full">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline h-4 w-4 mr-2" />
                    Password
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Change password"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Location & Online Presence
                </h3>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your location"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline h-4 w-4 mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                    <FileText className="inline h-4 w-4 mr-2" />
                    About You
                  </h3>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="mt-2 text-sm text-gray-500">0/500 characters</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-md"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-md"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
