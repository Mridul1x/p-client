import { useCallback, useState, useEffect, useContext } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import { formatCurrency } from "../../utilities/formateCurrency";
import { Link, useParams } from "react-router-dom";
import Error from "../../component/Error";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/productSlice";
import { AuthContext } from "../../provider/AuthProvider";
import Overlay from "../../component/Overlay";
import toast from "react-hot-toast";

const ProductDetails = () => {
  useEffect(() => {
    AOS.init();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const {
    data: product,
    error,
    isLoading,
  } = useFetch(`/api/products/${productId}`, user?.token);

  const handleIncrease = useCallback(() => {
    if (quantity < product?.stock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Stock limit reached!"); // Show toast when exceeding stock
    }
  }, [quantity, product?.stock]);

  const handleDecrease = useCallback(() => {
    setQuantity(quantity === 1 ? 1 : (prev) => prev - 1);
  }, [quantity]);

  const isProductInCart = useSelector((state) =>
    state.myShop.products.find((item) => item._id === productId)
  );

  const isOutOfStock = isProductInCart
    ? isProductInCart.quantity >= product?.stock
    : false;

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
            onClick={() => {
              if (!isOutOfStock) {
                dispatch(addToCart({ ...product, quantity }));
              } else {
                toast.error("Product already in cart with max stock");
              }
            }}
            to="/cart"
            className={`bg-cyan-500 text-center py-3 text-white text-xl font-medium hover:bg-cyan-600 duration-300 mt-5 ${
              isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
            }`}
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="800"
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Link>
          <div className="mt-5" data-aos="fade-up" data-aos-duration="1000">
            <p className="font-medium mb-2">Stock:</p>
            <p className="text-gray-500 mb-4"> {product?.stock}</p>
            <p className="font-medium mb-2">Description:</p>
            <p className="text-gray-500">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
