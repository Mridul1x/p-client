import { useCallback, useState, useEffect, useContext } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { formatCurrency } from "../../utilities/formateCurrency";
import { Link, useParams } from "react-router-dom";
import Loading from "../../component/Loading";
import Error from "../../component/Error";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/productSlice";
import { AuthContext } from "../../provider/AuthProvider";
import Overlay from "../../component/Overlay";

const ProductDetails = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { user } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);

  const handleDecrease = useCallback(() => {
    setQuantity(quantity === 1 ? 1 : (prev) => prev - 1);
  }, [quantity]);

  const handleIncrease = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    data: product,
    error,
    isLoading,
  } = useFetch(`/api/products/${productId}`, user?.token);

  if (isLoading) {
    return <Overlay></Overlay>;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <div className="wrapper mb-20 grid lg:grid-cols-2 gap-10 mt-20">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-auto max-h-[730px] object-cover"
        />

        <div className="flex flex-col gap-5">
          <span
            className="uppercase tracking-widest font-semibold text-sm text-cyan-500"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {product.category}
          </span>
          <h2
            className="text-4xl"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            {product.title}
            {"  "}
            <span className="uppercase text-xl font-medium tracking-widest">
              (150gm)
            </span>
          </h2>
          <div
            className="flex gap-10 items-center"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <p className="text-2xl text-rose-500 font-medium">
              {formatCurrency(product.price * quantity)}
            </p>
            <div className="counter flex items-center bg-gray-100 text-2xl">
              <button
                onClick={handleDecrease}
                className="bg-gray-700 text-white h-10 w-10 flex items-center justify-center hover:bg-cyan-500 duration-300"
              >
                -
              </button>
              <span className="h-10 w-10 flex items-center justify-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="bg-gray-700 text-white h-10 w-10 flex items-center justify-center hover:bg-cyan-500 duration-300"
              >
                +
              </button>
            </div>
          </div>
          <Link
            onClick={() => dispatch(addToCart({ ...product, quantity }))}
            to="/cart"
            className="bg-cyan-500 text-center py-3 text-white text-xl font-medium hover:bg-cyan-600 duration-300 mt-5"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="800"
          >
            Add to Cart
          </Link>
          <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
            <p className="font-medium mb-3">Description:</p>
            <p className="text-gray-500">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
