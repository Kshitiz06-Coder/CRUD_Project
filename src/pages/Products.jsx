import { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { Input } from '../components/Input';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = search ? `/products/search?q=${search}` : '/products?limit=12';
        const response = await apiClient.get(endpoint);
        let items = response.data.products;

        if (sort === 'asc') items.sort((a, b) => a.price - b.price);
        if (sort === 'desc') items.sort((a, b) => b.price - a.price);

        setProducts(items);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, sort]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <img src={prod.thumbnail} alt={prod.title} className="w-full h-40 object-cover rounded-lg mb-3" />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{prod.title}</h3>
                <p className="text-xs text-gray-500 capitalize mt-0.5">{prod.category}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50">
                <span className="font-bold text-blue-600">${prod.price}</span>
                <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">★ {prod.rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title="Product Details">
        {selectedProduct && (
          <div className="space-y-3">
            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-full h-48 object-cover rounded-lg" />
            <h4 className="font-bold text-lg">{selectedProduct.title}</h4>
            <p className="text-sm text-gray-600">{selectedProduct.description}</p>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-blue-600">${selectedProduct.price}</span>
              <span className="text-sm text-gray-500">Stock: {selectedProduct.stock}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
