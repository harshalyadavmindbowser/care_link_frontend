import React, { useState } from "react";
import axiosInstance from "../../utils/axios";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [medicalSpecialty, setMedicalSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState("");

    const [emailFocused, setEmailFocused] = useState(false);
    const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
      let isValid = true;
    setEmailError("");
    // setPasswordError("");
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (password.length < 6) {
      // setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }
    if (!isValid) return;
    if (location.pathname == "/patient") {
      const payload = {
        full_name: name,
        email: email,
        password: password,
        role: "patient",
        // image,
        provider_status:false,
        dob: dob,
        gender: gender,
        phone_no: phoneNumber,
        address: address,
        insurance_provider: insuranceProvider,
        policy_no: policyNumber,
      
      };
      console.log("payload", payload);

      const response=await axiosInstance.post("/auth/signup", payload)
      if(response){
        alert("Patient register successfull")
        navigate('/')
      }
    } else {
      const payload = {
       full_name: name,
        email: email,
        password: password,
        role: "provider",
        // image,
         medical_specialty: medicalSpecialty,
         license_no:  licenseNumber,
         hospitals:  hospitalName,
       phone_no: contactNumber,
       description: description,
      };
      console.log("payload", payload);
     const response= await axiosInstance.post("/auth/signup", payload);
     if(response){
      alert('Povider register successfull');
      navigate('/')
     }
       
    }
  };
  return (
    <div className="relative top-15 h-full max-w-5xl mt-6 items-center left-3/12">
      <div className=" relative top-6  w-full ">
        <h1 className="text-black   w-full  font-bold text-3xl p-4">
          {location.pathname == "/patient"
            ? " Create your patient account"
            : "Join as a provider"}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="relative pl-6 pt-8 w-full">
        <div className="grid grid-cols-3 gap-2 ">
          <div className="col-span-2  ">
            <div className="mb-4">
              {/* <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full name
              </label> */}
              <input
                id="name"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label> */}
              {/* <input
                type="text"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}

                 <div className="relative w-full mt-4">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`
                  peer w-full border-b py-2 bg-transparent placeholder-transparent focus:outline-none 
                  transition-all
                  ${
                    emailError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#2C253D]"
                  }
                `}
              />
              <label
                htmlFor="email"
                className={`
                  absolute left-0 text-gray-500 transition-all duration-300
                  ${
                    emailFocused || email
                      ? "top-[-0.9rem] text-sm text-[#2C253D]"
                      : "top-2.5 text-base text-gray-400"
                  }
                `}
              >
                Email
              </label>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            </div>

            <div className="mb-4">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label> */}
              <input
                type="text"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {location.pathname == "/patient" ? (
              <>
                <div className="mb-4">
                  {/* <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of birth
                  </label> */}
                  <input
                    type="Date"
                    id="dob"
                    placeholder="Date of birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  {/* <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label> */}
                  <input
                    type="text"
                    id="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  {/* <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone number
                  </label> */}
                  <input
                    type="text"
                    id="phone_number"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  {/* <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label> */}
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  {/* <label
                    htmlFor="insurance_provider"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Insurance provider
                  </label> */}
                  <input
                    type="text"
                    id="insurance_provider"
                    placeholder="Insurance provider"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  {/* <label
                    htmlFor="policy_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Policy number
                  </label> */}
                  <input
                    type="text"
                    id="policy_number"
                    placeholder="Policy number"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  {/* <label
                    htmlFor="policy_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Medical specialty
                  </label> */}
                  <input
                    type="text"
                    id="policy_number"
                    placeholder=" Medical specialty"
                    value={medicalSpecialty}
                    onChange={(e) => setMedicalSpecialty(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>{" "}
                <div className="mb-4">
                  {/* <label
                    htmlFor="policy_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    License number
                  </label> */}
                  <input
                    type="text"
                    id="policy_number"
                    placeholder="License number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>{" "}
                <div className="mb-4">
                  {/* <label
                    htmlFor="policy_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hospital/Clinic
                  </label> */}

                  <input
                    type="text"
                    id="policy_number"
                    placeholder="Hospital/Clinic"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>{" "}
                <div className="mb-4">
                  <input
                    type="text"
                    id="policy_number"
                    placeholder="Contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-full ">
                  <textarea
                    id="description"
                    name="description"
                    className="block w-full rounded-md bg-[#E8EDF2]  px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm/6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </>
            )}
          </div>
          <div className=" bg-[#E8EDF2] relative  flex flex-col  items-center justify-enter gap-9">
            <div className="bg-re0 t-1">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                className="relative rounded-full h-65 m-3"
              />
            </div>

            <div className="relative flex justify-center ">
              <input
                type="file"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 pl-4"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="relative  text-white  cursor-pointer  mt-2 justify-center  rounded-[10px] bg-[#38bff0] hover:bg-[#0d83ba]  "
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Register;
