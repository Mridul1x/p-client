import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utilities/formateCurrency";
import axios from "axios";
import { axiosPost } from "../../lib/axiosPost";
import { useNavigate } from "react-router-dom";
import NavbarOverlay from "../../component/NavbarOverlay";
import { SlArrowRight } from "react-icons/sl";

const CheckoutPage = () => {
  const userStore = useSelector((state) => state.user?.user);
  const subtotal = useSelector((state) => state.myShop.subtotal);
  const products = useSelector((state) => state.myShop.products);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [discountedSubtotal, setDiscountedSubtotal] = useState(subtotal);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCodeSuccess, setPromoCodeSuccess] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const apiBaseUrl = "http://localhost:5050";
  const handleShippingCostChange = (event) => {
    setShippingCost(event.target.value === "inside" ? 70 : 130);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePromoCodeChange = (event) => {
    const code = event.target.value.trim().toLowerCase();
    setPromoCode(code);
    setPromoCodeError("");
    setPromoCodeSuccess(false);
    setDiscountedSubtotal(subtotal);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    if (value.length !== 11 || !/^\d+$/.test(value)) {
      setMobileError("Please enter a valid 11-digit mobile number");
    } else {
      setMobileError("");
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.length < 10) {
      setAddressError(
        "Please enter a valid address (minimum 10 characters; ex: House: 12, Road: 05, Sector: 12, Uttara, Dhaka)"
      );
    } else {
      setAddressError("");
    }
  };
  const applyPromoCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/cupon/apply",
        {
          name: promoCode,
        }
      );
      const { discount } = response.data;

      const numericSubtotal = parseFloat(subtotal.replace(/[^0-9.-]+/g, ""));
      const discountedAmount = numericSubtotal * (1 - discount / 100);
      setDiscountedSubtotal(discountedAmount);
      setPromoCodeSuccess(true);
    } catch (error) {
      setPromoCodeError(error.response?.data?.message || "Invalid promo code!");
    }
  };
  const subtotalNumber = parseFloat(
    discountedSubtotal.toString().replace(/[^0-9.-]+/g, "")
  );
  const totalInCents = subtotalNumber * 100 + shippingCost * 100;
  const total = totalInCents / 100;

  const formattedSubtotal = formatCurrency(subtotalNumber, "en-US", "BDT");
  const formattedShippingCost = formatCurrency(shippingCost, "en-US", "BDT");
  const formattedTotal = formatCurrency(total, "en-US", "BDT");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoadingOverlay(true);

    if (paymentMethod === "cashOnDelivery") {
      setTimeout(() => {
        setIsLoading(true);
        placeOrder();
      }, 1000);
    } else if (paymentMethod === "onlinePayment") {
      setIsLoading(true);
      try {
        const orderProducts = products.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
        }));
        const newOrder = {
          amountTotal: subtotalNumber + shippingCost,
          amountShipping: shippingCost, // Ensure this is included
          status: "pending",
          mobile,
          address,
          userId: userStore._id,
          products: orderProducts,
          paymentMethod: "Online Payment",
          promoCode: promoCode,
        };

        const result = await axiosPost(
          "/api/payment/ssl-request",
          newOrder,
          token
        );

        if (result && result.url) {
          window.location.href = result.url;
        } else {
          console.error("Result does not contain URL:", result);
          setShowLoadingOverlay(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error redirecting to SSLCommerz:", error);
        setShowLoadingOverlay(false);
        setIsLoading(false);
      }
    }
  };

  const placeOrder = async () => {
    const transactionID = "txn_" + new Date().getTime();
    try {
      const orderProducts = products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      }));
      const newOrder = await axiosPost("/api/orders", {
        amountTotal: subtotalNumber + shippingCost,
        amountShipping: shippingCost,
        status: "pending",
        mobile,
        address,
        userId: userStore._id,
        products: orderProducts,
        transactionID, // Make sure this matches
        paymentMethod: "Cash On Delivery",
        promoCode: promoCode,
      });

      await axios.put(
        `${apiBaseUrl}/api/users/${userStore._id}/orders`,
        {
          orderId: newOrder._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/success/${transactionID}`, { state: { orderData: newOrder } });
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const isFormValid =
    mobile.trim() !== "" &&
    address.trim() !== "" &&
    shippingCost !== 0 &&
    (paymentMethod === "cashOnDelivery" || paymentMethod === "onlinePayment") &&
    mobileError === "" &&
    addressError === "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <p className="text-gray-700 font-bold mb-2">Name: {userStore.name}</p>
          <p className="text-gray-700 font-bold">Email: {userStore.email}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Shipping Information</h3>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  mobileError ? "border-red-500" : ""
                }`}
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={handleMobileChange}
                required
                pattern="[0-9]{11}"
                maxLength={11}
              />
              {mobileError && (
                <p className="text-red-500 mt-1">{mobileError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  addressError ? "border-red-500" : ""
                }`}
                id="address"
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                required
                minLength="10"
              />
              {addressError && (
                <p className="text-red-500 mt-1">{addressError}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Shipping Cost</h3>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="shippingCost"
                value="inside"
                checked={shippingCost === 70}
                onChange={handleShippingCostChange}
                required
              />
              <span className="text-gray-700">Inside Dhaka: 70 BDT</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="shippingCost"
                value="outside"
                checked={shippingCost === 130}
                onChange={handleShippingCostChange}
                required
              />
              <span className="text-gray-700">Outside Dhaka: 130 BDT</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Payment Method</h3>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={handlePaymentMethodChange}
                required
              />
              <span className="text-gray-700">Cash on Delivery</span>
            </div>
            <div className="flex items-center mt-2">
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="paymentMethod"
                value="onlinePayment"
                checked={paymentMethod === "onlinePayment"}
                onChange={handlePaymentMethodChange}
                required
              />
              <span className="text-gray-700">Online Payment</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Promo Code</h3>
            <div className="flex items-center">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="promoCode"
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={applyPromoCode}
              >
                Apply
              </button>
            </div>
            {promoCodeError && (
              <p className="text-red-500 mt-1">{promoCodeError}</p>
            )}
            {promoCodeSuccess && (
              <p className="text-green-500 mt-1">Promo code applied!</p>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Order Summary</h3>
            <p className="text-gray-700">Subtotal: {formattedSubtotal}</p>
            <p className="text-gray-700">
              Shipping Cost: {formattedShippingCost}
            </p>
            <p className="text-gray-700 font-bold">Total: {formattedTotal}</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>

      {showLoadingOverlay && (
        <NavbarOverlay>
          <div className="flex justify-center items-center h-full">
            <SlArrowRight className="animate-spin h-8 w-8 text-white" />
            <span className="ml-4 text-white">Processing your order...</span>
          </div>
        </NavbarOverlay>
      )}
    </div>
  );
};

export default CheckoutPage;
