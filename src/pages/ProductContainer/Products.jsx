import { useContext, useEffect, useState } from "react";
import Categories from "../../component/Categories";
import Error from "../../component/Error";
import Loading from "../../component/Loading";
import ProductItem from "../../component/ProductItem";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet";

const Products = ({ isAddedInHomepage }) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const { user } = useContext(AuthContext);
  const marginClass = `${isAddedInHomepage ? "mt-40" : "mt-20"}`;
  // State for search input
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const {
    data: products,
    error,
    isLoading,
  } = useFetch("/api/products", user?.token);

  // Filter products based on the search query
  const filteredProducts = products
    ?.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory
        ? product.category.toLowerCase() === selectedCategory
        : true
    )
    .sort((a, b) => {
      if (sortBy === "low-to-high") {
        return a.price - b.price;
      } else if (sortBy === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <main>
      <Helmet>
        <title>Products - AgroMart</title>
        <meta
          name="description"
          content="Explore our wide range of premium nut products at AgroMart. From roasted cashews to chocolate-covered almonds, indulge in the finest nutty delights."
        />
        <meta
          name="keywords"
          content="AgroMart, nut products, premium nuts, roasted nuts, berries, dates, powder"
        />
        <link rel="canonical" href="https://www.agromart.com/products" />
      </Helmet>
      <Categories></Categories>

      {/* Search Bar */}

      {/* browse all products */}
      <div className={`${marginClass} overflow-x-hidden`}>
        <div className="wrapper mb-20  flex flex-col gap-10">
          <div className="mb-8 mt-8 flex justify-between items-center">
            <h2 className="section-title">Browse all products</h2>

            <div className="flex gap-4">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search products..."
                className="border-2 border-gray-300 rounded-md p-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Sort by Category */}
              <select
                className="border-2 border-gray-300 rounded-md p-2"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="nuts">Nuts</option>
                <option value="seeds">Seeds</option>
                <option value="powder">Powder</option>
                <option value="dates">Dates</option>
              </select>

              {/* Sort by Price */}
              <select
                className="border-2 border-gray-300 rounded-md p-2"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {isLoading && <Loading isLoading={isLoading} />}

          {error && <Error error={error.message} />}
          {filteredProducts && (
            <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              ) : (
                <p className="text-red-600">No products found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Products;
