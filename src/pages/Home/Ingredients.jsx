import Aos from "aos";
import { useEffect } from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const Ingredients = () => {
  useEffect(() => {
    Aos.init();
    const handleScroll = () => {
      // Define the minimum screen width for the effect to be applied
      const minWidthForEffect = 1024; // Example: 1024px for large screens

      // Get the current screen width
      const screenWidth = window.innerWidth;

      // Check if the current screen width meets the minimum requirement
      if (screenWidth >= minWidthForEffect) {
        const scrollPercentage =
          window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const colorValue = Math.max(0, 150 - scrollPercentage * 255);
        document.getElementById(
          "dynamic-bg"
        ).style.backgroundColor = `rgb(${colorValue},${colorValue},${colorValue})`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative w-full h-[55vh] lg:h-[70vh] flex flex-col md:flex-row overflow-hidden">
      <Parallax
        blur={{ min: 0, max: 50 }}
        strength={500}
        className="w-full md:w-2/3  md:h-full parallax1"
      >
        {/* Empty content for the parallax image */}
      </Parallax>
      <div
        id="dynamic-bg"
        className="w-full md:w-1/3 flex text-center items-center justify-center bg-black text-white"
      >
        <div className="p-5 overflow-hidden">
          <h2
            data-aos="fade-right"
            data-aos-duration="1000"
            className="text-3xl md:text-4xl lg:text-5xl font-bold italic font-serif"
          >
            Discover Our Products
          </h2>
          <p
            data-aos="fade-right"
            data-aos-duration="1000"
            className="mt-4 italic font-serif"
          >
            Explore a wide range of sustainable and eco-friendly products
            designed to meet your needs.
          </p>
          <Link
            data-aos="fade-right"
            data-aos-duration="1000"
            to="/about"
            className="mt-5 inline-block bg-transparent border border-white text-white py-2 px-4 hover:bg-rose-900  transition-colors duration-300 font-serif"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
