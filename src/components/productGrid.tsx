'use client';
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

async function fetchStoreItems() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const filteredItems = data.filter(
      (item) => item.category === "men's clothing" || item.category === 'jewelery' || item.category === "women's clothing"
    );
    return filteredItems;
  } catch (error) {
    console.error('Error fetching store items:', error);
    return [];
  }
}

function ProductCard({ item }) {
  return (
    <div key={item.id} className="flex flex-col justify-between h-full p-4 rounded-lg">
      <div className="overflow-hidden h-48 flex items-center justify-center">
        <LazyLoadImage src={item.image} alt={item.title} effect="blur" className="max-h-48 object-cover rounded" />
      </div>
      <h2 className="text-sm text-center text-gray-700 mt-4">{item.title}</h2>
      <p className="text-lg text-center font-medium text-gray-900 mt-1">${item.price}</p>
    </div>
  );
}

export default function ProductGrid() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadItems() {
      setIsLoading(true);
      const fetchedItems = await fetchStoreItems();
      setItems(fetchedItems);
      setIsLoading(false);
    }
    loadItems().catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white font-body">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-y-10 gap-x-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-20">
              {items.slice(0, 3).map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
