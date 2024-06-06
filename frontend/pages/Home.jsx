import React, { useState } from 'react';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import heroImage from '../src/assets/images/doc.png'; // Replace with the actual path to your image
import img1 from '../src/assets/images/Doctors-rafiki.png'
import img2 from '../src/assets/images/Doctors-pana.png'
import img3 from '../src/assets/images/Doctors-amico.png'
import img4 from '../src/assets/images/services.png'
import About from '../components/about/About';
import Testimonial from '../components/Testimonial/Testimonial';
import Modal from '../components/Modal/Modal';
import Appointments from '../components/Appointments/Appointments';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dummyAppointments = [/* your dummy data here */];

  return (
    <>
      <section className="hero__section pt-[36px] ">
        <div className="container px-10">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-5 items-center">
              <div className="lg:w-[570px] space-y-10">
                <h1 className="text-[36px] leading-[46px] font-[700] md:text-[60px] md:leading-[70px]">
                  We help patients live a longer, healthier life
                </h1>
                <p className="text_para w-full lg:w-[800px]">
                  "Empowering over 1,000 individuals to realize their optimal health and wellness, we stand as a beacon of transformative care in the medical field. Our unwavering commitment to your health goals is at the heart of our mission. With a dedicated team of experienced healthcare professionals, we have been instrumental in guiding our patients on a journey toward vitality and well-being. Your health is our priority, and we take pride in being a trusted partner on your path to a healthier, happier life. Welcome to a medical experience designed to inspire, support, and lead you towards a brighter, healthier future."
                </p>
                <button className='p-4 rounded-2xl bg-blue-600 text-white' onClick={openModal}>
                  Request an appointment
                </button>
              </div>
              <div className="mt-8 lg:mt-0">
                <img
                  src={heroImage}
                  alt="Hero Image"
                  className="rounded-lg mx-auto mb-8 lg:ml-60 lg:mb-20 shadow-lg"
                  style={{
                    width: '500px',
                    height: '100%',
                    '@media (min-width: 1024px)': {
                      width: '500px',
                      height: '500px',
                    },
                    '@media (max-width: 767px)': {
                      width: '300px',
                      height: '300px',
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-start mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-[50px]">
            <div className="lg:w-1/3 md:w-full text-center">
              <h2 className="text-start text-[36px] py-5 leading-[56px] lg:text-[44px] lg-leading-[54px] font-[700]">
                30+
              </h2>
              <div>
                <span className="lg:w-[100px] h-2 bg-yellow-500 rounded-full block mt-[-14px]" />
                <p className="text-start py-5 text-[40px] font-bold xs:text-[20px]">
                  Years of Experience
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-full text-center">
              <h2 className="text-start text-[36px] py-5 leading-[56px] lg:text-[44px] lg-leading-[54px] font-[700]">
                100%
              </h2>
              <div>
                <span className="lg:w-[100px] h-2 bg-teal-500 rounded-full block mt-[-14px]" />
                <p className="text-start py-5 text-[40px] font-bold xs:text-[20px]">
                  Patient Satisfaction
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-full text-center">
              <h2 className="text-start text-[36px] py-5 leading-[56px] lg:text-[44px] lg-leading-[54px] font-[700]">
                15+
              </h2>
              <div>
                <span className="lg:w-[100px] sm:w-[600px] h-2 bg-purple-500 rounded-full block mt-[-14px]" />
                <p className="text-start py-5 text-[40px] font-bold xs:text-[20px]">
                  Clinics Functioning
                </p>
              </div>
            </div>
          </div>
          <div className="container lg:py-40 sm:py-10">
            <div className="lg:w-[740px] mx-auto">
              <h2 className="heading text-center font-medium text-[50px]">Providing the best medical services in the country</h2> 
              <p className="pt-6 heading text-center font-medium text-gray-500 text-[20px]">World Class healthcare for all. Our healthcare system offers unmatched health care for everyone...</p>  
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 pb-20 lg:mt-10">
            <div className="flex p-4 flex-col items-center hover:cursor-pointer hover:border-2 hover:border-cyan-400 rounded-xl shadow-lg">
              <img src={img1} className="h-60 w-60" alt="" />
              <h1 className="text-2xl font-semibold text-center mt-4">Find a Doctor</h1>
              <p className="text-center">Discover expert healthcare professionals to meet your medical needs.</p>
              <FaRegArrowAltCircleRight className="m-5 h-6 w-6"/>
            </div>
            <div className="flex p-4 flex-col items-center hover:cursor-pointer hover:border-2 hover:border-cyan-400 rounded-xl shadow-lg">
                   <img src={img2} className="h-60 w-60" alt="" />
              <h1 className="text-2xl font-semibold text-center mt-4">Book an Appointment</h1>
              <p className="text-center">Schedule appointments with ease and convenience.</p>
              <FaRegArrowAltCircleRight className="m-5 h-6 w-6"/>
            </div>
            <div className="flex p-4 flex-col items-center hover:cursor-pointer hover:border-2 hover:border-cyan-400 rounded-xl shadow-lg">
              <img src={img3} className="h-60 w-60" alt="" />
              <h1 className="text-2xl font-semibold text-center mt-4">24/7 Medical Assistance</h1>
              <p className="text-center">Access medical advice and assistance round the clock.</p>
              <FaRegArrowAltCircleRight className="m-5 h-6 w-6"/>
            </div>
            <div className="flex p-4 flex-col items-center hover:cursor-pointer hover:border-2 hover:border-cyan-400 rounded-xl shadow-lg">
              <img src={img4} className="h-60 w-60" alt="" />
              <h1 className="text-2xl font-semibold text-center mt-4">Health Services</h1>
              <p className="text-center">Explore a wide range of health services for your well-being.</p>
              <FaRegArrowAltCircleRight className="m-5 h-6 w-6"/>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Testimonial />
      
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Appointments appointments={dummyAppointments} />
        </Modal>
      )}
    </>
  );
};

export default Home;

