import React, { useContext } from "react";
import ProductItem from "../../component/ProductItem";
import Loading from "../../component/Loading";
import Error from "../../component/Error";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../provider/AuthProvider";
import ComingSoon from "../../component/ComingSoon";

const Seeds = ({ isAddedInHomepage }) => {
  const { user } = useContext(AuthContext);
  const marginClass = `${isAddedInHomepage ? "mt-5" : "mt-20"}`;
  const {
    data: products,
    error,
    isLoading,
  } = useFetch("/api/products", user?.token);

  const filteredProducts = products?.filter(
    (product) => product.category === "Seeds"
  );
  const updatedProducts = filteredProducts?.map((product) => ({
    ...product,
    updatedAt: product.updatedAt.toString(),
    createdAt: product.createdAt.toString(),
  }));

  return (
    <>
      {updatedProducts?.length > 0 ? (
        <main className={`${marginClass} overflow-x-hidden`}>
          <div className="wrapper mb-20 flex flex-col gap-10">
            <h2 className="section-title my-2 leading-relaxed">
              Browse all Seeds
            </h2>
            {isLoading && <Loading isLoading={isLoading} />}
            {error && <Error error={error.message} />}
            <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {updatedProducts?.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </div>
        </main>
      ) : (
        <ComingSoon></ComingSoon>
      )}
    </>
  );
};

export default Seeds;
