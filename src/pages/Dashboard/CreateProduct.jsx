import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosPost } from "../../lib/axiosPost";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const token = useSelector((state) => state.user?.token);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axiosPost("/api/products", product, token);

      toast.success("Product created successfully!");
      // Reset form
      setProduct({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Nuts">Nuts</option>
            <option value="Seed">Seed</option>
            <option value="Powder">Powder</option>
            <option value="Date">Date</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#8fc442] hover:bg-[#90c442d3] text-white font-bold py-2 px-4 rounded-lg"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
