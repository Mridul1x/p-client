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
  const apiBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  const token = useSelector((state) => state.user?.token);
  // Handle shipping cost change
  const handleShippingCostChange = (event) => {
    setShippingCost(event.target.value === "inside" ? 70 : 130);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Handle promo code change
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

  // Apply promo code
  const applyPromoCode = () => {
    const code = promoCode.trim().toLowerCase();
    if (code === "mazzak10" || code === "niloy10") {
      const numericSubtotal = parseFloat(subtotal.replace(/[^0-9.-]+/g, ""));
      const discountedAmount = numericSubtotal * 0.95;
      setDiscountedSubtotal(discountedAmount);
      setPromoCodeSuccess(true);
    } else if (code !== "") {
      setPromoCodeError("Invalid promo code!");
    }
  };

  // Calculate total
  const subtotalNumber = parseFloat(
    discountedSubtotal.toString().replace(/[^0-9.-]+/g, "")
  );
  const totalInCents = subtotalNumber * 100 + shippingCost * 100;
  const total = totalInCents / 100;

  // Format subtotal, shipping cost, and total with currency
  const formattedSubtotal = formatCurrency(subtotalNumber, "en-US", "BDT");
  const formattedShippingCost = formatCurrency(shippingCost, "en-US", "BDT");
  const formattedTotal = formatCurrency(total, "en-US", "BDT");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoadingOverlay(true);

    // Simulate a 10-second loading time
    setTimeout(() => {
      setIsLoading(true);
      placeOrder();
    }, 10000);
  };

  const placeOrder = async () => {
    try {
      const orderProducts = products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      }));
      // Create a new order
      const newOrder = await axiosPost("/api/orders", {
        amountTotal: subtotalNumber + shippingCost,
        amountShipping: shippingCost,
        status: "pending",
        mobile,
        address,
        userId: userStore._id,
        products: orderProducts,
      });

      // Update the user's orders
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

      // Redirect to success page with order data
      navigate("/success", { state: { orderData: newOrder } });
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
    paymentMethod === "cashOnDelivery" &&
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
              <span className="text-gray-700">Inside Dhaka ( 70 BDT )</span>
            </div>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="shippingCost"
                value="outside"
                checked={shippingCost === 130}
                onChange={handleShippingCostChange}
              />
              <span className="text-gray-700">Outside Dhaka ( 130 BDT )</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Payment Method</h3>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={handlePaymentMethodChange}
                required
              />
              <span className="text-gray-700">Cash On Delivery</span>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">
              Promo Code{" "}
              <span className="text-xs text-gray-500">
                ( apply if you have one )
              </span>
            </h3>
            <div className="flex items-center">
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 ${
                  promoCodeError ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter your promo code"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <p
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded cursor-pointer"
                onClick={applyPromoCode}
              >
                Apply
              </p>
            </div>
            {promoCodeSuccess && (
              <span className="text-green-500   animate-pulse">
                Promo code applied!
              </span>
            )}
            {promoCodeError && (
              <span className="text-red-500 ">{promoCodeError}</span>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Order Summary</h3>
            <p className="text-gray-700 font-bold mb-2">
              Subtotal: {formattedSubtotal}
            </p>
            <p className="text-gray-700 font-bold mb-2">
              Shipping Cost: {formattedShippingCost}
            </p>
            <p className="text-gray-700 font-bold">Total: {formattedTotal}</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className={`bg-[#ff7801] hover:bg-[#ff78018a]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isLoading || !isFormValid}
              onClick={handleSubmit}
            >
              {showLoadingOverlay ? (
                <div className="flex items-center">
                  <span className="mr-2">Placing Order</span>
                  <NavbarOverlay />
                </div>
              ) : (
                <span className="flex items-center">
                  Place Order <SlArrowRight className="ms-2" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
