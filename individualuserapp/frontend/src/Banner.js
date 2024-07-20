import React, { useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeartbeat, FaStethoscope, FaShieldAlt, FaVideo } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  return (
    <div className="min-h-[550px]  flex justify-center items-center py-12 sm:py-0">
      <div className="container shadow-lg rounded-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* image section */}
          <div data-aos="zoom-in">
            <Carousel
              showThumbs={false}
              autoPlay
              interval={3000}
              infiniteLoop
              showStatus={false}
              transitionTime={2000} // Set transition time to 1000ms (1 second)
              emulateTouch // Allow touch swipe
              dynamicHeight
            >
              <div>
                <img
                  src="https://th.bing.com/th/id/OIP.7E9r_6FMYlxPZs48hLRn_AHaEK?rs=1&pid=ImgDetMain"
                  alt="Medical Technology"
                  className="w-full h-full"
                />
              </div>
              <div>
                <img
                  src="https://medxchange.com/wp-content/uploads/2013/04/DRSHD-1080p-02.jpg"
                  alt="Robotic Surgery"
                  className="w-full h-full "
                />
              </div>
              <div>
                <img
                  src="https://th.bing.com/th/id/OIP.MS3-o75SNpuxUJFqqJv_DAHaE7?w=266&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="Surgery in Progress"
                  className="w-full h-full"
                />
              </div>
            </Carousel>
          </div>

          {/* text details section */}
          <div className="flex flex-col  justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
              The Most Cutting-Edge Robotic Platform for Surgical Visualization!
            </h1>
            <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide leading-5"
            >
              Discover cutting-edge devices that offer real-time surgery streaming and secure storage. Accessible anytime, anywhere for surgeons and patients.
            </p>
            <div className="flex flex-col gap-4">
              <div data-aos="fade-up" className="flex items-center gap-4">
                <FaHeartbeat className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-blue-100 dark:bg-blue-400" />
                <p>Quality Medical Devices</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <FaVideo className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-teal-100 dark:bg-teal-400" />
                <p>Live Surgery Streaming</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <FaShieldAlt className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Secure Storage</p>
              </div>
              <div data-aos="fade-up" className="flex items-center gap-4">
                <FaStethoscope className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-purple-100 dark:bg-purple-400" />
                <p>Easy Access for Surgeons & Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
