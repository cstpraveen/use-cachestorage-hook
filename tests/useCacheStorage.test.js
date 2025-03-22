import { renderHook, act } from "@testing-library/react-hooks";
import useCacheStorage from "../src/useCacheStorage";

describe("useCacheStorage", () => {
  const cacheName = "TestCache";

  beforeAll(() => {
    // Mock the Cache Storage API
    global.caches = {
      open: jest.fn(() => Promise.resolve({
        put: jest.fn(),
        match: jest.fn(),
        delete: jest.fn(),
      })),
      delete: jest.fn(),
    };
  });

  it("should initialize the cache", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCacheStorage(cacheName)
    );
    await waitForNextUpdate();
    expect(result.current.cache).toBeDefined();
  });

  it("should add a response to the cache", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCacheStorage(cacheName)
    );
    await waitForNextUpdate();
    await act(async () => {
      await result.current.addToCache("/test", new Response("Test Response"));
    });
    expect(result.current.error).toBeNull();
  });

  it("should handle errors", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useCacheStorage(cacheName)
    );
    await waitForNextUpdate();
    jest.spyOn(result.current.cache, "put").mockImplementation(() => {
      throw new Error("Test Error");
    });
    await act(async () => {
      await result.current.addToCache("/test", new Response("Test Response"));
    });
    expect(result.current.error).toBeDefined();
  });
});