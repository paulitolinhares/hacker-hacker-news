import { Article } from "../models/article";

const baseUrl = "https://hacker-news.firebaseio.com/v0";

type FetchType = (url: string) => Promise<Response>;

const getTopStories = (fetch: FetchType) => {
  return async function getTopStoriesInjected(): Promise<number[]> {
    const url = `${baseUrl}/topstories.json`;
    const ids = await fetch(url).then((res: Response) => res.json());
    return ids;
  };
};

const getArticle = (fetch: FetchType) => {
  return async function getArticleInjected(id: number): Promise<Article> {
    const url = `${baseUrl}/item/${id}.json`;
    const article = await fetch(url).then((res: Response) => res.json());
    return article;
  };
};

export const apiFactory = (fetch: FetchType) => ({
  getTopStories: getTopStories(fetch),
  getArticle: getArticle(fetch)
});

export default apiFactory(window.fetch);
