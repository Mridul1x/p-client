import React, { useCallback, useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { formatCurrency } from "../../utilities/formateCurrency";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../../component/Error";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/productSlice";
import { AuthContext } from "../../provider/AuthProvider";
import Overlay from "../../component/Overlay";
import toast from "react-hot-toast";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCartPlus } from "react-icons/fa";

const ProductDetails = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Only animate elements once when they become visible
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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
      toast.error("Stock limit reached!");
    }
  }, [quantity, product?.stock]);

  const handleDecrease = useCallback(() => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  }, []);

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      dispatch(addToCart({ ...product, quantity }));
      navigate("/cart"); // Navigate to the cart page
    } else {
      toast.error("Product is out of stock.");
    }
  };

  const isProductInCart = useSelector((state) =>
    state.myShop.products.find((item) => item._id === productId)
  );

  const isOutOfStock = isProductInCart
    ? isProductInCart.quantity >= product?.stock
    : product?.stock === 0; // Check if product stock is 0

  if (isLoading) {
    return <Overlay />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-500" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={stars.length + i} className="text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto mt-16 px-4 md:px-0 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
            data-aos="fade-right"
            data-aos-duration="1000"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg flex items-center justify-center">
              <p className="text-white text-2xl font-bold">Out of Stock</p>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div>
          <div className="mb-4">
            <span
              className="uppercase tracking-widest font-semibold text-sm text-gray-500"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              {product.category}
            </span>
            <h1
              className="text-3xl font-bold mb-2"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              {product.title}
            </h1>
          </div>

          <div className="flex items-center mb-4">
            {/* You can add a dynamic rating here later */}
            {renderStars(4.5)}
          </div>

          <p
            className="text-gray-700 mb-6"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {product.description}
          </p>

          <div className="flex items-center mb-4">
            <p className="text-2xl font-bold text-gray-800 mr-4">
              {formatCurrency(product.price * quantity)}
            </p>
            {/* Quantity Counter */}
            <div className="counter flex items-center border border-gray-300 rounded">
              <button
                onClick={handleDecrease}
                className="px-4 py-2 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-2 border-l border-r border-gray-300">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-4 py-2 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (!isOutOfStock) {
                  dispatch(addToCart({ ...product, quantity }));
                  toast.success("Product added to cart!");
                } else {
                  toast.error("Product is out of stock.");
                }
              }}
              className={`flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isOutOfStock}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <FaCartPlus className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className={`flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 ${
                isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isOutOfStock}
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="400" // Slightly delay this animation
            >
              Buy Now
            </button>

            {/* You can add other buttons here, like "Buy Now" or "Add to Wishlist" */}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Product Details</h3>
            <ul className="text-gray-600">
              <li>
                <span className="font-bold">Category:</span> {product.category}
              </li>
              <li>
                <span className="font-bold">Stock:</span> {product.stock}
              </li>
              {/* Add more details as needed */}
            </ul>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Reviews</h3>
            {product.reviews.length > 0 ? (
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                      <p className="font-bold mr-2">{review.user}</p>
                      {/* You can add a user avatar here */}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              "There are no reviews yet!"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
