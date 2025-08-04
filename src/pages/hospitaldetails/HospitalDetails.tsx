import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImageConfig } from "../../config/ImageConfig";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../utils/axios";
import Map from "../../components/Map";
// import type { Place } from "../../api/place";

type CategoryObject = {
  id: string;
  label: string;
};

const categoryList: CategoryObject[] = [
  { id: "cardiology", label: "Cardiology" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "orthopedics", label: "Orthopedics" },
  { id: "neurology", label: "Neurology" },
  { id: "dermatology", label: "Dermatology" },
];

export default function HospitalDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const providerData = location.state;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [fileList, setFileList] = useState<File[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!providerData) {
      alert("Provider details missing");
      return;
    }

    const providerId = providerData.data.id;
    const formData = new FormData();

    formData.append("provider_id", providerId);
    formData.append("hospital_name", name);
    formData.append("contact_info", phoneNumber);
    formData.append("hospital_website", website);
    formData.append("latitude", "0.0"); 
    formData.append("hospital_categories", categoryValue);
    formData.append("provider_status", "true");

    fileList.forEach((file, index) => {
      formData.append(`images${index + 1}`, file);
    });

    try {
      const response = await axiosInstance.post("/hospitals", formData);
      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting hospital details:", error);
      alert("Failed to submit hospital details.");
    }
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const validFiles = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
      );

      const updatedList = [...fileList, ...validFiles].slice(0, 5);
      setFileList(updatedList);
    }
  };

  const fileRemove = (file: File) => {
    const updatedList = fileList.filter((f) => f !== file);
    setFileList(updatedList);
  };

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");
  const onDrop = () => wrapperRef.current?.classList.remove("dragover");

  return (
    <div className="relative top-15 h-full max-w-5xl mt-6 left-3/12">
      <h1 className="text-black font-bold text-3xl p-4">Add Hospital Details</h1>

      <form onSubmit={handleSubmit} className="pl-6 pt-8">
        {/* Hospital Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Hospital Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-2 rounded-md p-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Hospital Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border-2 rounded-md p-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
            Hospital Phone Number
          </label>
          <input
            id="phone_number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full border-2 rounded-md p-2 focus:ring-blue-500"
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label htmlFor="website" className="block text-sm font-medium mb-1">
            Hospital Website
          </label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
            className="w-full border-2 rounded-md p-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Select Category</label>
          {categoryList.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setCategoryValue(item.id)}
              className={`${
                categoryValue === item.id
                  ? "bg-blue-300"
                  : "bg-gray-100 hover:bg-gray-300"
              } flex-row p-2 cursor-pointer rounded-2xl m-2`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="images" className="block mb-2 font-medium">
            Upload Hospital Images
          </label>
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="flex justify-center border border-dashed border-gray-400 rounded-lg px-6 py-10">
              <div className="text-center">
                <PhotoIcon className="mx-auto size-12 text-gray-300" />
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      disabled={fileList.length >= 5}
                      onChange={onFileDrop}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* File list */}
          {fileList.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 font-semibold">Files to upload:</p>
              {fileList.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 p-3 mb-2 rounded"
                >
                  <img
                    src={
                      ImageConfig[file.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                    className="w-10 h-10 mr-3"
                  />
                  <div className="flex-grow">
                    <p>{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRemove(file)}
                    className="text-red-500 font-bold ml-3"
                  >
                    ×
                  </button>
                </div>
              ))}
              {fileList.length >= 5 && (
                <p className="text-red-500 text-sm mt-2">
                  Image upload limit reached (max 5 files).
                </p>
              )}
            </div>
          )}
        </div>
        <div>
             <Map />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full"
        >
          Save Details
        </button>
      </form>
    </div>
  );
}
