import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col  pb-3 ">
      <img
        src={product.imageUrl}
        alt={product.title}
        className=" object-cover w-[30rem] h-[30rem]"
      />
      <div className="p-4">
        <h3 className="product-title text-lg  text-center font-semibold">
          {product.title}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
