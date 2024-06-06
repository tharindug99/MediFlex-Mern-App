import React, { useContext } from 'react';
import { BiMenu } from "react-icons/bi";
import { authContext } from '../../src/context/authContext';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../../config';

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (!userString || !token) {
        throw new Error('User not logged in or token missing');
      }

      const userObject = JSON.parse(userString);
      const userId = userObject._id;

      const res = await fetch(`${BASE_URL}/doctors/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }

      dispatch({ type: 'LOGOUT' });
      navigate('/');
      alert('Account deleted successfully.');
    } catch (error) {
      alert(`Failed to delete account: ${error.message}`);
    }
  };

  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="h-6 w-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] shadow-lg bg-white gap-y-2 items-center h-max rounded-md">
        <button
          onClick={() => setTab('overview')}
          className={`${tab === 'overview' ? 'bg-indigo-100 text-white' : 'bg-transparent text-black'} w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
          onClick={() => setTab('appointments')}
          className={`${tab === 'appointments' ? 'bg-indigo-100 text-white' : 'bg-transparent text-black'} w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>

        <button
          onClick={() => setTab('profile')}
          className={`${tab === 'profile' ? 'bg-indigo-100 text-white' : 'bg-transparent text-black'} w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>

        <div className="mt-[100px] w-full my-10 gap-y-2">
          <button
            onClick={handleLogout}
            className="bg-black py-3 text-white w-full btn2 my-2 rounded-md"
          >
            Logout
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 py-3 text-white w-full btn mt-0 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
