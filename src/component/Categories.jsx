import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Category = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="category wrapper my-20 flex flex-col gap-10 overflow-x-hidden">
      <h2 className="section-title">Categories</h2>
      <div className="category-wrapper grid grid-cols-2 md:grid-cols-4 gap-5">
        <Link
          to="/products/nuts"
          className="sq-nuts"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <div className="overlay"></div>
          <h3 className="category-title-nuts">
            <p>Nuts</p>
          </h3>
        </Link>
        <Link
          to="/products/seeds"
          className="sq-seeds"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <div className="overlay"></div>
          <h3 className="category-title-seeds">
            <p>Seeds</p>
          </h3>
        </Link>
        <Link
          to="/products/powder"
          className="sq-berries"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <div className="overlay"></div>
          <h3 className="category-title-berries">
            <p>Powder</p>
          </h3>
        </Link>
        <Link
          to="/products/dates"
          className="sq-dates"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <div className="overlay"></div>
          <h3 className="category-title-dates">
            <p>Dates</p>
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Category;
