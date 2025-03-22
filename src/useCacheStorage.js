import { useState, useEffect } from "react";

const useCacheStorage = (cacheName) => {
  const [cache, setCache] = useState(null);
  const [error, setError] = useState(null);

  // Initialize the cache
  useEffect(() => {
    const initCache = async () => {
      try {
        const cache = await caches.open(cacheName);
        setCache(cache);
      } catch (err) {
        setError(`Error opening cache: ${err.message}`);
      }
    };

    initCache();
  }, [cacheName]);

  // Add a response to the cache
  const addToCache = async (request, response) => {
    if (!cache) {
      setError("Cache not initialized");
      return;
    }

    try {
      await cache.put(request, response);
    } catch (err) {
      setError(`Error adding to cache: ${err.message}`);
    }
  };

  // Get a response from the cache
  const getFromCache = async (request) => {
    if (!cache) {
      setError("Cache not initialized");
      return null;
    }

    try {
      const response = await cache.match(request);
      return response;
    } catch (err) {
      setError(`Error fetching from cache: ${err.message}`);
      return null;
    }
  };

  // Delete a response from the cache
  const deleteFromCache = async (request) => {
    if (!cache) {
      setError("Cache not initialized");
      return;
    }

    try {
      await cache.delete(request);
    } catch (err) {
      setError(`Error deleting from cache: ${err.message}`);
    }
  };

  // Clear the entire cache
  const clearCache = async () => {
    if (!cache) {
      setError("Cache not initialized");
      return;
    }

    try {
      await caches.delete(cacheName);
      setCache(null);
    } catch (err) {
      setError(`Error clearing cache: ${err.message}`);
    }
  };

  return {
    cache,
    error,
    addToCache,
    getFromCache,
    deleteFromCache,
    clearCache,
  };
};

export default useCacheStorage;