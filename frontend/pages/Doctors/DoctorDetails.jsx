import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import doctorImg from '../../src/assets/images/doc.png';
import star from '../../src/assets/images/Star.png';
import DoctorAboutPatientView from './DoctorAboutPatientView';
import SidePanel from './SidePanel';
import Feedback from './Feedback';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const DoctorDetails = () => {
  const { id } = useParams();  // Get the id from the URL parameters

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    bio: '',
    gender: '',
    specialization: '',
    ticketPrice: 0,
    qualifications: [{ startingDate: '', endingDate: '', degree: '', university: '' }],
    experiences: [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
    timeSlots: [{ day: '', startingTime: '', endingTime: '' }],
    about: '',
    photo: null
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      console.log("fetching data");
      try {
        const res = await fetch(`${BASE_URL}/doctors/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setFormData({
          _id: result.data._id,
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          bio: result.data.bio,
          gender: result.data.gender,
          specialization: result.data.specialization,
          ticketPrice: result.data.ticketPrice,
          qualifications: result.data.qualifications || [],
          experiences: result.data.experiences || [],
          timeSlots: result.data.timeSlots || [],
          about: result.data.about,
          photo: result.data.photo
        });
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchDoctorData();
  }, [id]);

  const [tab, setTab] = useState('about');

  return (
    <>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>
          <div className='md:col-span-2'>
            <div className="flex items-center gap-5">
              <figure className='max-w-[200px] max-h-[200px]'>
                <img src={formData.photo || doctorImg} alt="Doctor" className='w-full' />
              </figure>

              <div>
                <span className='bg-[#CCF0F3] text-blue-900 py-1 px-6 lg:py-2 lg:px-x text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                  {formData.specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3">
                  Dr. {formData.name}
                </h3>
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                    <img src={star} alt="Star" className='w-5 h-5' />4.8
                    <p className='text-textColor pl-2'>(26)</p>
                  </span>
                </div>
                <p className='text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]'>
                  {formData.bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#00000034]">
              <button onClick={() => setTab('about')}
                className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                About
              </button>
              <button onClick={() => setTab('feedback')}
                className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                Feedback
              </button>
            </div>

            <div className='mt-[50px]'>
              {tab === "about" && <DoctorAboutPatientView bio={formData.bio} qualifications={formData.qualifications} experiences={formData.experiences} />}
              {tab === "feedback" && <Feedback />}
            </div>
            
          </div>
          <SidePanel/>
        </div>  
      </div>
    </>
  );
};

export default DoctorDetails;
