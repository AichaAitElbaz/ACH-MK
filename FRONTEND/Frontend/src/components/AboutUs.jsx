import React from 'react';
import { about } from '../assets';

const AboutUs = () => {
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center py-4"></h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
        
          <div className="text-content max-w-xl mx-auto">
            <h2 className="text-[24px] text-gris font-semibold">The Ultimate Chart Generation and Interpretation Service</h2>
            <p className="text-s mt-4">
              At our chart generation and interpretation service, we cater to a global audience, with an impressive daily user count of up to 100,000 individuals. Our mission is simple: we provide you with the most advanced tools and insights for generating and interpreting charts, making data analysis a breeze.
            </p>

            <h2 className="text-[24px] text-gris font-semibold mt-4">Unparalleled Variety</h2>
            <p className="text-s mt-4">
              Our chart generation service offers an unparalleled range of options for sports and cinema enthusiasts. Whether you're interested in visualizing action-packed trends, thrilling statistical fluctuations, comedic patterns, dramatic shifts, or even exploring the future of data in a science fiction style, we've got it all right here. Our repository includes a multitude of chart styles to cater to your data visualization needs.
            </p>
          </div>

          <div className="image-content max-w-md mx-auto">
            <img src={about} alt="discount" className="w-full h-auto p-3" />
           
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