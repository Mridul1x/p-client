import React, { useContext } from "react";
import ProductItem from "../../component/ProductItem";
import Loading from "../../component/Loading";
import Error from "../../component/Error";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../provider/AuthProvider";

const Nuts = ({ isAddedInHomepage }) => {
  const { user } = useContext(AuthContext);
  const marginClass = `${isAddedInHomepage ? "mt-5" : "mt-20"}`;
  const {
    data: products,
    error,
    isLoading,
  } = useFetch("/api/products", user?.token);

  const filteredProducts = products?.filter(
    (product) => product.category === "Nuts"
  );
  const updatedProducts = filteredProducts?.map((product) => ({
    ...product,
    updatedAt: product.updatedAt.toString(),
    createdAt: product.createdAt.toString(),
  }));

  return (
    <main className={`${marginClass} overflow-x-hidden`}>
      <div className="wrapper mb-20 flex flex-col gap-10">
        <h2 className="section-title my-2 leading-relaxed">
          Browse all nuts- কাজুবাদাম রোস্টেড উইথ সল্ট -
          <span className="text-green-700"> 0% কোলেস্টেরল</span> (150gm)
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
  );
};

export default Nuts;
