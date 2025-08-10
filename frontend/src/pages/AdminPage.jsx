import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State para sa Add form
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');

  // State para sa Edit form
  const [editingProduct, setEditingProduct] = useState(null); // Ito ang product na ine-edit
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');
  const [editProductDescription, setEditProductDescription] = useState('');
  const [editProductImageUrl, setEditProductImageUrl] = useState('');

  // Function para kunin ang lahat ng produkto
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products for admin:', err);
      setError('Hindi makakonekta sa server upang makuha ang produkto.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add Product submission
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) {
      alert('Product name and price are required!'); // Note: Use custom modal instead of alert in real app
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/products', {
        name: newProductName,
        price: parseFloat(newProductPrice),
        description: newProductDescription,
        imageUrl: newProductImageUrl,
      });
      alert('Product added successfully!');
      fetchProducts();
      setNewProductName('');
      setNewProductPrice('');
      setNewProductDescription('');
      setNewProductImageUrl('');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Error adding product. Please try again.');
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) { // Note: Use custom modal instead of confirm in real app
      try {
        await axios.delete(`http://localhost:3001/api/products/${id}`);
        alert('Product deleted successfully!');
        fetchProducts(); // I-refresh ang listahan pagkatapos mag-delete
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  // Handle Edit button click (Populate form)
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditProductName(product.name);
    setEditProductPrice(product.price);
    setEditProductDescription(product.description || ''); // Handle null description
    setEditProductImageUrl(product.imageUrl || ''); // Handle null image URL
  };

  // Handle Update Product submission
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editProductName || !editProductPrice) {
      alert('Product name and price are required!');
      return;
    }
    if (!editingProduct) return; // Should not happen

    try {
      await axios.put(`http://localhost:3001/api/products/${editingProduct.id}`, {
        name: editProductName,
        price: parseFloat(editProductPrice),
        description: editProductDescription,
        imageUrl: editProductImageUrl,
      });
      alert('Product updated successfully!');
      fetchProducts(); // I-refresh ang listahan pagkatapos mag-update
      setEditingProduct(null); // Exit edit mode
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Error updating product. Please try again.');
    }
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="text-center p-5 text-xl">Loading admin panel...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="p-10 max-w-6xl mx-auto my-10 border border-gray-200 rounded-lg shadow-xl bg-white font-sans">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Admin Panel - Product Management</h1>

      {/* Add New Product Form */}
      <div className="mb-10 p-6 border border-blue-200 rounded-lg bg-blue-50 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="add-name" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
            <input
              type="text"
              id="add-name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="add-price" className="block text-gray-700 text-sm font-bold mb-2">Price (Php)</label>
            <input
              type="number"
              id="add-price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              step="0.01"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="add-description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="add-description"
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent h-24"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="add-imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
            <input
              type="text"
              id="add-imageUrl"
              value={newProductImageUrl}
              onChange={(e) => setNewProductImageUrl(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="e.g., https://example.com/product.jpg"
            />
          </div>
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md text-lg font-semibold"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Edit Product Form (Conditional Render) */}
      {editingProduct && (
        <div className="mb-10 p-6 border border-yellow-300 rounded-lg bg-yellow-50 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Edit Product (ID: {editingProduct.id})</h2>
          <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="edit-name" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                id="edit-name"
                value={editProductName}
                onChange={(e) => setEditProductName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-price" className="block text-gray-700 text-sm font-bold mb-2">Price (Php)</label>
              <input
                type="number"
                id="edit-price"
                value={editProductPrice}
                onChange={(e) => setEditProductPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                step="0.01"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="edit-description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                id="edit-description"
                value={editProductDescription}
                onChange={(e) => setEditProductDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent h-24"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="edit-imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
              <input
                type="text"
                id="edit-imageUrl"
                value={editProductImageUrl}
                onChange={(e) => setEditProductImageUrl(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="e.g., https://example.com/product.jpg"
              />
            </div>
            <div className="md:col-span-2 flex justify-center gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md text-lg font-semibold"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 shadow-md text-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List for Management */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Existing Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{product.id}</td>
                <td className="py-3 px-6 text-left">{product.name}</td>
                <td className="py-3 px-6 text-left">Php {product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex item-center justify-start space-x-2"> {/* Changed justify-center to justify-start for better alignment */}
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
