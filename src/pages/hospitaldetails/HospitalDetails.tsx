import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { ImageConfig } from "../../config/ImageConfig";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../utils/axios";
// import DropFileInput from "../../components/DropFileInput";


type categoryObject = {
  id: string;
  label: string;
};
const categoryList: categoryObject[] = [
  { id: "cardioogy", label: "Cardioogy" },
  { id: "pediatics", label: "Pediatics" },
  { id: "orthopedics", label: "Orthopedics" },
  { id: "neurology", label: "Neurology" },
  { id: "dermatology", label: "Dermatology" },
];

export default function HospitalDetails() {
  const navigate = useNavigate();
  // const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");

  const [name, setName] = useState("");

  const [categoryValue, setCategoryValue] = useState("");

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [fileList, setFileList] = useState<File[]>([]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      provider_id: "1223344",
      hospital_name: name,
      contact_info: phoneNumber,
      hospital_website: website,
      location_id: "12233",
      categoryValue,
      description: "hjdf hjbdfh sgdshg dsgf",
      // fileList
    };
   await axiosInstance
      .post("/hospitals", payload)
      .then(function (response) {
        console.log(response);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFileChange = (files: File[]) => {
    console.log(files);
  };

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <div className="relative h-full max-w-5xl mt-6 items-center left-3/12">
      <div className=" relative top-6  w-full ">
        <h1 className="text-black   w-full  font-bold text-3xl p-4">
          Add Hospital Details
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="absolute pl-6 pt-8">
        <div className={`inputGroup`}>
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
          {/* {emailError && <p className="errorText">{emailError}</p>} */}
        </div>
        <div className={`inputGroup`}>
          <label htmlFor="address">Hospital Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter hospital address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className={`inputGroup`}>
          <label htmlFor="phone_number">Hospital Phone Number</label>
          <input
            type="text"
            id="phone_number"
            placeholder="Enter hospital phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className={`inputGroup`}>
          <label htmlFor="website">Hospital Website</label>
          <input
            type="text"
            id="website"
            placeholder="Enter hospital website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        <div className={`inputGroup `}>
          <label htmlFor="images">Select Categories</label>
          {categoryList.map((items) => (
            <button
              className={`${
                categoryValue === items.id
                  ? "bg-gray-400"
                  : "bg-gray-100 hover:bg-gray-500"
              }flex-row p-2 cursor-pointer rounded-2xl m-2`}
              key={items.id}
              type="button"
              onClick={() => setCategoryValue(items.id)}
            >
              {items.label}
            </button>
          ))}
        </div>
        <div className={`inputGroup`}>
          {/* <DropFileInput onFileChange={onFileChange}/> */}
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="col-span-full">
              <label htmlFor="images">Upload Hospital Images</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      {fileList.length >= 5 ? (
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          readOnly
                        />
                      ) : (
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={onFileDrop}
                        />
                      )}

                      {/* <input type="file" value="" onChange={onFileDrop} /> */}
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          {fileList.length > 0 ? (
            <div className="mt-7">
              <p className="mb-5">Ready to upload</p>
              {fileList.map((item, index) => (
                <div
                  key={index}
                  className="relative flex  mb-2 p-3 rounded-2xl bg-gray-100 "
                >
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                    className="w-22 h-23"
                  />
                  <div className="flex flex-col justify-between ">
                    <p>{item.name}</p>
                    <p>{item.size}B</p>
                  </div>

                  <span
                    className="w-10 h-10 rounded-b-2xl flex items-center justify-center absolute right-1 top-1 cursor-pointer"
                    onClick={() => fileRemove(item)}
                  >
                    x
                  </span>
                </div>
              ))}
              {fileList.length >= 5 ? (
                <p className="text-red-500">
                  You exceeded Image upload limit 5
                </p>
              ) : (
                ""
              )}
            </div>
          ) : null}
        </div>
        <div className={`inputGroup`}>
          <label htmlFor="location">Select Location</label>
        </div>
        <button
          type="submit"
          className="relative text-white rounded-3xl p-3 cursor-pointer  bg-[#38bff0] hover:bg-[#0d83ba]  "
        >
          Save Details
        </button>
      </form>
    </div>
  );
}
