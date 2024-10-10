'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs'; // Get Clerk token

export default function Registration() {
  // getting stuff from the token
  const { userId } = useAuth();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';

  const router = useRouter();

  const [form, setForm] = useState({
    typeOfAccount: '',
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: '',
    stageName: '',
    phoneNumber: '',
    location: '',
    aboutYou: '',
  });

  const [validity, setvalidity] = useState({
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    stageName: true,
    phoneNumber: true,
    location: true,
  });

  const [pt1Submitted, setPt1Submitted] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  // ceck if the user is registered
  useEffect(() => {
    const checkUserExists = async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (res.status === 200) {
        setIsRegistered(true);
        router.push('/dashboard'); // redirect to dashboard if registered
      } else {
        setIsLoading(false); // if nto loading false
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
    const isValid = /^(?!.*[<>;'\"()\[\]{}\\&|])\d+$/.test(value);
    setForm({ ...form, phoneNumber: value });
    setvalidity({ ...validity, phoneNumber: isValid });
  };

  // firstName and lastName from Clerk if available (google sso)
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
    const isValid = /^(?!.*[<>;'\"()\[\]{}\\&|])[a-zA-Z]+$/.test(value);
    setForm({ ...form, [input]: value });
    setvalidity({ ...validity, [input]: isValid });
  };

  const handleGenericChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    input: string
  ) => {
    const value = event.target.value;
    const isValid = /^(?!.*[<>;'\"()\[\]{}\\&|])/.test(value);
    setForm({ ...form, [input]: value });
    setvalidity({ ...validity, [input]: isValid });
  };

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(event.target.value);
    const today = new Date();
    const isDateInRange =
      /^(?!.*[<>;'\"()\[\]{}\\&|])\d{4}-\d{2}-\d{2}$/.test(
        event.target.value
      ) && !isNaN(inputDate.getTime());
    let isValid = isDateInRange && inputDate <= today;
    setForm({ ...form, dateOfBirth: event.target.value });
    setvalidity({ ...validity, dateOfBirth: isValid });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setForm((prevForm) => ({ ...prevForm, typeOfAccount: selectedType })); //

    if (selectedType === 'Artist') {
      setvalidity((prevValidity) => ({ ...prevValidity, stageName: false }));
    } else {
      setForm((prevForm) => ({ ...prevForm, stageName: '' }));
      setvalidity((prevValidity) => ({ ...prevValidity, stageName: true })); // no validation needed for promoter
    }
  };

  const formPt2 = (event: React.FormEvent) => {
    setPt1Submitted(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.typeOfAccount) {
      alert('Please select your role');
      return;
    }
    if (
      validity.firstName &&
      validity.lastName &&
      validity.dateOfBirth &&
      (form.typeOfAccount === 'Promoter' || validity.stageName) &&
      validity.phoneNumber &&
      validity.location &&
      (form.typeOfAccount === 'Promoter' || form.stageName)
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
          aboutYou: form.aboutYou,
          _id: userId, // using Clerk userId
          typeOfAccount: form.typeOfAccount.toLowerCase(), // artist or promoter
          email: userEmail, // get Clerk email from token
          profileDetails: {
            aboutMe: form.aboutYou,
          },
        }),
      });

      setForm({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        stageName: '',
        phoneNumber: '',
        location: '',
        aboutYou: '',
        typeOfAccount: '',
      });
      setvalidity({
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        stageName: true,
        phoneNumber: true,
        location: true,
      });
      router.push('/dashboard');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // show loading
  }

  if (isRegistered) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <h1 className={`mb-4 text-xl md:text-2xl`}>Registration</h1>
      {!pt1Submitted && (
        <form className="flex flex-col" onSubmit={formPt2}>
          <input
            type="text"
            placeholder="First Name"
            className="text-black"
            value={form.firstName}
            onChange={(e) => handleNameChange(e, 'firstName')}
            required
          />
          {!validity.firstName && (
            <p className="text-red-500 mt-[5px]">Invalid first name.</p>
          )}
          <input
            type="text"
            placeholder="Last Name"
            className="text-black"
            value={form.lastName}
            onChange={(e) => handleNameChange(e, 'lastName')}
            required
          />
          {!validity.lastName && (
            <p className="text-red-500 mt-[5px]">Invalid last name.</p>
          )}
          <input
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Date of Birth"
            className="text-black"
            value={form.dateOfBirth}
            onChange={(e) => handleDateInput(e)}
            required
          />
          {!validity.dateOfBirth && (
            <p className="text-red-500 mt-[5px]">Invalid date.</p>
          )}
          {/* <input
            type="text"
            placeholder="Stage Name"
            className="text-black"
            value={form.stageName}
            onChange={(e) => handleGenericChange(e, 'stageName')}
          />
          {!validity.stageName && (
            <p className="text-red-500 mt-[5px]">Invalid stage name.</p>
          )} */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="text-black"
            value={form.phoneNumber}
            onChange={(e) => handlePhoneChange(e)}
            required
          />
          {!validity.phoneNumber && (
            <p className="text-red-500 mt-[5px]">
              Invalid phone number format.
            </p>
          )}
          <input
            type="text"
            placeholder="Location"
            className="text-black"
            value={form.location}
            onChange={(e) => handleGenericChange(e, 'location')}
            required
          />
          {!validity.location && (
            <p className="text-red-500 mt-[5px]">Invalid location.</p>
          )}

          <select
            className="text-black"
            value={form.typeOfAccount}
            onChange={handleRoleChange}
          >
            <option value="">Select Account Type</option>
            <option value="Artist">Artist</option>
            <option value="Promoter">Promoter</option>
          </select>

          {form.typeOfAccount === 'Artist' && (
            <input
              type="text"
              placeholder="Stage Name"
              className="text-black"
              value={form.stageName}
              onChange={(e) => handleGenericChange(e, 'stageName')}
              required
            />
          )}
          {!validity.stageName && form.typeOfAccount === 'Artist' && (
            <p className="text-red-500 mt-[5px]">Invalid stage name.</p>
          )}

          <button type="submit">Submit</button>
        </form>
      )}
      {pt1Submitted && (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <textarea
            placeholder="About you"
            className="text-black"
            value={form.aboutYou}
            onChange={(e) => handleGenericChange(e, 'aboutYou')}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
