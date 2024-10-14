// components/ImageUpload.tsx
import React, { useState } from 'react';
import { storage } from '@/app/api/(3rdParty)/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface ImageUploadProps {
  setImageURL: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageURL }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageURL(downloadURL); 
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      {progressPercent > 0 && <progress value={progressPercent} max="100" />}
    </div>
  );
};

export default ImageUpload;