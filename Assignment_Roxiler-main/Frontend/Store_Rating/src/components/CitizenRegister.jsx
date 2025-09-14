import React, { useRef } from 'react';
import useRegisterCitizen from '../hooks/useRegisterCitizen';
import { toast, ToastContainer } from 'react-toastify';

import { useNavigate } from 'react-router-dom';


const CitizenRegister = () => {
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const EmailRef = useRef();
  const PhoneRef = useRef();
  const AddressRef = useRef();
  const passwordRef = useRef();
const registerCitizen = useRegisterCitizen();

  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
    const data = await registerCitizen({firstNameRef, lastNameRef, EmailRef, PhoneRef, AddressRef, passwordRef});

    if (data?.message === "User Created Succesfull") {
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/")
        
      }, 5000);
     
    } else {
      toast.error("Registration failed. " + (data?.message || "Unknown error."));
    }
  } catch (err) {
    console.error("Registration failed:", err);
    const errorMsg = err?.response?.data?.message || err.message || "Unknown error occurred.";
    toast.error("Registration failed. " + errorMsg);
  }

  }

  return (
    <div className="container flex flex-col justify-center items-center h-screen space-y-4 ">
      <h1 >Register</h1>
      <ToastContainer/>
      <div className="flex items-center space-x-4">
        <label htmlFor="firstName" className="w-32 text-right">First Name:</label>
        <input ref={firstNameRef} type="text" id="firstName" name="firstName" className="border px-2 py-1" />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="lastName" className="w-32 text-right">Last Name:</label>
        <input ref={lastNameRef} type="text" id="lastName" name="lastName" className="border px-2 py-1" />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="Email" className="w-32 text-right">Email:</label>
        <input ref={EmailRef} type="email" id="Email" name="Email" className="border px-2 py-1" />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="Phone" className="w-32 text-right">Phone:</label>
        <input ref={PhoneRef} type="number" id="Phone" name="Phone" className="border px-2 py-1" />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="Address" className="w-32 text-right">Address:</label>
        <input ref={AddressRef} type="text" id="Address" name="Address" className="border px-2 py-1" />
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="password" className="w-32 text-right">Password:</label>
        <input ref={passwordRef} type="password" id="password" name="password" className="border px-2 py-1" />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
    </div>

  );
}

export default CitizenRegister;
