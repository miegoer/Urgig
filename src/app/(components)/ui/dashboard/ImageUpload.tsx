import React, { useState } from "react";
import { storage } from "@/app/api/(3rdParty)/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface ImageUploadProps {
  setImageURL: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageURL }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const fileSizeLimit = 2 * 1024 * 1024; // 2MB in bytes
      if (selectedFile.size > fileSizeLimit) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    // Generate a unique file name
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${file.name
      .split(".")
      .pop()}`;

    const storageRef = ref(storage, `images/${uniqueName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageURL(downloadURL);
          console.log("Image URL:", downloadURL);
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Choose File Button */}
      <label
        htmlFor="fileUpload"
        className="bg-[#252531] text-white text-sm rounded-full px-4 py-2 cursor-pointer hover:bg-[#3F403F] transition-colors"
      >
        Choose File
      </label>
      <input
        id="fileUpload"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {/* Upload Button */}
      <button
        type="button"
        onClick={handleUpload}
        className="mt-3 bg-[#252531] text-white text-sm rounded-full px-4 py-2 hover:bg-[#3F403F] transition-colors"
      >
        Upload
      </button>
      {/* Progress Bar */}
      {progressPercent > 0 && (
        <div className="relative w-full mt-4">
          <div
            className="absolute top-0 left-0 h-6 text-xs font-semibold text-white rounded-full flex justify-center items-center"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: progressPercent === 100 ? "#4CAF50" : "#3F403F", // Green when complete
            }}
          >
            {progressPercent === 100 && "Uploaded!"}
          </div>
          <div className="w-full h-6 bg-gray-300 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
