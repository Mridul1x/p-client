// src/components/ProductList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { axiosPut } from "../../lib/axiosPut";
import { useSelector } from "react-redux";
import { axiosDelete } from "../../lib/axiosDelete";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await axiosDelete(`/api/products/${id}`, token);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await axiosPut(
        `/api/products/${updatedProduct._id}`,
        updatedProduct,
        token
      );
      setProducts(
        products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      toast.success("Product updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Products List</h2>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border font-medium px-4 py-2">{product.title}</td>
              <td className="border font-medium px-4 py-2">{product.category}</td>
              <td className="border font-medium px-4 py-2">{product.price}</td>
              <td className="border font-medium px-4 py-2">{product.description}</td>
              <td className="border font-medium px-4 py-2 space-y-2">
                <button
                  onClick={() => openModal(product)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2 w-full"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Update Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedProduct);
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <textarea
                  name="description"
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-32 px-3 py-2 border rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category"
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="Nuts">Nuts</option>
                  <option value="Seed">Seed</option>
                  <option value="Powder">Powder</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
