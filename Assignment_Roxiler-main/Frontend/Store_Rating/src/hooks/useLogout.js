import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/slice/userSlice'
import { useNavigate } from 'react-router-dom'


    const useLogout = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate()
        return async () => {
            try {
                const res = await axios.post(BASE_URL + `/logout`,{}, { withCredentials: true });
                toast.success(res.data.message);
                dispatch(removeUser());
                setTimeout(() => {
                    navigate("/");
                    
                }, 2000);
                


            } catch (error) {
                toast.error(error.response.data.message)

            }


        }

    }


export default useLogout