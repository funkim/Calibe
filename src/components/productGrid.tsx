'use client';
import Image from 'next/image';

import { useState, useEffect } from 'react';
async function fetchStoreItems() {
  try {
    const source = await fetch('https://fakestoreapi.com/products');
    const data = await source.json();
    const menClothing = data.filter((item) => item.category === "men's clothing");
    const jewelery = data.filter((item) => item.category === 'jewelery');
    const womenClothing = data.filter((item) => item.category === "women's clothing");
    const usedItems = [...menClothing, ...jewelery, ...womenClothing];
    console.log(usedItems);
    return usedItems;
  } catch (error) {
    console.error('Error fetching store items:', error);
    return [];
  }
}

export default function ProductGrid() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadItems() {
      const fetchedItems = await fetchStoreItems();
      setItems(fetchedItems);
      console.log(items);
    }
    loadItems();
  }, []);

  return (
    <div className="bg-white font-body">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items
            .filter((item, idx) => idx < 3)
            .map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
