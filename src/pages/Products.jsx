import { useState, useEffect } from 'react';
import apiClient from '../api/postService';
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
      <div>
        <h2 className="text-xl font-bold text-slate-900">Products</h2>
        <p className="text-sm text-slate-500 mt-0.5">Browse and manage your product catalog.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative w-full sm:w-56">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={prod.thumbnail} 
                  alt={prod.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-lg shadow-sm capitalize">
                    {prod.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-900 line-clamp-1">{prod.title}</h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600">${prod.price}</span>
                  <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg">
                    <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-semibold">{prod.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title="Product Details">
        {selectedProduct && (
          <div className="space-y-5">
            <div className="rounded-xl overflow-hidden bg-slate-100 h-56">
              <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg capitalize mb-2">
                {selectedProduct.category}
              </span>
              <h4 className="text-xl font-bold text-slate-900">{selectedProduct.title}</h4>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{selectedProduct.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-medium uppercase">Price</p>
                <p className="text-xl font-bold text-indigo-600 mt-0.5">${selectedProduct.price}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-medium uppercase">Stock</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{selectedProduct.stock} units</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};