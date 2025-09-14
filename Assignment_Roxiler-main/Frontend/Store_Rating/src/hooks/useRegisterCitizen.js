import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const useRegisterCitizen = () => {
  const register = async ({firstNameRef, lastNameRef, EmailRef, PhoneRef, AddressRef, passwordRef}) => {
   const formData = {
      FirstName: firstNameRef.current.value,
      LastName: lastNameRef.current.value,
      Email: EmailRef.current.value,
      Phone: PhoneRef.current.value,
      Address: AddressRef.current.value,
      Password: passwordRef.current.value,
    };
  
  
    try {
      const response = await axios.post(
        `${BASE_URL}/user-register`,
        formData,
        { withCredentials: true }
      );
      return response.data; // ✅ Fix: Return response data
    } catch (error) {
    
      throw error; // ✅ Fix: Re-throw error so the calling function can handle it
    }
  };

  return register;
};

export default useRegisterCitizen