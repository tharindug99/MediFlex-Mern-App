import React from 'react'
////Not in use
const ServiceList = () => {

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

  return (
    <section>
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                <div className="Services_Card flex flex-col items-center bg-cyan-600 rounded-lg p-5">
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default ServiceList