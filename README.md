# use-cachestorage-hook

A React hook to easily manage local storage.

## Demo

[CodeSandbox Demo](https://codesandbox.io/p/sandbox/rf7l3v)

## Installation

```bash
npm install use-cachestorage-hook
```


## Usage
```bash
import React from "react";
import useCacheStorage from "use-cachestorage-hook";

const App = () => {
  const { cache, error, addToCache, getFromCache } = useCacheStorage("MyCache");

  const handleAddToCache = async () => {
    const request = new Request("/test");
    const response = new Response("Test Response");
    await addToCache(request, response);
  };

  const handleGetFromCache = async () => {
    const request = new Request("/test");
    const response = await getFromCache(request);
    if (response) {
      const data = await response.text();
      console.log(data);
    }
  };

  return (
    <div>
      <button onClick={handleAddToCache}>Add to Cache</button>
      <button onClick={handleGetFromCache}>Get from Cache</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
```

## Cache API

This section describes the available API for interacting with the Cache storage.

* **`cache`**: The Cache instance.
* **`error`**: Any error that occurs during cache operations.

### Cache Operations

The following functions provide functionality for managing cached responses:

* **`addToCache(request, response)`**: Adds a `response` to the cache, associated with the provided `request`.
    * `request`: A `Request` object representing the request.
    * `response`: A `Response` object representing the response to be cached.
* **`getFromCache(request)`**: Retrieves a `Response` object from the cache that matches the provided `request`.
    * `request`: A `Request` object representing the request to look up in the cache.
    * Returns: A `Response` object if found, or `undefined` if not found.
* **`deleteFromCache(request)`**: Deletes a `Response` object from the cache that matches the provided `request`.
    * `request`: A `Request` object representing the request to remove from the cache.
    * Returns: A boolean indicating whether the deletion was successful.
* **`clearCache()`**: Clears all entries from the cache.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.