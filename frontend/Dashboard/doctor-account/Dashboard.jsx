import React, { useState, useEffect } from 'react';
import Loader from '../../components/loader/Loading';
import Error from '../../components/error/Error';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Tabs from './Tabs';
import { IoMdInformationCircle } from "react-icons/io";
import StarIcon from '../../src/assets/images/Star.png';
import DoctorAbout from '../../pages/Doctors/DoctorAbout';
import Appointments from '../../components/Appointments/Appointments';
import Profile from './Profile';

const Dashboard = () => {
  const { data: profileData, loading: profileLoading, error: profileError } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('token'); 
      const userObject = JSON.parse(userString);
      setUser(userObject); 
      const userId = userObject._id;

      try {
        const res = await fetch(`${BASE_URL}/doctors/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setData(result);
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error message={error} />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className='lg:col-span-2'>
              {data?.isApproved === 'pending' && (
                <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                  <IoMdInformationCircle />
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile... We'll review manually and approve within 3 days
                  </div>
                </div>
              )}

              <div className='mt-8'>
                {tab === "overview" && <DoctorAbout/>}
                {tab === "appointments" && <Appointments appointments={data.appointments}/>}
                {tab === "profile" && <Profile user={user} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
