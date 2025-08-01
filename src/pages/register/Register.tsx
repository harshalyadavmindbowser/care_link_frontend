import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axios";
import Button from "../../components/Button";
import {useLocation} from 'react-router-dom';

const Register: React.FC = () => {

  // const navigate = useNavigate();
 const location = useLocation();
  // const isLoginPage = location.pathname === '/' || location.pathname === '/register';

  // console.log("Current Path:333333", location.pathname);




  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
         name,
         email,
         password,
         dob,
         gender,
         phoneNumber,
         address,
         insuranceProvider,
         policyNumber
    };
    console.log("payload",payload);
    
    // await axiosInstance
    //   .post("/hospitals", payload)
    //   .then(function (response) {
    //     console.log(response);
    //     navigate("/dashboard");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  return (
    <div className="relative top-15 h-full max-w-5xl mt-6 items-center left-3/12">
      <div className=" relative top-6  w-full ">
        <h1 className="text-black   w-full  font-bold text-3xl p-4">
          Create your patient account
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="relative pl-6 pt-8 w-full ">
  <div className="grid grid-cols-3 gap-2">
    <div className="col-span-1">
      <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full name
          </label>
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
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

      
{location.pathname =='/patient'? <>
  <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of birth
          </label>
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
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
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
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone number
          </label>
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
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
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
          <label
            htmlFor="insurance_provider"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Insurance provider
          </label>
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
          <label
            htmlFor="policy_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Policy number
          </label>
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
:
   <>  
   {/* Medical  specialty


 */}
        <div className="mb-4">
          <label
            htmlFor="policy_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
         Medical  specialty
          </label>
          <input
            type="text"
            id="policy_number"
            placeholder=" Medical specialty"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
            className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> <div className="mb-4">
          <label
            htmlFor="policy_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
        License number
          </label>
          <input
            type="text"
            id="policy_number"
            placeholder="License number"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
            className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> <div className="mb-4">
          <label
            htmlFor="policy_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
        Hospital/Clinic
          </label>
          <input
            type="text"
            id="policy_number"
            placeholder="Hospital/Clinic"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
            className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> <div className="mb-4">
          <label
            htmlFor="policy_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
        Contact number
          </label>
          <input
            type="text"
            id="policy_number"
            placeholder="Contact number"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required
            className="w-full border-none border-gray-300 bg-[#E8EDF2] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> 
        <div className="col-span-full">
          <label
            htmlFor="policy_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
         Description
          </label>
           <textarea id="description" name="description"  className="block w-full rounded-md bg-[#E8EDF2]  px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm/6"value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            required></textarea>
        </div>
        </>
        }
     
    </div>
    {/* <div className="m-32 bg-[#E8EDF2]">
        <p>djsjjdss</p>
    </div> */}

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
