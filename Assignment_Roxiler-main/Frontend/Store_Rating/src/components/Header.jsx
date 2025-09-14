import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLogout from '../hooks/useLogout';
import UpdatePassword from './UpdatePassword';
import { useSelector } from 'react-redux';


const Header = () => {

      const roleId=  useSelector(store => store.user.user.roleId)
        console.log(roleId)
  const navigate = useNavigate();

  const logout = useLogout();
  const handleLogout = () => {
  logout();
   
  };

  const handleChangePass = ()=>{
   navigate('/update-password')
  }

  return (
    <div className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Welcome to Store Portal</h1>

       <button
        onClick={handleChangePass}
        className=" bg-black  rounded-2xl px-4 py-2 hover:bg-purple-950"
      >
        Update Passowrd
      </button>
      {roleId === 1 ?<Link to={"/admin"}> <button className=' bg-black rounded-2xl px-4 py-2 hover:bg-purple-950'>System Admin</button></Link> : null}
        {roleId === 3 ? <Link to={"/admin"}><button className=' bg-black rounded-2xl px-4 py-2 hover:bg-purple-950'>System Admin</button></Link> : null}

      <button
        onClick={handleLogout}
        className="bg-black rounded-2xl px-4 py-2 hover:bg-purple-950"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
