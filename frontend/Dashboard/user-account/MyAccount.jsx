import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userImg from "../../src/assets/images/doc.png";
import { authContext } from "../../src/context/authContext";

import MyBookings from './MyBookings';
import Profile from './Profile';

import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';

import Loading from '../../components/loader/Loading';
import Error from '../../components/error/Error';

const MyAccount = () => {
    const { dispatch } = useContext(authContext);
    const [tab, setTab] = useState('bookings');
    const navigate = useNavigate();

    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);
    console.log(userData, 'userdata');

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/login'); 
    };

    const handleDelete = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token'); // Ensure you're storing the token in local storage
        
        if (!user || !token) {
            console.error('User or token not found in local storage');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            dispatch({ type: "LOGOUT" });
            navigate('/'); 
        } catch (error) {
            console.error('Error deleting account:', error.message);
        }
    };

    const renderTabContent = () => {
        switch (tab) {
            case 'bookings':
                return <MyBookings />;
            case 'settings':
                return <Profile user={userData} />;
            default:
                return <MyBookings />;
        }
    };

    return (
        <div className='max-w-[1170px] px-5 mx-auto'>
            {loading && !error && <Loading />}
            {error && !loading && <Error errmessage={error} />}
            {!loading && !error && (
                <div className='grid md:grid-cols-3 gap-10'>
                    <div className='md:col-span-2'>
                        <div>
                            <button onClick={() => setTab('bookings')}
                                className={`${tab === "bookings" && "bg-primaryColor text-white font-normal"} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                            >
                                My Bookings
                            </button>
                            <button onClick={() => setTab('settings')}
                                className={`${tab === "settings" && "bg-primaryColor text-white font-normal"} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                            >
                                Profile Settings
                            </button>
                        </div>
                        {renderTabContent()}
                    </div>
                    <div className='pb-[50px] px-[30px] rounded-md'>
                        <div className='flex items-center justify-center'>
                            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                                <img
                                    src={userImg}
                                    alt=''
                                    className='w-full h-full rounded-full'
                                />
                            </figure>
                        </div>
                        <div className='text-center mt-4'>
                            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>Muhibur Rahman</h3>
                            <p className='text-textColor text-[15px] leading-6 font-medium'>example@gmail.com</p>
                            <p className='text-textColor text-[15px] leading-6 font-medium'>
                                Blood Type:
                                <span className='ml-2 text-headingColor text-[22px] leading-8'>
                                    O-
                                </span>
                            </p>
                        </div>
                        <div className='mt-[50px] md:mt-[100px]'>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                            >
                                Logout
                            </button>
                            <button
                                onClick={handleDelete}
                                className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'
                            >
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAccount;
