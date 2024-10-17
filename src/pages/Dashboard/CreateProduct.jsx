import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosPost } from "../../lib/axiosPost";
import { useSelector } from "react-redux";

const CreateProduct = () => {
  const token = useSelector((state) => state.user?.token);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    stock: "",
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
    // Check if all fields are filled
    if (
      !product.title ||
      !product.price ||
      !photo || // Check if an image is selected
      !product.category ||
      !product.description ||
      !product.stock
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    setIsLoading(true); // Set loading state

    try {
      // Image upload
      let uploadedImageUrl = null;
      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);
        const response = await axiosPost(
          "/api/products/upload",
          formData,
          token,
          true
        );
        uploadedImageUrl = response.imageUrl;
      }

      // Product creation
      await axiosPost(
        "/api/products",
        {
          ...product,
          imageUrl: uploadedImageUrl,
        },
        token
      );

      toast.success("Product created successfully!");
      // Reset form
      setProduct({
        title: "",
        price: "",
        category: "",
        description: "",
        stock: "",
      });
      setPhoto(null);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    } finally {
      setIsLoading(false); // Reset loading state in any case
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Title</label>
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
          <label className="block font-semibold text-gray-700">Price</label>
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
          <label className="block font-semibold text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Category</label>
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
            <option value="Seeds">Seeds</option>
            <option value="Powders">Powder</option>
            <option value="Dates">Dates</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#8fc442] hover:bg-[#90c442d3] text-white h-12 w-full hover:opacity-80 duration-300 flex items-center justify-center gap-2 font-medium uppercase"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? ( // Show loading indicator
            <span className="loading loading-ring loading-lg"></span>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
