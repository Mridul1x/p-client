import Aos from "aos";
import React, { useEffect } from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

const Banner = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="">
      <div className="header">
        <Parallax
          className="parallax "
          renderLayer={(percentage) => (
            <div
              style={{
                position: "absolute",
                background: `rgba(0, 0, 0,${percentage * 0.7})`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="my-5 items-center mx-5 md:mx-10 xl:mx-20 xl:my-10 flex flex-col gap-5 text-violet-50 overflow-hidden">
                <h1
                  data-aos="fade-down"
                  data-aos-duration="1200"
                  className="text-xl md:text-2xl lg:text-2xl font-semibold uppercase space-font z-10"
                >
                  Mazzak Agro
                </h1>
                <Link
                  data-aos="fade-left"
                  data-aos-duration="1200"
                  data-aos-delay="1000"
                  to="/products"
                  className="cta-btn border-[1px] uppercase h-12 w-64 md:h-14 md:w-52 duration-300 font-medium"
                >
                  <span className="absolute z-30 w-full text-center top-[30%] text-sm md:text-base">
                    BROWSE OUR SHOP !
                  </span>
                </Link>
              </div>
            </div>
          )}
          strength={600}
        ></Parallax>
      </div>
    </div>
  );
};

export default Banner;
