import Aos from "aos";
import { useEffect } from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const Delivered = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="relative w-full flex flex-col md:flex-row ">
      <div className="w-full md:w-1/2 flex text-center items-center justify-center bg-white text-black">
        <div className="p-5 w-64 text-center lg:text-start">
          <h2
            data-aos="fade-right"
            data-aos-duration="1000"
            className="text-3xl md:text-4xl lg:text-5xl  font-bold font-serif "
          >
            DELIVERED TO YOUR DOOR
          </h2>
          <Link
            data-aos="fade-right"
            data-aos-duration="1000"
            to="/products"
            className="mt-5 inline-block bg-transparent border  border-black text-black py-2 px-4 hover:bg-rose-900  transition-colors duration-300 font-serif "
          >
            SHOP NOW
          </Link>
        </div>
      </div>
      <Parallax strength={500} className="w-full md:w-1/2 parallax2">
        {/* Empty content for the parallax image */}
      </Parallax>
    </div>
  );
};

export default Delivered;
