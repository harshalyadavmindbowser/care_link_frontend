import React, { useRef, useState } from "react";
// import './drop-file-input.css';
import { ImageConfig } from "../config/ImageConfig";
import { PhotoIcon } from "@heroicons/react/24/solid";
interface DropFileInputProps {
  onFileChange: (files: File[]) => void;
}

const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [fileList, setFileList] = useState<File[]>([]);

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
    <>
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
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={onFileDrop}
                  />
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
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
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
        </div>
      ) : null}
    </>
  );
};

export default DropFileInput;
