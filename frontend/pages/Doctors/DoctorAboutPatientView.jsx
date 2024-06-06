import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
//// ALL GOOD
const DoctorAboutPatientView = () => {

    const { id } = useParams();
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    password: '',
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {

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
        
        setFormData(result);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }



  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About 
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {formData.data.name || 'No name available'}
          </span>
        </h3>
        <p className="text_para">
          {formData.data.about || "No bio available."}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {formData.data.qualifications && formData.data.qualifications.length > 0 ? (
            formData.data.qualifications.map((qualification, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {qualification.startingDate} - {qualification.endingDate}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    {qualification.degree}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {qualification.university}
                </p>
              </li>
            ))
          ) : (
            <li>No qualifications available.</li>
          )}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experiences
        </h3>

        <ul className="pt-4 md:p-5">
          {formData.data.experiences && formData.data.experiences.length > 0 ? (
            formData.data.experiences.map((experience, index) => (
              <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {experience.startingDate} - {experience.endingDate}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    {experience.position}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {experience.hospital}
                </p>
              </li>
            ))
          ) : (
            <li>No experiences available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAboutPatientView;
