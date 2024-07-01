import React, { useContext } from "react";

import { Link } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import useFetch from "../../hooks/useFetch";
import Loading from "../../component/Loading";
import Error from "../../component/Error";
import { AuthContext } from "../../provider/AuthProvider";
const LatestProducts = () => {
  const { user } = useContext(AuthContext);
  const {
    data: products,
    error,
    isLoading,
  } = useFetch("/api/products", user?.token);

  return (
    <div className="wrapper my-8">
      <h2 className="section-title text-center my-12">
        Latest Featured Products
      </h2>
      {isLoading && <Loading isLoading={isLoading} />}

      {error && <Error error={error.message} />}
      {products && (
        <div className="flex flex-col items-center">
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Link
            to="/products"
            className="mt-5  inline-block border  bg-black text-white py-2 px-6 hover:bg-rose-900  transition-colors duration-300 font-serif uppercase text-xl "
          >
            More
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
