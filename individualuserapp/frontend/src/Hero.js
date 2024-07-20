// Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-8">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Welcome to Surgi Cloud
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 p-6">
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              pretium bibendum nunc, id sollicitudin arcu aliquet at. Nullam
              auctor, lectus at convallis porta, justo massa consequat eros, sed
              tempus velit magna ac diam. Proin suscipit lorem at justo
              vestibulum lobortis.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <img
              className="w-full md:w-4/5 z-50"
              src="https://th.bing.com/th/id/OIP.7E9r_6FMYlxPZs48hLRn_AHaEK?rs=1&pid=ImgDetMain"
              alt="Placeholder"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
