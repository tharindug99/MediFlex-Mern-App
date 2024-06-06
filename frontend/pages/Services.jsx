import React from 'react';
import ServiceList from '../components/services/ServiceList';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import img1 from '../src/assets/images/online-medical-support.png';
import img2 from '../src/assets/images/ambulance.png';
import img3 from '../src/assets/images/quickResponse.png';
import img4 from '../src/assets/images/AllinOne.png';
import Footer from '../components/footer/Footer';

const serviceData = [
  {
    imgSrc: img1,
    bgColor: 'bg-cyan-600',
    title: 'Online Consultation Facilities',
    description: 'Discover expert healthcare professionals to meet your medical needs.',
  },
  {
    imgSrc: img4,
    bgColor: 'bg-yellow-500',
    title: 'Islandwide Quick Response Team',
    description: 'Access around-the-clock assistance for immediate healthcare support and emergencies.',
  },
  {
    imgSrc: img3,
    bgColor: 'bg-green-500',
    title: 'All under one roof',
    description: 'Experience comprehensive care with a wide range of medical services conveniently available in one location.',
  },
  {
    imgSrc: img2,
    bgColor: 'bg-red-500',
    title: 'High quality service',
    description: 'Receive top-notch medical care with a commitment to excellence, ensuring your well-being and satisfaction.',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="container">
        {/* <ServiceList /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:my-30 md:m-30 sm:m-20 lg:grid-cols-4 gap-5 mt-5 pb-10 lg:mt-10">
          {serviceData.map((service, index) => (
            <div key={index} className={`flex flex-col items-center ${service.bgColor} rounded-lg p-5`}>
              <img src={service.imgSrc} className="h-20 w-20" alt="" />
              <h1 className="text-2xl font-semibold text-center mt-4">{service.title}</h1>
              <p className="text-center">{service.description}</p>
              <FaRegArrowAltCircleRight className="m-5 h-6 w-6" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
