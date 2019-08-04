import { apiFactory } from "./api";

describe("API Tests", () => {
  describe("Top stories", () => {
    it("should return the data from fetch", async () => {
      const mockFetch = (_url: string) => {
        return Promise.resolve({
          json: () => [1, 2, 3] // mock ids
        });
      };

      const mockedApi = apiFactory(mockFetch);
      const ids = await mockedApi.getTopStories();

      expect(ids).toEqual([1, 2, 3]);
    });
    it("should call fetch", async () => {
      const mockFetch = jest.fn(() => Promise.resolve({ json: () => {} }));
      const mockedApi = apiFactory(mockFetch);

      await mockedApi.getTopStories();

      expect(mockFetch).toBeCalled();
    });
  });
});
