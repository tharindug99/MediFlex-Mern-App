import React from "react";
import img1 from '../../src/assets/images/Hospital_patient.gif'
import img0 from '../../src/assets/images/Ambulance.gif'

const About = () => {
  return (
    <section >
      <h1 className="text-center mb-40 sm:mb-20 text-[36px] leading-[46px] font-[700] md:text-[60px] md:leading-[70px]">
        About Us
      </h1>
  <div className="container">
  <div className="flex text-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
      

  {/* {/---About Image/} */}
  <div className="relative w-3\4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
  
  </div>
  </div>
  {/*about content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
  {/* Left Column */}
  <div className="order-1 lg:order-1">
    <h2 className="heading pb-10">
      Proud to be one of the nation's best medical & healthcare service providers!
    </h2>

    <p className="text_para pb-20">
      Welcome to MediFlex. At MediFlex, our mission is to provide exceptional healthcare services with a commitment to compassion, innovation, and excellence. We understand that your health is your most valuable asset, and we are dedicated to delivering comprehensive medical care tailored to meet your unique needs.
    </p>

    

    {/* Team Section */}
    <div className="pt-20 sm:pt-5 text-cyan-500">
      <b>Our Team</b>
    </div>
    <p className="text_para mt-[30px] mb-3 pb-10 xs:pb-5">
      Our team of experienced and compassionate healthcare professionals is the backbone of MediFlex. From board-certified physicians and skilled nurses to dedicated support staff, each member plays a crucial role in ensuring your well-being. We take pride in our collaborative approach, where expertise meets empathy to provide you with the best possible care.
    </p>

    <img src={img1} alt="Image 2" className="w-full" />
    
    

    

    {/* Community Engagement Section */}
    <div className="pt-20 sm:pt-5 text-purple-500">
      <b>Community Engagement</b>
    </div>
    <p className="text_para mt-[30px] mb-3 pb-10">
      We believe in giving back to the community we serve. Through health education initiatives, outreach programs, and partnerships with local organizations, [Medical Site Name] actively contributes to the well-being of the community. We are dedicated to promoting a healthier, happier, and more informed society.
    </p>

    {/* Closing Statement */}
    <p>
      Thank you for choosing MediFlex for your healthcare needs. We look forward to being your trusted partner on your journey to wellness.
    </p>
  </div>

  {/* Right Column (Images) */}
  <div className="order-2 lg:order-1">
    {/* Placeholder images - Replace with actual image URLs */}
    <img src={img0} alt="Image 2" className="w-full" />

    {/* Story Section */}
    <div className="pt-20 sm:pt-5 text-yellow-400">
      <b>Our Story</b>
    </div>
    <p className="text_para mt-[30px] mb-3 pb-10 sm:pb-5">
      Established in 2009, MediFlex has been at the forefront of healthcare, serving the community with a steadfast commitment to quality and patient-centric care. Our journey began with the vision of creating a medical facility that not only diagnoses and treats ailments but also fosters a warm and supportive environment for our patients.
    </p>

    {/* Patient-Centric Approach Section */}
    <div className="pt-20 sm:pt-5 text-green-500">
      <b>Patient-Centric Approach</b>
    </div>
    <p className="text_para mt-[30px] mb-3 pb-10 sm:pb-5">
      At MediFlex, we prioritize your health and comfort above all else. We strive to create a positive and welcoming atmosphere where you can feel at ease during every step of your healthcare journey. From routine check-ups to specialized treatments, we are here to address your concerns and guide you towards optimal health.
    </p>

    {/* Services Section */}
    <div className="pt-20 sm:pt-5 text-red-500">
      <b>Our Services</b>
    </div>
    <p className="text_para mt-[30px] mb-3 pb-10">
      MediFlex offers a wide range of medical services to address diverse healthcare needs. Whether you're seeking preventive care, diagnostic services, or specialized treatments, our state-of-the-art facilities and advanced medical technologies ensure that you receive the highest standard of care.
    </p>
  </div>
</div>

  </div>
  {/* </div> */}
  </section>  
  );
};
export default About;