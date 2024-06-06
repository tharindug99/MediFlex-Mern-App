import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';

const Profile = ({ doctorData }) => {
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
    qualification: [{ startingDate: '', endingDate: '', degree: '', university: '' }],
    experience: [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
    timeSlots: [{ day: '', startingTime: '', endingTime: '' }],
    about: '',
    photo: null
  });
  

  useEffect(() => {
    const fetchDoctorData = async () => {
      const userString = localStorage.getItem('user');
      const userObject = JSON.parse(userString);
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
    
        setFormData({
          _id: result.data._id,
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          bio: result.data.bio,
          gender: result.data.gender,
          specialization: result.data.specialization,
          ticketPrice: result.data.ticketPrice,
          qualification: result.data.qualifications || [{ startingDate: '', endingDate: '', degree: '', university: '' }],
          experience: result.data.experiences || [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
          timeSlots: result.data.timeSlots || [{ day: '', startingTime: '', endingTime: '' }],
          about: result.data.about,
          photo: result.data.photo
        });
      } catch (err) {
        toast.error(err.message);
      }
    };
    
    

    fetchDoctorData();
  }, []);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    //console.log('Selected File:', file);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      phone: formData.phone,
      bio: formData.bio,
      gender: formData.gender,
      specialization: formData.specialization,
      ticketPrice: formData.ticketPrice,
      qualifications: formData.qualification,
      experiences: formData.experience,
      timeSlots: formData.timeSlots,
      about: formData.about,
      photo: formData.photo,
    };


    try {
      const res = await fetch(`${BASE_URL}/doctors/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      //console.log(result);
      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index)
    }));
  };

  const addQualification = e => {
    e.preventDefault();
    addItem('qualification', {
      startingDate: '',
      endingDate: '',
      degree: '',
      university: ''
    });
  };
  
  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc('qualification', index, event);
  };
  
  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem('qualification', index);
  };
  
  const addExperience = e => {
    e.preventDefault();
    addItem('experience', {
      startingDate: '',
      endingDate: '',
      position: '',
      hospital: ''
    });
  };
  
  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc('experience', index, event);
  };
  
  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem('experience', index);
  };
  
  const addTimeSlot = e => {
    e.preventDefault();
    addItem('timeSlots', {
      day: '',
      startingTime: '',
      endingTime: ''
    });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChangeFunc('timeSlots', index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem('timeSlots', index);
  };

  return (
    <div className="shadow-lg bg-white p-5 rounded-md">
      <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
        Profile Information
      </h2>
      <form>
        <div className='mb-5 border-b-2 w-3/4'>
          <p className='form_label'> Name</p>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Full Name'
            required
            className='form_input w-3/4'
          />
        </div>

        <div className='mb-5 border-b-2 w-3/4'>
          <p className='form_label'> Email*</p>
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
            className='form_input w-3/4'
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>

        <div className='mb-5 border-b-2 w-3/4'>
          <p className='form_label'> Phone Number*</p>
          <input
            type="number"
            name='phone'
            value={formData.phone}
            required
            onChange={handleInputChange}
            placeholder='Phone Number'
            className='form_input w-3/4'
          />
        </div>

        <div className='mb-5 border-b-2 w-3/4'>
          <p className='form_label'> Bio*</p>
          <input
            type="text"
            name='bio'
            value={formData.bio}
            onChange={handleInputChange}
            placeholder='Bio'
            className='form_input w-3/4'
            maxLength={100}
            required
          />
        </div>

        <div className='mb-5 border-b-2 w-full rounded-lg p-5'>
  <div className='grid grid-cols-3 gap-5 mb-6'>
    <div>
      <p className='form__label'>Gender</p>
      <select
        name="gender"
        value={formData.gender}
        required
        onChange={handleInputChange}
        className='form__input py-3.5 w-3/4 rounded-md border-gray-300 focus:ring-2 focus:ring-primaryColor focus:border-transparent'
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div>
      <p className='form__label'>Specialization</p>
      <select
        name="specialization"
        value={formData.specialization}
        required
        onChange={handleInputChange}
        className='form__input py-3.5 rounded-md border-gray-300 focus:ring-2 focus:ring-primaryColor focus:border-transparent'
      >
        <option value="">Select</option>
        <option value="surgeon">Surgeon</option>
        <option value="neurologist">Neurologist</option>
        <option value="dermatologist">Dermatologist</option>
      </select>
    </div>

    <div>
      <p className='form__label'>Ticket Price*</p>
      <input
        type="number"
        placeholder='100'
        name='ticketPrice'
        value={formData.ticketPrice}
        onChange={handleInputChange}
        className='form__input py-3.5 rounded-md border-gray-300 focus:ring-2 focus:ring-primaryColor focus:border-transparent'
      />
    </div>
  </div>
</div>


        <div className='mb-5 border-b-2'>
          <p className='form_label'>Photo*</p>
          <input
            type="file"
            name='photo'
            onChange={handleFileInputChange}
            placeholder='Photo'
            className='form_input'
          />
        </div>
{/* -------------------------Qualifications------------------------------------ */}
<div className='mb-5 border-b-2'>
  <div className='flex items-center justify-between my-2'>
    <p className='form__label'>Qualification*</p>
    <button className='bg-primaryColor text-white py-1 px-4 rounded-md text-[18px] leading-7' onClick={addQualification}>Add</button>
  </div>

  {formData.qualification.map((qualification, index) => (
    <div className='flex items-center justify-between gap-5 mt-4 border-2 p-5 rounded-md' key={index}>
      <div>
        <input
          type='date'
          name='startingDate'
          value={qualification.startingDate}
          onChange={e => handleQualificationChange(e, index)}
          className='form__input'
        />
        <input
          type='date'
          name='endingDate'
          value={qualification.endingDate}
          onChange={e => handleQualificationChange(e, index)}
          className='form__input'
        />
      </div>
      
      <div className="w-full">
        <input
          type='text'
          name='degree'
          value={qualification.degree}
          onChange={e => handleQualificationChange(e, index)}
          className='form__input w-full'
          placeholder='Add Your Degree'
        />
        <input
          type='text'
          name='university'
          value={qualification.university}
          onChange={e => handleQualificationChange(e, index)}
          className='form__input  w-full'
          placeholder='Add Your University Name'
        />
      </div>
      <button onClick={e => deleteQualification(e, index)}
      className='bg-red-500 text-white py-1 px-4 rounded-md text-[18px] leading-7'>
        Delete
      </button>
    </div>
  ))}
</div>

{/* -------------------------Experience------------------------------------ */}
        <div className='mb-5 border-b-2'>
          <div className='flex items-center justify-between my-2'>
            <p className='form__label'>Experience*</p>
            <button className='bg-primaryColor text-white py-1 px-4 rounded-md text-[18px] leading-7' onClick={addExperience}>Add</button>
          </div>

          {formData.experience.map((experience, index) => (
            <div className='flex items-center justify-between gap-5 mt-4 border-2 p-5 rounded-md my-2' key={index}>
            <div className='flex flex-col'>
              <input
                type='date'
                name='startingDate'
                value={experience.startingDate}
                onChange={e => handleExperienceChange(e, index)}
                className='form__input mb-2'
              />
              <input
                type='date'
                name='endingDate'
                value={experience.endingDate}
                onChange={e => handleExperienceChange(e, index)}
                className='form__input'
              />
            </div>
          
            <div className="w-full">
              <input
                type='text'
                name='position'
                value={experience.position}
                onChange={e => handleExperienceChange(e, index)}
                className='form__input w-full mb-2'
                placeholder='Add Your Position'
              />
              <input
                type='text'
                name='hospital'
                value={experience.hospital}
                onChange={e => handleExperienceChange(e, index)}
                className='form__input w-full'
                placeholder='Add Your Hospital Name'
              />
            </div>
            <button onClick={e => deleteExperience(e, index)}
            className='bg-red-500 text-white py-1 px-4 rounded-md text-[18px] leading-7'>
              Delete
            </button>
          </div>
          
          ))}
        </div>

{/* -------------------------Time Slots------------------------------------ */}

        <div className='mb-5'>
          <div className='flex items-center justify-between'>
            <p className='form__label'>Time Slots*</p>
            <button className='bg-primaryColor text-white py-1 px-4 rounded-md text-[18px] leading-7' onClick={addTimeSlot}>Add</button>
          </div>

          {formData.timeSlots.map((timeSlot, index) => (
            <div className='flex items-center justify-between gap-5 mt-4 border-2 p-5 rounded-md' key={index}>
            <select
              name='day'
              value={timeSlot.day}
              onChange={e => handleTimeSlotChange(e, index)}
              className='form__input py-3.5 w-full rounded-md border-gray-300 focus:ring-2 focus:ring-primaryColor focus:border-transparent'
            >
              <option value="">Select Day</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
            <input
              type='time'
              name='startingTime'
              value={timeSlot.startingTime}
              onChange={e => handleTimeSlotChange(e, index)}
              className='form__input w-full rounded-md border-gray-300 focus:ring-2 focus:ring-primaryColor focus:border-transparent'
              required
            />
            <input
              type='time'
              name='endingTime'
              value={timeSlot.endingTime}
              onChange={e => handleTimeSlotChange(e, index)}
              className='form__input w-full rounded-md border-gray-300 focus:ring-2 focus:ring-primaryColor focus:border-transparent'
              required
            />
            
            <button onClick={e => deleteTimeSlot(e, index)}
            className='bg-red-500 text-white py-1 px-4 rounded-md text-[18px] leading-7'>
              Delete
            </button>
          </div>
          
          ))}
        </div>

{/* --------------------------------------About-------------------------------------- */}


        <div className='mb-5'>
          <p className='form_label'>About*</p>
          <input
            type="text"
            name='about'
            value={formData.about}
            onChange={handleInputChange}
            placeholder='About'
            className='form_input'
            maxLength={100}
          />
        </div>

        <div>
          <button
            className='bg-primaryColor text-white py-2 px-6 rounded-[8px] mt-5'
            onClick={updateProfileHandler}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
