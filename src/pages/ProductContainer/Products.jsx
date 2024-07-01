import { useContext } from "react";
import Categories from "../../component/Categories";
import Error from "../../component/Error";
import Loading from "../../component/Loading";
import ProductItem from "../../component/ProductItem";
import useFetch from "../../hooks/useFetch";
import Nuts from "./Nuts";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet";

const Products = ({ isAddedInHomepage }) => {
  const { user } = useContext(AuthContext);
  const marginClass = `${isAddedInHomepage ? "mt-40" : "mt-20"}`;

  const {
    data: products,
    error,
    isLoading,
  } = useFetch("/api/products", user?.token);

  return (
    <main>
      <Helmet>
        <title>Products - Mazzak Agro</title>
        <meta
          name="description"
          content="Explore our wide range of premium nut products at Mazzak Agro. From roasted cashews to chocolate-covered almonds, indulge in the finest nutty delights."
        />
        <meta
          name="keywords"
          content="Mazzak Agro, nut products, premium nuts, roasted nuts, berries, dates, powder"
        />
        <link rel="canonical" href="https://www.mazzakagro.com/products" />
      </Helmet>
      <Categories></Categories>
      <div className={`${marginClass} overflow-x-hidden`}>
        <div className="wrapper mb-20  flex flex-col gap-10">
          <h2 className="section-title">Browse all products</h2>
          {isLoading && <Loading isLoading={isLoading} />}

          {error && <Error error={error.message} />}
          {products && (
            <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Nuts isAddedInHomepage={true}></Nuts>
    </main>
  );
};

export default Products;
