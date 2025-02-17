import { useDispatch, useSelector } from "react-redux";
import { clearCart, setSubtotal } from "../../store/productSlice";
import { formatCurrency } from "../../utilities/formateCurrency";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartItem from "../../component/CartItem";

const CartPage = () => {
  const userStore = useSelector((state) => state.user?.user);

  const products = useSelector((state) => state.myShop.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(products);

  /* SUBTOTAL CALCULATION */
  const total = () => {
    const calcTotal = products.reduce(
      (acc, item) => (acc += item.quantity * item.price),
      0
    );
    const fixedTotal = +calcTotal.toFixed(2);
    const subtotal = formatCurrency(fixedTotal);

    return subtotal;
  };

  /* CHECKOUT SESSION */
  const createCheckoutSession = async () => {
    // If there is no session, user will redirect into login
    if (!userStore) {
      navigate(`/login?destination=${location.pathname}`, {
        state: { from: location },
      });
      return;
    }
    const subtotal = total();

    // Store the subtotal in the Redux store
    dispatch(setSubtotal(subtotal));

    // Navigate to the CheckoutPage
    navigate("/checkout");
  };

  return (
    <div className="cart-section wrapper my-20 min-h-screen max-[640px]:my-10 max-[640px]:text-[12px] max-[768px]:text-sm max-[1024px]:text-base max-[1024px]:px-5">
      <h2 className="section-title mb-10 max-[385px]:text-xl max-[640px]:text-center max-[640px]:text-2xl max-[640px]:mb-5 max-[1024px]:text-3xl">
        {products.length > 0 ? (
          <p>
            Your cart has ({products.length} item
            {products.length > 1 ? "s" : ""})
          </p>
        ) : (
          <p className="text-center">Your cart is empty</p>
        )}
      </h2>

      {products.length < 1 && (
        <div className="text-center">
          <Link
            to="/products"
            className="clear-cart uppercase border py-3 px-5 inline-block hover:bg-cyan-500 hover:text-cyan-50 hover:border-cyan-500 duration-300 "
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <>
          <div className="cart-items-wrapper max-[385px]:text-[10px]">
            <div className="product-headlines grid grid-cols-5 gap-10 border-b pb-2 uppercase font-light">
              <div className="col-product col-span-2">Item</div>
              <div className="col-unit-price text-center">Unit Price</div>
              <div className="col-quantity text-center">Quantity</div>
              <div className="col-total-price ml-auto">Total</div>
            </div>

            <div className="products flex flex-col">
              {products?.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="cart-lower flex justify-between items-start my-10 max-[640px]:my-5 max-[640px]:gap-5 max-[640px]:flex-col">
            <div className="flex justify-center items-center gap-5 max-[640px]:w-full">
              <button
                onClick={() => dispatch(clearCart())}
                className="clear-cart uppercase border p-3 hover:bg-rose-500 hover:text-rose-50 hover:border-rose-500 duration-300 max-[385px]:hidden max-[640px]:w-full"
              >
                Clear Cart
              </button>
              <Link
                to="/products"
                className="clear-cart uppercase text-center border p-3 hover:bg-cyan-500 hover:text-cyan-50 hover:border-cyan-500 duration-300 max-[385px]:text-xs max-[640px]:w-full"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="flex flex-col items-start gap-5 max-[385px]: text-xs max-[640px]:w-full">
              <div className="top flex justify-between items-center w-full text-xl font-medium border-b max-[640px]:text-[12px]">
                <span className="uppercase">Subtotal</span>
                <span>{total()}</span>
              </div>
              <p className="text-gray-400  max-[640px]:hidden">
                Shipping cost will calculate at the checkout.
              </p>
              <button
                onClick={createCheckoutSession}
                role="link"
                className="bg-cyan-500 w-full py-5 uppercase font-medium text-cyan-50 tracking-widest hover:bg-cyan-600 duration-300 text-center"
              >
                {!userStore ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
