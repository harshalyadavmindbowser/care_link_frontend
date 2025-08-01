import { useState } from "react";

function ProfileCard() {
  const [profilePic] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [formData] = useState({
    name: "Jidnya Mahajan",
    email: "jidnyamahajan@gmail.com",
    dob: "1999-07-28",
    gender: "Female",
    address: "Stirling Towers, Baner",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const firstLetter = formData.name.charAt(0).toUpperCase();

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
};


  const handlePasswordSubmit = () => {
    console.log("Resetting password with:", passwordData);
    setPasswordData({ currentPassword: "", newPassword: "" });
  };

  return (
    <div className="max-w-4xl mt-40 mx-auto bg-white flex">
      <div className="w-1/3 flex flex-col items-center p-6 space-y-4 border-r border-gray-300">
        {profilePic ? (
          <img
            src={profilePic}
            alt={formData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-orange-300 flex items-center justify-center text-4xl font-semibold text-white">
            {firstLetter}
          </div>
        )}
        <div className="text-center">
          <h2 className="text-lg font-semibold">{formData.name}</h2>
          <p className="text-gray-500 text-sm">{formData.email}</p>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-sm border border-red-400 text-red-500 rounded px-3 py-1 hover:bg-red-50"
          >
            {showPasswordForm ? "Cancel" : "Reset Password"}
          </button>
        </div>
      </div>

      <div className="w-2/3 p-6 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Address</p>
            <p>{formData.address}</p>
          </div>
          <div>
            <p className="font-semibold">DOB</p>
            <p>{formData.dob}</p>
          </div>
          <div>
            <p className="font-semibold">Gender</p>
            <p>{formData.gender}</p>
          </div>
        </div>

        {showPasswordForm && (
          <div className="mt-10 max-w-md">
            <h3 className="text-md font-semibold mb-4">Reset Password</h3>

            <div className="mt-5 relative mb-6">
  <input
    type="password"
    name="currentPassword"
    id="currentPassword"
    value={passwordData.currentPassword}
    onChange={handlePasswordChange}
    placeholder="Current Password"
    className="peer w-full border-b py-2 bg-transparent placeholder-transparent focus:outline-none"
  />
  <label
    htmlFor="currentPassword"
    className={`absolute left-0 text-gray-500 transition-all duration-300
      ${passwordData.currentPassword
        ? "top-[-0.9rem] text-sm text-[#2C253D]"
        : "top-2.5 text-base text-gray-400 peer-focus:top-[-0.9rem] peer-focus:text-sm peer-focus:text-[#2C253D]"
      }`}
  >
    Current Password
  </label>
</div>

<div className="relative mb-6">
  <input
    type="password"
    name="newPassword"
    id="newPassword"
    value={passwordData.newPassword}
    onChange={handlePasswordChange}
    placeholder="New Password"
    className="peer w-full border-b py-2 bg-transparent placeholder-transparent focus:outline-none"
  />
  <label
    htmlFor="newPassword"
    className={`absolute left-0 text-gray-500 transition-all duration-300
      ${passwordData.newPassword
        ? "top-[-0.9rem] text-sm text-[#2C253D]"
        : "top-2.5 text-base text-gray-400 peer-focus:top-[-0.9rem] peer-focus:text-sm peer-focus:text-[#2C253D]"
      }`}
  >
    New Password
  </label>
</div>


            <button
              onClick={handlePasswordSubmit}
              className="text-sm border border-green-400 text-green-600 rounded px-3 py-1 hover:bg-green-50"
            >
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
