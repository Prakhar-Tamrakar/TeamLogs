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
  Eye,
  Calendar,
  EyeOff,
  Mars,
  Venus,
  Users,
  Briefcase as BriefcaseBusiness,
  MapPinned,
  Briefcase,
} from "lucide-react";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";


import { useState, useRef } from "react";
import Skills from "../components/Skills";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

import { toast } from "react-toastify";

const Settings = () => {
  const { currentUser, error } = useSelector((state) => state.user);

  // !------------------- imagekit--------------------------------------

  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [loading , setLoading] = useState(false)

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // !------------------------------------------

  const [showPassword, setShowPassword] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    number: currentUser.number || "",
    dob: currentUser.dob ? currentUser.dob.split("T")[0] : "",
    location: currentUser.location || "",
    gender: currentUser.gender || "",
    linkedin: currentUser.linkedin || "",
    about: currentUser.about || "",
    jobTitle: currentUser.jobTitle || "",
    officeLocation: currentUser.officeLocation || "",
    empType: currentUser.empType || "",
    avatar: currentUser.avatar || "",
    skills: currentUser.skills || [],
  });

  
  // !this function handle changes in input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  // ! function that handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    let updatedUserData;
    // ! change profile image
    if (selectedFile) {
      try {
        const authRes = await fetch("/api/imagekit-auth");
        const { signature, expire, token, publicKey } = await authRes.json();

        const uploadResponse = await upload({
          file: selectedFile,
          fileName: `${Date.now()}_${selectedFile.name}`,
          folder: "ProfileImages",
          publicKey,
          token,
          expire,
          signature,
        });

        let imageUrl = uploadResponse.url;
        updatedUserData = {...userData , avatar : imageUrl}
        setAvatarUrl(imageUrl);
      } catch (error) {
        let message = "Image upload failed";
        if (error instanceof ImageKitAbortError) message = "Upload aborted";
        else if (error instanceof ImageKitInvalidRequestError)
          message = "Invalid upload request";
        else if (error instanceof ImageKitUploadNetworkError)
          message = "Network error during upload";
        else if (error instanceof ImageKitServerError)
          message = "ImageKit server error";

        alert(message);
        dispatch(updateUserFailure(message));
        return;
      }
    }
    //!----------------------------------

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      });
      const data = await res.json();
      if (!data.success) {
        toast.error("Something went wrong");
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data.rest));
      // setUserData(data.rest);
      toast.success("Profile updated!");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen md:px-0 bg-gray-50 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-700 
                dark:from-gray-800 dark:via-blue-700 dark:to-gray-900 
                px-6 py-6 flex flex-col items-end"
          >
            <h1 className="text-2xl font-bold text-white">Update Profile</h1>
            <p className="text-blue-100 mt-1">
              Keep your information up to date
            </p>
          </div>

          {/* // * Profile Picture */}
          <div className="relative -mt-12 ml-6 w-fit bg-white dark:bg-gray-700 p-1 rounded-full shadow-lg">
            <div className="relative">
              {avatarUrl ? (
                 <img
                  className="h-24 w-24 rounded-full object-cover self-center  cursor-pointer"
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : avatarUrl
                  }
                  alt="user"
                  onClick={() => fileInputRef.current.click()}
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center
               bg-gradient-to-br from-blue-400 to-blue-600 
               dark:from-gray-800 dark:via-blue-700 dark:to-gray-600 "
                >
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              <button
                onClick={handleButtonClick}
                type="button"
                className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition"
              >
                <Camera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </button>
            </div>
          </div>

          {/* // !  Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* //!  Left Column */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Personal Information
                </h3>

                {/* // *  Full Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={userData.username || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Enter your name"
                  />
                </div>

                {/* // *  Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Enter your email"
                  />
                </div>

                {/* // *  Password */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Lock className="inline h-4 w-4 mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      value={userData.password}
                      onChange={handleChange}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Change password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div> */}

                {/* // *  Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="number"
                    value={userData.number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* // *  Date of birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Date of Birth
                  </label>
                  <input
                    type="Date"
                    id="dob"
                    value={userData.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* // * Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={userData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Enter your location"
                  />
                </div>

                {/* // * Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="inline h-4 w-4 mr-2" />
                    Gender
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="gender"
                        name="gender"
                        value="male"
                        checked={userData.gender === "male"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-gray-700 dark:text-gray-300 flex gap-1">
                        <Mars />
                        Male
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="gender"
                        name="gender"
                        value="female"
                        checked={userData.gender === "female"}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-gray-700 dark:text-gray-300 flex gap-1">
                        <Venus />
                        Female
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* //!Right Column */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Location & Online Presence
                </h3>

                {/* // * Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Globe className="inline h-4 w-4 mr-2" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    value={userData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* // * Bio */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center">
                    <FileText className="inline h-4 w-4 mr-2" />
                    About You
                  </h3>
                  <textarea
                    rows={2}
                    id="about"
                    value={userData.about}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    0/500 characters
                  </p>
                </div>

                {/* //! job information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Professional / Job Information
                  </h3>

                  {/* //* job  title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <BriefcaseBusiness className="inline h-4 w-4 mr-2" />
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      value={userData.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Enter your job title"
                    />
                  </div>

                  {/* // *Office Location */}
                  <div className="flex flex-col">
                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <MapPinned className="inline h-4 w-4 mr-2" />
                      Office Location
                    </label>
                    <input
                      type="text"
                      id="officeLocation"
                      value={userData.officeLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="Enter your office location"
                    />
                  </div>

                  {/* //* Employment type  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Briefcase className="inline h-4 w-4 mr-2" />
                      Employment Type
                    </label>
                    <div className=" sm:flex gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="employmentType"
                          id="empType"
                          value="full-time"
                          onChange={handleChange}
                          checked={userData.empType === "full-time"}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300 flex gap-1">
                          Full-Time
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="employmentType"
                          value="part-time"
                          id="empType"
                          checked={userData.empType === "part-time"}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300 flex gap-1">
                          Part-Time
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="employmentType"
                          value="intern"
                          id="empType"
                          checked={userData.empType === "intern"}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300 flex gap-1">
                          Intern
                        </span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="employmentType"
                          value="contract"
                          id="empType"
                          checked={userData.empType === "contract"}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300 flex gap-1">
                          Contract
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //! Skills Section */}
            <Skills />

            {/* //! Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 
                          dark:bg-gradient-to-r dark:from-gray-800 dark:via-blue-700 dark:to-gray-900 
                          text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-md
                          hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  // Spinner while loading
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="flex-1 sm:flex-none bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-md"
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
