'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs'; // Get Clerk token
import './registration.css';
import ImageUpload from '@/app/(components)/ui/dashboard/ImageUpload';
import SelectGenre from '@/app/(components)/ui/dashboard/selectGenre';

export default function Registration() {
  // Getting user data from Clerk
  const { userId } = useAuth();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';

  const router = useRouter();

  // Initial form state
  const [form, setForm] = useState({
    typeOfAccount: '',
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: '',
    stageName: '',
    companyName: '',
    phoneNumber: '',
    location: '',
    aboutMe: '',
    genre: [] as string[],
    imageURL: undefined as string | undefined,
  });

  // Validity state for form fields
  const [validity, setValidity] = useState({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    stageName: true,
    companyName: true,
    phoneNumber: true,
    location: true,
  });

  const [pt1Submitted, setPt1Submitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [genres, setGenres] = useState<string[]>([]);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  // Update form state when imageURL or genres change
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      imageURL: imageURL || undefined,
      genre: genres,
    }));
  }, [imageURL, genres]);

  // Check if the user is already registered
  useEffect(() => {
    const checkUserExists = async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (res.status === 200) {
        setIsRegistered(true);
        router.push('/dashboard'); // Redirect to dashboard if registered
      } else {
        setIsLoading(false); // Loading completed
      }
    };

    if (userId) {
      checkUserExists();
    }
  }, [userId, router]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.type = 'date';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^\d+$/.test(value);
    setForm({ ...form, phoneNumber: value });
    setValidity({ ...validity, phoneNumber: isValid });
  };

  // Update firstName and lastName from Clerk if available
  useEffect(() => {
    if (user) {
      setForm((prevForm) => ({
        ...prevForm,
        firstName: firstName,
        lastName: lastName,
      }));
    }
  }, [user]);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = event.target.value;
    const isValid = /^[a-zA-Z]+$/.test(value);
    setForm({ ...form, [input]: value });
    setValidity({ ...validity, [input]: isValid });
  };

  const handleGenericChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    input: string
  ) => {
    const value = event.target.value;
    const isValid = value.trim() !== '';
    setForm({ ...form, [input]: value });
    setValidity({ ...validity, [input]: isValid });
  };

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(event.target.value);
    const today = new Date();
    const isDateValid =
      /^\d{4}-\d{2}-\d{2}$/.test(event.target.value) &&
      !isNaN(inputDate.getTime()) &&
      inputDate <= today;
    setForm({ ...form, dateOfBirth: event.target.value });
    setValidity({ ...validity, dateOfBirth: isDateValid });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setForm((prevForm) => ({ ...prevForm, typeOfAccount: selectedType }));

    if (selectedType === 'Artist') {
      setValidity((prevValidity) => ({
        ...prevValidity,
        stageName: false,
        companyName: true,
      }));
    } else if (selectedType === 'Promoter') {
      setForm((prevForm) => ({ ...prevForm, stageName: '' }));
      setValidity((prevValidity) => ({
        ...prevValidity,
        stageName: true,
        companyName: false,
      }));
    }
  };

  const formPt2 = (event: React.FormEvent) => {
    event.preventDefault();
    setPt1Submitted(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.typeOfAccount) {
      alert('Please select your role');
      setIsSubmitting(false);
      return;
    }

    if (
      validity.firstName &&
      validity.lastName &&
      validity.dateOfBirth &&
      (form.typeOfAccount === 'Promoter' || validity.stageName) &&
      (form.typeOfAccount === 'Artist' || validity.companyName) &&
      validity.phoneNumber &&
      validity.location
    ) {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.firstName + ' ' + form.lastName,
          dateOfBirth: new Date(form.dateOfBirth),
          contactNumber: form.phoneNumber,
          location: form.location,
          stageName: form.stageName,
          companyName: form.companyName,
          aboutMe: form.aboutMe,
          _id: userId, // Using Clerk userId
          typeOfAccount: form.typeOfAccount.toLowerCase(), // artist or promoter
          email: userEmail, // Get Clerk email from token
          profileDetails: {
            aboutMe: form.aboutMe,
            imageURL: form.imageURL,
            genre: form.genre,
          },
        }),
      });

      await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: form.typeOfAccount,
          userId: userId,
        }),
      });

      setForm({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        stageName: '',
        companyName: '',
        phoneNumber: '',
        location: '',
        aboutMe: '',
        genre: [],
        imageURL: undefined,
        typeOfAccount: '',
      });

      setValidity({
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        stageName: true,
        companyName: true,
        phoneNumber: true,
        location: true,
      });
      router.push('/dashboard');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (isRegistered) {
    return null; // User is already registered
  }

  return (
    <div className="inputList">
      <h1 className="mb-4 text-xl md:text-2xl">Registration</h1>
      {!pt1Submitted && (
        <form className="flex flex-col" onSubmit={formPt2}>
          <input
            type="text"
            placeholder="First Name"
            className="input"
            value={form.firstName}
            onChange={(e) => handleNameChange(e, 'firstName')}
            required
          />
          {!validity.firstName && (
            <p className="text-red-500 mt-1">Invalid first name.</p>
          )}
          <input
            type="text"
            placeholder="Last Name"
            className="input"
            value={form.lastName}
            onChange={(e) => handleNameChange(e, 'lastName')}
            required
          />
          {!validity.lastName && (
            <p className="text-red-500 mt-1">Invalid last name.</p>
          )}
          <input
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Date of Birth"
            className="input"
            value={form.dateOfBirth}
            onChange={(e) => handleDateInput(e)}
            required
          />
          {!validity.dateOfBirth && (
            <p className="text-red-500 mt-1">Invalid date.</p>
          )}
          <input
            type="tel"
            placeholder="Phone Number"
            className="input"
            value={form.phoneNumber}
            onChange={handlePhoneChange}
            required
          />
          {!validity.phoneNumber && (
            <p className="text-red-500 mt-1">
              Invalid phone number format.
            </p>
          )}
          <input
            type="text"
            placeholder="Location"
            className="input"
            value={form.location}
            onChange={(e) => handleGenericChange(e, 'location')}
            required
          />
          {!validity.location && (
            <p className="text-red-500 mt-1">Invalid location.</p>
          )}
          <select
            className="input"
            value={form.typeOfAccount}
            onChange={handleRoleChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="Artist">Artist</option>
            <option value="Promoter">Promoter</option>
          </select>
          {form.typeOfAccount === 'Artist' && (
            <input
              type="text"
              placeholder="Stage Name"
              className="input"
              value={form.stageName}
              onChange={(e) => handleGenericChange(e, 'stageName')}
              required
            />
          )}
          {form.typeOfAccount === 'Promoter' && (
            <input
              type="text"
              placeholder="Company Name"
              className="input"
              value={form.companyName}
              onChange={(e) => handleGenericChange(e, 'companyName')}
              required
            />
          )}
          {!validity.stageName && form.typeOfAccount === 'Artist' && (
            <p className="text-red-500 mt-1">Invalid stage name.</p>
          )}
          {!validity.companyName && form.typeOfAccount === 'Promoter' && (
            <p className="text-red-500 mt-1">Invalid company name.</p>
          )}
          <button className="submit" type="submit">
            Next
          </button>
        </form>
      )}
      {pt1Submitted && (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <ImageUpload setImageURL={setImageURL} />
          <SelectGenre
            setGenres={(genres) => setGenres(genres)}
            genres={form.genre}
            isSent={isSent}
            className="text-black"
          />
          <textarea
            placeholder="About me"
            className="input"
            value={form.aboutMe}
            onChange={(e) => handleGenericChange(e, 'aboutMe')}
            required
          />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
