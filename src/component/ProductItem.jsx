import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formateCurrency";
import { useSelector } from "react-redux";

const ProductItem = ({ product }) => {
  const userStore = useSelector((state) => state.user?.user);
  return (
    <div className="flex flex-col gap-4 w-full md:w-[22rem] p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.imageUrl}
          width={500}
          height={500}
          alt={product.title}
          className="w-full h-[22rem] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      <span className="text-gray-700 uppercase text-xs tracking-widest font-semibold">
        {product.category}
      </span>
      <h3 className="product-title text-xl font-semibold h-[2.8rem] leading-tight">
        {product.title}
        {product.category === "Nuts" && (
          <span className="uppercase text-lg font-medium tracking-widest">
            {" "}
            (150gm)
          </span>
        )}
      </h3>
      <p className="text-gray-600 text-sm h-[4rem] overflow-hidden line-clamp-2">
        {product.description?.split(".")[0]}.
      </p>
      <div className="flex justify-between items-center ">
        <p className="text-rose-500 font-medium">
          {formatCurrency(product.price)}
        </p>
        <p
          className={`text-sm font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>
      </div>
      {userStore?.role !== "admin" && (
        <Link
          to={`/products/${product.category.toLowerCase()}/${product._id}`}
          className="uppercase btn btn-outline linear-walkaways font-semibold rounded-lg"
        >
          Buy Now
        </Link>
      )}
    </div>
  );
};

export default ProductItem;
