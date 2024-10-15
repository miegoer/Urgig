import React, { useState } from 'react';
import { storage, db } from '@/app/api/(3rdParty)/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';

interface EventImageUploadProps {
  setImageURL: (url: string) => void;
  eventId: string; // The ID of the event being edited
}

const EventImageUpload: React.FC<EventImageUploadProps> = ({ setImageURL, eventId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const fileSizeLimit = 2 * 1024 * 1024; // 2MB in bytes
      if (selectedFile.size > fileSizeLimit) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    // Generate a unique file name
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${
      file.name.split('.').pop()
    }`;

    const storageRef = ref(storage, `event-images/${uniqueName}`);
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
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          setImageURL(downloadURL);
          console.log('Image URL:', downloadURL);

          // Save imageURL to the event in the database
          try {
            const eventDocRef = doc(db, 'events', eventId);
            await updateDoc(eventDocRef, {
              imageURL: downloadURL,
            });
            console.log('Event image URL updated in the database');
          } catch (error) {
            console.error('Error updating event image URL: ', error);
          }
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload Event Image</button>
      {progressPercent > 0 && <progress value={progressPercent} max="100" />}
    </div>
  );
};

export default EventImageUpload;
