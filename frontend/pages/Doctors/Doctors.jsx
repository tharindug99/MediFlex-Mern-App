import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
import DoctorCard from '../../components/doctors/DoctorCard';  // Update the path based on your project structure
import Loading from '../../components/loader/Loading';
import Error from '../../components/error/Error';

const Doctors = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All'); // Default filter
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State to store selected doctor ID

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/doctors`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        
        setDoctorsList(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const filteredDoctors = selectedFilter === 'All'
    ? doctorsList
    : doctorsList.filter(doctor => doctor.specialization === selectedFilter);

  const searchedDoctors = searchTerm
    ? filteredDoctors.filter(doctor => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredDoctors;

  const allProfessions = ['All', ...new Set(doctorsList.map(doctor => doctor.specialization))];

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-[1440px] md:w-[760px] sm:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Doctors</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        >
          {allProfessions.map((profession, index) => (
            <option key={index} value={profession}>{profession}</option>
          ))}
        </select>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchedDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} onClick={() => handleDoctorSelect(doctor._id)} />
          ))}
        </div>
      </div>
      {selectedDoctorId && <DoctorAboutPatientView doctorId={selectedDoctorId} />}
    </div>
  );
};

export default Doctors;
