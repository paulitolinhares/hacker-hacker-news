import { apiFactory } from "./api";
import { Article } from "../models/article";

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
  describe("Get Story", () => {
    it("should return the data from fetch", async () => {
      const mockArticle: Article = {
        author: "Test author",
        title: "Test title",
        text: "Hello world",
        score: 155
      };
      const mockFetch = (_url: string) => {
        return Promise.resolve({
          json: () => mockArticle
        });
      };

      const mockedApi = apiFactory(mockFetch);
      const article = await mockedApi.getArticle(1);

      expect(article).toEqual(mockArticle);
    });
    it("should call fetch with the correct id", async () => {
      const id = 1;
      const mockFetch = jest.fn(() => Promise.resolve({ json: () => {} }));
      const mockedApi = apiFactory(mockFetch);

      await mockedApi.getArticle(id);

      expect(mockFetch).toBeCalledWith(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
    });
  });
});
