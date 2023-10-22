import React from 'react';
import { chart, chart2 } from '../assets';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center py-4"></h1>
        <div className="flex flex-col md:flex-row justify-center items-center">
        
          <div className="text-content max-w-xl mx-auto">
            <h2 className="text-xl font-semibold">The Ultimate Chart Generation and Interpretation Service</h2>
            <p className="text-s mt-4">
              At our chart generation and interpretation service, we cater to a global audience, with an impressive daily user count of up to 100,000 individuals. Our mission is simple: we provide you with the most advanced tools and insights for generating and interpreting charts, making data analysis a breeze.
            </p>

            <h2 className="text-xl font-semibold mt-4">Unparalleled Variety</h2>
            <p className="text-s mt-4">
              Our chart generation service offers an unparalleled range of options for sports and cinema enthusiasts. Whether you're interested in visualizing action-packed trends, thrilling statistical fluctuations, comedic patterns, dramatic shifts, or even exploring the future of data in a science fiction style, we've got it all right here. Our repository includes a multitude of chart styles to cater to your data visualization needs.
            </p>
          </div>

          <div className="image-content max-w-md mx-auto">
            <img src={chart} alt="discount" className="w-full h-auto rounded-md shadow-md" />
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-8">
        <div className="image-content max-w-md mx-auto">
            <img src={chart2} alt="second image" className="w-full h-auto rounded-md shadow-md" />
          </div>
          <div className="text-content max-w-xl mx-auto">
            <h2 className="text-xl font-semibold">Live Data Visualization</h2>
            <p className="text-s mt-4">
              Just like live HD sports coverage, our service ensures that you don't miss a beat when it comes to charting your favorite data. We help you transform your data into dynamic, real-time visuals that can be accessed from anywhere in the world. Our charts provide you with the play-by-play action of your data, giving you the ability to interpret trends and insights as they happen.
            </p>

            <h2 className="text-xl font-semibold mt-4">Our Mission</h2>
            <p className="text-s mt-4">
              Our mission is to empower you to create, understand, and share charted data with ease and convenience. We believe that every data point, just like every premium channel or movie, should be at your fingertips, ready to be charted, analyzed, and interpreted.
            </p>

            <h2 className="text-xl font-semibold mt-4">Our Vision</h2>
            <p className="text-s mt-4">
              We envision a future where data visualization is accessible to all, without breaking the bank. That's why we offer the best subscription packages in the market, ensuring that you get the most value for your investment. We're here for you 24/7, providing dedicated support to assist with all your chart generation and interpretation needs. We're not just a service; we're your data visualization partner.
            </p>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
