import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useStore } from './StoreContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { addToast } = useStore();

  const [wishlist, setWishlist] = useState(() => {
    const saved = getStorageItem('bluebells_wishlist', []);
    return Array.isArray(saved) ? [...new Set(saved.filter((id) => typeof id === 'string'))] : [];
  });

  useEffect(() => {
    setStorageItem('bluebells_wishlist', wishlist);
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    const exists = wishlist.includes(productId);
    setWishlist((prev) => {
      if (exists) {
        return prev.filter((id) => id !== productId);
      } else {
        return prev.includes(productId) ? prev : [...prev, productId];
      }
    });
    addToast(exists ? 'Removed from wishlist' : 'Added to wishlist!', exists ? 'info' : 'success');
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
    addToast('Removed from wishlist', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
