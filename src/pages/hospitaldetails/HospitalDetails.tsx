import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PhotoIcon } from '@heroicons/react/24/solid'
import DropFileInput from "../../components/DropFileInput";


type categoryObject={
  id: string,
  label: string
}
const categoryList: categoryObject[]=[ 
  {id: 'cardioogy', label:'Cardioogy'},
  {id: 'pediatics', label:'Pediatics'},
  {id: 'orthopedics', label:'Orthopedics'},
  {id: 'neurology', label:'Neurology'},
  {id: 'dermatology', label:'Dermatology'}
];

export default function HospitalDetails() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
   const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ categoryValue, setCategoryValue] = useState("");




  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }
    if (!isValid) return;
    console.log("Email:", email);
    console.log("Password:", password);
    login({
      email,
      role: "doctor",
      total_job_posted: 3,
      total_cand_hired: 5,
      active_job_posts: 2,
    });
  
    navigate("/dashboard");
  };

    const onFileChange = (files:File[]) => {
        console.log(files);
    }

  return (
 
      <div className="relative h-full max-w-5xl mt-6 items-center left-3/12">
        <div className=" relative top-6  w-full ">
          <h1 className="text-black   w-full  font-bold text-3xl p-4">Add Hospital Details</h1>
          </div>
          <form onSubmit={handleLogin} className="absolute pl-6 pt-8">
            <div >
              <label htmlFor="name">Hospital Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter hospital name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-2 outline-none"
              />
              {emailError && <p className="errorText">{emailError}</p>}
            </div>
            <div >
              <label htmlFor="address">Hospital Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter hospital address"
                value={password}
                // onChange={(e) => handleFileChangeetPassword(e.target.value)}
                required
              />
            </div>
            <div >
              <label htmlFor="phone_number">Hospital Phone Number</label>
              <input
                type="text"
                id="phone_number"
                placeholder="Enter hospital phone number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div >
              <label htmlFor="website">Hospital Website</label>
              <input
                type="text"
                id="website"
                placeholder="Enter hospital website"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
              <div className={`inputGroup ${passwordError ? "errorBox" : ""}`}>
              <label htmlFor="images">Select Categories</label>
              {categoryList.map((items)=>(
                <button className={`${ categoryValue === items.id? 'bg-gray-400': 'bg-gray-100 hover:bg-gray-500' }flex-row p-2 cursor-pointer rounded-2xl m-2`} key={items.id} type="button" onClick={()=> setCategoryValue(items.id)}>{items.label}</button>
              ))}
           
            </div>
            <div >
              <div className="col-span-full">
               <label htmlFor="images">Upload Hospital Images</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange}/> */}
                
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
    
                    <DropFileInput onFileChange={onFileChange}/>
            </div>
              <div >
              <label htmlFor="location">Select Location</label>
            
            </div>
            <button type="submit" className="loginButton">
              Save Details
            </button>
          </form>
        
      </div>
  );
}
