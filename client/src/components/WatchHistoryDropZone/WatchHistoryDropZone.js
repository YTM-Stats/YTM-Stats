import React from "react";
import Button from "../Button/Button.js";
import { useDropzone } from "react-dropzone";

function fileNameValidator(file) {
    if (file.name.toLowerCase() !== "watch-history.json" && file.name.toLowerCase() !== "watch-history") {
        return {
            code: "invalid file name",
            message: "Expected a watch-history.json file"
        }
    }
    return null

}

export default function WatchHistoryDropZone({className, onDrop, onDropAccepted, onDropRejected, ...props}) {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
      onDrop,
      onDropAccepted,
      onDropRejected,
    noClick: true,
    accept: ".json, application/json",
      validator: fileNameValidator
  });

  return (
    <label {...getRootProps()} className={`${className} block bg-gray-200 p-4 rounded-2xl w-full`}>
      <div
        className={` px-8 py-20 bg-gray-200 border-4 rounded-2xl
      text-lg font-bold text-gray-500
      flex-col items-center flex gap-1 
            border-dashed ${
              isDragActive ? "border-rose-500" : "border-gray-500"
            } transition-colors
            hover:border-rose-500
            `}
      >
        <input {...getInputProps()} />
        Upload your music history
        <Button
          onClick={open}
          variant="filled"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          }
        >
          Upload
        </Button>
      </div>
    </label>
  );
}
