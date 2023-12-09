import React from 'react';


const AboutUs = () => {
 return (
    <div className="about-us-page">
    <h1 className="text-4xl font-bold text-center py-10"></h1>
    <div className="about-us-content container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-content">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus nisi at leo sollicitudin. Nunc commodo lorem sed elit suscipit, a faucibus est congue. Nullam commodo eros ut urna commodo, non iaculis metus tempus. Nulla facilisi. Sed interdum sapien et mauris ornare, non vestibulum massa congue. In vitae justo non massa dignissim consectetur in lectus. Nulla nec ullamcorper lectus.
          </p>
        </div>
        <div className="image-content">
          <img src="https://source.unsplash.com/random" alt="Company Logo" className="w-full h-auto rounded-md shadow-md" />
        </div>
      </div>
    </div>
  </div>
 );
};

export default AboutUs;