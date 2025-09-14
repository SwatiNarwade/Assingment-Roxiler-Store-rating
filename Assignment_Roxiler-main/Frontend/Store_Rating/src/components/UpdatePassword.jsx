import React, { use, useRef } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {

  
    const navigate = useNavigate();
    const newPassRef  = useRef()
const updatePassword = async (newPassword) => {
  try {
    const response = await axios.patch(
   BASE_URL +'/update-password',  { Password: newPassword },
      { withCredentials: true } 
    );
    if(response.status === 200){
        toast.success('Password Updated Successfully');
        // newPassRef.current.value = ''
        navigate('/home');
        
    }

    console.log(response.data.message);
  } catch (error) {
    console.error('Error updating password:', error.response?.data?.message || error.message);
  }
};

    const handleUpdatePass =()=>{
        const newPassword = newPassRef.current.value
        updatePassword(newPassword);

    }
    return (
        <div>
            <h1>Enter password to Update</h1>
            <input ref={newPassRef} className='input' type="text" placeholder="Password" />
            <input   onClick={handleUpdatePass} className='btn-primary' type="submit" value="Update" />
        </div>
    );
}

export default UpdatePassword;
